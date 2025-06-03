// Guardar fotos en localStorage
function getFotos() {
  return JSON.parse(localStorage.getItem('fotos') || '[]');
}

function saveFotos(fotos) {
  localStorage.setItem('fotos', JSON.stringify(fotos));
}

// Mostrar la galería
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
    item.className = 'nota-item';
    item.innerHTML = `
      <img src="${foto.data}" alt="Foto" style="width:100px;height:100px;object-fit:cover;border-radius:12px;box-shadow:0 2px 8px #43e97b44;cursor:pointer;" data-idx="${idx}">
      <span style="display:block;font-weight:bold;color:#2196f3;cursor:pointer;" data-idx="${idx}">${foto.titulo ? '📸 '+foto.titulo : '(Sin título)'}</span>
      <button class="borrar-nota" data-idx="${idx}">Borrar</button>
    `;
    galeria.appendChild(item);
  });
}

// Subir fotos
document.getElementById('foto-input').addEventListener('change', function(e) {
  const files = Array.from(e.target.files);
  if (files.length === 0) return;
  let fotos = getFotos();
  files.forEach(file => {
    const reader = new FileReader();
    reader.onload = function(evt) {
      fotos.push({
        data: evt.target.result,
        titulo: ''
      });
      saveFotos(fotos);
      renderGaleria();
    };
    reader.readAsDataURL(file);
  });
  // Reset input
  e.target.value = "";
});

// Ver y editar foto en modal
let fotoActual = -1;
document.getElementById('galeria-lista').addEventListener('click', function(e) {
  if (e.target.dataset.idx !== undefined) {
    fotoActual = parseInt(e.target.dataset.idx);
    const fotos = getFotos();
    const foto = fotos[fotoActual];
    if (foto) {
      document.getElementById('foto-grande').src = foto.data;
      document.getElementById('titulo-foto').value = foto.titulo || '';
      document.getElementById('modal-foto').classList.remove('modal-hidden');
    }
  }
  // Borrar foto
  if (e.target.classList.contains('borrar-nota')) {
    const idx = parseInt(e.target.dataset.idx);
    let fotos = getFotos();
    fotos.splice(idx, 1);
    saveFotos(fotos);
    renderGaleria();
  }
});

// Guardar título de foto
document.getElementById('guardar-titulo-foto').onclick = function() {
  if (fotoActual === -1) return;
  let fotos = getFotos();
  fotos[fotoActual].titulo = document.getElementById('titulo-foto').value.trim();
  saveFotos(fotos);
  renderGaleria();
  document.getElementById('modal-foto').classList.add('modal-hidden');
};

// Cerrar modal
document.getElementById('cerrar-foto-modal').onclick = () => {
  document.getElementById('modal-foto').classList.add('modal-hidden');
};

// Volver al menú
document.getElementById('volver-aventuras').onclick = function() {
  window.location = "aventuras.html";
};

// Al cargar, renderizar galería
window.addEventListener('DOMContentLoaded', renderGaleria);
