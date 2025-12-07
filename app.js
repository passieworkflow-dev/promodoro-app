const bells = new Audio("./sounds/bell.wav");
const startBtn = document.querySelector(".btn-start");
const resetBtn = document.querySelector(".btn-reset");
const session = document.querySelector(".minutes");
const minuteDiv = document.querySelector(".minutes");
const secondDiv = document.querySelector(".seconds");
let myInterval;
let state = true;
let originalSessionAmount;
let remainingSeconds;

 const updateDisplay = (seconds) => {
    let minutesLeft = Math.floor(seconds / 60);
    let secondsLeft = seconds % 60;
    if (secondsLeft < 10) {
      secondDiv.textContent = "0" + secondsLeft;
    } else {
      secondDiv.textContent = secondsLeft;
    }
    minuteDiv.textContent = minutesLeft;
 }

const appTimer = () => {
  const sessionAmount = parseInt(session.textContent);

  if (isNaN(sessionAmount) || sessionAmount <= 0) {
    alert("Please reload the page");
    return;
  }
  
  if (state) {                              //start of the timer
    state = false;
    if (!remainingSeconds) {
      originalSessionAmount = sessionAmount;
    }
    if (!remainingSeconds) {
      remainingSeconds = originalSessionAmount * 60;
    }
    resetBtn.style.display = "none";    // hides reset button when started

    updateDisplay(remainingSeconds);


  const updateSeconds = () => {
    remainingSeconds--;
    updateDisplay(remainingSeconds);


    if (Math.floor(remainingSeconds / 60) === 0 && remainingSeconds % 60 === 0) {
      bells.play();
      clearInterval(myInterval);
      state = true;
      startBtn.textContent = "start";
      resetBtn.style.display = "inline";
      remainingSeconds = null;
      originalSessionAmount = Null;
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
  updateDisplay(remainingSeconds);
};

startBtn.addEventListener("click", appTimer);
resetBtn.addEventListener("click", resetTimer);
