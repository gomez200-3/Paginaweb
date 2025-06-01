// Explosión de corazones en 'Iniciar aventura'
function explosionCorazones(btn) {
  let explosion = document.createElement('div');
  explosion.className = 'heart-explosion';
  btn.parentNode.style.position = "relative";
  btn.parentNode.appendChild(explosion);

  for (let i = 0; i < 8; i++) {
    let heart = document.createElement('span');
    heart.className = 'heart';
    heart.textContent = '❤️';
    let angle = (i / 8) * 2 * Math.PI;
    let tx = Math.cos(angle) * 60 + "px";
    let ty = Math.sin(angle) * 60 + "px";
    heart.style.setProperty('--tx', tx);
    heart.style.setProperty('--ty', ty);
    explosion.appendChild(heart);
  }
  setTimeout(() => {
    explosion.remove();
  }, 500);
}

// Audio global para la canción
const audio = new Audio('Media/Afaz Natural - Deseo Saber (Video Oficial)(M4A_128K).m4a');
audio.preload = "auto";

// Play audio (reinicia si ya estaba sonando)
function playSong() {
  audio.currentTime = 0;
  audio.play();
}

// SLIDESHOW (ahora con imágenes locales)
const slideImages = [
  'Media/andrea.jpg',
  'Media/gutierrez.jpg',
  'Media/IMG-mi reina.jpg',
  'Media/amor.jpg',
  'Media/20250503_182247.jpg'
];
let currentSlide = 0;

// Inicializa el slideshow
function showSlide(index) {
  const img = document.getElementById('slide-img');
  if (!img) return;
  currentSlide = (index + slideImages.length) % slideImages.length;
  img.src = slideImages[currentSlide];
  img.alt = "Foto especial " + (currentSlide + 1);
}

// Navegación del slideshow
function prevSlide() {
  showSlide(currentSlide - 1);
}
function nextSlide() {
  showSlide(currentSlide + 1);
}

// Cuando se inicia la sección de diapositivas, reproduce el audio
function iniciarDiapositiva() {
  playSong();
  const section = document.getElementById('slideshow-section');
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
  showSlide(currentSlide); // Para mostrar la imagen actual si no se ha mostrado aún
}

// ---- NUEVO: Enlazando la interactividad de la página ----
document.addEventListener("DOMContentLoaded", function() {
  // Iniciar aventura en la página principal
  const botonAventuras = document.getElementById('botonAventuras');
  if (botonAventuras) {
    botonAventuras.addEventListener('click', function(e) {
      explosionCorazones(this);
      setTimeout(() => {
        window.location.href = "aventuras2.html";
      }, 600); // Pequeño delay para ver la animación
      playSong();
    });
  }

  // Mostrar primer slide al cargar la página
  showSlide(currentSlide);
});
