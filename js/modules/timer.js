const timer = () => {
  // Timer 
  const deadline = '2020-11-30';

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
};

export default timer;