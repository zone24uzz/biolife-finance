import process from 'node:process';
import { loadLocalEnv } from '../env.js';
import { configureTelegramBot } from '../telegram.js';
loadLocalEnv();
const token=process.env.TELEGRAM_BOT_TOKEN;
const localWebhook=process.env.LOCAL_TELEGRAM_WEBHOOK||'http://127.0.0.1:8787/api/v1/telegram/webhook';
if(!token)throw new Error('TELEGRAM_BOT_TOKEN .env faylida topilmadi.');
const tg=method=>`https://api.telegram.org/bot${token}/${method}`;
const post=async(method,payload)=>{const r=await fetch(tg(method),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});const x=await r.json();if(!r.ok||!x.ok)throw new Error(x.description||`Telegram ${method} xatosi`);return x.result;};
await post('deleteWebhook',{drop_pending_updates:false});
await configureTelegramBot();
let offset=0,stopping=false;
process.on('SIGINT',()=>stopping=true);process.on('SIGTERM',()=>stopping=true);
console.log('BIOLIFE Telegram polling ishga tushdi.');
while(!stopping){
  try{
    const updates=await post('getUpdates',{offset,timeout:25,allowed_updates:['message','callback_query']});
    for(const update of updates){
      const headers={'Content-Type':'application/json'};if(process.env.TELEGRAM_WEBHOOK_SECRET)headers['X-Telegram-Bot-Api-Secret-Token']=process.env.TELEGRAM_WEBHOOK_SECRET;
      const response=await fetch(localWebhook,{method:'POST',headers,body:JSON.stringify(update)});
      if(!response.ok)throw new Error(`Lokal webhook ${response.status}`);
      offset=Math.max(offset,update.update_id+1);
    }
  }catch(error){console.error(`[polling] ${error.message}`);await new Promise(resolve=>setTimeout(resolve,3000));}
}
console.log('BIOLIFE Telegram polling to‘xtadi.');
