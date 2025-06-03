// Guardar notas en localStorage para persistencia
function getNotas() {
  return JSON.parse(localStorage.getItem('notas') || '[]');
}

function saveNotas(notas) {
  localStorage.setItem('notas', JSON.stringify(notas));
}

// Mostrar la lista de notas
function renderNotas() {
  const notaLista = document.getElementById('nota-lista');
  notaLista.innerHTML = '';
  const notas = getNotas();
  if (notas.length === 0) {
    notaLista.innerHTML = '<p style="color:#fff;font-style:italic;">Aún no has escrito ninguna nota romántica.</p>';
    return;
  }
  notas.forEach((nota, idx) => {
    const item = document.createElement('div');
    item.className = 'nota-item';
    item.innerHTML = `
      <span style="color:#43e97b; font-weight:bold; cursor:pointer;" data-idx="${idx}">💌 Ver nota</span>
      <span style="padding-left:1em; color:#888; font-size:0.94em;">${nota.texto.substring(0, 36)}${nota.texto.length > 36 ? '...' : ''}</span>
      <button class="borrar-nota" data-idx="${idx}">Borrar</button>
    `;
    notaLista.appendChild(item);
  });
}

// Añadir nota
document.getElementById('nota-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const input = document.getElementById('nota-input');
  const texto = input.value.trim();
  if (!texto) return;
  let notas = getNotas();
  notas.unshift({ texto });
  saveNotas(notas);
  input.value = "";
  renderNotas();
});

// Ver nota en modal
document.getElementById('nota-lista').addEventListener('click', function(e) {
  if (e.target.dataset.idx !== undefined) {
    const idx = parseInt(e.target.dataset.idx);
    const notas = getNotas();
    const nota = notas[idx];
    if (nota) {
      document.getElementById('contenido-nota-modal').textContent = nota.texto;
      document.getElementById('modal-nota').classList.remove('modal-hidden');
    }
  }
  // Borrar nota
  if (e.target.classList.contains('borrar-nota')) {
    const idx = parseInt(e.target.dataset.idx);
    let notas = getNotas();
    notas.splice(idx, 1);
    saveNotas(notas);
    renderNotas();
  }
});

// Cerrar modal
document.getElementById('cerrar-nota-modal').onclick = () => {
  document.getElementById('modal-nota').classList.add('modal-hidden');
};

// Volver al menú
document.getElementById('volver-aventuras').onclick = function() {
  window.location = "aventuras.html";
};

// Al cargar, mostrar las notas
window.addEventListener('DOMContentLoaded', renderNotas);
