function getMusics() {
  return JSON.parse(localStorage.getItem('musics') || '[]');
}
function saveMusics(musics) {
  localStorage.setItem('musics', JSON.stringify(musics));
}
let currentMusicIdx = 0;

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
      <span style="font-weight:bold; color:#e53935; cursor:pointer; display:flex; align-items:center;" data-idx="${idx}">🎵 ${music.name}</span>
      <button class="borrar-nota" data-idx="${idx}">Borrar</button>
    `;
    musicList.appendChild(item);
  });
}

document.getElementById('music-input').addEventListener('change', function(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  let musics = getMusics();
  let filesToLoad = files.length;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      musics.push({
        name: file.name,
        data: evt.target.result
      });
      filesToLoad--;
      if (filesToLoad === 0) {
        saveMusics(musics);
        renderMusicList();
      }
    };
    reader.readAsDataURL(file);
  });
  e.target.value = "";
});

document.getElementById('music-list').addEventListener('click', function(e) {
  if (e.target.dataset.idx !== undefined) {
    currentMusicIdx = parseInt(e.target.dataset.idx);
    openMusicModal(currentMusicIdx);
  }
  if (e.target.classList.contains('borrar-nota')) {
    const idx = parseInt(e.target.dataset.idx);
    let musics = getMusics();
    musics.splice(idx, 1);
    saveMusics(musics);
    renderMusicList();
  }
});

function openMusicModal(idx) {
  const musics = getMusics();
  if (!musics[idx]) return;
  document.getElementById('music-title').textContent = musics[idx].name;
  const audioPlayer = document.getElementById('audio-player');
  audioPlayer.src = musics[idx].data;
  audioPlayer.currentTime = 0;
  audioPlayer.style.display = "none"; // Oculto, usamos los controles emoji
  audioPlayer.load();
  document.getElementById('modal-music-player').classList.remove('modal-hidden');
}

function closeMusicModal() {
  document.getElementById('modal-music-player').classList.add('modal-hidden');
  document.getElementById('audio-player').pause();
}

document.getElementById('close-music-modal').onclick = closeMusicModal;

function changeMusic(delta) {
  const musics = getMusics();
  if (musics.length === 0) return;
  currentMusicIdx = (currentMusicIdx + delta + musics.length) % musics.length;
  openMusicModal(currentMusicIdx);
  playMusic();
}
function playMusic() {
  const audioPlayer = document.getElementById('audio-player');
  audioPlayer.play();
}
function pauseMusic() {
  const audioPlayer = document.getElementById('audio-player');
  audioPlayer.pause();
}

let isMusicPlaying = false;
document.getElementById('prev-music').onclick = () => changeMusic(-1);
document.getElementById('next-music').onclick = () => changeMusic(1);
document.getElementById('playpause-music').onclick = function() {
  const audioPlayer = document.getElementById('audio-player');
  if (audioPlayer.paused) {
    playMusic();
    isMusicPlaying = true;
  } else {
    pauseMusic();
    isMusicPlaying = false;
  }
};
document.getElementById('audio-player').addEventListener('play', function() {
  isMusicPlaying = true;
});
document.getElementById('audio-player').addEventListener('pause', function() {
  isMusicPlaying = false;
});
document.getElementById('audio-player').addEventListener('ended', function() {
  changeMusic(1);
});

document.getElementById('volver-aventuras').onclick = function() {
  window.location = "aventuras.html";
};

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-music-player').classList.add('modal-hidden');
  renderMusicList();
});
