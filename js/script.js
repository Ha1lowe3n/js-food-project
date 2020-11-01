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
  const deadline = '2020-11-11';

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

  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  const setClock = (selector, endtime) => {
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds'),
          timeInterval = setInterval(updateClock, 1000);

    // чтобы таймер не моргал
    updateClock();
    
    function updateClock() {
      const t = getTimeRemaining(endtime);

      const zeroing = (timeValue, timeSelector) => {
        if (timeValue <= 0) {
          timeSelector.innerHTML = '00';  
        } else {
          timeSelector.innerHTML = getZero(timeValue);
        }
      };

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

        
});