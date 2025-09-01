const donateFormModal = document.getElementById("donateFormModal");
const donateFormOverlay = document.getElementById("donateFormOverlay");
const donateNowBtn = document.getElementById("donateNowBtn");

let emergencyRequestsData = {};
let loaddata = async () => {
  try {
    const response = await fetch("/api/requestData");
    emergencyRequestsData = await response.json();
  } catch (err) {
    console.log("In main.js emergency Requests : ",err);
  }

  // console.log(emergencyRequestsData);

  loadEmergencyRequests(emergencyRequestsData);
  filterLocation.addEventListener("input", filterAndloadEmergencyRequests);
  filterBloodType.addEventListener("change", filterAndloadEmergencyRequests);
};

loaddata();

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
      (req) => req.bloodGroup === bloodType
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
    console.log("clicked ID:", id);

    const requestData = emergencyRequestsData.find(
      (r) => r._id?.toString() === id || r.id === id
    );
    console.log("Matched request data:", requestData);

    if (!requestData) {
      alert("Could not find request data!");
      return;
    }

    // Call a new function to set the form data and ID
    openRespondFormWithData(requestData);
  }

  // Your existing code to close the modal remains the same
  if (
    e.target.id === "closeRespondBtn" ||
    e.target.id === "respondFormOverlay" ||
    e.target.id === "close" ||
    e.target.classList.contains("close-path")
  ) {
    document.querySelector(".respond-form").classList.remove("show-respond");
  }
});

function openRespondFormWithData(requestData) {
  const respondFormModal = document.querySelector(".respond-form");

  document.querySelector("#hos").value = requestData.hospital;
  document.querySelector("#locationOf").value = requestData.location;
  document.getElementById("bloodGroup").value = requestData.bloodGroup;

  respondFormModal.setAttribute("data-request-id", requestData._id);

  respondFormModal.classList.add("show-respond");
}

const emerg = document.getElementById("emerg");

function updateEmergencyText() {
  if (window.innerWidth <= 768) {
    emerg.textContent = "";
  } else {
    emerg.textContent = "Emergency Request";
  }
}

// Handel respond details

async function handleRespond(requestId) {
  try {
    const response = await fetch(`/request/${requestId}/respond`, {
      method: "POST",
    });

    if (response.ok) {
      alert("Your details are sent to the requester !");
    } else {
      const error = await response.json();
      alert(`Failed to respond: ${error.error}`);
    }
  } catch (error) {
    console.error("Error responding:", error);
    alert("An unexpected error occurred while trying to respond.");
  }
}

const respondForm = document.querySelector(".respond-form form");

respondForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const respondFormModal = document.querySelector(".respond-form");
  const requestId = respondFormModal.getAttribute("data-request-id");

  if (!requestId) {
    alert("Could not find request ID.");
    return;
  }

  const formData = {
    hospitalName: document.getElementById("hos").value,
    bloodGroup: document.getElementById("bloodGroup").value,
    location: document.getElementById("locationOf").value,
    contactName: document.getElementById("requester").value,
    contactInfo: document.getElementById("number").value,
  };

  try {
    const response = await fetch(`http://localhost:3000/request/${requestId}/respond`,{
      // const response = await fetch(`https://lifelink-7ucy.onrender.com/request/${requestId}/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

    const data = await response.json();

    if (response.ok) {
      respondFormModal.classList.remove("show-respond");
      alert("Your response details have been sent to the requester!");
    } else {
      alert(`Failed to send response: ${data.error}`);
    }
  } catch (err) {
    console.error("Error submitting response:", err);
    alert("An error occurred. Please try again.");
  }
});
