const eye = document.querySelector("#eye");
const pass = document.querySelector("#password");
const signIn = document.querySelector("#signIn");
const profile = document.querySelector("#Profile");
const inputs = document.querySelector("#SignUpForm");

eye.addEventListener("click", (e) => {
  e.preventDefault();

  const icon = document.getElementById("icon");

  if (icon.className === "fa-solid fa-eye-slash") {
    icon.className = "fa-solid fa-eye";
  } else {
    icon.className = "fa-solid fa-eye-slash";
  }

  const type = pass.getAttribute("type");

  if (type === "password") {
    pass.setAttribute("type", "text");
  } else {
    pass.setAttribute("type", "password");
  }
});

const form1 = document.querySelector("#form1");
const form2 = document.querySelector("#form2");
let formInput = {};

signIn.addEventListener("click", (e) => {
  e.preventDefault();

  //manual submission
  let form1_data = new FormData(form1);
  const password = form1_data.get("password");

  if (!passvalidator(password)) {
    console.log("Struck at the validator !");
    return;
  }

  formInput = {
    username: form1_data.get("name"),
    email: form1_data.get("email"),
    password: form1_data.get("password"),
    DOB: form1_data.get("dateOfBirth"),
  };

  inputs.style.display = "none";
  profile.style.display = "flex";
});

form2.addEventListener("submit", async (e) => {
  e.preventDefault();

  let form2_data = new FormData(form2);
  const dbData = {
    ...formInput,
    bloodGroup: form2_data.get("bloodGroup"),
    phone: form2_data.get("phone"),
    location: form2_data.get("location"),
  };
  console.log(dbData);

  try {
    const submission_data = await fetch("/SignUp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dbData),
    });
    window.location.href = "/DashBoard";
    // const finalData = await submission_data.json();
    // console.log("After stringify data :", finalData);
  } catch (error) {
    console.error("Error submitting data:", error);
  }
});

function passvalidator(pass) {
  if (pass.length < 8) {
    alert("Password must be greater than 8 characters ");
    return false;
  }
  if (!/[A-Z]/.test(pass)) {
    alert("Password must contain lower,case letters ");
    return false;
  }
  if (!/[a-z]/.test(pass)) {
    alert("Password must contain Uppercase letters ");
    return false;
  }
  if (!/[0-9]/.test(pass)) {
    alert("Password must contain atleast one number ! ");
    return false;
  }

  return true;
}



async function sendOTP() {
  const email = document.getElementById("email").value;

  const toBackEnd = await fetch("/sendOtp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await toBackEnd.json();
  if (data.success) {
    console.log("OTP sent!");
    alert("Check your email for the OTP");
  }
}

async function verifyOTP() {
  const email = document.getElementById("email").value;
  const inputOTP = document.getElementById("otp").value;

  const submission = await fetch("/verifyOtp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email,inputOTP}),
  });

  const data = await submission.json();
  if (data.success) {
    alert("OTP verified !");
  } else {
    alert("Invalid OTP ! Try again !");
  }
}


document.addEventListener('click',(e)=>{
    if(e.target.id == "sendOTP"){
      sendOTP()
    }
    if(e.target.id == "verifyOTP"){
      verifyOTP()
    }
})