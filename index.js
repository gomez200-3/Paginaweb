// Explosión de emojis románticos
function explosionEmojisGraffiti(x, y, emojis = ["💖", "💞", "💌", "❤️‍🔥", "🌷"], duration = 800) {
  const explosion = document.getElementById('explosion-emojis');
  explosion.innerHTML = '';
  for (let i = 0; i < 18; i++) {
    const em = document.createElement('span');
    em.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    em.className = 'explosion-emoji';
    em.style.left = `${x + (Math.random() - 0.5) * 60}px`;
    em.style.top = `${y + (Math.random() - 0.5) * 30 + window.scrollY}px`;
    em.style.setProperty('--tx', ((Math.random() - 0.5) * 220) + 'px');
    em.style.setProperty('--ty', ((Math.random() - 0.5) * 160) + 'px');
    explosion.appendChild(em);
  }
  explosion.style.display = "block";
  setTimeout(() => {
    explosion.innerHTML = '';
    explosion.style.display = "none";
  }, duration);
}

// Animación y redirección botón "Ir a Recuerdos"
document.getElementById('ir-recuerdos').onclick = function (e) {
  const rect = this.getBoundingClientRect();
  explosionEmojisGraffiti(rect.left + rect.width / 2, rect.top + rect.height / 2, undefined, 800);
  setTimeout(() => {
    window.location.href = "aventuras.html#recuerdos";
  }, 800);
};

// Emoji buttons estilo futurista
document.querySelectorAll('.emoji-btn-futurista').forEach(btn => {
  btn.onclick = function (e) {
    const mensaje = btn.getAttribute('data-msg');
    abrirFuturistaModal(mensaje);
  }
});

// Modal futurista
function abrirFuturistaModal(txt) {
  document.getElementById('modal-futurista-txt').textContent = txt;
  document.getElementById('futurista-modal').classList.add('active');
}
function cerrarFuturistaModal() {
  document.getElementById('futurista-modal').classList.remove('active');
}
