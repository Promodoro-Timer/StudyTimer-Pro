let defaultMinutes = 25;
let timeLeft = defaultMinutes * 60;
let timer = null;
let isPaused = true;
let isBreak = false;
let sessionCount = 0;

const display = document.getElementById('timeDisplay');
const input = document.getElementById('timeInput');

function updateDisplay() {
  const hrs = Math.floor(timeLeft / 3600);
  const mins = Math.floor((timeLeft % 3600) / 60);
  const secs = timeLeft % 60;

  const formatted = (hrs > 0 ? String(hrs).padStart(2, '0') + ':' : '') +
                    String(mins).padStart(2, '0') + ':' +
                    String(secs).padStart(2, '0');

  display.textContent = formatted;
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
  isPa
