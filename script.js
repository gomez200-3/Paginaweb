// --- Modal para los botones emoji ---
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

// --- Slider/diapositiva especial ---
const imagenes = [
  "media/1.jpg",
  "media/2.jpg",
  "media/3.jpg",
  "media/4.jpg"
  // Agrega más imágenes si tienes
];
let sliderIndice = 0;
let sliderInterval = null;

function mostrarFoto(idx) {
  const img = document.getElementById("slider-img");
  if (img && imagenes.length > 0) {
    sliderIndice = (idx + imagenes.length) % imagenes.length;
    img.src = imagenes[sliderIndice];
  }
}

function cambiarFoto(dir) {
  mostrarFoto(sliderIndice + dir);
}

function iniciarDiapositiva() {
  if (sliderInterval) clearInterval(sliderInterval);
  sliderInterval = setInterval(() => cambiarFoto(1), 2400);
}

// Opcional: detener autoplay cuando se cambia manualmente
document.querySelectorAll(".slider-controls button").forEach(btn => {
  btn.addEventListener("click", () => {
    if (sliderInterval) {
      clearInterval(sliderInterval);
      sliderInterval = null;
    }
  });
});

// Inicializa la primera imagen
mostrarFoto(0);
