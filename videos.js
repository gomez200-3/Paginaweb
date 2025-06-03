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
    item.className = 'nota-item';
    item.innerHTML = `
      <span style="font-weight:bold; color:#e53935; cursor:pointer; display:flex; align-items:center;" data-idx="${idx}">🎬 ${video.name}</span>
      <button class="borrar-nota" data-idx="${idx}">Borrar</button>
    `;
    videoList.appendChild(item);
  });
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
  if (e.target.dataset.idx !== undefined) {
    currentVideoIdx = parseInt(e.target.dataset.idx);
    openVideoModal(currentVideoIdx);
  }
  if (e.target.classList.contains('borrar-nota')) {
    const idx = parseInt(e.target.dataset.idx);
    let videos = getVideos();
    videos.splice(idx, 1);
    saveVideos(videos);
    renderVideoList();
  }
});

function openVideoModal(idx) {
  const videos = getVideos();
  if (!videos[idx]) return;
  document.getElementById('video-title').textContent = videos[idx].name;
  const videoPlayer = document.getElementById('video-player');
  videoPlayer.src = videos[idx].data;
  videoPlayer.currentTime = 0;
  videoPlayer.style.display = "block";
  videoPlayer.load();
  document.getElementById('modal-video-player').classList.remove('modal-hidden');
}

function closeVideoModal() {
  document.getElementById('modal-video-player').classList.add('modal-hidden');
  const videoPlayer = document.getElementById('video-player');
  videoPlayer.pause();
  videoPlayer.style.display = "none";
}

document.getElementById('close-video-modal').onclick = closeVideoModal;

function changeVideo(delta) {
  const videos = getVideos();
  if (videos.length === 0) return;
  currentVideoIdx = (currentVideoIdx + delta + videos.length) % videos.length;
  openVideoModal(currentVideoIdx);
  playVideo();
}
function playVideo() {
  const videoPlayer = document.getElementById('video-player');
  videoPlayer.play();
}
function pauseVideo() {
  const videoPlayer = document.getElementById('video-player');
  videoPlayer.pause();
}

let isVideoPlaying = false;
document.getElementById('prev-video').onclick = () => changeVideo(-1);
document.getElementById('next-video').onclick = () => changeVideo(1);
document.getElementById('playpause-video').onclick = function() {
  const videoPlayer = document.getElementById('video-player');
  if (videoPlayer.paused) {
    playVideo();
    isVideoPlaying = true;
  } else {
    pauseVideo();
    isVideoPlaying = false;
  }
};
document.getElementById('video-player').addEventListener('play', function() {
  isVideoPlaying = true;
});
document.getElementById('video-player').addEventListener('pause', function() {
  isVideoPlaying = false;
});
document.getElementById('video-player').addEventListener('ended', function() {
  changeVideo(1);
});

document.getElementById('volver-aventuras').onclick = function() {
  window.location = "aventuras.html";
};

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-video-player').classList.add('modal-hidden');
  renderVideoList();
});
