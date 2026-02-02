 let lat = null;
let lng = null;

// --- SOS Activation ---
function activateSOS() {
    const sosBtn = document.querySelector(".sos-btn");
    const status = document.getElementById("status");
    const mapBox = document.getElementById("mapBox");
    const cancelBtn = document.getElementById("cancelBtn");

    sosBtn.innerHTML = "SOS<br>Activated";
    sosBtn.disabled = true;
    sosBtn.classList.add("sos-active");

    status.innerText = "🚨 Alert sent & location sharing started";
    cancelBtn.disabled = false;
    mapBox.innerText = "📍 Fetching live location...";

    if (!navigator.geolocation) {
        mapBox.innerText = "❌ Location not supported";
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;

            // Fixed Embed URL
            mapBox.innerHTML = `
                <iframe
                    src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed"
                    width="100%"
                    height="100%"
                    style="border:0;"
                    loading="lazy">
                </iframe>`;

            // Firebase Update
            if (window.firebase) {
                firebase.database().ref("sos/current").set({
                    status: "active",
                    latitude: lat,
                    longitude: lng,
                    time: new Date().toLocaleString()
                });
            }
            showPopup();
        },
        () => {
            mapBox.innerText = "❌ Location permission denied";
        }
    );
}

// --- Reset SOS ---
function resetSOS() {
    if (window.firebase) {
        firebase.database().ref("sos/current").set({
            status: "cancelled",
            time: new Date().toLocaleString()
        });
    }

    const sosBtn = document.querySelector(".sos-btn");
    sosBtn.innerHTML = "TAP FOR<br>SOS";
    sosBtn.disabled = false;
    sosBtn.classList.remove("sos-active");

    document.getElementById("status").innerText = "One tap to send alert and share live location";
    document.getElementById("mapBox").innerText = "Map / location status will appear here";
    document.getElementById("cancelBtn").disabled = true;

    lat = null;
    lng = null;
}

// --- Emergency Places ---
function openPlace(place) {
    if (lat === null || lng === null) {
        alert("Please activate SOS first to get your location.");
        return;
    }
    // Fixed Search URL
    const url = `https://www.google.com/maps/search/${place}/@${lat},${lng},15z`;
    window.open(url, "_blank");
}

// Button Assignments
document.getElementById("policeBtn").onclick = () => openPlace("police station");
document.getElementById("hospitalBtn").onclick = () => openPlace("hospital");
document.getElementById("helpBtn").onclick = () => openPlace("help center");

// --- Fake Call Connection ---
const fakeBtn = document.getElementById("fakecallBtn");
if (fakeBtn) {
    fakeBtn.onclick = function() {
        const originalText = this.innerText;
        this.innerText = "Loading...";
        this.style.backgroundColor = "#ffc107"; 

        setTimeout(() => {
            window.location.href = "fakecall.html";
            this.innerText = originalText;
            this.style.backgroundColor = ""; 
        }, 5000); 
    };
}

// --- Siren Connection ---
const sirenBtn = document.getElementById("sirenBtn"); 
if (sirenBtn) {
    sirenBtn.onclick = function() {
        const originalText = this.innerText;
        this.innerText = "Opening Siren...";
        this.style.backgroundColor = "#d63031"; // Alarm red color

        setTimeout(() => {
            window.location.href = "siren.html";
            this.innerText = originalText;
            this.style.backgroundColor = ""; 
        }, 500); 
    };
}

// --- Popup Utility ---
function showPopup() {
    const popup = document.getElementById("popup");
    if (popup) {
        popup.style.display = "block";
        setTimeout(() => {
            popup.style.display = "none";
        }, 2500);
    }
}