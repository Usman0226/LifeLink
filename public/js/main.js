const emergencyFormModal = document.getElementById("emergencyFormModal");
const emergencyFormOverlay = document.getElementById("emergencyFormOverlay");
const emergencyRequestBtn = document.getElementById("emergencyRequestBtn");
const closeEmergencyFormBtn = document.getElementById("closeEmergencyFormBtn");
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const donateFormModal = document.getElementById("donateFormModal");
const donateFormOverlay = document.getElementById("donateFormOverlay");
const donateNowBtn = document.getElementById("donateNowBtn");
const closeDonateFormBtn = document.getElementById("closeDonateFormBtn");

emergencyRequestBtn.addEventListener("click", () => {
  emergencyFormModal.style.display = "block";
  emergencyFormOverlay.style.display = "block";
});

donateNowBtn.addEventListener("click", () => {
  donateFormModal.style.display = "block";
  donateFormOverlay.style.display = "block";
  // donateFormModal.classList.add("slide-up");
});

function closeForm() {
  emergencyFormModal.style.display = "none";
  emergencyFormOverlay.style.display = "none";
}

function closeDonateForm() {
  donateFormModal.style.display = "none";
  donateFormOverlay.style.display = "none";
  // donateFormModal.classList.remove("slide-up");
}

closeEmergencyFormBtn.addEventListener("click", closeForm);

closeDonateFormBtn.addEventListener("click", closeDonateForm);


menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

const fallbackLocation = [13.55, 78.5]; // Madanapalle
const zoomLevel = 10;

function initMap(lat, lon) {
  const map = L.map('map').setView([lat, lon], zoomLevel);

  // Add tiles
  L.tileLayer('https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=7GdPQstJTIq4t7BSTEXo', {
    tileSize: 512,
    zoomOffset: -1,
    attribution: '&copy; <a href="https://www.maptiler.com">YUGESH</a>',
  }).addTo(map);

  // Add marker
  L.marker([lat, lon]).addTo(map)
    .bindPopup("You are here!")
    .openPopup();
}

function loadUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        initMap(lat, lon);
      },
      (error) => {
        console.warn("Geolocation error:", error.message);
        alert("Couldn't get your location. Showing default location.");
        initMap(fallbackLocation[0], fallbackLocation[1]);
      }
    );
  } else {
    alert("Geolocation not supported. Showing default location.");
    initMap(fallbackLocation[0], fallbackLocation[1]);
  }
}

// Load map on page load
window.onload = loadUserLocation;
