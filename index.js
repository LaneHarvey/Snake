

var firebaseConfig = {
  apiKey: "AIzaSyCTJx-rRqR0pET19JsX2Y25in11zKS4gYI",
  authDomain: "snake-fc51b.firebaseapp.com",
  databaseURL: "https://snake-fc51b.firebaseio.com",
  projectId: "snake-fc51b",
  storageBucket: "snake-fc51b.appspot.com",
  messagingSenderId: "990318840406",
  appId: "1:990318840406:web:97eb4617ae588ce3cf49f7",
  measurementId: "G-90CLW4CVDR"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();


const ui = new firebaseui.auth.AuthUI(firebase.auth());

const db = firebase.firestore();


ui.start('#firebaseui-auth-container', {
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  // Other config options...
});


db.collection("users").get().then((data) => {
  console.log(data.docs)
  data.docs.forEach((doc) => {
    let name = doc.data().name
    console.log(name)

  });
});

// db.collection("users").get().then(function(querySnapshot) {
//   querySnapshot.forEach(function(doc) {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//   });
// });