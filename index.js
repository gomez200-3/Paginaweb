<div id="modal-romantic" class="modal-hidden">
    <div class="modal-content">
        <span id="close-modal">&times;</span>
        <p id="modal-message"></p>
    </div>
</div>
// --- EMOJI MODAL
const emojiBtns = document.querySelectorAll('.emoji-btn');
const modalBg = document.getElementById('modal-bg');
const modalClose = document.getElementById('modal-close');
const modalText = document.getElementById('modal-text');
emojiBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modalText.textContent = btn.getAttribute('data-texto');
    modalBg.classList.add('active');
  });
});
modalClose.addEventListener('click', () => {
  modalBg.classList.remove('active');
});
modalBg.addEventListener('click', (e) => {
  if (e.target === modalBg) modalBg.classList.remove('active');
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') modalBg.classList.remove('active');
});

// --- EXPLOSIÓN de EMOJIS y REDIRECCIÓN
function explosionEmojis(emojis, duration=800) {
  const explosion = document.getElementById('explosion-emojis');
  explosion.innerHTML = '';
  for (let i=0; i<22; ++i) {
    const em = document.createElement('span');
    em.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    em.className = 'explosion-emoji';
    em.style.left = (window.innerWidth/2 + (Math.random()-0.5)*180) + 'px';
    em.style.top = (window.innerHeight/2 + (Math.random()-0.5)*120 + window.scrollY) + 'px';
    em.style.setProperty('--tx', ((Math.random()-0.5)*330)+'px');
    em.style.setProperty('--ty', ((Math.random()-0.5)*220)+'px');
    explosion.appendChild(em);
  }
  explosion.style.display = "block";
  setTimeout(() => { explosion.innerHTML = ''; explosion.style.display = "none"; }, duration);
}
document.getElementById('irRecuerdosBtn').addEventListener('click', function(e) {
  e.preventDefault();
  explosionEmojis(['💖','💞','❤️','🌷','💌','💋','💘','😍','🥰','💕'],800);
  setTimeout(() => { window.location = "aventuras.html"; }, 800);
});
