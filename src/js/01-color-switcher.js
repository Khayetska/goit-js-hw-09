const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

let intervalId = null;
let clicked = false;

stopBtnEl.disabled = true;

startBtnEl.addEventListener('click', handleStartBtnClick);
stopBtnEl.addEventListener('click', handleStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

function handleStartBtnClick(evt) {
  clicked = true;

  if (clicked) {
    evt.target.disabled = true;
    stopBtnEl.disabled = false;
  }

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function handleStopBtnClick(evt) {
  clicked = true;

  if (clicked) {
    evt.target.disabled = true;
    startBtnEl.disabled = false;
  }
  clearInterval(intervalId);
}
