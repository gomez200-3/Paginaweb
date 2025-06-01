document.addEventListener('DOMContentLoaded', function() {
    // Mostrar imagen en modal al hacer clic en "ver-imagen"
    document.querySelectorAll('.ver-imagen').forEach(btn => {
        btn.addEventListener('click', function() {
            const imgSrc = btn.getAttribute('data-image');
            const modal = document.getElementById('myModal');
            const modalImg = document.getElementById('modalImage');
            modalImg.src = imgSrc;
            modal.style.display = "block";
        });
    });

    // Cerrar modal al hacer clic en la X
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('myModal').style.display = "none";
        document.getElementById('modalImage').src = "";
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        const modal = document.getElementById('myModal');
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById('modalImage').src = "";
        }
    };

    // Mostrar texto al hacer clic en emojis
    document.querySelectorAll('.emoji').forEach(btn => {
        btn.addEventListener('click', function() {
            alert(btn.getAttribute('data-text'));
        });
    });

    // Acción para el botón "Nuestras Aventuras Iniciaron Aquí"
    document.getElementById('botonAventuras').addEventListener('click', function() {
        alert("¡Aquí comenzó nuestra historia! ♥");
    });
});
