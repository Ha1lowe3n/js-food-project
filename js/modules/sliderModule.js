const sliderModule = () => {
  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.getElementById('total'),
        current = document.getElementById('current'),
        sliderWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        width = window.getComputedStyle(sliderWrapper).width;

  let slideIndex = 1,
      offset = 0;

  const currentSlideNumber = () => {
    if (slides.length < 10) {
      current.textContent = `0${slideIndex}`;
    } else {
      current.textContent = slideIndex;
    }
  };

  const activeDot = () => {
    dotsArr.forEach(dot => dot.style.opacity = '.5');
    dotsArr[slideIndex - 1].style.opacity = 1;
  };

  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  } else {
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  slidesField.style.width = slides.length * 100 + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';

  sliderWrapper.style.overflow = 'hidden';

  slides.forEach(slide => {
    slide.style.width = width;
  });

  slider.style.position = 'relative';

  const dots = document.createElement('ol'),
        dotsArr = [];
        
  dots.classList.add('carousel-indicators');
  slider.append(dots);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');

    if (i === 0) {
      dot.style.opacity = 1;
    }

    dots.append(dot);
    dotsArr.push(dot);
  }

  next.addEventListener('click', () => {
    if (offset === +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === slides.length) {
      slideIndex = 1;
    } else {
      slideIndex++;
    }

    currentSlideNumber();
    activeDot();
  });

  prev.addEventListener('click', () => {
    if (offset === 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    slidesField.style.transform = `translateX(-${offset}px)`;

    if (slideIndex === 1) {
      slideIndex = slides.length;
    } else {
      slideIndex--;
    }

    currentSlideNumber();
    activeDot();
  });

  dotsArr.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideTo = e.target.getAttribute('data-slide-to');

      slideIndex = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);

      slidesField.style.transform = `translateX(-${offset}px)`;

      currentSlideNumber();
      activeDot();
    });
  });
};

export default sliderModule;