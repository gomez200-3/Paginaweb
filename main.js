// Animación de explosión de emojis al presionar un emoji
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

// Navegación: Botón principal
document.getElementById('irRecuerdosBtn').onclick = function (e) {
  e.preventDefault();
  explosionEmojis(['💖', '💞', '❤️', '🌷', '💌', '💋', '💘', '😍', '🥰', '💕']);
  setTimeout(() => { window.location = "aventuras.html"; }, 900);
};

// Modal romántico para textos de los emojis
const romanticModal = document.getElementById('modal-romantic');
const closeModal = document.getElementById('close-modal');
const modalMessage = document.getElementById('modal-message');

// Asegúrate de ocultar el modal al cargar
window.addEventListener("DOMContentLoaded", function() {
  romanticModal.classList.add('modal-hidden');
});

// Mostrar el modal solo si hay texto romántico y animación
document.querySelectorAll('.emoji-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const texto = btn.getAttribute('data-texto');
    if (texto && texto.trim() !== "") {
      explosionEmojis(['💖', '💞', '❤️', '🌷', '💌', '💋', '💘', '😍', '🥰', '💕'], 800);
      setTimeout(() => {
        modalMessage.textContent = texto;
        romanticModal.classList.remove('modal-hidden');
      }, 400);
    }
  });
});

closeModal.onclick = () => {
  romanticModal.classList.add('modal-hidden');
};

romanticModal.onclick = (e) => {
  if (e.target === romanticModal) {
    romanticModal.classList.add('modal-hidden');
  }
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    romanticModal.classList.add('modal-hidden');
  }
});
