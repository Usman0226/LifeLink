const eye = document.querySelector("#eye");
const pass = document.querySelector("#password");
const signIn = document.querySelector("#signIn");
const profile = document.querySelector("#Profile");
const inputs = document.querySelector('#SignUpForm');

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

signIn.addEventListener("click", (e) => {
  // e.preventDefault();
  inputs.style.display = "none";
  profile.style.display = "inline-block";

});
