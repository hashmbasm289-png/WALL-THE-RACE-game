// يجعل اللعبة تعمل بدون إنترنت لمكتبات three و peerjs (تُنسخ محليًا بدل CDN)
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..');
fs.mkdirSync(path.join(root,'www/libs'),{recursive:true});
fs.copyFileSync(path.join(root,'node_modules/three/build/three.min.js'),path.join(root,'www/libs/three.min.js'));
fs.copyFileSync(path.join(root,'node_modules/peerjs/dist/peerjs.min.js'),path.join(root,'www/libs/peerjs.min.js'));
const f=path.join(root,'www/index.html');let s=fs.readFileSync(f,'utf8');
s=s.replace('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','libs/three.min.js')
   .replace('https://unpkg.com/peerjs@1.5.4/dist/peerjs.min.js','libs/peerjs.min.js');
fs.writeFileSync(f,s);console.log('libs ready');
