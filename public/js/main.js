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
