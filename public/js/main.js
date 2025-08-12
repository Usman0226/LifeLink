const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const donateFormModal = document.getElementById("donateFormModal");
const donateFormOverlay = document.getElementById("donateFormOverlay");
const donateNowBtn = document.getElementById("donateNowBtn");

// const emergencyRequestsData = [
//   {
//     id: 1,
//     bloodType: "O-",
//     location: "Mumbai",
//     hospital: "City Hospital",
//     units: 2,
//     status: "Urgent",
//   },
//   {
//     id: 2,
//     bloodType: "A+",
//     location: "Delhi",
//     hospital: "Capital Health",
//     units: 4,
//     status: "Urgent",
//   },
//   {
//     id: 3,
//     bloodType: "B-",
//     location: "Bangalore",
//     hospital: "Garden City Medical",
//     units: 1,
//     status: "Pending",
//   },
//   {
//     id: 4,
//     bloodType: "AB+",
//     location: "Mumbai",
//     hospital: "Sea View Clinic",
//     units: 3,
//     status: "Urgent",
//   },
//   {
//     id: 5,
//     bloodType: "O+",
//     location: "Chennai",
//     hospital: "Marina General",
//     units: 5,
//     status: "Pending",
//   },
//   {
//     id: 6,
//     bloodType: "A-",
//     location: "Hyderabad",
//     hospital: "Deccan Hospital",
//     units: 2,
//     status: "Urgent",
//   },
//   {
//     id: 7,
//     bloodType: "B+",
//     location: "Pune",
//     hospital: "Maharashtra Clinic",
//     units: 1,
//     status: "Pending",
//   },
//   {
//     id: 8,
//     bloodType: "O-",
//     location: "Kolkata",
//     hospital: "East End Hospital",
//     units: 3,
//     status: "Urgent",
//   },
//   {
//     id: 9,
//     bloodType: "AB+",
//     location: "Ahmedabad",
//     hospital: "Gujarat Medical",
//     units: 2,
//     status: "Pending",
//   },
//   {
//     id: 10,
//     bloodType: "A+",
//     location: "Lucknow",
//     hospital: "Nawab Hospital",
//     units: 4,
//     status: "Urgent",
//   },
// ];
let emergencyRequestsData;
let loaddata = async () => {
  const response = await fetch("/api/requestData");

  emergencyRequestsData = await response.json();
  console.log(emergencyRequestsData);

  loadEmergencyRequests(emergencyRequestsData);
  filterLocation.addEventListener("input", filterAndloadEmergencyRequests);
};

loaddata();

let timer = null;

// emergencyRequestBtn.addEventListener("click", () => {
//   emergencyFormModal.style.display = "block";
//   emergencyFormOverlay.style.display = "block";

//   if(timer != null){
//     clearTimeout(timer);
//   }

// });

//Routes
document.addEventListener("click", (e) => {
  if (e.target.id == "donorRegister") {
    window.location.href = "/SignUp";
  }

  if (e.target.id == "donateNowBtn") {
    window.location.href = "/donate";
  }
});

function closeForm() {
  emergencyFormModal.style.display = "none";
  emergencyFormOverlay.style.display = "none";
  timer = setTimeout(() => {
    document.querySelector("#emergencyRequestForm").reset();
    timer = null;
  }, 5000);
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
                    <td class="emergency-table-blood-type">${req.bloodGroup}</td>
                    <td>${req.hospital}</td>
                    <td>${req.location}</td>
                    <td>${req.Units}</td>
                    <td><span class="emergency-table-status-tag ${statusClass}">${req.status}</span></td>
                    <td><button id="resp" class="emergency-table-respond-button" data-id="${req._id}">Respond</button></td>
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

// Respond

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("emergency-table-respond-button")) {
        const id = e.target.getAttribute("data-id");
        console.log(" clicked ID:", id);

        const requestData = emergencyRequestsData.find(r => r._id?.toString() === id || r.id === id);
        console.log("Matched request data:", requestData);

        if (!requestData) {
            alert("Could not find request data!");
            return;
        }

        // Prefill form
        document.querySelector('#hos').value = requestData.hospital;
        document.querySelector('#locationOf').value = requestData.location;
        console.log(requestData.bloodGroup);
        
        document.getElementById('bloodGroup').value = requestData.bloodGroup;
      
        document.querySelector(".respond-form").classList.add("show-respond");
    }

    if (
        e.target.id === "closeRespondBtn" ||
        e.target.id === "respondFormOverlay" ||
        e.target.id === "close" ||
        e.target.classList.contains("close-path")
    ) {
        document.querySelector(".respond-form").classList.remove("show-respond");
    }
});
