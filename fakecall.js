 const triggerBtn = document.getElementById('triggerBtn');
const fakeCallScreen = document.getElementById('fakeCallScreen');
const ringtone = document.getElementById('ringtone');

triggerBtn.addEventListener('click', () => {
    // Notify user it's scheduled (keep this subtle in a real app)
    triggerBtn.innerText = "Call Scheduled...";
    
    // Trigger call after 5 seconds
    setTimeout(() => {
        showCall();
    }, 5000);
});

function showCall() {
    fakeCallScreen.classList.remove('hidden');
    ringtone.play();
    
    // Vibrate phone if supported
    if ("vibrate" in navigator) {
        navigator.vibrate([500, 500, 500, 500, 500]);
    }
}

function endCall() {
    fakeCallScreen.classList.add('hidden');
    ringtone.pause();
    ringtone.currentTime = 0;
    triggerBtn.innerText = "Schedule Fake Call";
}

function acceptCall() {
    ringtone.pause();
    document.querySelector('.caller-info p').innerText = "00:01";
    document.querySelector('.accept').classList.add('hidden');
    // In a real app, you could play a pre-recorded voice here
}