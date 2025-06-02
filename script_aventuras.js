// Título animado
document.querySelector('.animated-title').classList.add('pulse-anim');

// Explosión de emojis para los botones
function explosionEmojis(x, y, emojis = ["🥺", "🐿", "💞"], duration = 600) {
  const explosion = document.getElementById('explosion-emojis');
  explosion.innerHTML = '';
  for (let i = 0; i < 14; i++) {
    const em = document.createElement('span');
    em.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    em.className = 'explosion-emoji';
    em.style.left = `${x + (Math.random() - 0.5) * 60}px`;
    em.style.top = `${y + (Math.random() - 0.5) * 30 + window.scrollY}px`;
    em.style.setProperty('--tx', ((Math.random() - 0.5) * 180) + 'px');
    em.style.setProperty('--ty', ((Math.random() - 0.5) * 110) + 'px');
    explosion.appendChild(em);
  }
  explosion.style.display = "block";
  setTimeout(() => {
    explosion.innerHTML = '';
    explosion.style.display = "none";
  }, duration);
}

// Continuar Aventuras
document.getElementById('continuar-aventuras').onclick = function (e) {
  const rect = this.getBoundingClientRect();
  explosionEmojis(rect.left + rect.width / 2, rect.top + rect.height / 2);
  setTimeout(() => {
    window.location.href = "aventuras2.html#aventuras";
  }, 600);
};
// Volver al inicio
document.getElementById('volver-inicio').onclick = function (e) {
  const rect = this.getBoundingClientRect();
  explosionEmojis(rect.left + rect.width / 2, rect.top + rect.height / 2);
  setTimeout(() => {
    window.location.href = "index.html";
  }, 600);
};
