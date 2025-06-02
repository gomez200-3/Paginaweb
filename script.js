const botones = document.querySelectorAll(".boton-personalizado");
const imagenContainer = document.getElementById("imagen-container");

botones.forEach(boton => {
  boton.addEventListener("click", (e) => {
    // Quitar imagen anterior si existe
    imagenContainer.innerHTML = '';
    const imgSrc = boton.dataset.img;
    const img = document.createElement("img");
    img.src = imgSrc;
    img.className = "imagen-animada";
    imagenContainer.appendChild(img);

    // Obtener posición y tamaño del botón
    const rect = boton.getBoundingClientRect();
    // Centrar la imagen sobre el botón
    const imgWidth = 300;
    const imgHeight = 200;
    img.style.left = `${rect.left + rect.width/2 - imgWidth/2}px`;
    img.style.top = `${rect.top + rect.height/2 - imgHeight/2}px`;
    img.style.width = `${imgWidth}px`;
    img.style.height = `${imgHeight}px`;

    // Forzar layout y activar animación
    setTimeout(() => {
      img.classList.add("visible");
    }, 10);

    // Cerrar la imagen al hacer clic fuera de ella o tras 4s
    setTimeout(() => {
      img.classList.remove("visible");
      setTimeout(() => { img.remove(); }, 400);
    }, 4000);

    img.addEventListener("click", () => {
      img.classList.remove("visible");
      setTimeout(() => { img.remove(); }, 400);
    });
  });
});
