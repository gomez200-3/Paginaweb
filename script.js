document.addEventListener('DOMContentLoaded', function() {
    // Animación de corazoncitos al presionar el botón "Iniciar aventura" o "Volver al inicio"
    document.querySelectorAll('.heart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showHearts(btn, () => {
                window.location.href = btn.getAttribute('data-next');
            });
        });
    });

    function showHearts(target, callback) {
        // Crear contenedor de corazones
        const heartContainer = document.createElement('div');
        heartContainer.className = 'hearts-container';
        for(let i=0; i<12; i++) {
            const heart = document.createElement('span');
            heart.className = 'heart';
            heart.textContent = '💖';
            // Aleatorizar posición y animación
            heart.style.left = (Math.random() * 80 + 10) + '%';
            heart.style.animationDelay = (Math.random() * 0.2) + 's';
            heartContainer.appendChild(heart);
        }
        // Posicionar el contenedor sobre el botón
        heartContainer.style.position = 'absolute';
        heartContainer.style.top = target.offsetTop - 20 + 'px';
        heartContainer.style.left = target.offsetLeft - 30 + 'px';
        heartContainer.style.width = target.offsetWidth + 60 + 'px';
        heartContainer.style.height = '60px';
        heartContainer.style.pointerEvents = 'none';
        heartContainer.style.zIndex = 10;
        target.parentNode.appendChild(heartContainer);

        setTimeout(() => {
            heartContainer.remove();
            callback();
        }, 300);
    }
});
