import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvyJhAFb-MXRosVWaS2_oEIxrlo1RP3OU",
  authDomain: "authentication-cfa62.firebaseapp.com",
  projectId: "authentication-cfa62",
  storageBucket: "authentication-cfa62.appspot.com",
  messagingSenderId: "75624581013",
  appId: "1:75624581013:web:70fb36b0620d2188b0d89c",
  measurementId: "G-HQ9NJME20W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

const auth_container = document.getElementById("auth_container");
const dashboard = document.getElementById("dashboard");

signUp.addEventListener("click", (e) => {
  var signup_password = document.getElementById("signup_password").value;
  var username = document.getElementById("username").value;
  var signup_email = document.getElementById("signup_email").value;

  createUserWithEmailAndPassword(auth, signup_email, signup_password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;

      set(ref(database, "users/" + user.uid), {
        username: username,
        signup_email: signup_email,
        signup_password: signup_password,
      });
      alert("user created!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      alert(errorMessage);
      // ..
    });
});

login.addEventListener("click", (e) => {
  var signin_email = document.getElementById("signin_email").value;
  var signin_password = document.getElementById("signin_password").value;

  signInWithEmailAndPassword(auth, signin_email, signin_password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      const dt = new Date();

      update(ref(database, "users/" + user.uid), {
        last_login: dt,
      });

      alert("user logen in!");
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

const user = auth.currentUser;
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    auth_container.style.display = "none";
    dashboard.style.display = "block";
    user_info.innerHTML = user.email;
    // ...
  } else {
    auth_container.style.display = "block";
    dashboard.style.display = "none";
    // User is signed out
    // ...
  }
});

logout.addEventListener("click", (e) => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      alert("user loged out");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // An error happened.
    });
});
