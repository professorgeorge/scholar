import fs from 'node:fs/promises';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const source=process.argv[2]||(JSON.parse(await fs.readFile('.cv-work/source.json','utf8'))).path;
const run=(bin,args)=>{const r=spawnSync(bin,args,{shell:false,stdio:'inherit'});if(r.status!==0)throw Error('CV extraction or preparation failed. Website data remains unchanged.');};
if(path.extname(source).toLowerCase()==='.doc')run('powershell.exe',['-NoProfile','-File','scripts/extract-cv.ps1','-Path',path.resolve(source)]);
else run(process.platform==='win32'?'python':'python3',['scripts/extract-cv.py',source]);
run(process.execPath,['scripts/cv-update.mjs','prepare']);
