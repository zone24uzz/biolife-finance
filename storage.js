import { readFile, writeFile, rename } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

export function createStore(root) {
  const dbPath = process.env.BIOLIFE_DB_PATH || path.join(root, 'db', 'data.json');
  const runtimePath = process.env.BIOLIFE_RUNTIME_PATH || dbPath.replace(/\.json$/i, '.runtime.json');
  const runtimeKeys=['security','conversations','aiProposals','outbox','telegramUpdates'];
  let pool;
  let queue = Promise.resolve();

  const postgres = async () => {
    if (!process.env.DATABASE_URL) return null;
    if (!pool) {
      const { Pool } = await import('pg');
      pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === 'require' ? { rejectUnauthorized: false } : undefined });
      await pool.query('CREATE TABLE IF NOT EXISTS biolife_state (id text PRIMARY KEY, document jsonb NOT NULL, updated_at timestamptz NOT NULL DEFAULT now())');
      const found = await pool.query("SELECT 1 FROM biolife_state WHERE id='main'");
      if (!found.rowCount) {
        const seed = JSON.parse(await readFile(dbPath, 'utf8'));
        await pool.query("INSERT INTO biolife_state(id, document) VALUES('main', $1::jsonb)", [JSON.stringify(seed)]);
      }
    }
    return pool;
  };

  const read = async () => {
    const pg = await postgres();
    if (pg) return (await pg.query("SELECT document FROM biolife_state WHERE id='main'")).rows[0].document;
    const db=JSON.parse(await readFile(dbPath, 'utf8'));
    if(existsSync(runtimePath)){const runtime=JSON.parse(await readFile(runtimePath,'utf8'));for(const key of runtimeKeys)if(key in runtime)db[key]=runtime[key];}
    return db;
  };

  const write = async db => {
    const pg = await postgres();
    if (pg) {
      await pg.query("UPDATE biolife_state SET document=$1::jsonb, updated_at=now() WHERE id='main'", [JSON.stringify(db)]);
      return;
    }
    const business={...db},runtime={};for(const key of runtimeKeys){if(key in business){runtime[key]=business[key];delete business[key];}}
    for(const [target,value] of [[dbPath,business],[runtimePath,runtime]]){
      const tmp = `${target}.tmp`;
      await writeFile(tmp, `${JSON.stringify(value, null, 2)}\n`);
      for(let attempt=0;;attempt++){
      try{await rename(tmp,target);break;}
      catch(error){if(error.code!=='EPERM'||attempt>=5)throw error;await new Promise(resolve=>setTimeout(resolve,25*(attempt+1)));}
      }
    }
  };

  const mutate = task => {
    const pending = queue.then(async () => {
      const db = await read();
      const result = await task(db);
      await write(db);
      return result;
    });
    queue = pending.catch(() => {});
    return pending;
  };

  return { read, write, mutate, source: process.env.DATABASE_URL ? 'postgres' : 'json-db', dbPath, runtimePath, hasSeed: existsSync(dbPath) };
}
