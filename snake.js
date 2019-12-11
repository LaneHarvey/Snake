class Snake {
  constructor() {
    this.body = [];
    this.body[0] = createVector(floor(w / 2), floor(h / 2));
    this.xdir = 0;
    this.ydir = 0;
    this.len = 15;
    this.currentDirection = "";
  }

  // passed another parameter (direction) here so we can't run into ourselvles
  setDir(x, y, direction) {
    if (this.currentDirection === "left" && direction === "right") {
      // left
      return;
    } else if (this.currentDirection === "up" && direction === "down") {
      //right
      return;
    } else if (this.currentDirection === "right" && direction === "left") {
      //down
      return;
    } else if (this.currentDirection === "down" && direction === "up") {
      //up
      return;
    }
    this.currentDirection = direction;
    this.xdir = x;
    this.ydir = y;
  }

  update() {
    let head = this.body[this.body.length - 1].copy();
    this.body.shift();
    head.x += this.xdir;
    head.y += this.ydir;
    this.body.push(head);
  }

  grow() {
    let head = this.body[this.body.length - 1].copy();
    this.len++;
    this.body.push(head);
    document.querySelector(".score").innerHTML = this.body.length;
  }

  endGame() {
    let head = this.body[this.body.length - 1];
    let x = head.x;
    let y = head.y;
    if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
      return true;
    }

    for (let i = 0; i < this.body.length - 1; i++) {
      let part = this.body[i];
      if (part.x == x && part.y == y) {
        return true;
      }
    }
    return false;
  }

  eat(pos) {
    let head = this.body[this.body.length - 1];
    let x = head.x;
    let y = head.y;
    if (x === pos.x && y === pos.y) {
      this.grow();
      frameRate(speed++);
      return true;
    }
    return false;
  }

  show() {
    for (let i = 0; i < this.body.length; i++) {
      fill(0);
      noStroke();
      rect(this.body[i].x, this.body[i].y, 1, 1);
    }
  }
}
