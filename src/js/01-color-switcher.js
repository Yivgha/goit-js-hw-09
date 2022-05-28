const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const bodyRef = document.querySelector("body");
const PROMPT_DELAY = 1000;
let timeoutId = null;

startBtn.addEventListener("click", onChangeColorStart);
stopBtn.addEventListener("click", onChangeColorStop);

function onChangeColorStart() {
    onChangeColorBody();
    timeoutId = setInterval(() => {
        onChangeColorBody();
    }, PROMPT_DELAY);

    startBtn.setAttribute("disabled", true);
    stopBtn.removeAttribute("disabled");
};

function onChangeColorStop() {
    clearInterval(timeoutId);
    stopBtn.setAttribute("disabled", true);
    startBtn.removeAttribute("disabled");
}

function onChangeColorBody() {
    const randomColor = getRandomHexColor();
    bodyRef.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
