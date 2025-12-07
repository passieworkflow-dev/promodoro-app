const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const session = document.querySelector(".minutes");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");
let myInterval;
let state = true;
let originalSessionAmount = parseInt(session.textContent) || 25;
let remainingSeconds;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);

  if (isNaN(sessionAmount) || sessionAmount <= 0) {
    alert("Please reload the page");
    return;
  }
  
  if (state) {                              //start of the timer
    state = false;
    if (!remainingSeconds) {
      remainingSeconds = originalSessionAmount * 60;
    }
    resetBtn.style.display = "none";    // hides reset button when started

  const updateSeconds = () => {
    remainingSeconds--;

    let minutesLeft = Math.floor(remainingSeconds / 60);
    let secondsLeft = remainingSeconds % 60;

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
      remainingSeconds = null;
    }
  };
    myInterval = setInterval(updateSeconds, 1000);
    startBtn.textContent = "stop";
  } else {                                       //stops the timer when stop is clicked
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
  remainingSeconds = originalSessionAmount * 60;
  secondDiv.textContent = "00";
};

startBtn.addEventListener("click", appTimer);
resetBtn.addEventListener("click", resetTimer);
