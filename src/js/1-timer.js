import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  dateInput: document.querySelector('#datetime-picker'),
  startButton: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let countdownInterval = null;

refs.startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate < new Date()) {
      iziToast.error({
        class: '.my-custom-toast',
        title: 'Error',
        message: 'Please choose a date in the future',
        titleColor: '#fff',
        titleSize: '16px',
        titleLineHeight: '1.5',
        messageColor: ' #fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ef4040',
        iconUrl: './img/octagon.svg',
        position: 'topRight',
      });
      refs.startButton.disabled = true;
    } else {
      refs.startButton.disabled = false;
    }
  },
};

flatpickr(refs.dateInput, options);

refs.startButton.addEventListener('click', () => {
  refs.startButton.disabled = true;
  refs.dateInput.disabled = true;

  countdownInterval = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      dateInput.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  refs.daysValue.textContent = addLeadingZero(days);
  refs.hoursValue.textContent = addLeadingZero(hours);
  refs.minutesValue.textContent = addLeadingZero(minutes);
  refs.secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
