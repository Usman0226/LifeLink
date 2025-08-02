const bloodBanksData = [
  {
    id: 1,
    name: "Red Cross Blood Bank",
    city: "Madanapalle",
    address: "123 Life St, Madanapalle",
    open: "9 AM - 5 PM",
    services: ["Whole Blood", "Platelets"],
    lat: 13.6333,
    lon: 78.5,
  },
  {
    id: 2,
    name: "LifeSaver Hospital",
    city: "Anantapur",
    address: "456 Health Ave, Anantapur",
    open: "24 Hours",
    services: ["Whole Blood", "Plasma"],
    lat: 14.6819,
    lon: 77.6006,
  },
  {
    id: 3,
    name: "Community Blood Center",
    city: "Chittoor",
    address: "789 Tech Park Rd, Chittoor",
    open: "8 AM - 8 PM",
    services: ["Whole Blood", "Platelets", "Plasma"],
    lat: 13.2167,
    lon: 79.1167,
  },
  {
    id: 4,
    name: "Reddrop Clinic",
    city: "Tirupati",
    address: "101 Marine Dr, Tirupati",
    open: "10 AM - 6 PM",
    services: ["Whole Blood"],
    lat: 13.65,
    lon: 79.4167,
  },
  {
    id: 5,
    name: "Jeevan Dhara Blood Bank",
    city: "Kadapa",
    address: "202 Main Rd, Kadapa",
    open: "9 AM - 7 PM",
    services: ["Whole Blood", "Platelets"],
    lat: 14.4667,
    lon: 78.8167,
  },
  {
    id: 6,
    name: "Rakthdaan Kendra",
    city: "Kurnool",
    address: "303 Bypass Rd, Kurnool",
    open: "8 AM - 6 PM",
    services: ["Whole Blood", "Plasma"],
    lat: 15.8281,
    lon: 78.0374,
  },
];

let mapInstance = null;
let markers = [];
let isExpanded = false;

const bottomSheet = document.getElementById("bottom-sheet");
const dragHandle = document.getElementById("drag-handle");
const sheetHeader = document.getElementById("sheet-header");
const bloodBankList = document.getElementById("blood-bank-list");
const mapLocationName = document.getElementById("map-location-name");
const currentLocation = document.getElementById("current-location");
const resultsCount = document.getElementById("results-count");

function toggleBottomSheet() {
  isExpanded = !isExpanded;
  bottomSheet.classList.toggle("expanded", isExpanded);
}

let startY = 0;
let currentY = 0;
let isDragging = false;

function handleTouchStart(e) {
  startY = e.touches[0].clientY;
  isDragging = true;
  bottomSheet.style.transition = "none";
}

function handleTouchMove(e) {
  if (!isDragging) return;

  currentY = e.touches[0].clientY;
  const deltaY = currentY - startY;

  if (!isExpanded && deltaY < 0) {
    const translateY = Math.max(deltaY, -200);
    bottomSheet.style.transform = `translateY(calc(100% - 120px + ${translateY}px))`;
  } else if (isExpanded && deltaY > 0) {
    const translateY = Math.min(deltaY, 200);
    bottomSheet.style.transform = `translateY(${translateY}px)`;
  }
}

function handleTouchEnd() {
  if (!isDragging) return;
  isDragging = false;

  bottomSheet.style.transition =
    "transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";

  const deltaY = currentY - startY;

  if (!isExpanded && deltaY < -50) {
    toggleBottomSheet();
  } else if (isExpanded && deltaY > 50) {
    toggleBottomSheet();
  } else {
    bottomSheet.style.transform = isExpanded
      ? "translateY(0)"
      : "translateY(calc(100% - 120px))";
  }
}

dragHandle.addEventListener("click", toggleBottomSheet);
sheetHeader.addEventListener("click", toggleBottomSheet);

if (window.innerWidth <= 768) {
  bottomSheet.addEventListener("touchstart", handleTouchStart, {
    passive: true,
  });
  bottomSheet.addEventListener("touchmove", handleTouchMove, {
    passive: false,
  });
  bottomSheet.addEventListener("touchend", handleTouchEnd);
}

// Initialize map
function initMap(lat = 13.55, lon = 78.5) {
  if (mapInstance) mapInstance.remove();

  mapInstance = L.map("map", {
    zoomControl: false,
  }).setView([lat, lon], 8);

  L.control
    .zoom({
      position: "bottomright",
    })
    .addTo(mapInstance);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(mapInstance);

  L.marker([lat, lon], {
    icon: L.divIcon({
      className: "user-location-marker",
      html: '<div style="width: 20px; height: 20px; background: #4285f4; border: 3px solid white; border-radius: 50%; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    }),
  })
    .addTo(mapInstance)
    .bindPopup("Your location")
    .openPopup();

  renderBloodBanks(bloodBanksData);
}

function renderBloodBanks(banks) {
  markers.forEach((marker) => mapInstance.removeLayer(marker));
  markers = [];

  bloodBankList.innerHTML = "";

  resultsCount.textContent = `${banks.length} blood banks found`;

  banks.forEach((bank, index) => {
    const item = document.createElement("div");
    item.className = "blood-bank-item";
    item.dataset.bankId = bank.id;
    item.innerHTML = `
                <div class="bank-name">${bank.name}</div>
                <div class="bank-address">${bank.address}</div>
                <div class="bank-hours">Hours: ${bank.open}</div>
                <div class="services-tags">
                    ${bank.services
                      .map(
                        (service) =>
                          `<span class="service-tag">${service}</span>`
                      )
                      .join("")}
                </div>

                <div class="camp_register">
                        <button class="register-btn" data-bank-id="${
                          bank.id
                        }">Register</button>
                </div>
            `;
    bloodBankList.appendChild(item);

    const marker = L.marker([bank.lat, bank.lon], {
      icon: L.divIcon({
        className: "blood-bank-marker",
        html: '<div style="width: 24px; height: 24px; background: #dc2626; border: 2px solid white; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 12px; font-weight: bold; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">+</div>',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
    }).addTo(mapInstance);

    markers.push(marker);

    marker.bindPopup(`
                <div style="min-width: 200px;">
                    <strong>${bank.name}</strong><br>
                    ${bank.address}<br>
                    <small>Hours: ${bank.open}</small>
                </div>
            `);

    marker.on("mouseover", () => {
      item.classList.add("highlighted");
      currentLocation.style.display = "block";
      mapLocationName.textContent = bank.name;
    });

    marker.on("mouseout", () => {
      item.classList.remove("highlighted");
      currentLocation.style.display = "none";
    });

    item.addEventListener("mouseover", () => {
      item.classList.add("highlighted");
      currentLocation.style.display = "block";
      mapLocationName.textContent = bank.name;
      marker.openPopup();
    });

    item.addEventListener("mouseout", () => {
      item.classList.remove("highlighted");
      currentLocation.style.display = "none";
      marker.closePopup();
    });

    item.addEventListener("click", () => {
      mapInstance.setView([bank.lat, bank.lon], 12);
      marker.openPopup();
    });
  });
}

window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => initMap(pos.coords.latitude, pos.coords.longitude),
      () => initMap()
    );
  } else {
    initMap();
  }
});

window.addEventListener("resize", () => {
  if (mapInstance) {
    setTimeout(() => {
      mapInstance.invalidateSize();
    }, 100);
  }
});

//Register form
//   const register = document.querySelector(".register-btn");
// register.addEventListener('click', () => {

//})

const regTitle = document.querySelector(".registerTitle");
const campLoc = document.getElementById("campLocation");
const registerForm = document.getElementById("registerForm");
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("register-btn")) {
    const campId = e.target.dataset.bankId;
    const selectedCamp = bloodBanksData.find((bank) => bank.id == campId);

    if (selectedCamp) {
      regTitle.textContent = `Register for ${selectedCamp.name}`;
      campLoc.value = selectedCamp.city;
      registerForm.dataset.selectedCampId = campId;
    }

    registerForm.style.display = "block";
    document.getElementById("registerFormOverlay").style.display = "block";
  }

  if (
    e.target.id === "closeregisterFormBtn" ||
    e.target.id === "registerFormOverlay"
  ) {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("registerFormOverlay").style.display = "none";
  }
});
