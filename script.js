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
const audio = new Audio('media/Afaz Natural - Deseo Saber (Video Oficial)(M4A_128K).m4a');
audio.preload = "auto";

// Play audio (reinicia si ya estaba sonando)
function playSong() {
  audio.currentTime = 0;
  audio.play();
}

// SLIDESHOW (ahora con imágenes locales)
const slideImages = [
  'media/andrea.jpg',
  'media/gutierrez.jpg',
  'media/IMG-mi reina.jpg',
  'media/amor.jpg',
  'media/20250503_182247.jpg'
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

function prevSlide() {
  showSlide(currentSlide - 1);
}
function nextSlide() {
  showSlide(currentSlide + 1);
}

// Cuando se inicia la sección de diapositivas, reproduce el audio
function iniciarDiapositiva() {
  playSong();
  document.getElementById('slideshow-section').scrollIntoView({ behavior: "smooth" });
}

// Botones de interacción especial
function accionEspecial(btn) {
  playSong();
  btn.classList.add('btn-active');
  setTimeout(() => btn.classList.remove('btn-active'), 300);
}

// ---- NUEVO: Enlazando la interactividad de la página ----
document.addEventListener("DOMContentLoaded", function() {
  // Texto al hacer click en emojis
  document.querySelectorAll('.emoji').forEach(btn => {
    btn.addEventListener('click', function() {
      alert(btn.dataset.text);
      accionEspecial(btn);
    });
  });

  // Mostrar imagen en modal
  const modal = document.getElementById('myModal');
  const modalImage = document.getElementById('modalImage');
  document.querySelectorAll('.ver-imagen').forEach(btn => {
    btn.addEventListener('click', function() {
      modal.style.display = "block";
      modalImage.src = btn.dataset.image;
      modalImage.alt = "Imagen especial";
      playSong();
    });
  });

  // Cerrar modal
  document.querySelector('.close').addEventListener('click', function() {
    modal.style.display = "none";
    modalImage.src = "";
  });
  // Cerrar modal al hacer click fuera de la imagen
  window.addEventListener('click', function(event) {
    if(event.target == modal) {
      modal.style.display = "none";
      modalImage.src = "";
    }
  });

  // Iniciar aventura (corazones + navegación)
  document.getElementById('botonAventuras').addEventListener('click', function(e) {
    explosionCorazones(this);
    setTimeout(() => {
      window.location.href = "aventuras.html";
    }, 600); // Pequeño delay para ver la animación
    playSong();
  });
});
