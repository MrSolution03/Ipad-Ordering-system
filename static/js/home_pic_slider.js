const slider = document.querySelector('.slider');
let currentIndex = 0;

function slide() {
  currentIndex = (currentIndex + 1) % 3; // Assuming we have 3 slides
  slider.style.transform = `translateX(-${currentIndex * 100}%)`;
}

setInterval(slide, 5000);
