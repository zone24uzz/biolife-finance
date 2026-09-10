import { chat, cancelAction, consumeAction, visibleAgents } from './ai.js';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import process from 'node:process';
import crypto from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { authenticate, can, ensureSecurity, issueSession, login, logout, publicUser, telegramUser } from './auth.js';
import { createStore } from './storage.js';
import { configureTelegramWebhook, handleTelegramUpdate, verifyInitData } from './telegram.js';
import { loadLocalEnv } from './env.js';

loadLocalEnv(path.join(path.dirname(fileURLToPath(import.meta.url)), '.env'));
const root=path.dirname(fileURLToPath(import.meta.url)),store=createStore(root);
const cors={'Access-Control-Allow-Origin':process.env.APP_ORIGIN||'*','Access-Control-Allow-Headers':'Content-Type, Authorization, X-Telegram-Bot-Api-Secret-Token','Access-Control-Allow-Methods':'GET,POST,PUT,PATCH,DELETE,OPTIONS'};
const send=(res,status,payload)=>{res.writeHead(status,{'Content-Type':'application/json; charset=utf-8',...cors});res.end(JSON.stringify(payload));};
const readBody=async(req,limit=20000)=>{let raw='';for await(const chunk of req){raw+=chunk;if(raw.length>limit)throw Object.assign(new Error('PAYLOAD_TOO_LARGE'),{status:413});}return JSON.parse(raw||'{}');};
const validSection=(module,section)=>Number.isInteger(section)&&section>=0&&section<module.children.length;
const locked=row=>['Posted','Yopilgan','Yakunlangan','Tasdiqlangan','Muvozanatli'].includes(row?.[4]);
const validRow=row=>Array.isArray(row)&&row.length===6&&row.every((x,i)=>typeof x==='string'&&x.length<=(i===5?2000:500))&&row[0].trim()&&row[1].trim();
const audit=(db,action,module,section,row,user,channel='web')=>{db.audit||=[];db.audit.push({at:new Date().toISOString(),action,module,section,code:row?.[0],userId:user?.id||'system',channel});};
const scopedKeys=(db,role)=>role==='ceo'?Object.keys(db.modules).filter(x=>x!=='ai'):{accountant:['finance'],warehouse_manager:['warehouse'],production_manager:['production'],sales_manager:['sales'],purchase_manager:['purchases'],auditor:['production','warehouse','sales','purchases','cash','finance','budget']}[role]||[];
const serveStatic=async(url,res)=>{if(url.pathname.startsWith('/api/'))return false;const dist=path.join(root,'dist'),requested=url.pathname==='/'?'index.html':url.pathname.slice(1),file=path.resolve(dist,requested);if(!file.startsWith(path.resolve(dist)))return false;try{const data=await readFile(file);const ext=path.extname(file);res.writeHead(200,{'Content-Type':{'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml'}[ext]||'application/octet-stream'});res.end(data);return true;}catch{if(!path.extname(requested)){try{const data=await readFile(path.join(dist,'index.html'));res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});res.end(data);return true;}catch{}}return false;}};

async function applyProposal(db,user,mode,token,channel='web'){
  if(mode==='cancel'){const item=cancelAction(db,token,user);return item?{status:200,body:{done:true,message:'Amal bekor qilindi.'}}:{status:404,body:{message:'Taklif topilmadi.'}};}
  const p=consumeAction(db,token,user);
  if(!p)return {status:410,body:{message:'Taklif topilmadi yoki boshqa foydalanuvchiga tegishli.'}};
  if(p.expiresAt<Date.now())return {status:410,body:{message:'Taklif muddati tugagan.'}};
  if(!can(user,p.module))return {status:403,body:{message:'Bu bo‘lim uchun ruxsat yo‘q.'}};
  const module=db.modules[p.module];if(!module||!validSection(module,p.section))return {status:422,body:{message:'Agent bo‘limi noto‘g‘ri.'}};
  const rows=module.sectionRows[p.section];
  if(p.action==='create'){
    const row=p.row;if(Array.isArray(row)&&!row[0])row[0]=`${p.module.toUpperCase()}-${crypto.randomUUID()}`;
    if(!validRow(row)||locked(row))return {status:422,body:{message:'Agent tayyorlagan yozuv formati noto‘g‘ri.'}};
    if(rows.some(x=>x[0]===row[0]))return {status:409,body:{message:'Bu kod mavjud.'}};
    rows.unshift(row);audit(db,'ai-create',p.module,p.section,row,user,channel);return {status:201,body:{done:true,row,message:'Yozuv bazaga saqlandi.'}};
  }
  const index=rows.findIndex(x=>x[0]===p.code);if(index<0)return {status:404,body:{message:'Yozuv topilmadi.'}};
  if(locked(rows[index]))return {status:409,body:{message:'Tasdiqlangan yozuvni AI o‘zgartira olmaydi.'}};
  if(p.action==='update'){
    if(!validRow(p.row)||p.row[0]!==p.code||locked(p.row))return {status:422,body:{message:'Tahrir formati noto‘g‘ri.'}};
    rows[index]=p.row;audit(db,'ai-update',p.module,p.section,p.row,user,channel);return {status:200,body:{done:true,row:p.row,message:'Yozuv yangilandi.'}};
  }
  const [row]=rows.splice(index,1);db.trash||=[];db.trash.push({module:p.module,section:p.section,row,at:new Date().toISOString(),source:`ai-confirmed-${channel}`});audit(db,'ai-delete',p.module,p.section,row,user,channel);return {status:200,body:{done:true,deleted:true,message:'Yozuv o‘chirildi.'}};
}

async function askAiForTelegram(db,user,prompt){
  let result={};const fake={destroyed:false,on(){},off(){},writeHead(){},write(){},end(){},flushHeaders(){}};
  await chat(null,fake,db,{prompt,stream:false,channel:'telegram',role:user.role,agentId:db.aiAgents?.accounts?.[user.role]?.id},(_res,_status,value)=>{result=value;},async()=>{},user);
  return result;
}

async function handle(req,res){
  if(req.method==='OPTIONS'){res.writeHead(204,cors);return res.end();}
  const url=new URL(req.url,'http://localhost');
  try{
    if(url.pathname==='/api/v1/health')return send(res,200,{ok:true,source:store.source});
    if(req.method==='POST'&&url.pathname==='/api/v1/auth/login'){
      const input=await readBody(req);let result;await store.mutate(db=>{ensureSecurity(db);result=login(db,String(input.login||''),String(input.password||''));});return result?send(res,200,result):send(res,401,{message:'Login yoki parol noto‘g‘ri.'});
    }
    if(req.method==='POST'&&url.pathname==='/api/v1/auth/telegram'){
      const input=await readBody(req),tg=verifyInitData(input.initData);if(!tg)return send(res,401,{message:'Telegram imzosi noto‘g‘ri yoki eskirgan.'});let result;await store.mutate(db=>{const linked=telegramUser(db,tg.id);if(linked){const full=db.security.users.find(x=>x.id===linked.id);result=issueSession(db,full);}});return result?send(res,200,result):send(res,403,{message:'Telegram akkaunti hali tasdiqlanmagan.'});
    }
    if(req.method==='POST'&&url.pathname==='/api/v1/telegram/webhook'){
      if(process.env.TELEGRAM_WEBHOOK_SECRET&&req.headers['x-telegram-bot-api-secret-token']!==process.env.TELEGRAM_WEBHOOK_SECRET)return send(res,403,{message:'Webhook secret noto‘g‘ri.'});
      const update=await readBody(req,100000);let duplicate=false;await store.mutate(async db=>{db.telegramUpdates||=[];if(db.telegramUpdates.includes(update.update_id)){duplicate=true;return;}db.telegramUpdates.push(update.update_id);db.telegramUpdates=db.telegramUpdates.slice(-500);await handleTelegramUpdate(db,update,(state,user,prompt)=>askAiForTelegram(state,user,prompt),async(state,user,action,token)=>{const result=await applyProposal(state,user,action,token,'telegram');return {message:result.body.message};});});return send(res,200,{ok:true,duplicate});
    }
    if(req.method==='GET'&&await serveStatic(url,res))return;

    const db=await store.read();ensureSecurity(db);const user=authenticate(db,req);
    if(!user)return send(res,401,{message:'Autentifikatsiya talab qilinadi.'});
    if(req.method==='GET'&&url.pathname==='/api/v1/me')return send(res,200,user);
    if(req.method==='POST'&&url.pathname==='/api/v1/auth/logout'){await store.mutate(state=>logout(state,user.sessionId));return send(res,200,{done:true});}
    if(req.method==='GET'&&url.pathname==='/api/v1/admin/telegram-links')return user.role==='ceo'?send(res,200,db.security.linkRequests.map(request=>{const link=db.security.telegramAccounts.find(x=>x.telegramId===request.telegramId&&x.status==='active');return {...request,userId:link?.userId||request.userId||null};})):send(res,403,{message:'Faqat CEO uchun.'});
    const approve=url.pathname.match(/^\/api\/v1\/admin\/telegram-links\/([^/]+)\/approve$/);
    if(req.method==='POST'&&approve){if(user.role!=='ceo')return send(res,403,{message:'Faqat CEO uchun.'});const input=await readBody(req);let output;await store.mutate(state=>{ensureSecurity(state);const request=state.security.linkRequests.find(x=>x.id===approve[1]),target=state.security.users.find(x=>x.id===input.userId);if(!request||!target)return;request.status='approved';request.userId=target.id;request.approvedBy=user.id;request.approvedAt=new Date().toISOString();state.security.telegramAccounts=state.security.telegramAccounts.filter(x=>x.telegramId!==request.telegramId);state.security.telegramAccounts.push({telegramId:request.telegramId,userId:target.id,status:'active',linkedAt:new Date().toISOString(),linkedBy:user.id});audit(state,'telegram-link-change','admin',0,[request.telegramId],user);output={done:true,user:publicUser(target)};});return output?send(res,200,output):send(res,404,{message:'So‘rov yoki foydalanuvchi topilmadi.'});}
    const revoke=url.pathname.match(/^\/api\/v1\/admin\/telegram-links\/([^/]+)$/);
    if(req.method==='DELETE'&&revoke){if(user.role!=='ceo')return send(res,403,{message:'Faqat CEO uchun.'});let output;await store.mutate(state=>{const request=state.security.linkRequests.find(x=>x.id===revoke[1]);if(!request)return;request.status='revoked';request.revokedBy=user.id;request.revokedAt=new Date().toISOString();state.security.telegramAccounts.forEach(x=>{if(x.telegramId===request.telegramId)x.status='revoked';});audit(state,'telegram-link-revoke','admin',0,[request.telegramId],user);output={done:true};});return output?send(res,200,output):send(res,404,{message:'Ulanish topilmadi.'});}

    if(url.pathname==='/api/v1/dashboard'){
      if(user.role!=='ceo'){const keys=scopedKeys(db,user.role),sections=keys.flatMap(key=>{const mod=db.modules[key];return mod.children.map((name,i)=>{const rows=mod.sectionRows[i]||[];return {module:key,name,total:rows.length,statuses:rows.reduce((a,r)=>{a[r[4]||'Noma’lum']=(a[r[4]||'Noma’lum']||0)+1;return a;},{}),rows:rows.slice(0,5)};});});return send(res,200,{meta:db.meta,department:{key:keys[0]||'audit',title:keys.length===1?db.modules[keys[0]].title:'Audit nazorati',total:sections.reduce((n,s)=>n+s.total,0),sections,recent:sections.flatMap(s=>s.rows.map(row=>({module:s.module,section:s.name,row}))).slice(0,8)}});}
      return send(res,200,{meta:db.meta,summary:db.summary,cashflow:db.cashflow,productMix:db.productMix,productionLines:db.productionLines,operations:db.operations});
    }
    if(req.method==='GET'&&url.pathname==='/api/v1/ai/agents')return send(res,200,visibleAgents(db,user.role));
    if(req.method==='POST'&&url.pathname==='/api/v1/ai/chat'){const input=await readBody(req);input.role=user.role;return chat(req,res,db,input,send,state=>store.write(state),user);}
    if(req.method==='POST'&&(url.pathname==='/api/v1/ai/actions/confirm'||url.pathname==='/api/v1/ai/actions/cancel')){const input=await readBody(req);let result;await store.mutate(async state=>{result=await applyProposal(state,user,url.pathname.endsWith('/cancel')?'cancel':'confirm',input.token);});return send(res,result.status,result.body);}
    if(req.method==='GET'&&url.pathname==='/api/v1/ai/conversations')return send(res,200,db.conversations.filter(x=>x.userId===user.id).slice(-100));

    const match=url.pathname.match(/^\/api\/v1\/modules\/([a-z]+)$/);
    if(match&&db.modules[match[1]]){if(!can(user,match[1]))return send(res,403,{message:'Bu bo‘lim uchun ruxsat yo‘q.'});const module=db.modules[match[1]],section=Number(url.searchParams.get('section')||0);if(!validSection(module,section))return send(res,422,{message:'Bo‘lim noto‘g‘ri.'});const rows=module.sectionRows?.[section]||module.rows||[],q=(url.searchParams.get('q')||'').toLowerCase(),filtered=q?rows.filter(r=>r.join(' ').toLowerCase().includes(q)):rows,numeric=filtered.map(row=>Number(String(row[3]||'').replace(/[^0-9.-]/g,''))).filter(Number.isFinite),statuses=filtered.reduce((a,row)=>{a[row[4]||'Noma’lum']=(a[row[4]||'Noma’lum']||0)+1;return a;},{});return send(res,200,{module:match[1],...module,activeSection:section,rows:filtered,analytics:{total:filtered.length,numericTotal:numeric.reduce((a,b)=>a+b,0),average:numeric.length?Math.round(numeric.reduce((a,b)=>a+b,0)/numeric.length):0,statuses}});}
    const record=url.pathname.match(/^\/api\/v1\/modules\/([a-z]+)\/records(?:\/([^/]+))?$/);
    if(record&&db.modules[record[1]]){if(!can(user,record[1]))return send(res,403,{message:'Bu bo‘lim uchun ruxsat yo‘q.'});const section=Number(url.searchParams.get('section')||0);let result;await store.mutate(async state=>{const module=state.modules[record[1]];if(!validSection(module,section)){result={status:422,body:{message:'Bo‘lim noto‘g‘ri.'}};return;}const rows=module.sectionRows[section];if(req.method==='POST'){const input=await readBody(req),row=input.row;if(Array.isArray(row)&&!row[0])row[0]=`${record[1].toUpperCase()}-${crypto.randomUUID()}`;if(!validRow(row)||locked(row))result={status:422,body:{message:'Kod, nom yoki qoralama holati noto‘g‘ri.'}};else if(rows.some(x=>x[0]===row[0]))result={status:409,body:{message:'Bu kod mavjud.'}};else{rows.unshift(row);audit(state,'create',record[1],section,row,user);result={status:201,body:{row}};}}else{const index=rows.findIndex(x=>String(x[0])===decodeURIComponent(record[2]||''));if(index<0){result={status:404,body:{message:'Yozuv topilmadi.'}};return;}if(locked(rows[index])){result={status:409,body:{message:'Tasdiqlangan yozuv o‘zgartirilmaydi; storno zarur.'}};return;}if(req.method==='PUT'){const input=await readBody(req),row=input.row;if(!validRow(row)||row[0]!==rows[index][0]||locked(row))result={status:422,body:{message:'Tahrir formati noto‘g‘ri.'}};else{rows[index]=row;audit(state,'update',record[1],section,row,user);result={status:200,body:{row}};}}else if(req.method==='DELETE'){const [row]=rows.splice(index,1);state.trash||=[];state.trash.push({module:record[1],section,row,at:new Date().toISOString(),userId:user.id});audit(state,'delete',record[1],section,row,user);result={status:200,body:{deleted:true}};}}});return result?send(res,result.status,result.body):send(res,405,{message:'Method ruxsat etilmagan.'});}
    if(req.method==='POST'&&url.pathname==='/api/v1/operations'){if(!can(user,'finance')&&user.role!=='ceo')return send(res,403,{message:'Operatsiya yaratish uchun ruxsat yo‘q.'});const input=await readBody(req);if(!input.name||!input.amount)return send(res,422,{message:'Nomi va summa majburiy.'});let row;await store.mutate(state=>{row={date:new Date().toLocaleDateString('uz-UZ'),code:`NEW-${Date.now().toString().slice(-6)}`,name:String(input.name),type:String(input.type||'Operatsiya'),amount:String(input.amount),status:'Qoralama'};state.operations.unshift(row);audit(state,'operation-create','finance',0,[row.code],user);});return send(res,201,row);}
    return send(res,404,{message:'Endpoint topilmadi.'});
  }catch(error){console.error(error);return send(res,error.status||500,{message:error instanceof SyntaxError?'JSON formati noto‘g‘ri.':error.message==='PAYLOAD_TOO_LARGE'?'So‘rov juda katta.':'Server xatosi.'});}
}

const port=Number(process.env.PORT||process.env.BIOLIFE_PORT||8787),host=process.env.BIOLIFE_HOST||'0.0.0.0';
const initial=await store.read();ensureSecurity(initial);await store.write(initial);
createServer(handle).listen(port,host,async()=>{
  console.log(`BIOLIFE API: http://${host}:${port} (${store.source})`);
  if(process.env.TELEGRAM_MODE==='webhook'){
    try{await configureTelegramWebhook();console.log('Telegram webhook sozlandi.');}
    catch(error){console.error(`Telegram webhook sozlanmadi: ${error.message}`);}
  }
});
