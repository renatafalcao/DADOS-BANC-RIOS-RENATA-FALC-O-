
async function copyText(text){
  try{
    await navigator.clipboard.writeText(text);
    return true;
  }catch(e){
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    ta.remove(); return true;
  }
}
function setOK(btn){
  const old = btn.textContent;
  btn.textContent = 'Copiado ✓'; btn.classList.add('ok'); btn.disabled = true;
  setTimeout(()=>{btn.textContent=old; btn.classList.remove('ok'); btn.disabled=false;},1200);
}
document.querySelectorAll('button.copy[data-val]').forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    const v = btn.getAttribute('data-val');
    const ok = await copyText(v); if(ok) setOK(btn);
  });
});
document.querySelectorAll('button.copy[data-block]').forEach(btn=>{
  btn.addEventListener('click', async ()=>{
    const block = btn.getAttribute('data-block');
    const val = block.split('|').join(' | ');
    const ok = await copyText(val); if(ok) setOK(btn);
  });
});
