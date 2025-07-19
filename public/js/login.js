const eye = document.querySelector("#eye");
const pass = document.querySelector("#password");
const loginBtn = document.querySelector(".btn");
const mail = document.querySelector("#email");

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

loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (mail.value !== "" && pass.value !== "") {
    window.location.href = "/public/DashBoard.html";
  }
});
