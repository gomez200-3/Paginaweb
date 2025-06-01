document.addEventListener('DOMContentLoaded', function() {
    // Modal
    var modal = document.getElementById("myModal");
    var modalImg = document.getElementById("modalImage");
    var span = document.getElementsByClassName("close")[0];

    // Abrir modal al hacer click en "ver imagen"
    document.querySelectorAll('.ver-imagen').forEach(btn => {
        btn.addEventListener('click', function() {
            var imageSrc = this.getAttribute('data-image');
            modal.style.display = "block";
            modalImg.src = imageSrc;
        });
    });

    // Cerrar modal al hacer click en la X
    span.onclick = function() {
        modal.style.display = "none";
        modalImg.src = "";
    }

    // Cerrar modal al hacer click fuera de la imagen/modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            modalImg.src = "";
        }
    }

    // Ejemplo: acción para el botón de aventuras (puedes cambiarla a lo que quieras)
    document.getElementById('botonAventuras').addEventListener('click', function() {
        alert('¡Aquí iniciaron nuestras aventuras!');
    });
});
