import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    checkValidDate();
    console.log(selectedDates[0]);
  },
};

let selectedDate;
let counterId; 
let deltaTime;

flatpickr("#datetime-picker", options);

const input = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysRef = document.querySelector("[data-days]");
const hoursRef = document.querySelector("[data-hours]");
const minutesRef = document.querySelector("[data-minutes]");
const secondsRef = document.querySelector("[data-seconds]");

startBtn.addEventListener("click", onBtnClick);
startBtn.setAttribute("disabled", "disabled");


function checkValidDate() {
  const currentDate = options.defaultDate;

  if (currentDate > selectedDate) {
    Notify.failure("Please choose a date in the future");
  }
  startBtn.removeAttribute("disabled");
};

function onBtnClick() {
  deltaTime = selectedDate - options.defaultDate;
  startCountdown(deltaTime);

  startBtn.setAttribute("disabled", "disabled");
  input.setAttribute("disabled", "disabled");

  counterId = setInterval(() => {
      deltaTime -= 1000;
      startCountdown(deltaTime);
    }, 1000);
}

function startCountdown(deltaTime) {

  const formattedTime = convertMs(deltaTime);
  updateNumbers(formattedTime);

  if (deltaTime < 1000) {
    stopCountdown();
  }
}

function stopCountdown(){
  clearInterval(counterId);
  startBtn.removeAttribute("disabled");
  input.removeAttribute("disabled");
}

function convertMs(ms) {
  const days = Math.floor(ms / 1000 / 60 / 60 / 24);
  const hours = Math.floor(ms/ 1000 / 60 / 60 % 24);
  const minutes = Math.floor(ms / 1000 / 60 % 60);
  const seconds = Math.floor(ms / 1000 % 60);

  return { days, hours, minutes, seconds };
}


function addLeadingZero(number) {
  return String(number).padStart(2, "0");
}

function updateNumbers({days, hours, minutes, seconds}){
daysRef.textContent = addLeadingZero(days);
hoursRef.textContent = addLeadingZero(hours);
minutesRef.textContent = addLeadingZero(minutes);
secondsRef.textContent = addLeadingZero(seconds);
}