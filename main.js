// ------ Intro Animada para cada página ------
window.addEventListener("DOMContentLoaded", function () {
    let introTitle = "Bienvenida";
    let introEmojis = "💞✨";
    if (window.location.pathname.endsWith("index.html") || window.location.pathname.endsWith("/")) {
        introTitle = "Aquí inician nuestras aventuras";
        introEmojis = "🥵🥺🥴😻✈️💖";
    } else if (window.location.pathname.endsWith("aventuras.html")) {
        introTitle = "¡Nueva Aventura!";
        introEmojis = "📸🎶💞🦕";
    } else if (window.location.pathname.endsWith("aventuras2.html")) {
        introTitle = "Sueños, música y recuerdos";
        introEmojis = "🎶🎥🖼️📝💍";
    }
    const introDiv = document.createElement("div");
    introDiv.className = "intro-anim";
    introDiv.innerHTML = `
        <div class="intro-title">${introTitle}</div>
        <div class="intro-emojis">${introEmojis}</div>
    `;
    document.body.appendChild(introDiv);

    setTimeout(() => {
        introDiv.classList.add("hide");
        setTimeout(() => introDiv.remove(), 700);
    }, 1800); // Duración visible de la intro
});
// ----- Explosión de emojis (ya definido para todas las páginas) -----
function explodeEmojis(emojis, count = 20) {
    const explosion = document.getElementById('emoji-explosion');
    if (!explosion) return;
    explosion.innerHTML = '';
    for(let i = 0; i < count; i++) {
        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'absolute';
        emoji.style.fontSize = (Math.random()*1.3 + 1.5) + 'rem';
        emoji.style.left = '0px';
        emoji.style.top = '0px';
        explosion.appendChild(emoji);

        // Animación de trayectoria
        const angle = Math.random() * 2 * Math.PI;
        const radius = 90 + Math.random() * 120;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        emoji.animate([
            { transform: 'translate(0,0) scale(1)', opacity: 1 },
            { transform: `translate(${x}px,${y}px) scale(${Math.random()*0.7+0.7})`, opacity: 0 }
        ], { duration: 1100 + Math.random()*200, fill: 'forwards' });
    }
    explosion.style.display = 'block';
    setTimeout(() => { explosion.style.display = 'none'; }, 1500);
}

// ------- Página index.html -------
if (document.getElementById('start-adventure')) {
    document.getElementById('start-adventure').addEventListener('click', () => {
        explodeEmojis(['🥵','🥺','🥴','😻','✈️','💖','💘','💞'], 32);
        setTimeout(() => {
            window.location.href = "aventuras.html";
        }, 1500);
    });

    document.querySelectorAll('.emoji-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const msg = this.getAttribute('data-message');
            showRomanticModal(msg);
            explodeEmojis(['🥵','🥺','🥴','😻','✈️','💖','💘','💞'], 18);
        });
    });

    // Modal romántico
    function showRomanticModal(message) {
        document.getElementById('modal-message').textContent = message;
        document.getElementById('modal-romantic').classList.remove('modal-hidden');
    }
    document.getElementById('close-modal').onclick = function() {
        document.getElementById('modal-romantic').classList.add('modal-hidden');
    }
    window.onclick = function(e) {
        if(e.target == document.getElementById('modal-romantic')) {
            document.getElementById('modal-romantic').classList.add('modal-hidden');
        }
    }
}

// ------- Página aventuras.html -------
if (document.getElementById('volver-inicio')) {
    document.getElementById('volver-inicio').onclick = () => {
        explodeEmojis(['🥵','🥺','🥴','😻','✈️','💖','💘','💞'], 25);
        setTimeout(() => window.location.href = "index.html", 1200);
    };
}
if (document.getElementById('iniciar-aventura2')) {
    document.getElementById('iniciar-aventura2').onclick = () => {
        explodeEmojis(['💖','💘','💞','💌','💫','✨','💕','💍'], 32);
        setTimeout(() => window.location.href = "aventuras2.html", 1200);
    };
}

// ---- Botón 🦕 para mostrar notas románticas guardadas ----
if (document.getElementById('dino-notas')) {
    document.getElementById('dino-notas').onclick = () => {
        explodeEmojis(['🦕','💞','💌','💕','✨'], 30);
        setTimeout(() => {
            mostrarNotasModal();
        }, 700);
    };
    // Modal cierre
    document.getElementById('close-notas').onclick = function() {
        document.getElementById('modal-notas').classList.add('modal-hidden');
    };
    window.onclick = function(e) {
        if(e.target == document.getElementById('modal-notas')) {
            document.getElementById('modal-notas').classList.add('modal-hidden');
        }
    }
    // Mostrar notas guardadas
    function mostrarNotasModal() {
        const notas = JSON.parse(localStorage.getItem('notas_romanticas') || '[]');
        const notasList = document.getElementById('notas-list');
        notasList.innerHTML = '';
        if (notas.length === 0) {
            notasList.innerHTML = '<p style="color:#888;">¡Aún no hay notas románticas! Agrega algunas en la siguiente página 📝</p>';
        } else {
            // Reproducir cada nota con animación de máquina de escribir
            let i = 0;
            function mostrarNotaAnimada() {
                if (i < notas.length) {
                    const div = document.createElement('div');
                    div.className = "nota-romantica";
                    notasList.appendChild(div);
                    let txt = notas[i];
                    let j = 0;
                    function escribir() {
                        if (j <= txt.length) {
                            div.innerHTML = txt.substring(0, j) + '<span class="cursor-romantic">|</span>';
                            j++;
                            setTimeout(escribir, 35);
                        } else {
                            div.innerHTML = txt;
                            i++;
                            setTimeout(mostrarNotaAnimada, 750);
                        }
                    }
                    escribir();
                }
            }
            mostrarNotaAnimada();
        }
        document.getElementById('modal-notas').classList.remove('modal-hidden');
    }
}

// ------- Página aventuras2.html -------
if (document.getElementById('volver-inicio2')) {
    document.getElementById('volver-inicio2').onclick = () => {
        explodeEmojis(['💖','💘','💞','💌','💫','✨','💕','💍'], 25);
        setTimeout(() => window.location.href = "index.html", 1200);
    };
}
if (document.getElementById('regresar-aventura')) {
    document.getElementById('regresar-aventura').onclick = () => {
        explodeEmojis(['🥵','🥺','🥴','😻','✈️','💖','💘','💞'], 25);
        setTimeout(() => window.location.href = "aventuras.html", 1200);
    };
}

// --- Botones multimedia y blog de notas ---
if (document.getElementById('btn-musica')) {
    // Música
    document.getElementById('btn-musica').onclick = function() {
        mostrarSeccion('musica');
        const cont = document.getElementById('seccion-musica');
        if (!cont.innerHTML) {
            cont.innerHTML = `
                <h2 class="romantic-title">Nuestra música</h2>
                <audio id="audio-romantic" controls style="width:100%;max-width:400px;">
                    <source src="Media/musica.mp3" type="audio/mp3">
                    Tu navegador no soporta el audio.
                </audio>
                <br>
                <input type="file" accept="audio/*" id="input-musica" style="margin-top:1rem;">
                <label for="input-musica" style="color:#009688;">Añadir música</label>
            `;
            document.getElementById('input-musica').addEventListener('change', function(e){
                if (e.target.files.length > 0) {
                    const fileURL = URL.createObjectURL(e.target.files[0]);
                    document.getElementById('audio-romantic').src = fileURL;
                }
            });
        }
    };
}
if (document.getElementById('btn-video')) {
    // Video
    document.getElementById('btn-video').onclick = function() {
        mostrarSeccion('video');
        const cont = document.getElementById('seccion-video');
        if (!cont.innerHTML) {
            cont.innerHTML = `
                <h2 class="romantic-title">Nuestros vídeos</h2>
                <video id="video-romantic" controls width="300" poster="Media/poster.jpg">
                    <source src="Media/video1.mp4" type="video/mp4">
                    Tu navegador no soporta el vídeo.
                </video>
                <div style="margin:0.7rem 0;">
                    <button id="prev-video" class="emoji-btn">💔</button>
                    <button id="play-video" class="emoji-btn">❤️</button>
                    <button id="next-video" class="emoji-btn">💕</button>
                </div>
                <input type="file" accept="video/*" id="input-video" style="margin-top:1rem;">
                <label for="input-video" style="color:#009688;">Añadir vídeo</label>
            `;
            let videos = [
                "Media/video1.mp4",
                "Media/video2.mp4"
            ];
            let current = 0;
            const video = document.getElementById('video-romantic');
            document.getElementById('prev-video').onclick = () => {
                current = (current - 1 + videos.length) % videos.length;
                video.src = videos[current];
                video.play();
            };
            document.getElementById('play-video').onclick = () => {
                if (video.paused) video.play();
                else video.pause();
            };
            document.getElementById('next-video').onclick = () => {
                current = (current + 1) % videos.length;
                video.src = videos[current];
                video.play();
            };
            document.getElementById('input-video').addEventListener('change', function(e){
                if (e.target.files.length > 0) {
                    const fileURL = URL.createObjectURL(e.target.files[0]);
                    video.src = fileURL;
                    video.play();
                }
            });
        }
    };
}
if (document.getElementById('btn-galeria')) {
    // Galería
    document.getElementById('btn-galeria').onclick = function() {
        mostrarSeccion('galeria');
        const cont = document.getElementById('seccion-galeria');
        if (!cont.innerHTML) {
            cont.innerHTML = `
                <h2 class="romantic-title">Álbum de pasatiempos</h2>
                <div id="galeria-grid" class="galeria-grid"></div>
                <input type="file" accept="image/*" id="input-galeria" multiple style="margin-top:1rem;">
                <label for="input-galeria" style="color:#009688;">Añadir imágenes</label>
            `;
            document.getElementById('input-galeria').addEventListener('change', function(e){
                const grid = document.getElementById('galeria-grid');
                for (const file of e.target.files) {
                    const fileURL = URL.createObjectURL(file);
                    const img = document.createElement('img');
                    img.src = fileURL;
                    img.className = "galeria-img";
                    grid.appendChild(img);
                }
            });
        }
    };
}
if (document.getElementById('btn-notas')) {
    // Blog de notas romántico
    document.getElementById('btn-notas').onclick = function() {
        mostrarSeccion('notas');
        const cont = document.getElementById('seccion-notas');
        if (!cont.innerHTML) {
            cont.innerHTML = `
                <h2 class="romantic-title">Blog de notas romántico</h2>
                <form id="form-notas" class="notas-form">
                    <textarea id="nueva-nota" rows="4" placeholder="Escribe aquí una nota bonita..."></textarea>
                    <button type="submit" class="btn-romantic">Agregar nota</button>
                </form>
                <div id="notas-guardadas"></div>
            `;
            cargarNotas();
            document.getElementById('form-notas').addEventListener('submit', function(e){
                e.preventDefault();
                const txt = document.getElementById('nueva-nota').value.trim();
                if (txt.length > 0) {
                    let notas = JSON.parse(localStorage.getItem('notas_romanticas') || '[]');
                    notas.push(txt);
                    localStorage.setItem('notas_romanticas', JSON.stringify(notas));
                    document.getElementById('nueva-nota').value = '';
                    cargarNotas();
                }
            });
        }
    };
    function cargarNotas() {
        const notas = JSON.parse(localStorage.getItem('notas_romanticas') || '[]');
        const div = document.getElementById('notas-guardadas');
        div.innerHTML = '';
        if (notas.length === 0) {
            div.innerHTML = '<p style="color:#888;">No hay notas guardadas aún.</p>';
        } else {
            notas.forEach((n, i) => {
                div.innerHTML += `<div class="nota-romantica">${n}</div>`;
            });
        }
    }
}

// --- Mostrar una sección y ocultar el resto ---
function mostrarSeccion(tipo) {
    ['musica','video','galeria','notas'].forEach(sec => {
        const el = document.getElementById('seccion-' + sec);
        if (el) el.style.display = (sec === tipo ? 'block' : 'none');
    });
                    }
