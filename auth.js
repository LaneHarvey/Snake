firebase.initializeApp(firebaseConfig);
firebase.analytics();


const ui = new firebaseui.auth.AuthUI(firebase.auth());
const db = firebase.firestore();

const signupButton = document.querySelector(".signup")
const signinButton = document.querySelector(".signin")
const signOutButton = document.querySelector('.signout')

const mockSignupButton = document.querySelector(".mock_signup")
const mockSigninButton = document.querySelector(".mock_signin")
const soundButton = document.querySelector(".sound-toggle")
const userName = document.querySelector(".user")

const userNames = [];
const userEmails = [];

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user.email)
    db.collection("users").get().then(data => {
      data.docs.forEach(doc => {
        if (user.email === doc.data().email) {
          document.querySelector(".user").innerHTML = doc.data().username
          userEmails.push(doc.data().email)
        }
      })
    })
    document.querySelector('.mock_signup').classList.add('hidden')
    document.querySelector('.mock_signin').classList.add('hidden')
    document.querySelector('.signin').classList.add('hidden')
    AddHidden(['input_username', 'input_email', 'input_password', 'signup'])
    RemoveHidden(['signout'])
  } else {
    document.querySelector('.mock_signup').classList.remove('hidden')
    document.querySelector('.signout').classList.add('hidden')
    document.querySelector('.mock_signin').classList.remove('hidden')
    document.querySelector('.user').innerHTML = ''
  }
});

const RemoveHidden = el => el.forEach(item => document.querySelector(`.${item}`).classList.remove('hidden'))
const AddHidden = el => el.forEach(item => document.querySelector(`.${item}`).classList.add('hidden'))

mockSignupButton.addEventListener('click', () => {
  AddHidden(['mock_signup', 'mock_signin', 'signin'])
  RemoveHidden(['input_username', 'input_email', 'input_password', 'signup'])
})

mockSigninButton.addEventListener('click', () => {
  AddHidden(['mock_signup', 'mock_signin', 'signup'])
  RemoveHidden(['input_username', 'input_password', 'signin'])
})

mockSigninButton.addEventListener('click', () => {
  AddHidden(['mock_signup', 'mock_signin', 'signup'])
  RemoveHidden(['input_username', 'input_password', 'signin'])
})

soundButton.addEventListener('click', () => {

})

const getHighScore = () => {
 return db.collection("users")
  .get()
  .then(data => {
    const allUserScores = [];
    data.docs.forEach(doc => {
      userNames.push(doc.data().username)
      // console.log(doc.data())
      let score = doc.data();
      allUserScores.push(score);
      allUserScores.sort(function (a, b) {
        return b.highscore - a.highscore;
      });
    });
    document.querySelector(".top-scores").innerHTML = 
     `<p>1 - ${allUserScores[0].username}: ${allUserScores[0].highscore}</p>

      <p>2 - ${allUserScores[1].username}: ${allUserScores[1].highscore}</p>
       
      <p>3 - ${allUserScores[2].username}: ${allUserScores[2].highscore}</p>
      
      <p>4 - ${allUserScores[3].username}: ${allUserScores[3].highscore}</p>
      
      <p>5 - ${allUserScores[4].username}: ${allUserScores[4].highscore}</p>`;
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

    AddHidden(['input_username', 'input_email', 'input_password', 'signup'])
    RemoveHidden(['signout'])
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