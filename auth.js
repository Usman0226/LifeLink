import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./config"; 

console.log(auth);


createUserWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user;
    console.log("User signed up:", user);
  })
  .catch(error => {
    console.error("Error signing up:", error.message);
  });

signInWithEmailAndPassword(auth, email, password)
  .then(userCredential => {
    const user = userCredential.user;
    console.log("User signed in:", user);
  })
  .catch(error => {
    console.error("Login failed:", error.message);
  });
