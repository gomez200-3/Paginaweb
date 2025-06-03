// Explosión de emojis (misma función para coherencia visual)
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

// Navegación básica romántica
document.getElementById('volver-inicio').onclick = function () {
  explosionEmojis(['💖','💞','❤️','🌷','💌','💋','💘','😍','🥰','💕']);
  setTimeout(() => { window.location = "index.html"; }, 900);
};
document.getElementById('volver-aventuras').onclick = function () {
  explosionEmojis(['💖','💞','❤️','🌷','💌','💋','💘','😍','🥰','💕']);
  setTimeout(() => { window.location = "aventuras.html"; }, 900);
};

// --- SECCIÓN MÚSICA ---
const musicEmojis = ['🎶','💞','💖','💕','🎹','🎧','🎷'];
let canciones = JSON.parse(localStorage.getItem('canciones') || '[]');
function mostrarMusica() {
  explosionEmojis(musicEmojis, 1000);
  limpiarSecciones();
  const sec = document.getElementById('seccion-musica');
  sec.innerHTML = `
    <div class="galeria-titulo">🎵 Nuestra música especial</div>
    <div id="lista-canciones" class="lista-canciones"></div>
    <div class="add-file-control">
      <label class="add-file-label" for="add-music">➕ Agregar Canción</label>
      <input id="add-music" type="file" accept="audio/*" style="display:none;">
    </div>
    <audio id="audio-player" controls style="width:100%;margin-top:10px;display:none;border-radius:10px;box-shadow:0 2px 16px #0003"></audio>
    <div class="music-controls" style="margin-top:12px;">
      <button id="prev-song" class="music-btn"><span>💔</span></button>
      <button id="play-song" class="music-btn"><span>❤️</span></button>
      <button id="next-song" class="music-btn"><span>💕</span></button>
    </div>
  `;
  const lista = document.getElementById('lista-canciones');
  canciones.forEach((c, idx) => {
    const btn = document.createElement('button');
    btn.className = "cancion-list-btn";
    btn.innerHTML = `<span>🎵</span> ${c.nombre}`;
    btn.onclick = () => reproducirCancion(idx);
    lista.appendChild(btn);
  });
  document.getElementById('add-music').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(evt){
        canciones.push({archivo: evt.target.result, nombre: file.name.replace(/\.[^/.]+$/, "")});
        localStorage.setItem('canciones', JSON.stringify(canciones));
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
    explosionEmojis(['💖','💘','💋','💕'], 700);
    if(audio.paused) audio.play(); else audio.pause();
  };
  nextBtn.onclick = () => {
    explosionEmojis(['💕','💞'], 550);
    actual = (actual+1)%canciones.length;
    reproducirCancion(actual);
  };
}

// --- SECCIÓN VIDEO ---
const videoEmojis = ['🎬','💕','💖','🍿','📹','❤️‍🔥'];
let videos = JSON.parse(localStorage.getItem('videos') || '[]');
function mostrarVideos() {
  explosionEmojis(videoEmojis, 1000);
  limpiarSecciones();
  const sec = document.getElementById('seccion-video');
  sec.innerHTML = `
    <div class="galeria-titulo">🎬 Nuestros Videos Juntos</div>
    <div id="lista-videos" class="lista-videos"></div>
    <div class="add-file-control">
      <label class="add-file-label" for="add-video">➕ Agregar Video</label>
      <input id="add-video" type="file" accept="video/*" style="display:none;">
    </div>
    <video id="video-player" controls style="width:100%;margin-top:10px;display:none;border-radius:10px;box-shadow:0 2px 16px #0003"></video>
    <div class="video-controls" style="margin-top:12px;">
      <button id="prev-video" class="music-btn"><span>💔</span></button>
      <button id="play-video" class="music-btn"><span>❤️</span></button>
      <button id="next-video" class="music-btn"><span>💕</span></button>
    </div>
  `;
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
  document.getElementById('add-video').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(evt){
        videos.push({archivo: evt.target.result, nombre: file.name.replace(/\.[^/.]+$/, "")});
        localStorage.setItem('videos', JSON.stringify(videos));
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
    explosionEmojis(['💖','💘','💋','💕'], 700);
    if(vid.paused) vid.play(); else vid.pause();
  };
  document.getElementById('next-video').onclick = () => {
    explosionEmojis(['💕','💞'], 550);
    actual = (actual+1)%videos.length;
    reproducirVideo(actual);
  };
}

// --- SECCIÓN GALERÍA ---
const galeriaEmojis = ['💖','❤️‍🔥','🥰','✨','🌷','🖼️','💕'];
let imagenesGaleria = JSON.parse(localStorage.getItem('imagenesGaleria') || '[]');
function mostrarGaleria() {
  explosionEmojis(galeriaEmojis, 1000);
  limpiarSecciones();
  const sec = document.getElementById('seccion-galeria');
  sec.innerHTML = `
    <div class="galeria-titulo">🌹 Nuestro Álbum de Pasatiempos 🌹</div>
    <div id="galeria-imgs" class="galeria-imgs"></div>
    <div class="add-file-control">
      <label class="add-file-label" for="add-file">➕ Agregar Archivo</label>
      <input id="add-file" type="file" accept="image/*" style="display:none;">
    </div>
  `;
  const cont = document.getElementById('galeria-imgs');
  imagenesGaleria.forEach((src, i) => {
    const div = document.createElement('div');
    div.className = "galeria-img-romantica";
    div.innerHTML = `<img src="${src}" alt="Recuerdo" /> <div class="corazon">💖</div>`;
    div.onclick = (ev) => {
      ev.stopPropagation();
      explosionEmojis(['💖','❤️‍🔥'], 700);
      setTimeout(() => abrirImgModal(src), 200);
    };
    cont.appendChild(div);
  });
  document.getElementById('add-file').addEventListener('change', function(e){
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(evt){
        imagenesGaleria.push(evt.target.result);
        localStorage.setItem('imagenesGaleria', JSON.stringify(imagenesGaleria));
        mostrarGaleria();
      };
      reader.readAsDataURL(file);
    }
  });
}

// Modal bonito para imagen ampliada
function abrirImgModal(src) {
  if (!src) return; // <-- CORRECCIÓN: No abrir modal si no hay imagen
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

// --- SECCIÓN NOTAS ---
const notasEmojis = ['📝','💌','💖','✨','💕'];
function mostrarNotas() {
  explosionEmojis(notasEmojis, 1000);
  limpiarSecciones();
  const sec = document.getElementById('seccion-notas');
  sec.innerHTML = `
    <div class="galeria-titulo">📝 Blog de Notas</div>
    <div class="notas-controls">
      <textarea id="notas-textarea" rows="4" placeholder="Escribe una nota romántica..." style="width:98%;border-radius:8px;font-size:1.13em;"></textarea>
      <button id="guardar-nota" class="music-btn" style="margin-top:10px;background:#80d0ff;">💾 Guardar</button>
    </div>
    <div id="notas-list" style="margin-top:18px;max-height:170px;overflow:auto;"></div>
  `;
  cargarNotas();
  document.getElementById('guardar-nota').onclick = guardarNota;
}
function cargarNotas() {
  let arr = JSON.parse(localStorage.getItem('notas')||'[]');
  const list = document.getElementById('notas-list');
  list.innerHTML = '';
  arr.forEach((nota, idx) => {
    const div = document.createElement('div');
    div.className = "nota-item";
    div.innerHTML = `<span>${nota}</span> <button class="borrar-nota" data-idx="${idx}">❌</button>`;
    list.appendChild(div);
  });
  document.querySelectorAll('.borrar-nota').forEach(btn => {
    btn.onclick = function() {
      let arr = JSON.parse(localStorage.getItem('notas')||'[]');
      arr.splice(btn.getAttribute('data-idx'),1);
      localStorage.setItem('notas', JSON.stringify(arr));
      cargarNotas();
    }
  });
}
function guardarNota() {
  let arr = JSON.parse(localStorage.getItem('notas')||'[]');
  const val = document.getElementById('notas-textarea').value.trim();
  if(val) arr.push(val);
  localStorage.setItem('notas', JSON.stringify(arr));
  document.getElementById('notas-textarea').value = '';
  cargarNotas();
}

// Limpiar todas las secciones antes de mostrar una nueva
function limpiarSecciones() {
  document.getElementById('seccion-musica').innerHTML = '';
  document.getElementById('seccion-video').innerHTML = '';
  document.getElementById('seccion-galeria').innerHTML = '';
  document.getElementById('seccion-notas').innerHTML = '';
}

// Botones para abrir cada sección
document.getElementById('btn-musica').onclick = mostrarMusica;
document.getElementById('btn-video').onclick = mostrarVideos;
document.getElementById('btn-galeria').onclick = mostrarGaleria;
document.getElementById('btn-notas').onclick = mostrarNotas;
