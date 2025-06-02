// --- Contenido dinámico de NUESTRAS AVENTURAS ---
const contenido = document.getElementById('contenido-futurista');
const videosBtn = document.getElementById('videos-btn');
const musicaBtn = document.getElementById('musica-btn');
const albumBtn = document.getElementById('album-btn');
const volverBtn = document.querySelector('.volver-btn');
const explosion = document.getElementById('explosion-emojis');

const canciones = [
  { archivo: "Media/Afaz Natural - Deseo Saber (Video Oficial)(M4A_128K).m4a", nombre: "cada vez siento" },
  { archivo: "Media/Alok - Alive (It Feels Like) [Official Visualizer](M4A_128K).m4a", nombre: "que te amo mucho" },
  { archivo: "Media/Billie Eilish - ilomilo (Official Audio)(M4A_128K).m4a", nombre: "mas de lo que te imaginas" },
  { archivo: "Media/DISHYPE_ OT-TO - AURA (Visualizer)(M4A_128K).m4a", nombre: "somos tu y yo" },
  { archivo: "Media/Don Omar - Dutty Love (Lyric Video) ft. Natti Natasha(M4A_128K).m4a", nombre: "nuestra historiaes una locura" },
  { archivo: "Media/Shawn Mendes - There_s Nothing Holdin_ Me Back _ Traducida al Español(M4A_128K).m4a", nombre: "Te extraño" },
{ archivo: "Media/Wolverave - Vielleicht Vielleicht (Hardtekk Edit)(M4A_128K).m4a", nombre: "TE AMO" },
 
];
const videos = [
    { archivo: "Media/Nuestro_mundo.mp4", nombre: "TE AMO" },
  { archivo: "Media/Video_juntos.mp4", nombre: "CORAZON" }
];
let imagenesGaleria = [
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

// Explosión emojis
function explosionEmojis(emojis, duration=700) {
  explosion.innerHTML = '';
  for (let i=0; i<22; ++i) {
    const em = document.createElement('span');
    em.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    em.className = 'explosion-emoji';
    em.style.left = (window.innerWidth/2 + (Math.random()-0.5)*160) + 'px';
    em.style.top = (window.innerHeight/2 + (Math.random()-0.5)*120 + window.scrollY) + 'px';
    em.style.setProperty('--tx', ((Math.random()-0.5)*330)+'px');
    em.style.setProperty('--ty', ((Math.random()-0.5)*220)+'px');
    explosion.appendChild(em);
  }
  explosion.style.display = "block";
  setTimeout(() => { explosion.innerHTML = ''; explosion.style.display = "none"; }, duration);
}

// Navegación con animaciones
volverBtn.addEventListener('click', function(e){
  e.preventDefault();
  explosionEmojis(['🥺','🐿','💞'], 600);
  setTimeout(() => { window.location = "index.html"; }, 600);
});
videosBtn.addEventListener('click', () => { mostrarVideos(); });
musicaBtn.addEventListener('click', () => { mostrarMusica(); });
albumBtn.addEventListener('click', () => {
  animarAvionPlatillo();
  setTimeout(() => mostrarGaleria(), 800);
});

// Animación avión y platillo
function animarAvionPlatillo() {
  const avion = document.getElementById('avion');
  const platillo = document.getElementById('platillo');
  avion.style.display = 'block';
  setTimeout(() => {
    avion.classList.add('avion-fly');
    setTimeout(() => { platillo.style.display = 'block'; platillo.classList.add('platillo-fly'); }, 300);
  }, 10);
  setTimeout(() => {
    avion.style.display = platillo.style.display = 'none';
    avion.classList.remove('avion-fly');
    platillo.classList.remove('platillo-fly');
  }, 1200);
}

// MUSICA
function mostrarMusica() {
  contenido.innerHTML = `
    <div class="galeria-titulo">🎵 Nuestra música especial</div>
    <div id="lista-canciones" class="lista-canciones"></div>
    <audio id="audio-player" controls style="width:100%;margin-top:10px;display:none;"></audio>
    <div class="music-controls">
      <button id="prev-song" class="music-btn">💔</button>
      <button id="play-song" class="music-btn">❤️‍🩹</button>
      <button id="next-song" class="music-btn">💕</button>
    </div>
  `;
  cerrarOtros('musica');
  const lista = document.getElementById('lista-canciones');
  canciones.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.className = "cancion-list-btn";
    btn.innerHTML = `<span>🎵</span> ${c.nombre}`;
    btn.onclick = () => reproducirCancion(idx);
    lista.appendChild(btn);
  });

  let actual = 0;
  const audio = document.getElementById('audio-player');
  const prevBtn = document.getElementById('prev-song');
  const playBtn = document.getElementById('play-song');
  const nextBtn = document.getElementById('next-song');
  function reproducirCancion(idx) {
    actual = idx;
    audio.src = canciones[idx].archivo;
    audio.style.display = "block";
    audio.play();
  }
  prevBtn.onclick = () => {
    explosionEmojis(['💔'],550);
    actual = (actual-1+canciones.length)%canciones.length;
    reproducirCancion(actual);
  };
  playBtn.onclick = () => {
    explosionEmojis(['❤️‍🩹','💘','💋','💖','💕','💞'], 700);
    if(audio.paused) audio.play(); else audio.pause();
  };
  nextBtn.onclick = () => {
    explosionEmojis(['💕','💞'], 550);
    actual = (actual+1)%canciones.length;
    reproducirCancion(actual);
  };
}

// VIDEOS
function mostrarVideos() {
  contenido.innerHTML = `
    <div class="galeria-titulo">🎬 Nuestros Videos Juntos</div>
    <div id="lista-videos" class="lista-videos"></div>
    <video id="video-player" controls style="width:100%;margin-top:10px;display:none;border-radius:10px;box-shadow:0 2px 16px #0003"></video>
    <div class="video-controls">
      <button id="prev-video" class="music-btn">💔</button>
      <button id="play-video" class="music-btn">❤️‍🩹</button>
      <button id="next-video" class="music-btn">💕</button>
    </div>
  `;
  cerrarOtros('videos');
  const lista = document.getElementById('lista-videos');
  const vid = document.getElementById('video-player');
  let actual = 0;
  videos.forEach((v, idx) => {
    const btn = document.createElement('button');
    btn.className = "video-list-btn";
    btn.innerHTML = `<span>🎬</span> ${v.nombre}`;
    btn.onclick = () => reproducirVideo(idx);
    lista.appendChild(btn);
  });
  function reproducirVideo(idx) {
    actual = idx;
    vid.src = videos[idx].archivo;
    vid.style.display = "block";
    vid.play();
  }
  document.getElementById('prev-video').onclick = () => {
    explosionEmojis(['💔'],550);
    actual = (actual-1+videos.length)%videos.length;
    reproducirVideo(actual);
  };
  document.getElementById('play-video').onclick = () => {
    explosionEmojis(['❤️‍🩹','💘','💋','💖','💕','💞'], 700);
    if(vid.paused) vid.play(); else vid.pause();
  };
  document.getElementById('next-video').onclick = () => {
    explosionEmojis(['💕','💞'], 550);
    actual = (actual+1)%videos.length;
    reproducirVideo(actual);
  };
}

// GALERIA con subida de archivos
function mostrarGaleria() {
  contenido.innerHTML = `
    <div class="galeria-titulo">🌹 Nuestro Álbum de Pasatiempos 🌹</div>
    <div id="galeria-imgs" class="galeria-imgs"></div>
  `;
  cerrarOtros('album');
  const cont = document.getElementById('galeria-imgs');
  imagenesGaleria.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = "galeria-img-romantica";
    div.innerHTML = `<img src="${src}" alt="Recuerdo" /> <div class="corazon">💖</div>`;
    div.onclick = (ev) => {
      ev.stopPropagation();
      explosionEmojis(['💖','❤️‍🔥'], 600);
      setTimeout(() => abrirImgModal(src), 150);
    };
    cont.appendChild(div);
  });
  // Botón agregar archivo
  const agregar = document.createElement('div');
  agregar.className = "galeria-img-agregar";
  agregar.innerHTML = `<label class="galeria-img-agregar-label" for="add-file">➕ Agregar Archivo</label><input id="add-file" type="file" accept="image/*"/>`;
  agregar.querySelector('input').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(evt){
        imagenesGaleria.push(evt.target.result);
        mostrarGaleria();
      };
      reader.readAsDataURL(file);
    }
  });
  cont.appendChild(agregar);
}

// Cerrar otros contenidos
function cerrarOtros(abre) {
  // El contenido dinámico borra lo anterior, así que nada que hacer aquí
}

// MODAL imagen
function abrirImgModal(src) {
  let modal = document.getElementById('img-modal');
  if(!modal){
    modal = document.createElement('div');
    modal.id = "img-modal";
    modal.className = "modal-bg";
    modal.innerHTML = `<div class="img-modal-inner"><span onclick="cerrarImgModal()" class="modal-close">&times;</span><img id="img-modal-src" src="" alt="Recuerdo" /></div>`;
    document.body.appendChild(modal);
    modal.onclick = cerrarImgModal;
  }
  document.getElementById('img-modal-src').src = src;
  modal.classList.add('active');
}
function cerrarImgModal() {
  let modal = document.getElementById('img-modal');
  if(modal){
    modal.classList.remove('active');
    document.getElementById('img-modal-src').src = "";
  }
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarImgModal();
});
