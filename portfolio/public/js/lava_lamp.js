import * as p5 from "p5";
var Blob = /** @class */ (function () {
    function Blob(p) {
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
    Blob.prototype.update = function (p) {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x - this.radius < 0 || this.x + this.radius > p.windowWidth) {
            this.speedX *= -1;
        }
        if (this.y - this.radius < 0 || this.y + this.radius > p.windowHeight) {
            this.speedY *= -1;
        }
    };
    Blob.prototype.display = function (p) {
        p.noStroke();
        p.fill(this.color);
        p.ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    };
    return Blob;
}());
var sketch = function (p) {
    var blobs = [];
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        for (var i = 0; i < 10; i++) {
            blobs.push(new Blob(p));
        }
    };
    p.draw = function () {
        p.background(0);
        for (var _i = 0, blobs_1 = blobs; _i < blobs_1.length; _i++) {
            var blob = blobs_1[_i];
            blob.update(p);
            blob.display(p);
        }
    };
};
// Create a new p5 instance
new p5(sketch);
