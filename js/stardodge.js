const c=document.getElementById('c'),x=c.getContext('2d');let p,rocks,stars,score,best=+localStorage.sd_best||0,t,over,keys={},parts;
function reset(){p={x:240,y:560,r:16};rocks=[];stars=[];parts=[];score=0;t=0;over=false}
reset();
c.addEventListener('pointermove',e=>{const b=c.getBoundingClientRect();p.x=(e.clientX-b.left)*c.width/b.width});
c.addEventListener('pointerdown',e=>{if(over)reset();else{const b=c.getBoundingClientRect();p.x=(e.clientX-b.left)*c.width/b.width}});
onkeydown=e=>{keys[e.key]=1;if(over&&e.key==' ')reset()};onkeyup=e=>keys[e.key]=0;
function boom(X,Y,col){for(let i=0;i<14;i++)parts.push({x:X,y:Y,vx:Math.random()*6-3,vy:Math.random()*6-3,l:30,col})}
function loop(){requestAnimationFrame(loop);x.clearRect(0,0,480,640);
for(let i=0;i<40;i++){x.fillStyle='rgba(255,255,255,.3)';x.fillRect((i*97)%480,(i*53+t*2)%640,2,2)}
if(!over){t++;const sp=3+t/600;
if(keys.ArrowLeft)p.x-=7;if(keys.ArrowRight)p.x+=7;p.x=Math.max(16,Math.min(464,p.x));
if(Math.random()<.03+t/40000)rocks.push({x:Math.random()*460+10,y:-20,r:12+Math.random()*16,v:sp+Math.random()*2});
if(Math.random()<.015)stars.push({x:Math.random()*440+20,y:-20,r:10,v:sp});
for(const r of rocks){r.y+=r.v;if(Math.hypot(r.x-p.x,r.y-p.y)<r.r+p.r-4){over=true;boom(p.x,p.y,'#4ee');if(score>best){best=score;localStorage.sd_best=best}}}
for(const s of stars){s.y+=s.v;if(!s.got&&Math.hypot(s.x-p.x,s.y-p.y)<s.r+p.r){s.got=1;score+=10;boom(s.x,s.y,'#f2c14e')}}
rocks=rocks.filter(r=>r.y<680);stars=stars.filter(s=>s.y<680&&!s.got);if(t%30==0)score++}
for(const r of rocks){x.fillStyle='#e0564f';x.beginPath();x.arc(r.x,r.y,r.r,0,7);x.fill()}
for(const s of stars){x.fillStyle='#f2c14e';x.beginPath();for(let i=0;i<10;i++){const a=i*Math.PI/5,rr=i%2?5:12;x.lineTo(s.x+rr*Math.sin(a),s.y-rr*Math.cos(a))}x.fill()}
for(const q of parts){q.x+=q.vx;q.y+=q.vy;q.l--;x.globalAlpha=q.l/30;x.fillStyle=q.col;x.fillRect(q.x,q.y,4,4)}x.globalAlpha=1;parts=parts.filter(q=>q.l>0);
if(!over){x.fillStyle='#4ee';x.beginPath();x.moveTo(p.x,p.y-20);x.lineTo(p.x-16,p.y+14);x.lineTo(p.x+16,p.y+14);x.fill()}
x.fillStyle='#fff';x.font='bold 20px system-ui';x.fillText('Score '+score,14,30);x.fillText('Best '+best,380,30);
if(over){x.textAlign='center';x.font='bold 40px system-ui';x.fillText('GAME OVER',240,300);x.font='20px system-ui';x.fillText('Tap or press space to retry',240,340);x.textAlign='left'}}
loop();
