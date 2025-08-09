const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const donateFormModal = document.getElementById("donateFormModal");
const donateFormOverlay = document.getElementById("donateFormOverlay");
const donateNowBtn = document.getElementById("donateNowBtn");
const emergencyRequestsData = [
  {
    id: 1,
    bloodType: "O-",
    location: "Mumbai",
    hospital: "City Hospital",
    units: 2,
    status: "Urgent",
  },
  {
    id: 2,
    bloodType: "A+",
    location: "Delhi",
    hospital: "Capital Health",
    units: 4,
    status: "Urgent",
  },
  {
    id: 3,
    bloodType: "B-",
    location: "Bangalore",
    hospital: "Garden City Medical",
    units: 1,
    status: "Pending",
  },
  {
    id: 4,
    bloodType: "AB+",
    location: "Mumbai",
    hospital: "Sea View Clinic",
    units: 3,
    status: "Urgent",
  },
  {
    id: 5,
    bloodType: "O+",
    location: "Chennai",
    hospital: "Marina General",
    units: 5,
    status: "Pending",
  },
  {
    id: 6,
    bloodType: "A-",
    location: "Hyderabad",
    hospital: "Deccan Hospital",
    units: 2,
    status: "Urgent",
  },
  {
    id: 7,
    bloodType: "B+",
    location: "Pune",
    hospital: "Maharashtra Clinic",
    units: 1,
    status: "Pending",
  },
  {
    id: 8,
    bloodType: "O-",
    location: "Kolkata",
    hospital: "East End Hospital",
    units: 3,
    status: "Urgent",
  },
  {
    id: 9,
    bloodType: "AB+",
    location: "Ahmedabad",
    hospital: "Gujarat Medical",
    units: 2,
    status: "Pending",
  },
  {
    id: 10,
    bloodType: "A+",
    location: "Lucknow",
    hospital: "Nawab Hospital",
    units: 4,
    status: "Urgent",
  },
];

let timer = null;

emergencyRequestBtn.addEventListener("click", () => {
  emergencyFormModal.style.display = "block";
  emergencyFormOverlay.style.display = "block";

  if(timer != null){
    clearTimeout(timer);
  }

});


//Routes 
document.addEventListener('click',(e)=>{
    if(e.target.id == "donorRegister"){
      window.location.href= "/SignUp"
    }

    if(e.target.id == 'donateNowBtn'){
      window.location.href = "/donate";
    }
    
})


function closeForm() {
  emergencyFormModal.style.display = "none";
  emergencyFormOverlay.style.display = "none";
  timer = setTimeout(()=>{
    document.querySelector("#emergencyRequestForm").reset();
    timer = null;
  },5000)
}

function closeDonateForm() {
  donateFormModal.style.display = "none";
  donateFormOverlay.style.display = "none";
}

closeEmergencyFormBtn.addEventListener("click", closeForm);

// closeDonateFormBtn.addEventListener("click", closeDonateForm);

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// function loadUserLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const lat = position.coords.latitude;
//         const lon = position.coords.longitude;
//         initMap(lat, lon);
//       },
//       (error) => {
//         console.warn("Geolocation error:", error.message);
//         alert("Couldn't get your location. Showing default location.");
//         initMap(fallbackLocation[0], fallbackLocation[1]);
//       }
//     );
//   } else {
//     alert("Geolocation not supported. Showing default location.");
//     initMap(fallbackLocation[0], fallbackLocation[1]);
//   }
// }

// Load map on page load
// window.onload = loadUserLocation;

const emergencyRequestsContainer = document.getElementById(
  "emergency-requests-container"
);
const noRequestsMessage = document.getElementById("no-requests-message");
const filterBloodType = document.getElementById("filter-blood-type");
const filterLocation = document.getElementById("filter-location");

function loadEmergencyRequests(requests) {
  emergencyRequestsContainer.innerHTML = "";
  if (requests.length === 0) {
    noRequestsMessage.style.display = "block";
  } else {
    noRequestsMessage.style.display = "none";
    let tableHtml = `
            <table class="emergency-requests-table">
                <thead>
                    <tr>
                        <th>Blood Type</th>
                        <th>Hospital</th>
                        <th>Location</th>
                        <th>Units</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;
    requests.forEach((req) => {
      const statusClass =
        req.status === "Urgent"
          ? "emergency-table-status-urgent"
          : "emergency-table-status-pending";
      tableHtml += `
                <tr>
                    <td class="emergency-table-blood-type">${req.bloodType}</td>
                    <td>${req.hospital}</td>
                    <td>${req.location}</td>
                    <td>${req.units}</td>
                    <td><span class="emergency-table-status-tag ${statusClass}">${req.status}</span></td>
                    <td><button class="emergency-table-respond-button">Respond</button></td>
                </tr>
            `;
    });
    tableHtml += `
                </tbody>
            </table>
        `;
    emergencyRequestsContainer.innerHTML = tableHtml;
  }
}

//Filtering
function filterAndloadEmergencyRequests() {
  const bloodType = filterBloodType.value;
  const location = filterLocation.value.toLowerCase();

  let filteredRequests = emergencyRequestsData;

  if (bloodType !== "all") {
    filteredRequests = filteredRequests.filter(
      (req) => req.bloodType === bloodType
    );
  }
  if (location) {
    filteredRequests = filteredRequests.filter((req) =>
      req.location.toLowerCase().includes(location)
    );
  }

  loadEmergencyRequests(filteredRequests);
}
loadEmergencyRequests(emergencyRequestsData);

loadEmergencyRequests(emergencyRequestsData);filterBloodType.addEventListener("change", filterAndloadEmergencyRequests);
filterLocation.addEventListener("input", filterAndloadEmergencyRequests);

// const bloodBanksData = [
//   {
//     id: 1,
//     name: "Red Cross Blood Bank",
//     city: "Madanapalle",
//     address: "123 Life St, Madanapalle",
//     open: "9 AM - 5 PM",
//     services: ["Whole Blood", "Platelets"],
//     lat: 13.6333,
//     lon: 78.5,
//   },
//   {
//     id: 2,
//     name: "LifeSaver Hospital",
//     city: "Anantapur",
//     address: "456 Health Ave, Anantapur",
//     open: "24 Hours",
//     services: ["Whole Blood", "Plasma"],
//     lat: 14.6819,
//     lon: 77.6006,
//   },
//   {
//     id: 3,
//     name: "Community Blood Center",
//     city: "Chittoor",
//     address: "789 Tech Park Rd, Chittoor",
//     open: "8 AM - 8 PM",
//     services: ["Whole Blood", "Platelets", "Plasma"],
//     lat: 13.2167,
//     lon: 79.1167,
//   },
//   {
//     id: 4,
//     name: "Reddrop Clinic",
//     city: "Tirupati",
//     address: "101 Marine Dr, Tirupati",
//     open: "10 AM - 6 PM",
//     services: ["Whole Blood"],
//     lat: 13.65,
//     lon: 79.4167,
//   },
//   {
//     id: 5,
//     name: "Jeevan Dhara Blood Bank",
//     city: "Kadapa",
//     address: "202 Main Rd, Kadapa",
//     open: "9 AM - 7 PM",
//     services: ["Whole Blood", "Platelets"],
//     lat: 14.4667,
//     lon: 78.8167,
//   },
//   {
//     id: 6,
//     name: "Rakthdaan Kendra",
//     city: "Kurnool",
//     address: "303 Bypass Rd, Kurnool",
//     open: "8 AM - 6 PM",
//     services: ["Whole Blood", "Plasma"],
//     lat: 15.8281,
//     lon: 78.0374,
//   },
// ];

// const bloodBankListDynamic = document.getElementById("blood-bank-list-dynamic");
// const mapLocationName = document.getElementById("map-location-name");

// function renderBloodBanks(banks) {
//   bloodBankListDynamic.innerHTML = "<h3>Available Blood Banks</h3>"; // Clear and add title

//   // Clear existing markers if map exists
//   if (mapInstance) {
//     mapInstance.eachLayer(function (layer) {
//       if (layer instanceof L.Marker) {
//         mapInstance.removeLayer(layer);
//       }
//     });
//   }

//   banks.forEach((bank) => {
//     const item = document.createElement("div");
//     item.className = "blood-bank-list-item";
//     item.dataset.bankId = bank.id;
//     item.innerHTML = `
//     <h4 style="font-weight: bold; color: #333;">${bank.name}</h4>
//     <p style="font-size: 0.9em; color: #666;">${bank.address}</p>
//     <p style="font-size: 0.8em; color: #777; margin-top: 5px;">Hours: ${
//       bank.open
//     }</p>
//     <div class="services" style="margin-top: 8px; display: flex; flex-wrap: wrap; gap: 5px;">
//     ${bank.services
//       .map(
//         (s) =>
//           `<span style="background-color: #fecaca; color: #dc2626; padding: 3px 8px; border-radius: 12px; font-size: 0.75em; font-weight: 500;">${s}</span>`
//       )
//       .join("")}
//     </div>
//     `;
//     bloodBankListDynamic.appendChild(item);

//     // Add marker to map
//     if (mapInstance && bank.lat && bank.lon) {
//       const marker = L.marker([bank.lat, bank.lon])
//         .addTo(mapInstance)
//         .bindPopup(`<b>${bank.name}</b><br>${bank.address}`);
//       marker.on("mouseover", function () {
//         item.classList.add("highlighted");
//         mapLocationName.textContent = bank.name;
//       });
//       marker.on("mouseout", function () {
//         item.classList.remove("highlighted");
//         mapLocationName.textContent = "";
//       });
//       item.marker = marker;
//     }
//   });

//   bloodBankListDynamic
//     .querySelectorAll(".blood-bank-list-item")
//     .forEach((item) => {
//       item.addEventListener("mouseover", function () {
//         item.classList.add("highlighted");
//         const bankId = parseInt(item.dataset.bankId);
//         const bank = bloodBanksData.find((b) => b.id === bankId);
//         mapLocationName.textContent = bank.name;
//         if (mapInstance && bank.lat && bank.lon) {
//           if (item.marker) {
//             item.marker.openPopup();
//           }
//         }
//       });
//       item.addEventListener("mouseout", function () {
//         item.classList.remove("highlighted");
//         mapLocationName.textContent = "";
//         if (item.marker) {
//           item.marker.closePopup();
//         }
//       });
//     });
// }

// let mapInstance = null; // To store the Leaflet map instance

// //   Map
// const fallbackLocation = [13.55, 78.5]; // Madanapalle
// const zoomLevel = 8;

// function initMap(lat, lon) {
//   if (mapInstance) {
//     mapInstance.remove();
//   }
//   mapInstance = L.map("map").setView([lat, lon], zoomLevel);

//   L.tileLayer(
//     "https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}.jpg?key=7GdPQstJTIq4t7BSTEXo",
//     {
//       tileSize: 512,
//       zoomOffset: -8,
//       attribution: '&copy; <a href="https://www.maptiler.com">YUGESH</a>',
//     }
//   ).addTo(mapInstance);

//   L.marker([lat, lon])
//     .addTo(mapInstance)
//     .bindPopup("Your approximate location")
//     .openPopup();

//   renderBloodBanks(bloodBanksData); // Render blood banks after map is initialized
// }





