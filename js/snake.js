// Neon Worm – original snake-style game
const c=document.getElementById('c'),g=c.getContext('2d'),N=20,S=c.width/N;
let worm,dir,next,food,score,best=+localStorage.nw_best||0,alive,speed,timer,paused=true;
const $=id=>document.getElementById(id);
function place(){do{food={x:Math.random()*N|0,y:Math.random()*N|0}}while(worm.some(p=>p.x==food.x&&p.y==food.y))}
function reset(){worm=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];dir={x:1,y:0};next=dir;score=0;alive=true;speed=140;place();upd();paused=false;clearTimeout(timer);tick()}
function upd(){$('score').textContent=score;$('best').textContent=best}
function turn(x,y){if(x==-dir.x&&y==-dir.y)return;next={x,y}}
function tick(){if(!alive||paused)return;dir=next;const h={x:(worm[0].x+dir.x+N)%N,y:(worm[0].y+dir.y+N)%N};
if(worm.some(p=>p.x==h.x&&p.y==h.y)){alive=false;if(score>best){best=score;localStorage.nw_best=best}upd();draw();return}
worm.unshift(h);if(h.x==food.x&&h.y==food.y){score++;speed=Math.max(60,speed-4);place();upd()}else worm.pop();draw();timer=setTimeout(tick,speed)}
function draw(){g.clearRect(0,0,c.width,c.height);g.fillStyle='#f2c14e';g.shadowColor='#f2c14e';g.shadowBlur=14;g.beginPath();g.arc(food.x*S+S/2,food.y*S+S/2,S/2.6,0,7);g.fill();
worm.forEach((p,i)=>{g.shadowColor='#4ee0e0';g.fillStyle=`hsl(${180+i*3},80%,${60-i*.6}%)`;g.fillRect(p.x*S+1,p.y*S+1,S-2,S-2)});g.shadowBlur=0;
if(!alive){g.fillStyle='#0b1020cc';g.fillRect(0,0,c.width,c.height);g.fillStyle='#fff';g.textAlign='center';g.font='bold 34px system-ui';g.fillText('Game over',c.width/2,c.height/2-10);g.font='18px system-ui';g.fillText('Tap or press Space to play again',c.width/2,c.height/2+24)}}
const K={ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0],w:[0,-1],s:[0,1],a:[-1,0],d:[1,0]};
addEventListener('keydown',e=>{if(K[e.key]){e.preventDefault();turn(...K[e.key])}if(e.key==' '){e.preventDefault();if(!alive||paused&&!timer)reset()}});
document.querySelectorAll('[data-d]').forEach(b=>b.addEventListener('pointerdown',e=>{e.preventDefault();turn(...b.dataset.d.split(',').map(Number))}));
let sx,sy;c.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY;if(!alive)reset()},{passive:true});
c.addEventListener('touchmove',e=>{e.preventDefault()},{passive:false});
c.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<20)return;Math.abs(dx)>Math.abs(dy)?turn(Math.sign(dx),0):turn(0,Math.sign(dy))});
c.addEventListener('click',()=>{if(!alive)reset()});$('start').onclick=reset;
worm=[{x:10,y:10}];food={x:14,y:10};alive=true;upd();draw();
