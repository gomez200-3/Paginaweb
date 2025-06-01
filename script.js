document.addEventListener('DOMContentLoaded', function() {
    // Mostrar imagen en modal al hacer clic en "ver-imagen"
    document.querySelectorAll('.ver-imagen').forEach(btn => {
        btn.addEventListener('click', function() {
            const imgSrc = btn.getAttribute('data-image');
            const modal = document.getElementById('myModal');
            const modalImg = document.getElementById('modalImage');
            // Mostrar la imagen
            modalImg.src = imgSrc;
            modalImg.style.display = "block";
            // Ocultar mensaje de texto, si existe
            const modalText = document.getElementById('modalText');
            if (modalText) modalText.style.display = "none";
            modal.style.display = "block";
        });
    });

    // Mostrar mensaje en modal al hacer clic en emoji
    document.querySelectorAll('.emoji').forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = document.getElementById('myModal');
            const modalImg = document.getElementById('modalImage');
            const modalText = document.getElementById('modalText');
            // Ocultar imagen
            modalImg.src = "";
            modalImg.style.display = "none";
            // Mostrar mensaje
            if (modalText) {
                modalText.textContent = btn.getAttribute('data-text');
                modalText.style.display = "block";
            }
            modal.style.display = "block";
        });
    });

    // Cerrar modal al hacer clic en la X
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('myModal').style.display = "none";
        document.getElementById('modalImage').src = "";
        const modalText = document.getElementById('modalText');
        if (modalText) modalText.style.display = "none";
    });

    // Cerrar modal al hacer clic fuera del contenido
    window.onclick = function(event) {
        const modal = document.getElementById('myModal');
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById('modalImage').src = "";
            const modalText = document.getElementById('modalText');
            if (modalText) modalText.style.display = "none";
        }
    };

    // Acción para el botón "Nuestras Aventuras Iniciaron Aquí"
    document.getElementById('botonAventuras').addEventListener('click', function() {
        // Redirigir a otra página, por ejemplo: aventuras.html
        window.location.href = "aventuras.html";
    });
});
