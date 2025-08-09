const emergencyFormModal = document.getElementById("emergencyFormModal");
const emergencyFormOverlay = document.getElementById("emergencyFormOverlay");
const emergencyRequestBtn = document.getElementById("emergencyRequestBtn");
const closeEmergencyFormBtn = document.getElementById("closeEmergencyFormBtn");

emergencyRequestBtn.addEventListener("click", () => {
  emergencyFormModal.style.display = "block";
  emergencyFormOverlay.style.display = "block";
});

function closeForm() {
  emergencyFormModal.style.display = "none";
  emergencyFormOverlay.style.display = "none";
}

function closeDonateForm() {
  donateFormModal.style.display = "none";
  donateFormOverlay.style.display = "none";
}

closeEmergencyFormBtn.addEventListener("click", closeForm);

const submissionBtn = document.querySelector("#requestSubmission");
const emergencyRequestForm = document.querySelector("#emergencyRequestForm");

emergencyRequestForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("clicked");

  const formData = new FormData(emergencyRequestForm);

  const requestData = {
    bloodGroup: formData.get("bloodGroup"),
    Units: formData.get("bloodUnits"),
    location: formData.get("location"),
    hospital: formData.get("hospitalName"),
    contactNumber: formData.get("contactInfo"),
    contactName: formData.get("contactName"),
    Reason: formData.get("Reason"),
  };

  try {
    const submissionData = await fetch("/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    alert("Emergency Request Successfully Sent !");
    closeForm();
  } catch (err) {
    alert("Request submission failed !");
    closeForm();
  }
});
