const eye = document.querySelector("#eye");
const pass = document.querySelector("#password");
const loginBtn = document.querySelector("#log");
const mail = document.querySelector("#email");
const rst = document.querySelector("#reset");
const forget = document.querySelector(".forget");
const passinput = document.querySelector(".password_input");
const form = document.querySelector("#loginForm");

eye.addEventListener("click", (e) => {
  e.preventDefault();
  // e.defaultPrevented();
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

loginBtn.addEventListener("submit", async (e) => {
  e.preventDefault();

  //To submit
  if (mail.value !== "" && pass.value !== "") {
    const formData = new FormData(form);
    const formObject = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (!email.value.endsWith("@gmail.com")) {
      email.setCustomValidity("Please enter an email address of @gmail.com");
    }
    
    try {
      const submission = await fetch("/LOGIN", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formObject),
      });
      // window.location.href = "/DashBoard.html";
    } catch (err) {
      console.log(err);
    }
  }
});

forget.addEventListener("click", () => {
  passinput.style.display = "none";
  rst.style.display = "inline-block";
  loginBtn.style.display = "none";
  forget.style.display = "none";
});

rst.addEventListener("click", (e) => {
  e.preventDefault();
  if (mail.value != "") {
    window.location.href = "/DashBoard.html";
  } else {
    alert("Input the mail please !");
  }
});
