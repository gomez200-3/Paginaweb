// Animación de explosión de emojis
function explodeEmojis(emojis, count = 20) {
    const explosion = document.getElementById('emoji-explosion');
    explosion.innerHTML = '';
    for(let i = 0; i < count; i++) {
        const emoji = document.createElement('span');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'absolute';
        emoji.style.fontSize = (Math.random()*1.3 + 1.5) + 'rem';
        emoji.style.left = '0px';
        emoji.style.top = '0px';
        explosion.appendChild(emoji);

        // Animación
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

// Botón "Iniciar aventura"
document.getElementById('start-adventure').addEventListener('click', () => {
    explodeEmojis(['🥵','🥺','🥴','😻','✈️','💖','💘','💞'], 32);
    setTimeout(() => {
        window.location.href = "aventuras.html";
    }, 1500);
});

// Botones de emojis
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
