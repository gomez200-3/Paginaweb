document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("modalImage");
    var emojis = document.querySelectorAll('#imageEmojis button.emoji');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // Function to open the modal
    function openModal(imageSrc) {
        modal.style.display = "block";
        modalImg.src = imageSrc;
    }

    // Add click event to each emoji
    emojis.forEach(emoji => {
        emoji.addEventListener('click', function() {
            var imageSrc = this.getAttribute('data-image');
            openModal(imageSrc);
        });
    });

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Close the modal if the user clicks outside of the modal
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
