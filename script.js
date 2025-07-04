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
    const value = input.value.trim();
    let h = 0, m = 0, s = 0;
    const parts = value.split(":").map(part => parseInt(part, 10));

    if (parts.length === 3) {
      [h, m, s] = parts;
    } else if (parts.length === 2) {
      [m, s] = parts;
    } else if (parts.length === 1) {
      [m] = parts;
    }

    if (!isNaN(h) && !isNaN(m) && !isNaN(s)) {
      defaultMinutes = h * 60 + m;
      timeLeft = h * 3600 + m * 60 + s;
      updateDisplay();
    }

    input.classList.add("hidden");
    display.classList.remove("hidden");
  }
});

updateDisplay();
