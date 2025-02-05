let time = 0;
let isRunning = false;
let interval = null;
let laps = [];

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsContainer = document.getElementById('lapsContainer');
const lapsList = document.getElementById('lapsList');

// SVG icons for play/pause
const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>`;
const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="4" height="16" x="6" y="4"></rect><rect width="4" height="16" x="14" y="4"></rect></svg>`;

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
    display.textContent = formatTime(time);
}

function startStop() {
    if (!isRunning) {
        isRunning = true;
        startStopBtn.innerHTML = pauseIcon;
        startStopBtn.classList.add('running');
        lapBtn.disabled = false;
        interval = setInterval(() => {
            time += 10;
            updateDisplay();
        }, 10);
    } else {
        isRunning = false;
        startStopBtn.innerHTML = playIcon;
        startStopBtn.classList.remove('running');
        lapBtn.disabled = true;
        clearInterval(interval);
    }
}

function reset() {
    isRunning = false;
    time = 0;
    laps = [];
    clearInterval(interval);
    updateDisplay();
    startStopBtn.innerHTML = playIcon;
    startStopBtn.classList.remove('running');
    lapBtn.disabled = true;
    lapsContainer.classList.add('hidden');
    lapsList.innerHTML = '';
}

function recordLap() {
    laps.unshift(time);
    lapsContainer.classList.remove('hidden');
    updateLapsList();
}

function updateLapsList() {
    lapsList.innerHTML = laps.map((lapTime, index) => `
        <div class="lap-item">
            <span>Lap ${laps.length - index}</span>
            <span class="lap-time">${formatTime(lapTime)}</span>
        </div>
    `).join('');
}

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', reset);
