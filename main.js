// ------ Intro Animada para cada página ------
window.addEventListener("DOMContentLoaded", function () {
    // Asegura que el modal romántico esté oculto al cargar la página
    var modal = document.getElementById('modal-romantic');
    if (modal) modal.classList.add('modal-hidden');

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

// --- EMOJI MODAL romántico (usando modal-romantic y modal-message)
document.querySelectorAll('.emoji-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('modal-message').textContent = btn.getAttribute('data-texto');
        document.getElementById('modal-romantic').classList.remove('modal-hidden');
    });
});
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('modal-romantic').classList.add('modal-hidden');
});
document.getElementById('modal-romantic').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-romantic')) {
        document.getElementById('modal-romantic').classList.add('modal-hidden');
    }
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('modal-romantic').classList.add('modal-hidden');
    }
});

// --- EXPLOSIÓN de EMOJIS y REDIRECCIÓN
function explosionEmojis(emojis, duration = 800) {
    const explosion = document.getElementById('explosion-emojis');
    explosion.innerHTML = '';
    for (let i = 0; i < 22; ++i) {
        const em = document.createElement('span');
        em.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        em.className = 'explosion-emoji';
        em.style.left = (window.innerWidth / 2 + (Math.random() - 0.5) * 180) + 'px';
        em.style.top = (window.innerHeight / 2 + (Math.random() - 0.5) * 120 + window.scrollY) + 'px';
        em.style.setProperty('--tx', ((Math.random() - 0.5) * 330) + 'px');
        em.style.setProperty('--ty', ((Math.random() - 0.5) * 220) + 'px');
        explosion.appendChild(em);
    }
    explosion.style.display = "block";
    setTimeout(() => { explosion.innerHTML = ''; explosion.style.display = "none"; }, duration);
}
document.getElementById('irRecuerdosBtn').addEventListener('click', function (e) {
    e.preventDefault();
    explosionEmojis(['💖', '💞', '❤️', '🌷', '💌', '💋', '💘', '😍', '🥰', '💕'], 800);
    setTimeout(() => { window.location = "aventuras.html"; }, 800);
});
