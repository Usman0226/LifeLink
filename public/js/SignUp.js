const { json } = require("body-parser");
const { application } = require("express");

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
const formInput = {};

signIn.addEventListener("click", (e) => {
  e.preventDefault();

  //manual submission
  let form1_data = new FormData(form1);

  formInput ={
    username : form1_data.get('name'),
    password : form1_data.get('password'),
  }
  
  inputs.style.display = "none";
  profile.style.display = "flex";
});


form2.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const form2_data = new FormData(form2);
    const dbData = {
      ...formInput,
      bloodGroup : form2_data.get('bloodGroup'),
      AadharNo : form2_data.get('AadharNo'),
      Location : form2_data.get('Location'),
    }

    try {
      const submission_data = await fetch('/SignUp',{
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify(dbData)
      })

      const finalData = await submission_data.json();
      console.log('data :',finalData);
      
    } catch (error) {
          console.error("Error submitting data:", error);
    }
})

// 1.Extract using new FormData()
// 2.store as an Object
// 3.In SignUp endpoint serve the Header as /json
// 4. stringfy the data => set it to the body so it goes to req.body 
// 5. METHOD : POST
