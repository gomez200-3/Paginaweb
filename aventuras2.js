// --- Música ---
const canciones = [
  { archivo: "media/song1.mp3", nombre: "Nuestra Canción 1" },
  { archivo: "media/song2.mp3", nombre: "Recuerdo Musical 2" },
  // Agrega más aquí si tienes, con nombres románticos!
];
let cancionActual = 0;

function abrirMusica() {
  document.getElementById('musica-modal').classList.add('active');
  cargarCancion(cancionActual);
  document.getElementById('audio-player').play();
}
function cerrarMusica() {
  document.getElementById('musica-modal').classList.remove('active');
  document.getElementById('audio-player').pause();
}
function cargarCancion(idx) {
  cancionActual = (idx + canciones.length) % canciones.length;
  const cancion = canciones[cancionActual];
  const audio = document.getElementById('audio-player');
  audio.src = cancion.archivo;
  document.getElementById('cancion-nombre').textContent = cancion.nombre;
}
function cambiarCancion(dir) {
  cargarCancion(cancionActual + dir);
  document.getElementById('audio-player').play();
}

// --- Galería romántica ---
const imagenesGaleria = [
  "media/1.jpg",
  "media/2.jpg",
  "media/3.jpg",
  "media/4.jpg"
  // Agrega más imágenes si tienes en media
];
function abrirGaleria() {
  document.getElementById('galeria-modal').classList.add('active');
  const cont = document.getElementById('galeria-imgs');
  cont.innerHTML = '';
  imagenesGaleria.forEach(src => {
    const div = document.createElement('div');
    div.className = "galeria-img-romantica";
    div.innerHTML = `<img src="${src}" alt="Recuerdo" /> <div class="corazon">💖</div>`;
    cont.appendChild(div);
  });
}
function cerrarGaleria() {
  document.getElementById('galeria-modal').classList.remove('active');
}

// Cierra modales con Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarMusica();
    cerrarGaleria();
  }
});
