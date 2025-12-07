const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const session = document.querySelector(".minutes");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");
let myInterval;
let state = true;
let originalSessionAmount;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (isNaN(sessionAmount) || sessionAmount <= 0) {
    alert("Please reload the page");
    return;
  }
  
  if (state) {
    state = false;
    let totalSeconds = sessionAmount * 60;
    originalSessionAmount =sessionAmount;

  const updateSeconds = () => {
    totalSeconds--;

    let minutesLeft = Math.floor(totalSeconds / 60);
    let secondsLeft = totalSeconds % 60;

    if (secondsLeft < 10) {
      secondDiv.textContent = "0" + secondsLeft;
    } else {
      secondDiv.textContent = secondsLeft;
    }
    minuteDiv.textContent = minutesLeft;

    if (minutesLeft === 0 && secondsLeft === 0) {
      bells.play();
      clearInterval(myInterval);
      state = true;
      startBtn.textContent = "start";
      resetBtn.style.display = "inline";      
    }
  };
    myInterval = setInterval(updateSeconds, 1000);
    startBtn.textContent = "stop";
  } else {
    clearInterval(myInterval);
    state = true;
    startBtn.textContent = "start";
    resetBtn.style.display = "inline";
  }
};

const resetTimer = () => {
  clearInterval(myInterval);
  state = true;
  startBtn.textContent = "start";
  resetBtn.style.display = "none";
  minuteDiv.textContent = originalSessionAmount || 0;
  secondDiv.textContent = "00";
};

startBtn.addEventListener("click", appTimer);
resetBtn.addEventListener("click", resetTimer);
