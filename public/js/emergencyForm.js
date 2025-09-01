const emergencyFormModal = document.getElementById("emergencyFormModal");
const emergencyFormOverlay = document.getElementById("emergencyFormOverlay");
const emergencyRequestBtn = document.getElementById("emergencyRequestBtn");
const closeEmergencyFormBtn = document.getElementById("closeEmergencyFormBtn");

emergencyRequestBtn.addEventListener("click", async () => {
  console.log("I'm clicked ! ");

  try {
    console.log("at fetching ....");

    const res = await fetch("/auth/emegencyForm", {
      method: "post",
      headers: { "Content-Type": "application/json" },
    });
    if (res.ok) {
      emergencyFormModal.style.display = "block";
      emergencyFormOverlay.style.display = "block";
    } else {
      const userSignUp = document.getElementById("userSignUp");
      document.getElementById("userSignUpOverlay").style.display = "flex";
      userSignUp.style.display = "block";
      document.documentElement.style.overflow = "hidden";
      // document.body.style.overflow = "hidden";
      userSignUp.style.zIndex = "999999";

      handleUserSubmission();
    }
  } catch (error) {
    alert("Server timeout in emergencyForm.js , Please try again later !");
    console.log(error, "Check emergencyForm !");
  }
});

function closeForm() {
  emergencyFormModal.style.display = "none";
  emergencyFormOverlay.style.display = "none";
}

function closeDonateForm() {
  donateFormModal.style.display = "none";
  donateFormOverlay.style.display = "none";
}


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
    email: formData.get("email"),
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

const handleUserSubmission = async (e) => {
  e.preventDefault();
  const form = document.querySelector(".userForm");
  const formData = new FormData(form);

  const userData = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
  };

  form.addEventListener("submit", async () => {
    try {
      const submission = await fetch("/submit/userInfo", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
    } catch (error) {
      alert("Failed to sent user info ! ", error);
    }
  });
};
