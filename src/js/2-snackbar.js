import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = parseInt(event.target.elements.delay.value);
  const state = event.target.elements.state.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      state === 'fulfilled' ? resolve(delay) : reject(delay);
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.success({
        class: '.my-custom-toast',
        title: 'OK',
        titleColor: '#fff',
        titleSize: '16px',
        icon: false,
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
        messageColor: ' #fff',
        backgroundColor: '#59a10d',
        iconUrl: '/img/check2-circle.svg',
      });
    })
    .catch(delay => {
      iziToast.error({
        class: '.my-custom-toast',
        title: 'Error',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        message: `Rejected promise in ${delay}ms`,
        position: 'topCenter',
        messageColor: ' #fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        iconUrl: '/img/octagon.svg',
      });
    });
});
