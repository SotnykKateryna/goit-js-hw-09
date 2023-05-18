import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const dayEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disablet');
      startButton.addEventListener('click', () => {
        const intervalId = setInterval(() => {
          const deltaTime = selectedDates[0] - new Date();
          const { days, hours, minutes, seconds } = convertMs(deltaTime);
          updateTimerUl({ days, hours, minutes, seconds });
          if (deltaTime < 0) {
            clearInterval(intervalId);
            return;
          }
        }, 1000);
        startButton.setAttribute('disablet', '');
      });
    }
  },
};

flatpickr(datetimePicker, options);

function updateTimerUl({ days, hours, minutes, seconds }) {
  dayEl.innerText = `${days}`;
  hoursEl.innerText = `${hours}`;
  minutesEl.innerText = `${minutes}`;
  secondsEl.innerText = `${seconds}`;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
