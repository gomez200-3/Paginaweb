// Selecciona todos los botones personalizados y el contenedor de la imagen animada
const botones = document.querySelectorAll(".boton-personalizado");
const imagenContainer = document.getElementById("imagen-container");

// Si hay menos imágenes, ajusta aquí los nombres según tu carpeta "media"
const imagenesDisponibles = [
    "Media/gutierrez.jpg",
    "Media/andrea.jpg",
    "Media/IMG-mi reina.jpg",
    "Media/bañando_perro.jpg."
];

botones.forEach((boton, idx) => {
    // Si algún botón no tiene data-img, asígnale una aleatoria de media
    if(!boton.dataset.img) {
        boton.dataset.img = imagenesDisponibles[idx % imagenesDisponibles.length];
    }
    boton.addEventListener("click", (e) => {
        // Elimina imagen anterior
        imagenContainer.innerHTML = '';
        const imgSrc = boton.dataset.img;
        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Foto especial";
        img.className = "imagen-animada";
        imagenContainer.appendChild(img);

        // Calcula la posición del botón y centra la imagen emergente allí
        const rect = boton.getBoundingClientRect();
        // Tamaño de la imagen emergente
        const imgWidth = Math.min(window.innerWidth * 0.8, 320);
        const imgHeight = Math.min(window.innerHeight * 0.4, 220);
        img.style.width = `${imgWidth}px`;
        img.style.height = `${imgHeight}px`;
        img.style.left = `${rect.left + rect.width/2 - imgWidth/2}px`;
        img.style.top = `${rect.top + rect.height/2 - imgHeight/2}px`;

        // Activa la animación después de insertar la imagen
        setTimeout(() => {
            img.classList.add("visible");
        }, 10);

        // Cierra imagen tras 4 segundos o si se hace click en la imagen
        const cerrar = () => {
            img.classList.remove("visible");
            setTimeout(() => { img.remove(); }, 400);
        };
        setTimeout(cerrar, 4000);
        img.addEventListener("click", cerrar);
    });
});
