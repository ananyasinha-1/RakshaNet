let audioCtx = null;
let oscillator = null;
let sirenInterval = null;
let isActive = false;

const sirenBtn = document.getElementById('sirenBtn');
const visualAlert = document.getElementById('visualAlert');

sirenBtn.addEventListener('click', () => {
    if (!isActive) {
        startSiren();
        sirenBtn.innerText = "🛑 STOP SIREN";
        visualAlert.classList.add('flashing');
    } else {
        stopSiren();
        sirenBtn.innerText = "🚨 START SIREN";
        visualAlert.classList.remove('flashing');
    }
    isActive = !isActive;
});

function startSiren() {
    // Create audio context
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // 'Square' wave sounds more like a mechanical alarm
    oscillator.type = 'square'; 
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();

    // Wailing effect: Frequency jumps between 600Hz and 1200Hz
    let frequency = 600;
    let rising = true;

    sirenInterval = setInterval(() => {
        if (rising) {
            frequency += 40;
            if (frequency >= 1200) rising = false;
        } else {
            frequency -= 40;
            if (frequency <= 600) rising = true;
        }
        oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    }, 20);
}

function stopSiren() {
    if (oscillator) {
        oscillator.stop();
        clearInterval(sirenInterval);
    }
}