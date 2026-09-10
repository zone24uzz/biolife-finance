import { readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';

export function loadLocalEnv(file='.env'){
  try{Object.assign(process.env,parseEnv(readFileSync(file,'utf8')));}catch{}
}
