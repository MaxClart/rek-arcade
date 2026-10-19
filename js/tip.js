document.querySelectorAll('[data-copy]').forEach(b=>b.addEventListener('click',async()=>{const t=document.getElementById(b.dataset.copy).textContent.trim();
try{await navigator.clipboard.writeText(t)}catch(e){const r=document.createRange();r.selectNode(document.getElementById(b.dataset.copy));getSelection().removeAllRanges();getSelection().addRange(r);document.execCommand('copy')}
b.textContent='Copied!';setTimeout(()=>b.textContent='Copy address',1800)}));
