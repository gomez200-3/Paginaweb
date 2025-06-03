function explosionEmojis(emojis, duration = 900) {
  const explosion = document.getElementById('explosion-emojis');
  explosion.innerHTML = '';
  for (let i = 0; i < 20; ++i) {
    const em = document.createElement('span');
    em.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    em.className = 'explosion-emoji';
    em.style.left = (window.innerWidth / 2 + (Math.random() - 0.5) * 180) + 'px';
    em.style.top = (window.innerHeight / 2 + (Math.random() - 0.5) * 120 + window.scrollY) + 'px';
    em.style.setProperty('--tx', ((Math.random() - 0.5) * 330) + 'px');
    em.style.setProperty('--ty', ((Math.random() - 0.5) * 220) + 'px');
    explosion.appendChild(em);
  }
  explosion.style.display = "block";
  setTimeout(() => {
    explosion.innerHTML = '';
    explosion.style.display = "none";
  }, duration);
}

document.getElementById('volver-inicio').onclick = function () {
  explosionEmojis(['💖', '💞', '❤️', '🌷', '💌', '💋', '💘', '😍', '🥰', '💕']);
  setTimeout(() => { window.location = "index.html"; }, 900);
};

document.getElementById('iniciar-aventura2').onclick = function () {
  explosionEmojis(['💖', '💞', '❤️', '🌷', '💌', '💋', '💘', '😍', '🥰', '💕']);
  setTimeout(() => { window.location = "aventuras2.html"; }, 900);
};
