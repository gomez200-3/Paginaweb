function getFotos() {
  return JSON.parse(localStorage.getItem('fotos') || '[]');
}
function saveFotos(fotos) {
  localStorage.setItem('fotos', JSON.stringify(fotos));
}

let currentFotoIdx = 0;
let slideshowInterval = null;

function renderGaleria() {
  const galeria = document.getElementById('galeria-lista');
  galeria.innerHTML = '';
  const fotos = getFotos();
  if (fotos.length === 0) {
    galeria.innerHTML = '<p style="color:#fff;font-style:italic;">No has subido ninguna foto aún.</p>';
    return;
  }
  fotos.forEach((foto, idx) => {
    const item = document.createElement('div');
    item.className = 'galeria-item';
    item.innerHTML = `
      <img src="${foto.data}" alt="Foto" class="galeria-thumb" data-idx="${idx}">
      <div class="galeria-titulo">${foto.titulo ? foto.titulo : '(Sin título)'}</div>
    `;
    galeria.appendChild(item);
  });
}

document.getElementById('foto-input').addEventListener('change', function(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  let fotos = getFotos();
  let filesToLoad = files.length;
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      fotos.push({
        data: evt.target.result,
        titulo: file.name.replace(/\.\w+$/, '')
      });
      filesToLoad--;
      if (filesToLoad === 0) {
        saveFotos(fotos);
        renderGaleria();
      }
    };
    reader.readAsDataURL(file);
  });
  e.target.value = "";
});

document.getElementById('galeria-lista').addEventListener('click', function(e) {
  if (e.target.classList.contains('galeria-thumb')) {
    currentFotoIdx = parseInt(e.target.dataset.idx);
    openFotoModal(currentFotoIdx);
  }
});

function openFotoModal(idx) {
  const fotos = getFotos();
  if (!fotos[idx]) return;
  document.getElementById('foto-grande').src = fotos[idx].data;
  document.getElementById('titulo-foto-modal').textContent = fotos[idx].titulo || '(Sin título)';
  document.getElementById('modal-foto').classList.remove('modal-hidden');
}
function closeFotoModal() {
  document.getElementById('modal-foto').classList.add('modal-hidden');
  stopSlideshow();
}
document.getElementById('cerrar-foto-modal').onclick = closeFotoModal;

function changeFoto(delta) {
  const fotos = getFotos();
  if (fotos.length === 0) return;
  currentFotoIdx = (currentFotoIdx + delta + fotos.length) % fotos.length;
  openFotoModal(currentFotoIdx);
}
document.getElementById('prev-foto').onclick = () => changeFoto(-1);
document.getElementById('next-foto').onclick = () => changeFoto(1);

function startSlideshow() {
  stopSlideshow();
  slideshowInterval = setInterval(() => {
    changeFoto(1);
  }, 1700);
}
function stopSlideshow() {
  if (slideshowInterval) {
    clearInterval(slideshowInterval);
    slideshowInterval = null;
  }
}
let isSlideshow = false;
document.getElementById('playpause-foto').onclick = function() {
  if (isSlideshow) {
    stopSlideshow();
    isSlideshow = false;
    this.style.background = "#e53935";
  } else {
    startSlideshow();
    isSlideshow = true;
    this.style.background = "#ab2320";
  }
};
document.getElementById('modal-foto').addEventListener('click', function(e){
  if (e.target === this) closeFotoModal();
});
document.getElementById('volver-aventuras').onclick = function() {
  window.location = "aventuras.html";
};

window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modal-foto').classList.add('modal-hidden');
  renderGaleria();
});
