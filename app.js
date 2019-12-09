var firebaseConfig = {
  apiKey: "AIzaSyB4rorD-XdTuKWIm8LAw-i-uOZ-16e_6Q0",
  authDomain: "snake-53e2f.firebaseapp.com",
  databaseURL: "https://snake-53e2f.firebaseio.com",
  projectId: "snake-53e2f",
  storageBucket: "snake-53e2f.appspot.com",
  messagingSenderId: "955244718714",
  appId: "1:955244718714:web:dac624354d97d44d49e9c3",
  measurementId: "G-SBZVT0VX84"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

const ui = new firebaseui.auth.AuthUI(firebase.auth());
const db = firebase.firestore();
const button = document.querySelector(".button");

button.addEventListener("click", () => {
  let name = document.querySelector(".user-name");
  if (!name) {
    return;
  }

  name = name.value.toString();
  let score = document.querySelector(".score").innerHTML;
  db.collection("users")
    .get()
    .then(data => {
      const allUserNames = [];
      data.docs.forEach(doc => {
        let name = doc.data().userName;
        allUserNames.push(name);
      });

      if (!allUserNames.includes(name)) {
        db.collection("users").add({
          userName: name,
          highScore: score
        });
      } else {
        console.error(`the username ${name} alrady exists`);
      }
    });
});

// ui.start('#firebaseui-auth-container', {
//   signInOptions: [
//     firebase.auth.EmailAuthProvider.PROVIDER_ID
//   ],
//   // Other config options...
// });

// db.collection("users").get().then(function(querySnapshot) {
//   querySnapshot.forEach(function(doc) {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//   });
// });
