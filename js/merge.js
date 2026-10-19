// Twenty-Forty Merge – slide tiles, merge pairs
const B=document.getElementById('board'),$=id=>document.getElementById(id);let g,score,best=+localStorage.m_best||0,won;
const col=v=>v?`hsl(${(Math.log2(v)*28+180)%360},70%,${Math.max(35,62-Math.log2(v)*2)}%)`:'#18203d';
function add(){const e=[];g.forEach((v,i)=>!v&&e.push(i));if(e.length)g[e[Math.random()*e.length|0]]=Math.random()<.9?2:4}
function reset(){g=Array(16).fill(0);score=0;won=false;add();add();draw();$('msg').textContent=''}
function draw(){B.innerHTML='';g.forEach(v=>{const t=document.createElement('div');t.className='tile';t.textContent=v||'';t.style.background=col(v);if(v>512)t.style.fontSize='clamp(1rem,5vw,1.6rem)';B.appendChild(t)});
$('score').textContent=score;if(score>best){best=score;localStorage.m_best=best}$('best').textContent=best}
function line(a){a=a.filter(x=>x);for(let i=0;i<a.length-1;i++)if(a[i]==a[i+1]){a[i]*=2;score+=a[i];if(a[i]==2048&&!won){won=true;$('msg').textContent='2048! You did it – keep going?'}a.splice(i+1,1)}while(a.length<4)a.push(0);return a}
function move(d){const old=g.join();for(let k=0;k<4;k++){let idx=[0,1,2,3].map(j=>d=='L'?k*4+j:d=='R'?k*4+3-j:d=='U'?j*4+k:(3-j)*4+k);const r=line(idx.map(i=>g[i]));idx.forEach((i,j)=>g[i]=r[j])}
if(g.join()!=old){add();draw();if(!canMove())$('msg').textContent='No moves left. Press New game.'}}
function canMove(){if(g.includes(0))return true;for(let i=0;i<16;i++){if(i%4<3&&g[i]==g[i+1])return true;if(i<12&&g[i]==g[i+4])return true}return false}
addEventListener('keydown',e=>{const m={ArrowLeft:'L',ArrowRight:'R',ArrowUp:'U',ArrowDown:'D'}[e.key];if(m){e.preventDefault();move(m)}});
let sx,sy;B.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY});B.addEventListener('pointerup',e=>{const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))<24)return;move(Math.abs(dx)>Math.abs(dy)?(dx>0?'R':'L'):(dy>0?'D':'U'))});
B.addEventListener('touchmove',e=>e.preventDefault(),{passive:false});$('new').onclick=reset;reset();
