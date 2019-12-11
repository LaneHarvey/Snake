firebase.initializeApp(firebaseConfig);
firebase.analytics();

const ui = new firebaseui.auth.AuthUI(firebase.auth());
const db = firebase.firestore();

const signupButton = document.querySelector(".signup")
const signinButton = document.querySelector(".signin")
const signOutButton = document.querySelector('.signout')

signupButton.addEventListener("click", () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    

    if (!username) {
      console.error('need to add a username')
      return
    }

    
        firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
        // Handle Errors here.
        db.collection("users").add({
          username: username,
          email: email,
          password: password
        });
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
    })
});

//sign in function
signinButton.addEventListener('click', () => {
    // const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    let moveforward = false
    // let userEmail;
    let userPassword;

    db.collection("users").get().then((users) => {
      
      users.forEach((doc) => {
        let userEmail = doc.data().email
        let userPassword = doc.data().password
        let user = doc.data().username
        // doc.data() is never undefined for query doc snapshots
        if (user === username && userPassword === password) {
            console.log(user, userEmail, password)
            moveforward = true
            if(moveforward) {
              firebase.auth().signInWithEmailAndPassword(userEmail, password).catch((error) => {
                console.error(error, password)
            
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
              }).then(res => {
                  let currentUser = firebase.auth().currentUser
                  console.log(currentUser.uid, 'current user id')
                })
            
            }
          }
        })
    })
})

signOutButton.addEventListener('click', () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log('signed out ')
      }).catch(function(error) {
        // An error happened.
      });
})

// db.collection("users").get().then(function(querySnapshot) {
//   querySnapshot.forEach(function(doc) {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//   });
// });
