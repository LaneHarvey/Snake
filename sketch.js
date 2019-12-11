let snake;
let rez = 15;
let food;
let w;
let h;
let speed = 5;

function setup() {
  createCanvas(400, 400);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(speed);

  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x, y;
  let collision;

  do {
    collision = false;
    x = floor(random() * w);
    y = floor(random() * h);
    snake.body.forEach(bodyPiece => {
      if (x === bodyPiece.x && y === bodyPiece.y) {
        collision = true;
      }
    });
  } while (collision);

  console.log(snake.body);

  food = createVector(x, y);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    snake.setDir(-1, 0, "left");
  } else if (keyCode === RIGHT_ARROW) {
    snake.setDir(1, 0, "right");
  } else if (keyCode === DOWN_ARROW) {
    snake.setDir(0, 1, "down");
  } else if (keyCode === UP_ARROW) {
    snake.setDir(0, -1, "up");
  }
  // Spacebar increases the snakes length
  //   else if (key == " ") {
  //     snake.grow();
  //   }
}

function draw() {
  scale(rez);
  background(220);
  if (snake.eat(food)) {
    foodLocation();
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("endgame");
    noLoop();
    let myButton = (document.querySelector(".button").style.visibility =
      "visible");
    // let myName = (document.querySelector(".user-name").style.visibility = "visible");
    // let name = document.querySelector(".user-name");
    // if (!name) {
    //   return;
    // }
    // name = name.value.toString();

    let score = document.querySelector(".score").innerHTML;

    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      console.log(user);
      let userEmail;
      let userID;
      let score = document.querySelector(".score").innerHTML;
      db.collection("users")
        .get()
        .then(data => {
            const allUserEmails = [];
            const allUserHighScores = [];
            data.docs.forEach(doc => {
              let userEmail = doc.data().email;
              let userHighScore = doc.data().highscore;
              if (userEmail === user.email) {
                allUserEmails.push(userEmail).toString();
                allUserHighScores.push(userHighScore);
              }
            });
            if (!allUserEmails.includes(userEmail) && score > allUserHighScores) {
              console.log(`previous score ${allUserHighScores}`)
              db.collection("users").doc(allUserEmails.toString()).update({
                highscore: score
              });
            } else {
              console.error(`the email ${userEmail} already exists`);
            }
        });
    } else {
      // No user is signed in.
    }

    // db.collection("users").set({
    //   highScore: score
    // });
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}
