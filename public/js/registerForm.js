const regTitle = document.querySelector(".registerTitle");
const campLoc = document.getElementById("campLocation");
const registerForm = document.getElementById("registerForm");

function closeForm() {
  document.getElementById("registerForm").style.display = "none";
  document.getElementById("registerFormOverlay").style.display = "none";
}

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

  if (e.target.id === "closeregisterFormBtn" || e.target.id === "registerFormOverlay") {
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("registerFormOverlay").style.display = "none";
  }
});

const form = document.querySelector("#emergencyRequestForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log(" data !");
  const formInput = new FormData(form);
  console.log("submit  !");
  const data = {
    bloodGroup: formInput.get("bloodGroup"),
    location: formInput.get("location"),
    contactName: formInput.get("contactName"),
    contactInfo: formInput.get("contactInfo"),
  };

  try {
    const submission = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    closeForm();
  } catch (err) {
    console.log("Error to submit the data !");
  }
});
