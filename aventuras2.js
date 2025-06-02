// --- Música ---
const canciones = [
  { archivo: "Media/Shawn Mendes - There_s Nothing Holdin_ Me Back _ Traducida al Español(M4A_128K).m4a", nombre: "pop en inglés" },
  { archivo: "Media/Gabry Ponte - Exotica (Official Visualizer)(M4A_128K).m4a", nombre: "exotica" },
  { archivo: "Media/Billie Eilish - ilomilo (Official Audio)(M4A_128K).m4a" , nombre: "my princess" },
  { archivo: "Media/8. Apaga el Cel - Doble Porción _ The Colombians Ft. ZetaZeta _ Deejohend(M4A_128K).m4a" ,nombre: "doble porción"}
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
  "Media/vamos_atardecer.jpg",
  "Media/imagen_besando.jpg",
  "Media/gutierrez.jpg",
  "Media/andrea.jpg",
  "Media/Vamos_tmfotos.jpg",
  "Media/Recuerdo2202.jpg",
  "Media/IMG_20250406_210730.jpg",
  "Media/IMG-mi reina.jpg",
  "Media/20250503_182247.jpg",
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
