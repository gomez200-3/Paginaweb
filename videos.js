function getVideos() {
  return JSON.parse(localStorage.getItem('videos') || '[]');
}
function saveVideos(videos) {
  localStorage.setItem('videos', JSON.stringify(videos));
}

let currentVideoIdx = 0;

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
    item.className = 'video-item';
    item.dataset.idx = idx;

    const videoEl = document.createElement('video');
    videoEl.src = video.data;
    videoEl.className = 'video-thumb';
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.preload = "metadata";
    videoEl.style.background = "#222";
    item.appendChild(videoEl);

    const iconPlay = document.createElement('span');
    iconPlay.className = 'icon-play';
    iconPlay.innerHTML = '▶️';
    item.appendChild(iconPlay);

    const dur = document.createElement('span');
    dur.className = 'video-duration';
    dur.innerHTML = '...';
    item.appendChild(dur);

    const btnBorrar = document.createElement('button');
    btnBorrar.className = 'btn-borrar';
    btnBorrar.title = 'Borrar video';
    btnBorrar.innerHTML = '🗑';
    btnBorrar.onclick = (ev) => {
      ev.stopPropagation();
      if (confirm('¿Seguro que quieres borrar este video?')) {
        let videos = getVideos();
        videos.splice(idx, 1);
        saveVideos(videos);
        renderVideoList();
      }
    };
    item.appendChild(btnBorrar);

    videoEl.onloadedmetadata = () => {
      const d = Math.floor(videoEl.duration);
      dur.textContent = formatDuration(d);
    };

    videoList.appendChild(item);
  });
}

function formatDuration(segundos) {
  const min = Math.floor(segundos / 60);
  const sec = segundos % 60;
  if (min > 0) return `${min}:${sec.toString().padStart(2, '0')}`;
  return `0:${sec.toString().padStart(2, '0')}`;
}

document.getElementById('video-input').addEventListener('change', function(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  let videos = getVideos();
  let filesToLoad = files.length;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      videos.push({
        name: file.name,
        data: evt.target.result
      });
      filesToLoad--;
      if (filesToLoad === 0) {
        saveVideos(videos);
        renderVideoList();
      }
    };
    reader.readAsDataURL(file);
  });
  e.target.value = "";
});

document.getElementById('video-list').addEventListener('click', function(e) {
  let item = e.target.closest('.video-item');
  if (item && item.dataset.idx !== undefined) {
    currentVideoIdx = parseInt(item.dataset.idx);
    openVideoModal(currentVideoIdx);
  }
});

function openVideoModal(idx) {
  const videos = getVideos();
  if (!videos[idx]) return;
  document.getElementById('video-title').textContent = videos[idx].name;
  const videoPlayer = document.getElementById('video-player');
  videoPlayer.src = videos[idx].data;
  videoPlayer.currentTime = 0;
  videoPlayer.play();
  document.getElementById('modal-video-player').classList.remove('modal-hidden');
}

function closeVideoModal() {
  document.getElementById('modal-video-player').classList.add('modal-hidden');
  document.getElementById('video-player').pause();
  document.getElementById('video-player').src = "";
}
document.getElementById('close-video-modal').onclick = closeVideoModal;
document.getElementById('volver-aventuras').onclick = function() {
  window.location = "aventuras.html";
};
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-video-player').classList.add('modal-hidden');
  renderVideoList();
});
