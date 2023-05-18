import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = document.querySelector('input[name="delay"]');
const inputStep = document.querySelector('input[name="step"]');
const inputAmount = document.querySelector('input[name="amount"]');
const button = document.querySelector('button[type="submit"]');

button.setAttribute('disabled', '');

form.addEventListener('input', checkInputValue);
form.addEventListener('submit', onFormSubmit);

function checkInputValue() {
  if (
    parseInt(inputDelay.value) &&
    parseInt(inputStep.value) &&
    parseInt(inputAmount.value)
  ) {
    button.removeAttribute('disabled');
  }
}

function onFormSubmit(e) {
  e.preventDefault();

  let delay = parseInt(inputDelay.value);
  const step = parseInt(inputStep.value);
  const amount = parseInt(inputAmount.value);

  if (delay <= 0 || step <= 0 || amount <= 0) {
    Notiflix.Notify.failure('Value can`t be negative or zero');
    return;
  }

  for (let i = 0; i < amount; i++) {
    createPromise(i, delay);
    delay += step;
  }

  form.reset();
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve(
          Notiflix.Notify.success(
            `✅ Fulfilled promise ${position} in ${delay}ms`
          )
        );
      } else {
        reject(
          Notiflix.Notify.failure(
            `❌ Rejected promise ${position} in ${delay}ms`
          )
        );
      }
    }, delay);
  });
}

// createPromise(2, 1500)
// .then(({ position, delay }) => {
//   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
// })
// .catch(({ position, delay }) => {
//   console.log(`❌ Rejected promise ${position} in ${delay}ms`);
// });
