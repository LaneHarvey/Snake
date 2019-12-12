firebase.initializeApp(firebaseConfig);
firebase.analytics();

const ui = new firebaseui.auth.AuthUI(firebase.auth());
const db = firebase.firestore();

const signupButton = document.querySelector(".signup")
const signinButton = document.querySelector(".signin")
const signOutButton = document.querySelector('.signout')
const userNames = [];

const getHighScore = () => {
 return db.collection("users")
  .get()
  .then(data => {
    const allUserScores = [];
    data.docs.forEach(doc => {
      userNames.push(doc.data().username)
      let score = doc.data();
      allUserScores.push(score);
      allUserScores.sort(function (a, b) {
        return b.highscore - a.highscore;
      });
    });
    document.querySelector(".top-scores").innerHTML = 
      `1 - ${allUserScores[0].username}: ${allUserScores[0].highscore}<br/> 

       2 - ${allUserScores[1].username}: ${allUserScores[1].highscore}<br/>
       
       3 - ${allUserScores[2].username}: ${allUserScores[2].highscore}`;
  });
}

getHighScore()




signupButton.addEventListener("click", () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;

    if(userNames.includes(username)) {
      console.error('User Already Exists!')
      return;
    }
  
    if (!username) {
      return
    }

    let something = firebase.auth().createUserWithEmailAndPassword(email, password).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
    
    })
    db.collection("users").doc(email).set({
      username: username,
      email: email,
      password: password,
      highscore: 0
    });
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
