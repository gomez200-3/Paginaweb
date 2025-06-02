// --- Música ---
const canciones = [
  { archivo: "Media/Afaz Natural - Deseo Saber (Video Oficial)(M4A_128K).m4a", nombre: "cada vez siento" },
  { archivo: "Media/Alok - Alive (It Feels Like) [Official Visualizer](M4A_128K).m4a", nombre: "que te amo mucho" },
  { archivo: "Media/Billie Eilish - ilomilo (Official Audio)(M4A_128K).m4a", nombre: "mas de lo que te imaginas" },
  { archivo: "Media/DISHYPE_ OT-TO - AURA (Visualizer)(M4A_128K).m4a", nombre: "somos tu y yo" },
  { archivo: "Media/Don Omar - Dutty Love (Lyric Video) ft. Natti Natasha(M4A_128K).m4a", nombre: "nuestra historiaes una locura" },
  { archivo: "Media/Shawn Mendes - There_s Nothing Holdin_ Me Back _ Traducida al Español(M4A_128K).m4a", nombre: "Te extraño" },
{ archivo: "Media/Wolverave - Vielleicht Vielleicht (Hardtekk Edit)(M4A_128K).m4a", nombre: "TE AMO" },
  // Agrega más aquí si tienes, con nombres románticos
];
let cancionActual = 0;

function abrirMusica() {
  document.getElementById('musica-modal').classList.add('active');
  cargarCancion(cancionActual);
  setTimeout(() => {
    document.getElementById('audio-player').play();
  }, 100);
}
function cerrarMusica() {
  document.getElementById('musica-modal').classList.remove('active');
  document.getElementById('audio-player').pause();
}
function cargarCancion(idx) {
  cancionActual = (idx + canciones.length) % canciones.length;
  const cancion = canciones[cancionActual];
  const audio = document.getElementById('audio-player');
  audio.src = cancion.archivo;
  document.getElementById('cancion-nombre').textContent = cancion.nombre;
}
function cambiarCancion(dir) {
  cargarCancion(cancionActual + dir);
  document.getElementById('audio-player').play();
}

// --- Galería romántica ---
const imagenesGaleria = [
  "Media/vamos_atardecer.jpg",
  "Media/imagen_besando.jpg",
  "Media/gutierrez.jpg",
  "Media/andrea.jpg",
  "Media/Vamos_tmfotos.jpg",
  "Media/Recuerdo2202.jpg",
  "Media/IMG_20250406_210730.jpg",
  "Media/IMG-mi reina.jpg",
  "Media/20250503_182247.jpg",
  // Agrega más imágenes si tienes en media
];
function abrirGaleria() {
  document.getElementById('galeria-modal').classList.add('active');
  const cont = document.getElementById('galeria-imgs');
  cont.innerHTML = '';
  imagenesGaleria.forEach(src => {
    const div = document.createElement('div');
    div.className = "galeria-img-romantica";
    div.innerHTML = `<img src="${src}" alt="Recuerdo" /> <div class="corazon">💖</div>`;
    cont.appendChild(div);
  });
}
function cerrarGaleria() {
  document.getElementById('galeria-modal').classList.remove('active');
}

// --- Videos ---
const videos = [
  { archivo: "Media/Nuestro_mundo.mp4", nombre: "NUESTRO MUNDO" },
  { archivo: "Media/Video_juntos.mp4", nombre: "ERES A QUIEN MAS AMO" }
  // Agrega más videos si tienes
];
let videoActual = 0;

function abrirVideos() {
  document.getElementById('videos-modal').classList.add('active');
  cargarVideo(videoActual);
}
function cerrarVideos() {
  document.getElementById('videos-modal').classList.remove('active');
  const cont = document.getElementById('videos-galeria');
  cont.innerHTML = '';
}
function cargarVideo(idx) {
  videoActual = (idx + videos.length) % videos.length;
  const cont = document.getElementById('videos-galeria');
  cont.innerHTML = `
    <video id="video-player" src="${videos[videoActual].archivo}" controls autoplay style="width:100%;max-width:320px;border-radius:10px;box-shadow:0 2px 16px #0003"></video>
  `;
  document.getElementById('nombre-video').textContent = videos[videoActual].nombre;
}
function cambiarVideo(dir) {
  cargarVideo(videoActual + dir);
}

// Cierra modales con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarMusica();
    cerrarGaleria();
    cerrarVideos();
  }
});
