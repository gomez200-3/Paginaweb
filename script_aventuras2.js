// --- Tabs dinámicas ---
function toggleTab(tab) {
  document.querySelectorAll('.tab-section').forEach(sec => sec.style.display = 'none');
  if(tab==="videos"){ cerrarMusica(); cerrarAlbum(); abrirVideos();}
  if(tab==="musica"){ cerrarVideos(); cerrarAlbum(); abrirMusica();}
  if(tab==="album"){ cerrarVideos(); cerrarMusica(); abrirAlbum();}
}
function cerrarMusica(){document.getElementById('musica-content').style.display='none';}
function cerrarVideos(){document.getElementById('videos-content').style.display='none';}
function cerrarAlbum(){document.getElementById('album-content').style.display='none';}
function abrirMusica(){document.getElementById('musica-content').style.display='block';}
function abrirVideos(){document.getElementById('videos-content').style.display='block';}
function abrirAlbum(){document.getElementById('album-content').style.display='block';}

// --- Lista de canciones y reproductor ---
const canciones = [
{ archivo: "Media/Afaz Natural - Deseo Saber (Video Oficial)(M4A_128K).m4a", nombre: "cada vez siento" },
  { archivo: "Media/Alok - Alive (It Feels Like) [Official Visualizer](M4A_128K).m4a", nombre: "que te amo mucho" },
  { archivo: "Media/Billie Eilish - ilomilo (Official Audio)(M4A_128K).m4a", nombre: "mas de lo que te imaginas" },
  { archivo: "Media/DISHYPE_ OT-TO - AURA (Visualizer)(M4A_128K).m4a", nombre: "somos tu y yo" },
  { archivo: "Media/Don Omar - Dutty Love (Lyric Video) ft. Natti Natasha(M4A_128K).m4a", nombre: "nuestra historiaes una locura" },
  { archivo: "Media/Shawn Mendes - There_s Nothing Holdin_ Me Back _ Traducida al Español(M4A_128K).m4a", nombre: "Te extraño" },
{ archivo: "Media/Wolverave - Vielleicht Vielleicht (Hardtekk Edit)(M4A_128K).m4a", nombre: "TE AMO" },
 ];
let cancionActual = 0;
function renderListaCanciones() {
  const lista = document.getElementById('lista-canciones');
  lista.innerHTML = '';
  canciones.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.className = "cancion-list-btn";
    btn.innerHTML = `<span>🎵</span> ${c.nombre}`;
    btn.onclick = () => { reproducirCancion(idx); };
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
document.getElementById('prev-song').onclick = function(e){
  animExplosion(this,["💔"]);
  cancionActual = (cancionActual-1+canciones.length)%canciones.length;
  reproducirCancion(cancionActual);
};
document.getElementById('play-song').onclick = function(e){
  animExplosion(this,["❤️‍🩹"]);
  const audio = document.getElementById('audio-player');
  if(audio.src){ audio.paused?audio.play():audio.pause();}
};
document.getElementById('next-song').onclick = function(e){
  animExplosion(this,["💕","💞"]);
  cancionActual = (cancionActual+1)%canciones.length;
  reproducirCancion(cancionActual);
};

// --- Lista de videos y reproductor ---
const videos = [
   { archivo: "Media/Nuestro_mundo.mp4", nombre: "TE AMO" },
  { archivo: "Media/Video_juntos.mp4", nombre: "CORAZON" }
];
let videoActual = 0;
function renderListaVideos() {
  const lista = document.getElementById('lista-videos');
  lista.innerHTML = '';
  videos.forEach((v, idx) => {
    const btn = document.createElement('button');
    btn.className = "video-list-btn";
    btn.innerHTML = `<span>🎬</span> ${v.nombre}`;
    btn.onclick = () => { reproducirVideo(idx); };
    lista.appendChild(btn);
  });
}
function reproducirVideo(idx) {
  videoActual = idx;
  const vid = document.getElementById('video-player');
  vid.src = videos[idx].archivo;
  vid.style.display = "block";
  vid.play();
  animExplosion(document.getElementById('video-player'),["💔","❤️‍🩹","💕"]);
}

// --- Álbum de pasatiempos (galería cargable) ---
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
];
let imagenesUsuario = [];
function renderGaleria() {
  const cont = document.getElementById('galeria-imgs');
  cont.innerHTML = '';
  [...imagenesGaleria, ...imagenesUsuario].forEach(src => {
    const div = document.createElement('div');
    div.className = "galeria-img-romantica";
    div.innerHTML = `<img src="${src}" alt="Recuerdo" /> <div class="corazon">💖</div>`;
    div.onclick = () => {
      animExplosion(div,["💖","❤️‍🔥"]);
      setTimeout(() => abrirImgModal(src), 180);
    };
    cont.appendChild(div);
  });
}
document.getElementById('album-upload').onchange = function(e){
  const files = Array.from(e.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(event){
      imagenesUsuario.push(event.target.result);
      renderGaleria();
    };
    reader.readAsDataURL(file);
  });
};

// --- Modal imagen grande ---
function abrirImgModal(src) {
  const modal = document.getElementById('img-modal');
  document.getElementById('img-modal-src').src = src;
  modal.classList.add('active');
}
function cerrarImgModal() {
  document.getElementById('img-modal').classList.remove('active');
  document.getElementById('img-modal-src').src = "";
}

// --- Animación de avión y platillo ---
function animarAvionPlatillo() {
  const avion = document.getElementById('avion');
  const platillo = document.getElementById('platillo');
  avion.style.display = 'block';
  platillo.style.display = 'block';
  setTimeout(() => {
    avion.classList.add('avion-fly');
    setTimeout(() => platillo.classList.add('platillo-fly'), 300);
  }, 10);
  setTimeout(() => {
    avion.style.display = platillo.style.display = 'none';
    avion.classList.remove('avion-fly');
    platillo.classList.remove('platillo-fly');
  }, 1200);
}

// --- Explosión de emojis animada ---
function animExplosion(target,emojis=["💖","💞"],duration=700){
  const explosion = document.getElementById('explosion-emojis');
  const rect = target.getBoundingClientRect();
  explosion.innerHTML = '';
  for (let i=0; i<14; ++i) {
    const em = document.createElement('span');
    em.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    em.className = 'explosion-emoji';
    em.style.left = (rect.left + rect.width/2 + (Math.random()-0.5)*60) + 'px';
    em.style.top = (rect.top + rect.height/2 + (Math.random()-0.5)*30 + window.scrollY) + 'px';
    em.style.setProperty('--tx', ((Math.random()-0.5)*180)+'px');
    em.style.setProperty('--ty', ((Math.random()-0.5)*110)+'px');
    explosion.appendChild(em);
  }
  explosion.style.display = "block";
  setTimeout(() => { explosion.innerHTML = ''; explosion.style.display = "none"; }, duration);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  renderListaCanciones();
  renderListaVideos();
  renderGaleria();

