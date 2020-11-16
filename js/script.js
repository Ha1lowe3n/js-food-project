document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // Tabs
  const tabContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        tabs = tabsParent.querySelectorAll('.tabheader__item');

  const hideTabContent = () => {
    tabContent.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show', 'fade');
    });

    tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };

  const showTabContent = (i = 0) => {
      tabContent[i].classList.add('show', 'fade');
      tabContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
  };

  hideTabContent();
  showTabContent();

  tabsParent.addEventListener('click', e => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((item, i) => {
        if (target === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });


  // Timer 
  const deadline = '2020-11-13';

  // Функция, которая расчитывает время между дедлайном и настоящим временем
  const getTimeRemaining = (endtime) => {
    const t = Date.parse(endtime) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor( (t / (1000 * 60 * 60)) % 24),
          minutes = Math.floor( (t / (1000 * 60) % 60) ),
          seconds = Math.floor(( t / 1000) % 60);

    return {
      t,
      days,
      hours,
      minutes,
      seconds
    };
  };

  const getZero = (num) => num >= 0 && num < 10 ?
    `0${num}` : num;

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    updateClock(); // чтобы таймер не моргал при загрузке страницы 
    
    function updateClock() {
      const t = getTimeRemaining(endtime);

      const zeroing = (timeValue, timeSelector) => timeValue <= 0 ? 
        timeSelector.innerHTML = '00' : 
        timeSelector.innerHTML = getZero(timeValue);

      zeroing(t.days, days);
      zeroing(t.hours, hours);
      zeroing(t.minutes, minutes);
      zeroing(t.seconds, seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  setClock('.timer', deadline);


  // Modal
  const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

  const openModal = () => {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.overflow = 'hidden'; // отключаем прокрутку страницы
    clearInterval(modalTimerId);
  };

  const closeModal = () => {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.overflow = '';
  };

  modalTrigger.forEach((btn) => btn.addEventListener('click', openModal));

  modalCloseBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) { 
      closeModal(); 
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  const modalTimerId = setTimeout(openModal, 15000);

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);


  // Используем классы для карточек
  class MenuCard {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.transfer = 27;
      this.classes = classes;
      this.parentSelector = document.querySelector(parentSelector);

      this.changeToUAH();
    }

    changeToUAH() {
      this.price *= this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Цена:</div>
          <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>
      `;

      this.parentSelector.append(element);
    }
  }

  new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    9,
    '.menu .container'
  ).render();

  new MenuCard(
    "img/tabs/post.jpg",
    "post",
    'Меню "Постное"',
    'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    14,
    ".menu .container",
    'menu__item'
  ).render();

  new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    'Меню “Премиум”',
    'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    21,
    ".menu .container",
    'menu__item'
  ).render();


  // Forms
  const forms = document.querySelectorAll('form');

  const message = {
    loading: 'Загрузка...',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };

  const postData = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      statusMessage.textContent = message.loading;
      form.append(statusMessage);

      const request = new XMLHttpRequest();
      request.open('POST', 'server.php');

      //  Заголовок не нужен при XMLHttpRequest + FormData, он назначается автоматически
      request.setRequestHeader('Content-type', 'application/json');
      const formData = new FormData(form);

      const obj = {};
      formData.forEach((value, key) => obj[key] = value);

      request.send(JSON.stringify(obj));

      request.addEventListener('load', () => {
        if (request.status === 200) {
          console.log(request.response);
          statusMessage.textContent = message.success;

          form.reset();
          setTimeout(() => {
            statusMessage.remove();
          }, 3000);
        } else {
          statusMessage.textContent = message.failure;
        }
      });
    });
  };

  forms.forEach(item => {
    postData(item);
  });


});