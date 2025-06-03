// Guardar canciones en localStorage para que permanezcan luego de recargar
function getMusics() {
  return JSON.parse(localStorage.getItem('musics') || '[]');
}

function saveMusics(musics) {
  localStorage.setItem('musics', JSON.stringify(musics));
}

// Mostrar la lista de canciones
function renderMusicList() {
  const musicList = document.getElementById('music-list');
  musicList.innerHTML = '';
  const musics = getMusics();
  if (musics.length === 0) {
    musicList.innerHTML = '<p style="color:#fff;font-style:italic;">No has subido ninguna canción aún.</p>';
    return;
  }
  musics.forEach((music, idx) => {
    const item = document.createElement('div');
    item.className = 'nota-item';
    item.innerHTML = `
      <span style="font-weight:bold; color:#2196f3; cursor:pointer;" data-idx="${idx}">🎵 ${music.name}</span>
      <button class="borrar-nota" data-idx="${idx}">Borrar</button>
    `;
    musicList.appendChild(item);
  });
}

// Evento para subir canciones
document.getElementById('music-input').addEventListener('change', function(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  let musics = getMusics();
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      musics.push({
        name: file.name,
        data: evt.target.result
      });
      saveMusics(musics);
      renderMusicList();
    };
    reader.readAsDataURL(file);
  });
  // Reset input
  e.target.value = "";
});

// Evento para reproducir una canción en modal
document.getElementById('music-list').addEventListener('click', function(e) {
  if (e.target.dataset.idx !== undefined) {
    const idx = parseInt(e.target.dataset.idx);
    const musics = getMusics();
    const music = musics[idx];
    if (music) {
      document.getElementById('music-title').textContent = music.name;
      const audioPlayer = document.getElementById('audio-player');
      audioPlayer.src = music.data;
      document.getElementById('modal-music-player').classList.remove('modal-hidden');
      audioPlayer.play();
    }
  }
  // Borrar
  if (e.target.classList.contains('borrar-nota')) {
    const idx = parseInt(e.target.dataset.idx);
    let musics = getMusics();
    musics.splice(idx, 1);
    saveMusics(musics);
    renderMusicList();
  }
});

// Cerrar modal de música
document.getElementById('close-music-modal').onclick = () => {
  document.getElementById('modal-music-player').classList.add('modal-hidden');
  document.getElementById('audio-player').pause();
};

// Volver al menú
document.getElementById('volver-aventuras').onclick = function() {
  window.location = "aventuras.html";
};

// Al cargar, mostrar la lista y asegurar modal oculto
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-music-player').classList.add('modal-hidden');
  renderMusicList();
});
