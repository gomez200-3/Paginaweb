// Guardar videos en localStorage para persistencia
function getVideos() {
  return JSON.parse(localStorage.getItem('videos') || '[]');
}

function saveVideos(videos) {
  localStorage.setItem('videos', JSON.stringify(videos));
}

// Mostrar la lista de videos
function renderVideoList() {
  const videoList = document.getElementById('video-list');
  videoList.innerHTML = '';
  const videos = getVideos();
  if (videos.length === 0) {
    videoList.innerHTML = '<p style="color:#fff;font-style:italic;">No has subido ningún video aún.</p>';
    return;
  }
  videos.forEach((video, idx) => {
    const item = document.createElement('div');
    item.className = 'nota-item';
    item.innerHTML = `
      <span style="font-weight:bold; color:#2196f3; cursor:pointer;" data-idx="${idx}">🎬 ${video.name}</span>
      <button class="borrar-nota" data-idx="${idx}">Borrar</button>
    `;
    videoList.appendChild(item);
  });
}

// Evento para subir videos
document.getElementById('video-input').addEventListener('change', function(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  let videos = getVideos();
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      videos.push({
        name: file.name,
        data: evt.target.result
      });
      saveVideos(videos);
      renderVideoList();
    };
    reader.readAsDataURL(file);
  });
  // Reset input
  e.target.value = "";
});

// Evento para reproducir video en modal
document.getElementById('video-list').addEventListener('click', function(e) {
  if (e.target.dataset.idx !== undefined) {
    const idx = parseInt(e.target.dataset.idx);
    const videos = getVideos();
    const video = videos[idx];
    if (video) {
      document.getElementById('video-title').textContent = video.name;
      const videoPlayer = document.getElementById('video-player');
      videoPlayer.src = video.data;
      videoPlayer.currentTime = 0;
      document.getElementById('modal-video-player').classList.remove('modal-hidden');
      videoPlayer.play();
    }
  }
  // Borrar video
  if (e.target.classList.contains('borrar-nota')) {
    const idx = parseInt(e.target.dataset.idx);
    let videos = getVideos();
    videos.splice(idx, 1);
    saveVideos(videos);
    renderVideoList();
  }
});

// Cerrar modal
document.getElementById('close-video-modal').onclick = () => {
  document.getElementById('modal-video-player').classList.add('modal-hidden');
  document.getElementById('video-player').pause();
  document.getElementById('video-player').src = '';
};

// Volver al menú
document.getElementById('volver-aventuras').onclick = function() {
  window.location = "aventuras.html";
};

// Al cargar, mostrar la lista
window.addEventListener('DOMContentLoaded', renderVideoList);
