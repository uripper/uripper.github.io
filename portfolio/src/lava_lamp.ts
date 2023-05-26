import * as p5 from "../node_modules/p5/lib/p5.js";

class Blob {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  color: p5.Color;

  constructor(p: p5) {
    this.x = Math.random() * p.windowWidth;
    this.y = Math.random() * p.windowHeight;
    this.radius = Math.random() * 100 + 50;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 4 - 2;
    this.color = new p5.Color();
    this.color.setBlue(Math.random() * 255);
    this.color.setGreen(Math.random() * 255);
    this.color.setRed(Math.random() * 255);
    this.color.setAlpha(100);
  }

  update(p: p5) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x - this.radius < 0 || this.x + this.radius > p.windowWidth) {
      this.speedX *= -1;
    }
    if (this.y - this.radius < 0 || this.y + this.radius > p.windowHeight) {
      this.speedY *= -1;
    }
  }

  display(p: p5) {
    p.noStroke();
    p.fill(this.color);
    p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }
}

const sketch = (p: p5) => {
  let blobs: Blob[] = [];

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight);
    for (let i = 0; i < 10; i++) {
      blobs.push(new Blob(p));
    }
  };

  p.draw = () => {
    p.background(0);
    for (let blob of blobs) {
      blob.update(p);
      blob.display(p);
    }
  };
};

// Create a new p5 instance
new p5(sketch);