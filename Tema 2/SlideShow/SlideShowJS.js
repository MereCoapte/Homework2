let slideIndex = 1;
showSlides(slideIndex);

function plusSlide(n){
    showSlides(slideIndex += n);
}

function currentSlide(n){
    showSlides(slideIndex = n);
}

function autoPlay(){
    plusSlide(1);
}

let autoPlayInterval = setInterval(autoPlay, 3000);

document.getElementById("slideshow-container").addEventListener('mouseover', function() {
    clearInterval(autoPlayInterval);
});

document.getElementById("slideshow-container").addEventListener('mouseout', function() {
    autoPlayInterval = setInterval(autoPlay, 3000);
});

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}
