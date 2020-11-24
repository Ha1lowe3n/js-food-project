const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalTimerId = setTimeout(openModal, 50000);

function openModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.overflow = 'hidden'; 
  clearInterval(modalTimerId);
}

const closeModal = () => {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.overflow = '';
};

const modalWindow = () => {
  

  modalTrigger.forEach((btn) => btn.addEventListener('click', openModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.getAttribute('data-close') === '') { 
      closeModal(); 
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });

  

  const showModalByScroll = () => {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      openModal();
      window.removeEventListener('scroll', showModalByScroll);
    }
  };

  window.addEventListener('scroll', showModalByScroll);
};

export default modalWindow;
export {openModal, closeModal};
