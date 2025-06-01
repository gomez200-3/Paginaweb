```javascript

Document.addEventListener(‘DOMContentLoaded’, function() {

    // Get the modal

    Var modal = document.getElementById(“myModal”);



    // Get the image and insert it inside the modal – use its “alt” text as a caption

    Var modalImg = document.getElementById(“modalImage”);

    Var emojis = document.querySelectorAll(‘#imageEmojis button.emoji’);



    // Get the <span> element that closes the modal

    Var span = document.getElementsByClassName(“close”)[0];



    // Function to open the modal

    Function openModal(imageSrc) {

        Modal.style.display = “block”;

        modalImg.src = imageSrc;

    }



    // Add click event to each emoji

    Emojis.forEach(emoji => {

        Emoji.addEventListener(‘click’, function() {

            Var imageSrc = this.getAttribute(‘data-image’);

            openModal(imageSrc);

        });

    });



    // When the user clicks on <span> (x), close the modal

    Span.onclick = function() {

        Modal.style.display = “none”;

    }



    // Close the modal if the user clicks outside of the modal

    Window.onclick = function(event) {

        If (event.target == modal) {

            Modal.style.display = “none”;

        }

    }

});

```



