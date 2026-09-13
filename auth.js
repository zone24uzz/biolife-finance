import { createHash, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { accessProfile, publicAccessFields } from './access-control.js';

export const ROLE_MODULES = {
  ceo: ['dashboard','production','warehouse','sales','purchases','cash','finance','budget','ai','admin'],
  accountant: ['dashboard','cash','finance','sales','purchases','ai'],
  warehouse_manager: ['dashboard','warehouse','production','ai'],
  production_manager: ['dashboard','production','warehouse','ai'],
  sales_manager: ['dashboard','sales','ai'],
  purchase_manager: ['dashboard','purchases','warehouse','ai'],
  auditor: ['dashboard','production','warehouse','sales','purchases','cash','finance','budget','ai']
};

const hashPassword = (password, salt = randomBytes(16).toString('hex')) => `${salt}:${scryptSync(password, salt, 64).toString('hex')}`;
const verifyPassword = (password, encoded = '') => {
  const [salt, digest] = encoded.split(':');
  if (!salt || !digest) return false;
  const actual = scryptSync(password, salt, 64);
  const expected = Buffer.from(digest, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
};
const tokenHash = token => createHash('sha256').update(token).digest('hex');

export function ensureSecurity(db) {
  db.security ||= {};
  db.security.users ||= [];
  db.security.sessions ||= [];
  db.security.telegramAccounts ||= [];
  db.security.linkRequests ||= [];
  db.conversations ||= [];
  db.aiProposals ||= [];
  db.outbox ||= [];
  db.security.linkRequests = [
    ...db.security.linkRequests.reduce((byTelegram, request) => {
      const key=String(request.telegramId);
      const current=byTelegram.get(key);
      if(!current || new Date(request.createdAt||0)>=new Date(current.createdAt||0))
        byTelegram.set(key,request);
      return byTelegram;
    },new Map()).values(),
  ];
  if (!db.security.users.length) {
    const password = process.env.BIOLIFE_BOOTSTRAP_PASSWORD || 'biolife-demo';
    const labels = {ceo:'CEO / Direktor',accountant:'Buxgalter',warehouse_manager:'Ombor boshlig‘i',production_manager:'Ishlab chiqarish boshlig‘i',sales_manager:'Sotuv menejeri',purchase_manager:'Ta’minot menejeri',auditor:'Auditor'};
    db.security.users = Object.keys(ROLE_MODULES).map(role => ({id:role,login:role,name:labels[role],role,status:'active',passwordHash:hashPassword(password),createdAt:new Date().toISOString()}));
  }
  if (db.security.credentialVersion !== 2) {
    for (const user of db.security.users) {
      const envKey = `BIOLIFE_PASSWORD_${user.role.toUpperCase()}`;
      user.passwordHash = hashPassword(
        process.env[envKey] || `${user.role}-biolife-2026`,
      );
    }
    db.security.credentialVersion = 2;
  }
  const now = Date.now();
  db.security.sessions = db.security.sessions.filter(x => new Date(x.expiresAt).getTime() > now);
}

export function login(db, loginName, password) {
  ensureSecurity(db);
  const user = db.security.users.find(x => x.login === loginName && x.status === 'active');
  if (!user || !verifyPassword(password, user.passwordHash)) return null;
  return issueSession(db,user);
}

export function issueSession(db,user,context={}) {
  const token = randomBytes(32).toString('base64url');
  db.security.sessions.push({id:randomBytes(12).toString('hex'),name:'Biolife-Finance',tokenHash:tokenHash(token),userId:user.id,source:context.source||'password',telegramId:context.telegramId?String(context.telegramId):undefined,createdAt:new Date().toISOString(),expiresAt:new Date(Date.now()+12*60*60*1000).toISOString()});
  return {token,user:publicUser(user)};
}

export function authenticate(db, req) {
  ensureSecurity(db);
  const raw = req.headers.authorization || '';
  const token = raw.startsWith('Bearer ') ? raw.slice(7) : '';
  if (!token) return null;
  const session = db.security.sessions.find(x => x.tokenHash === tokenHash(token));
  const user = session && db.security.users.find(x => x.id === session.userId && x.status === 'active');
  return user ? {...publicUser(user),sessionId:session.id} : null;
}

export function logout(db, sessionId) { db.security.sessions = db.security.sessions.filter(x => x.id !== sessionId); }
export function logoutTelegramSessions(db, userId, telegramId) {
  const id=String(telegramId);
  db.security.sessions=db.security.sessions.filter(session =>
    session.userId !== userId ||
    (session.source === 'password' && String(session.telegramId||'') !== id)
  );
}
export function publicUser(user) { return {id:user.id,login:user.login,name:user.name,role:user.role,allowed:ROLE_MODULES[user.role] || [],...publicAccessFields(user)}; }
export function can(user, module) {
  if (!user || !module) return false;
  const permissions = accessProfile(user).permissions;
  if (module === 'dashboard' || module === 'ai') return permissions.length > 0;
  if (module === 'admin') return permissions.includes('admin.access');
  return permissions.some(permission => permission.startsWith(`${module}.`));
}
export function telegramUser(db, telegramId) {
  ensureSecurity(db);
  const link = db.security.telegramAccounts.find(x => String(x.telegramId) === String(telegramId) && x.status === 'active');
  const user = link && db.security.users.find(x => x.id === link.userId && x.status === 'active');
  return user ? publicUser(user) : null;
}
