let defaultMinutes = 25;
let timeLeft = defaultMinutes * 60;
let timer = null;
let isPaused = true;
let isBreak = false;
let sessionCount = 0;

const display = document.getElementById('timeDisplay');
const input = document.getElementById('timeInput');

function updateDisplay() {
  const mins = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const secs = (timeLeft % 60).toString().padStart(2, '0');
  display.textContent = `${mins}:${secs}`;
}

function startTimer() {
  if (!timer) {
    timer = setInterval(() => {
      if (!isPaused) {
        timeLeft--;
        updateDisplay();
        if (timeLeft <= 0) {
          document.getElementById('alarmSound').play();
          clearInterval(timer);
          timer = null;
          isBreak = !isBreak;
          timeLeft = (isBreak ? 5 : defaultMinutes) * 60;
          if (!isBreak) {
            sessionCount++;
            document.getElementById('sessionCount').textContent = sessionCount;
          }
          startTimer();
        }
      }
    }, 1000);
  }
  isPaused = false;
}

function pauseTimer() {
  isPaused = true;
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isPaused = true;
  isBreak = false;
  timeLeft = defaultMinutes * 60;
  updateDisplay();
  sessionCount = 0;
  document.getElementById('sessionCount').textContent = 0;
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function editTime() {
  input.classList.remove("hidden");
  display.classList.add("hidden");
  input.value = display.textContent;
  input.focus();
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const [mins, secs] = input.value.split(":").map(Number);
    if (!isNaN(mins) && !isNaN(secs)) {
      defaultMinutes = mins;
      timeLeft = mins * 60 + secs;
      updateDisplay();
    }
    input.classList.add("hidden");
    display.classList.remove("hidden");
  }
});

updateDisplay();
