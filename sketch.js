let snake;
let rez = 15;
let food;
let w;
let h;
let speed = 5;
let gameMusic;

const moveUp = document.querySelector(".move-up")
const moveRight = document.querySelector(".move-right")
const moveDown = document.querySelector(".move-down")
const moveLeft = document.querySelector(".move-left")


function preload() {
  console.log(getAudioContext().state);

  soundFormats('mp3', 'ogg');
  eatSound = loadSound('/sounds/jutsu.mp3');
  eatFiveSound = loadSound('/sounds/rasengan.mp3')
  deathSound = loadSound('/sounds/megaman-3.mp3')
  gameMusic = loadSound('/sounds/boss.mp3')
}

// soundToggle();


function setup() {

  getAudioContext().state = "running";
  let canvas = createCanvas(400, 400);
  canvas.parent('sketch-holder');
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(speed);

  snake = new Snake();
  foodLocation();
  if (getAudioContext().state === "running") {
    gameMusic.loop();
  }
}

function refresh() {
  speed = 5;
  document.querySelector(".score").innerHTML = 0;

  setup();
  foodLocation();
  redraw();
  loop();
  // gameMusic.loop();
}


function soundToggle() {
  // getAudioContext()
  if (gameMusic.isPlaying()) {
    gameMusic.stop();
  } else {
    gameMusic.loop()
  }
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

  food = createVector(x, y);
}

function dPadController() { 
  moveLeft.addEventListener('touchstart', () => {
    snake.setDir(-1,0, "left")
  })
  moveRight.addEventListener('touchstart', () => {
    snake.setDir(1, 0, "right");
  })
  moveDown.addEventListener('touchstart', () => {
    snake.setDir(0, 1, "down");
  })
  moveUp.addEventListener('touchstart', () => {
    snake.setDir(0, -1, "up");
  })
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
  // else if (key == " ") {
  //   snake.grow();
  // }
}
function draw() {
  getAudioContext().resume()

  scale(rez);
  background('fff');  
  if (snake.eat(food)) {
    let score = document.querySelector('.score').innerHTML
    foodLocation();
    eatSound.play();

    if (score % 5 === 0) {
      eatSound.stop();
      eatFiveSound.setVolume(2)
      eatFiveSound.play();
    }
  }
  snake.update();
  snake.show();

  if (snake.endGame()) {
    print("endgame");
    noLoop();

    let score = document.querySelector(".score").innerHTML;
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      let userID;
      // let score = document.querySelector(".score").innerHTML;
      db.collection("users")
        .get()
        .then(data => {

          data.docs.forEach(doc => {
            userEmail = doc.data().email
            if (userEmail === user.email) {
              if (parseInt(score) > parseInt(doc.data().highscore)) {
                db.collection("users")
                  .doc(userEmail)
                  .update({
                    highscore: score
                  })
                  .then(res => {
                    getHighScore();
                  });
                }
              }
          });
        });
    } else {
      // No user is signed in.
    }
    gameMusic.stop();
    deathSound.play();
  }
  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}