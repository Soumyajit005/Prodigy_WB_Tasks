let minutes = 0,
    seconds = 0,
    milliseconds = 0,
    interval,
    isRunning = false; // Flag to prevent multiple intervals

const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const millisecondsEl = document.getElementById('milliseconds');
const lapTimesEl = document.getElementById('lap-times');

function startStopwatch() {
    if (isRunning) return; // Prevent starting a new interval if already running
    isRunning = true;
    interval = setInterval(() => {
        milliseconds += 10;
        if (milliseconds === 1000) {
            milliseconds = 0;
            seconds++;
        }
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        minutesEl.textContent = formatTime(minutes);
        secondsEl.textContent = formatTime(seconds);
        millisecondsEl.textContent = formatTime(milliseconds / 10);
    }, 10);
}

function pauseStopwatch() {
    clearInterval(interval);
    isRunning = false; // Update the flag
}

function resetStopwatch() {
    clearInterval(interval);
    isRunning = false; // Reset the flag
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    millisecondsEl.textContent = '00';
    lapTimesEl.innerHTML = '';
}

function lapStopwatch() {
    const lapTime = `${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds / 10)}`;
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapTimesEl.appendChild(lapItem);
}

function formatTime(time) {
    return time < 10 ? `0${Math.floor(time)}` : Math.floor(time);
}

document.getElementById('start').addEventListener('click', startStopwatch);
document.getElementById('pause').addEventListener('click', pauseStopwatch);
document.getElementById('reset').addEventListener('click', resetStopwatch);
document.getElementById('lap').addEventListener('click', lapStopwatch);
