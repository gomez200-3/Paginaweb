// --- Contenido dinámico de NUESTRAS AVENTURAS ---
const contenido = document.getElementById('contenido-futurista');
const videosBtn = document.getElementById('videos-btn');
const musicaBtn = document.getElementById('musica-btn');
const albumBtn = document.getElementById('album-btn');
const volverBtn = document.querySelector('.volver-btn');
const explosion = document.getElementById('explosion-emojis');

// Inicializar arrays con datos por defecto o cargados
let canciones = JSON.parse(localStorage.getItem('canciones') || '[]');
if (canciones.length === 0) {
  canciones = [
    { archivo: "Media/Afaz Natural - Deseo Saber (Video Oficial)(M4A_128K).m4a", nombre: "cada vez siento" },
  { archivo: "Media/Alok - Alive (It Feels Like) [Official Visualizer](M4A_128K).m4a", nombre: "que te amo mucho" },
  { archivo: "Media/Billie Eilish - ilomilo (Official Audio)(M4A_128K).m4a", nombre: "mas de lo que te imaginas" },
  { archivo: "Media/DISHYPE_ OT-TO - AURA (Visualizer)(M4A_128K).m4a", nombre: "somos tu y yo" },
  { archivo: "Media/Don Omar - Dutty Love (Lyric Video) ft. Natti Natasha(M4A_128K).m4a", nombre: "nuestra historiaes una locura" },
  { archivo: "Media/Shawn Mendes - There_s Nothing Holdin_ Me Back _ Traducida al Español(M4A_128K).m4a", nombre: "Te extraño" },
{ archivo: "Media/Wolverave - Vielleicht Vielleicht (Hardtekk Edit)(M4A_128K).m4a", nombre: "TE AMO" },
 ];
}
let videos = JSON.parse(localStorage.getItem('videos') || '[]');
if (videos.length === 0) {
  videos = [
  { archivo: "Media/Nuestro_mundo.mp4", nombre: "TE AMO" },
  { archivo: "Media/Video_juntos.mp4", nombre: "CORAZON" }
  ];
}
let imagenesGaleria = JSON.parse(localStorage.getItem('imagenesGaleria') || '[]');
if (imagenesGaleria.length === 0) {
  imagenesGaleria = [
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
}

function guardarEnLocal(key, arr) {
  localStorage.setItem(key, JSON.stringify(arr));
}

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
    <div class="add-file-control">
      <label class="add-file-label" for="add-music">➕ Agregar Canción</label>
      <input id="add-music" type="file" accept="audio/*" style="display:none;">
    </div>
    <audio id="audio-player" controls style="width:100%;margin-top:10px;display:none;"></audio>
    <div class="music-controls">
      <button id="prev-song" class="music-btn"><span>💔</span></button>
      <button id="play-song" class="music-btn"><span>❤️‍🩹</span></button>
      <button id="next-song" class="music-btn"><span>💕</span></button>
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

  // Agregar música
  document.getElementById('add-music').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(evt){
        canciones.push({archivo: evt.target.result, nombre: file.name.replace(/\.[^/.]+$/, "")});
        guardarEnLocal('canciones', canciones);
        mostrarMusica();
      };
      reader.readAsDataURL(file);
    }
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
    <div class="add-file-control">
      <label class="add-file-label" for="add-video">➕ Agregar Video</label>
      <input id="add-video" type="file" accept="video/*" style="display:none;">
    </div>
    <video id="video-player" controls style="width:100%;margin-top:10px;display:none;border-radius:10px;box-shadow:0 2px 16px #0003"></video>
    <div class="video-controls">
      <button id="prev-video" class="music-btn"><span>💔</span></button>
      <button id="play-video" class="music-btn"><span>❤️‍🩹</span></button>
      <button id="next-video" class="music-btn"><span>💕</span></button>
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

  // Agregar video
  document.getElementById('add-video').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(evt){
        videos.push({archivo: evt.target.result, nombre: file.name.replace(/\.[^/.]+$/, "")});
        guardarEnLocal('videos', videos);
        mostrarVideos();
      };
      reader.readAsDataURL(file);
    }
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
    <div class="add-file-control">
      <label class="add-file-label" for="add-file">➕ Agregar Archivo</label>
      <input id="add-file" type="file" accept="image/*" style="display:none;">
    </div>
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
  document.getElementById('add-file').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(evt){
        imagenesGaleria.push(evt.target.result);
        guardarEnLocal('imagenesGaleria', imagenesGaleria);
        mostrarGaleria();
      };
      reader.readAsDataURL(file);
    }
  });
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

// ----------- BLOG DE NOTAS ---------------
if (!document.getElementById('notas-btn')) {
  const notasBtn = document.createElement('button');
  notasBtn.id = "notas-btn";
  notasBtn.className = "futurista-btn notas-btn";
  notasBtn.innerHTML = "📝 Notas";
  document.querySelector('.futurista-btns').appendChild(notasBtn);
  notasBtn.onclick = function() {
    abrirNotasModal();
  };
}

function abrirNotasModal() {
  let modal = document.getElementById('notas-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = "notas-modal";
    modal.className = "modal-bg";
    modal.innerHTML =
      `<div class="modal-content modal-futurista">
        <span onclick="cerrarNotas()" class="modal-close">&times;</span>
        <h3 style="color:#ff80bf;margin-bottom:10px;">📝 Blog de Notas</h3>
        <textarea id="notas-textarea" rows="7" style="width:99%;border-radius:8px;font-size:1.1em;"></textarea>
        <button onclick="guardarNota()" class="music-btn" style="margin-top:10px;background:#80d0ff;">💾 Guardar</button>
        <div id="notas-list" style="margin-top:14px;max-height:190px;overflow:auto;"></div>
      </div>`;
    document.body.appendChild(modal);
  }
  modal.classList.add('active');
  mostrarNotas();
}
window.cerrarNotas = function() {
  document.getElementById('notas-modal').classList.remove('active');
};
window.guardarNota = function() {
  let arr = JSON.parse(localStorage.getItem('notas')||'[]');
  const val = document.getElementById('notas-textarea').value.trim();
  if(val) arr.push(val);
  localStorage.setItem('notas', JSON.stringify(arr));
  document.getElementById('notas-textarea').value = '';
  mostrarNotas();
};
function mostrarNotas() {
  let arr = JSON.parse(localStorage.getItem('notas')||'[]');
  document.getElementById('notas-list').innerHTML = arr.map(n=>`<div class="nota-item">${n}</div>`).join('');
  }
