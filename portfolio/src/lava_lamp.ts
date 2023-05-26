import * as p5 from "p5";

class Blob {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: p5.Color;

  constructor() {
    this.x = Math.random() * p5.windowWidth;
    this.y = Math.random() * p5.windowHeight;
    this.radius = Math.random() * 100 + 50;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.color = new p5.Color(
      Math.random() * 255,
      Math.random() * 255,
      Math.random() * 255,
      100
    );
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x - this.radius < 0 || this.x + this.radius > p5.windowWidth) {
      this.speedX *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > p5.windowHeight) {
      this.speedY *= -1;
    }
  }

  display() {
    p5.noStroke();
    p5.fill(this.color);
    p5.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}

const sketch = (p: p5) => {
  let blobs: Blob[] = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    for (let i = 0; i < 10; i++) {
      blobs.push(new Blob());
    }
  };

  p.draw = () => {
    p.background(0);
    for (let blob of blobs) {
      blob.update();
      blob.display();
    }
  };
};

// Create a new p5 instance
new p5(sketch);
