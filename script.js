javascript
document.addEventListener('DOMContentLoaded', function() {
    // Función para obtener un número aleatorio dentro de un rango
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Función para animar los emojis
    function animateEmojis() {
        const emojis = document.querySelectorAll('#imageEmojis button'); // Selecciona los botones de emojis
        emojis.forEach(emoji => {
            emoji.style.position = 'absolute'; // Establece la posición como absoluta para poder moverlos
            const maxX = window.innerWidth - emoji.offsetWidth; // Ancho máximo para evitar que se salgan de la pantalla
            const maxY = window.innerHeight - emoji.offsetHeight; // Alto máximo para evitar que se salgan de la pantalla

            // Genera posiciones aleatorias
            const randomX = getRandomNumber(0, maxX);
            const randomY = getRandomNumber(0, maxY);

            // Aplica las nuevas posiciones
            emoji.style.left = randomX + 'px';
            emoji.style.top = randomY + 'px';
        });
    }

    // Llama a la función animateEmojis cada cierto tiempo (ej. cada 2 segundos)
    setInterval(animateEmojis, 2000);

    // Función para mostrar/ocultar imágenes al hacer clic en los emojis
    function setupImageEmojis(buttonId, imageId) {
        const emojiButton = document.getElementById(buttonId);
        const myImage = document.getElementById(imageId);

        emojiButton.addEventListener('click', function() {
            if (myImage.style.display === 'none') {
                myImage.style.display = 'block';
            } else {
                myImage.style.display = 'none';
            }
        });
    }

    // Configura los emojis que muestran imágenes
    setupImageEmojis('emojiButton1', 'myImage1'); // MI MUNDO - imagen1.jpg
    setupImageEmojis('emojiButton2', 'myImage2'); // MI FELICIDAD - imagen2.jpg
    setupImageEmojis('emojiButton3', 'myImage3'); // ME CRAZY - imagen3.jpg
    setupImageEmojis('emojiButton4', 'myImage4'); // MY FAVORITE - imagen4.jpg

    // Función para mostrar textos en ventanas emergentes al hacer clic en los emojis
    const emojisText = document.querySelectorAll('#emojis .emoji');
    emojisText.forEach(emoji => {
        emoji.addEventListener('click', function() {
            const text = this.getAttribute('data-text');
            alert(text); // Muestra el texto en una ventana emergente
        });
    });
});
```
