let countDown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");
const alarmSound = new Audio("./sound/alarm-2.mp3");
alarmSound.pause();

const timer = (seconds) => {
  //clear if any other timer is start
  clearInterval(countDown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  //   console.log({ now, then });

  countDown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      alarmSound.play();
      clearInterval(countDown);
      document.querySelector("body").classList.add("timesup");
      document.title = "Come Back";

      setInterval(() => {
        alarmSound.pause();
        document.querySelector("body").classList.remove("timesup");
      }, 30000);
      return;
    }

    displayTimeLeft(secondsLeft);
    // console.log(secondsLeft);
  }, 1000);
};

const displayTimeLeft = (seconds) => {
  const minutes = Math.floor(seconds / 60); //min
  const remonderSeconds = Math.floor(seconds % 60); //sec
  const display = `${minutes < 10 ? "0" : ""}${minutes} : ${
    remonderSeconds < 10 ? "0" : ""
  }${remonderSeconds}`;
  timerDisplay.textContent = display;
  document.title = display;
  //show how much minutes & seconds left
  //   console.log({ minutes, remonderSeconds });
};

const displayEndTime = (timestamp) => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  const adjustedHour = hour > 12 ? hour - 12 : hour;
  endTime.textContent = `Be Back At ${adjustedHour} : ${
    minutes < 10 ? "0" : ""
  }${minutes}`;
};

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}
buttons.forEach((button) => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const mins = this.minutes.value;
  timer(mins * 60);
  this.reset();
});
