let lat = null;
let lng = null;

function activateSOS() {
  const sosBtn = document.querySelector(".sos-btn");
  const status = document.getElementById("status");
  const mapBox = document.getElementById("mapBox");
  const cancelBtn = document.getElementById("cancelBtn");

  sosBtn.innerHTML = "SOS<br>Activated";
  sosBtn.disabled = true;

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

      mapBox.innerHTML = `
        <iframe
          src="https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed"
          width="100%"
          height="100%"
          style="border:0;"
          loading="lazy">
        </iframe>
      `;
    },
    () => {
      mapBox.innerText = "❌ Location permission denied";
      document.querySelector(".sos-btn").classList.add("sos-active");
      showPopup();
      firebase.database().ref("sos/current").set({
  status: "active",
  time: new Date().toLocaleString()
});



    }
  );
}

function resetSOS() {
  if (window.firebase) {
  firebase.database().ref("sos/current").set({
    status: "cancelled",
    time: new Date().toLocaleString()
  });
}

  document.querySelector(".sos-btn").innerHTML = "TAP FOR<br>SOS";
  document.querySelector(".sos-btn").disabled = false;

  document.getElementById("status").innerText =
    "One tap to send alert and share live location";

  document.getElementById("mapBox").innerText =
    "Map / location status will appear here";

  document.getElementById("cancelBtn").disabled = true;
  firebase.database().ref("sos/current").set({
  status: "cancelled",
  time: new Date().toLocaleString()
});


  lat = null;
  lng = null;
}

function openPlace(place) {
  if (lat === null || lng === null) {
    alert("Please activate SOS first");
    return;
  }

  const url = `https://www.google.com/maps/search/${place}/@${lat},${lng},15z`;
  window.open(url, "_blank");
}

document.getElementById("policeBtn").onclick = () =>
  openPlace("police station");

document.getElementById("hospitalBtn").onclick = () =>
  openPlace("hospital");

document.getElementById("helpBtn").onclick = () =>
  openPlace("help center");
document.querySelector(".sos-btn").classList.remove("sos-active");
function showPopup() {
  const popup = document.getElementById("popup");
  popup.style.display = "block";

  setTimeout(() => {
    popup.style.display = "none";
  }, 2500);
}
