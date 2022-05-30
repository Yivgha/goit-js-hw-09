import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector(".form");
form.addEventListener("submit", onSubmitForm);

function onSubmitForm(e){
  e.preventDefault();
  
  let delay = Number(e.currentTarget.delay.value);
  const step = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    if (delay >= 0) {
      delay += step;
      checkPromise(position, delay);
    }
  };
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
};

function checkPromise(position, delay){
createPromise(position,delay)
.then(({ position, delay }) => {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
})
.catch(({ position, delay }) => {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
});
}