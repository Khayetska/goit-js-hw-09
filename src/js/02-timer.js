import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dateTimePickerInputEl = document.querySelector('#datetime-picker');
const startTimerBtnEl = document.querySelector('[data-start]');
const daysNumberEl = document.querySelector('[data-days]');
const hoursNumberEl = document.querySelector('[data-hours]');
const minutesNumberEl = document.querySelector('[data-minutes]');
const secondsNumberEl = document.querySelector('[data-seconds]');

startTimerBtnEl.disabled = true;

let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    startTimerBtnEl.disabled = false;
    startTimerBtnEl.addEventListener('click', () => {
      startTimerBtnEl.disabled = true;

      intervalId = setInterval(() => {
        const timeRemaining =
          new Date(dateTimePickerInputEl.value) - new Date();
        const time = convertMs(timeRemaining);

        daysNumberEl.textContent = addLeadingZero(time.days);
        hoursNumberEl.textContent = addLeadingZero(time.hours);
        minutesNumberEl.textContent = addLeadingZero(time.minutes);
        secondsNumberEl.textContent = addLeadingZero(time.seconds);

        if (timeRemaining <= 1000) {
          clearInterval(intervalId);
          Notify.success('Time is up⏳');
        }
      }, 1000);
    });
  },
};

const fp = flatpickr(dateTimePickerInputEl, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
