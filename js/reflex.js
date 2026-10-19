// Pop Rush – 30-second reaction game
const area=document.getElementById('area'),ov=document.getElementById('ov'),$=id=>document.getElementById(id);
let score,time,running=false,spawnT,clockT,best=+localStorage.pr_best||0;$('best').textContent=best;
function start(){score=0;time=30;running=true;ov.style.display='none';area.querySelectorAll('.dot').forEach(d=>d.remove());$('score').textContent=0;$('time').textContent=time;
clockT=setInterval(()=>{time--;$('time').textContent=time;if(time<=0)end()},1000);spawn()}
function spawn(){if(!running)return;const bad=Math.random()<.18,sz=Math.max(34,70-score*1.2),d=document.createElement('div');d.className='dot'+(bad?' bad':'');
const W=area.clientWidth,H=area.clientHeight;d.style.width=d.style.height=sz+'px';d.style.left=Math.random()*(W-sz)+'px';d.style.top=Math.random()*(H-sz)+'px';
d.addEventListener('pointerdown',e=>{e.stopPropagation();if(!running)return;score=Math.max(0,score+(bad?-3:1));$('score').textContent=score;if(navigator.vibrate)navigator.vibrate(bad?60:10);d.remove()});
area.appendChild(d);setTimeout(()=>d.remove(),Math.max(600,1400-score*20));spawnT=setTimeout(spawn,Math.max(320,800-score*12))}
function end(){running=false;clearInterval(clockT);clearTimeout(spawnT);area.querySelectorAll('.dot').forEach(d=>d.remove());
const nb=score>best;if(nb){best=score;localStorage.pr_best=best;$('best').textContent=best}
$('msg').textContent=nb?`New best: ${score}!`:`You scored ${score}. Best: ${best}`;$('go').textContent='Play again';ov.style.display='flex'}
$('go').onclick=start;
