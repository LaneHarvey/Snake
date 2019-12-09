let snake;
let rez = 20;
let food;
let w;
let h;
let speed = 5;

function setup() {
  createCanvas(500, 500);
  w = floor(width / rez);
  h = floor(height / rez);
  frameRate(5);

  snake = new Snake();
  foodLocation();
}

function foodLocation() {
  let x, y;
  let collision;

  do {
    collision = false;
    x = floor(random() * w - 1) + 1;
    y = floor(random() * h - 1) + 1;
    snake.body.forEach(bodyPiece => {
      if (x === bodyPiece.x && y === bodyPiece.y) {
        collision = true;
        console.log("collision!!", x, y);
      }
    });
  } while (collision);

  console.log(snake.body);

  food = createVector(x, y);
  console.log(food, "food");
  console.log(snake.body[0], "snake");
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
  else if (key == " ") {
    snake.grow();
  }
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
    let myButton = document.querySelector('.button').style.visibility = 'visible'
    let name = document.querySelector(".user-name");
    // if (!name) {
    //   return;
    // }
    name = name.value.toString();

    let score = document.querySelector(".score").innerHTML;
    console.log(score);
    // console.log(snake);
    db.collection("users").add({
        userName: name,
        highScore: score
    });
  }

  noStroke();
  fill(255, 0, 0);
  rect(food.x, food.y, 1, 1);
}
