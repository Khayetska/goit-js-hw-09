import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const delayInputEl = formEl.elements.delay;
const stepInputEl = formEl.elements.step;
const amountInputEl = formEl.elements.amount;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function handleCreatePromisesSubmit(evt) {
  evt.preventDefault();

  let delay = Number(delayInputEl.value);
  const step = Number(stepInputEl.value);
  const amount = Number(amountInputEl.value);

  for (let i = 0; i < amount; i += 1) {
    const position = i + 1;
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

formEl.addEventListener('submit', handleCreatePromisesSubmit);
