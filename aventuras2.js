// --- Música ---
const canciones = [
  { archivo: "Media/Afaz Natural - Deseo Saber (Video Oficial)(M4A_128K).m4a", nombre: "cada vez siento" },
  { archivo: "Media/Alok - Alive (It Feels Like) [Official Visualizer](M4A_128K).m4a", nombre: "que te amo mucho" },
  { archivo: "Media/Billie Eilish - ilomilo (Official Audio)(M4A_128K).m4a", nombre: "mas de lo que te imaginas" },
  { archivo: "Media/DISHYPE_ OT-TO - AURA (Visualizer)(M4A_128K).m4a", nombre: "somos tu y yo" },
  { archivo: "Media/Don Omar - Dutty Love (Lyric Video) ft. Natti Natasha(M4A_128K).m4a", nombre: "nuestra historiaes una locura" },
  { archivo: "Media/Shawn Mendes - There_s Nothing Holdin_ Me Back _ Traducida al Español(M4A_128K).m4a", nombre: "Te extraño" },
{ archivo: "Media/Wolverave - Vielleicht Vielleicht (Hardtekk Edit)(M4A_128K).m4a", nombre: "TE AMO" },
  // Agrega más canciones aquí
];
let cancionActual = -1;

function abrirMusica() {
  document.getElementById('musica-modal').classList.add('active');
  mostrarListaCanciones();
  const audio = document.getElementById('audio-player');
  audio.pause();
  audio.src = "";
  audio.style.display = "none";
}
function cerrarMusica() {
  document.getElementById('musica-modal').classList.remove('active');
  const audio = document.getElementById('audio-player');
  audio.pause();
  audio.src = "";
  audio.style.display = "none";
}
function mostrarListaCanciones() {
  const lista = document.getElementById('lista-canciones');
  lista.innerHTML = '';
  canciones.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.className = "cancion-list-btn";
    btn.innerHTML = `<span>🎵</span> ${c.nombre}`;
    btn.onclick = () => reproducirCancion(idx);
    lista.appendChild(btn);
  });
}
function reproducirCancion(idx) {
  cancionActual = idx;
  const audio = document.getElementById('audio-player');
  audio.src = canciones[idx].archivo;
  audio.style.display = "block";
  audio.play();
}

// --- Videos ---
const videos = [
  { archivo: "Media/Nuestro_mundo.mp4", nombre: "TE AMO" },
  { archivo: "Media/Video_juntos.mp4", nombre: "CORAZON" }
  // Agrega más videos aquí
];
let videoActual = -1;

function abrirVideos() {
  document.getElementById('videos-modal').classList.add('active');
  mostrarListaVideos();
  const vid = document.getElementById('video-player');
  vid.style.display = "none";
  vid.pause();
  vid.src = "";
}
function cerrarVideos() {
  document.getElementById('videos-modal').classList.remove('active');
  const vid = document.getElementById('video-player');
  vid.pause();
  vid.src = "";
  vid.style.display = "none";
}
function mostrarListaVideos() {
  const lista = document.getElementById('lista-videos');
  lista.innerHTML = '';
  videos.forEach((v, idx) => {
    const btn = document.createElement('button');
    btn.className = "video-list-btn";
    btn.innerHTML = `<span>🎬</span> ${v.nombre}`;
    btn.onclick = () => reproducirVideo(idx);
    lista.appendChild(btn);
  });
}
function reproducirVideo(idx) {
  videoActual = idx;
  const vid = document.getElementById('video-player');
  vid.src = videos[idx].archivo;
  vid.style.display = "block";
  vid.play();
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
  imagenesGaleria.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = "galeria-img-romantica";
    div.innerHTML = `<img src="${src}" alt="Recuerdo" /> <div class="corazon">💖</div>`;
    div.onclick = (ev) => {
      ev.stopPropagation();
      explosionEmojis(ev, div);
      setTimeout(() => abrirImgModal(src), 150);
    };
    cont.appendChild(div);
  });
}
function cerrarGaleria() {
  document.getElementById('galeria-modal').classList.remove('active');
}

// --- Imagen emergente romántica ---
function abrirImgModal(src) {
  const modal = document.getElementById('img-modal');
  document.getElementById('img-modal-src').src = src;
  modal.classList.add('active');
}
function cerrarImgModal() {
  document.getElementById('img-modal').classList.remove('active');
  document.getElementById('img-modal-src').src = "";
}

// --- Explosión de emojis ---
function explosionEmojis(ev, parentDiv) {
  const explosion = document.getElementById('explosion-emojis');
  explosion.innerHTML = '';
  const rect = parentDiv.getBoundingClientRect();
  for (let i=0; i<14; ++i) {
    const em = document.createElement('span');
    em.textContent = (i % 2 === 0) ? '💖' : '❤️‍🔥';
    em.className = 'explosion-emoji';
    // posición aleatoria dentro del div
    em.style.left = (rect.left + rect.width/2 + (Math.random()-0.5)*70) + 'px';
    em.style.top = (rect.top + rect.height/2 + (Math.random()-0.5)*30 + window.scrollY) + 'px';
    em.style.setProperty('--tx', ((Math.random()-0.5)*190)+'px');
    em.style.setProperty('--ty', ((Math.random()-0.5)*170)+'px');
    explosion.appendChild(em);
  }
  explosion.style.display = "block";
  setTimeout(() => { explosion.innerHTML = ''; explosion.style.display = "none"; }, 600);
}

// --- Animación de avión y platillo ---
function animarAvionPlatillo() {
  const avion = document.getElementById('avion');
  const platillo = document.getElementById('platillo');
  avion.style.display = 'block';
  platillo.style.display = 'block';
  setTimeout(() => {
    avion.classList.add('avion-fly');
    platillo.classList.add('platillo-fly');
  }, 10);
  setTimeout(() => {
    avion.style.display = platillo.style.display = 'none';
    avion.classList.remove('avion-fly');
    platillo.classList.remove('platillo-fly');
  }, 700);
}

// Cierra modales con Escape o click fuera de la imagen
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarMusica();
    cerrarGaleria();
    cerrarImgModal();
    cerrarVideos();
  }
});
document.getElementById('img-modal').onclick = cerrarImgModal;
