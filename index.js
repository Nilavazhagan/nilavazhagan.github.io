// ---
const hamMenuBtn = document.querySelector('.header__main-ham-menu-cont')
const smallMenu = document.querySelector('.header__sm-menu')
const headerHamMenuBtn = document.querySelector('.header__main-ham-menu')
const headerHamMenuCloseBtn = document.querySelector(
  '.header__main-ham-menu-close'
)
const headerSmallMenuLinks = document.querySelectorAll('.header__sm-menu-link')

hamMenuBtn.addEventListener('click', () => {
  if (smallMenu.classList.contains('header__sm-menu--active')) {
    smallMenu.classList.remove('header__sm-menu--active')
  } else {
    smallMenu.classList.add('header__sm-menu--active')
  }
  if (headerHamMenuBtn.classList.contains('d-none')) {
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  } else {
    headerHamMenuBtn.classList.add('d-none')
    headerHamMenuCloseBtn.classList.remove('d-none')
  }
})

for (let i = 0; i < headerSmallMenuLinks.length; i++) {
  headerSmallMenuLinks[i].addEventListener('click', () => {
    smallMenu.classList.remove('header__sm-menu--active')
    headerHamMenuBtn.classList.remove('d-none')
    headerHamMenuCloseBtn.classList.add('d-none')
  })
}

// ---
const headerLogoConatiner = document.querySelector('.header__logo-container')

headerLogoConatiner.addEventListener('click', () => {
  location.href = 'index.html'
})

function InitCarousel(carouselContainer)
{
  const delay = 3000; //ms

  const slides = carouselContainer.querySelector(".slides");
  const slidesCount = slides.childElementCount;
  const maxLeft = (slidesCount - 1) * 100 * -1;

  let current = 0;

  function changeSlide(next = true) {
    if (next) {
      current += current > maxLeft ? -100 : current * -1;
    } else {
      current = current < 0 ? current + 100 : maxLeft;
    }

    slides.style.left = current + "%";
  }

  let autoChange = setInterval(changeSlide, delay);
  const restart = function() {
    clearInterval(autoChange);
    autoChange = setInterval(changeSlide, delay);
  };

// Controls
  carouselContainer.querySelector(".next-slide").addEventListener("click", function() {
    changeSlide();
    restart();
  });

  carouselContainer.querySelector(".prev-slide").addEventListener("click", function() {
    changeSlide(false);
    restart();
  });
}

const carousels = document.querySelectorAll(".carousel");
for (let i = 0, count = carousels.length; i < count; i++ )
{
  InitCarousel(carousels[i]);
}



