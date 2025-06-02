// Botón continuar aventuras
function explosionEmojis(emojis, duration=600) {
  const explosion = document.getElementById('explosion-emojis');
  explosion.innerHTML = '';
  for (let i=0; i<20; ++i) {
    const em = document.createElement('span');
    em.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    em.className = 'explosion-emoji';
    em.style.left = (window.innerWidth/2 + (Math.random()-0.5)*160) + 'px';
    em.style.top = (window.innerHeight/2 + (Math.random()-0.5)*90 + window.scrollY) + 'px';
    em.style.setProperty('--tx', ((Math.random()-0.5)*270)+'px');
    em.style.setProperty('--ty', ((Math.random()-0.5)*160)+'px');
    explosion.appendChild(em);
  }
  explosion.style.display = "block";
  setTimeout(() => { explosion.innerHTML = ''; explosion.style.display = "none"; }, duration);
}
document.querySelector('.continuar-btn').addEventListener('click', function(e){
  e.preventDefault();
  explosionEmojis(['🥺','🐿','💞'], 600);
  setTimeout(() => { window.location = "aventuras2.html"; }, 600);
});
document.querySelector('.volver-btn').addEventListener('click', function(e){
  e.preventDefault();
  explosionEmojis(['🥺','🐿','💞'], 600);
  setTimeout(() => { window.location = "index.html"; }, 600);
});
