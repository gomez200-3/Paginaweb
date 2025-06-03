// Guardar y recuperar el mensaje especial desde localStorage
function getEspecial() {
  return localStorage.getItem('mensaje_especial') || '';
}

function saveEspecial(msg) {
  localStorage.setItem('mensaje_especial', msg);
}

// Mostrar el mensaje especial si existe
function renderEspecial() {
  const mensaje = getEspecial();
  document.getElementById('especial-mensaje').textContent = mensaje
    ? `💝 ${mensaje}`
    : 'Aquí aparecerá tu mensaje especial, secreto o dedicatoria romántica...';
}

// Guardar mensaje al hacer clic
document.getElementById('guardar-especial').onclick = function() {
  const input = document.getElementById('especial-input');
  const msg = input.value.trim();
  if (!msg) return;
  saveEspecial(msg);
  input.value = "";
  renderEspecial();
};

// Volver al menú
document.getElementById('volver-aventuras').onclick = function() {
  window.location = "aventuras.html";
};

// Al cargar, mostrar mensaje especial
window.addEventListener('DOMContentLoaded', renderEspecial);
