function setup() {
    createCanvas(600, 300);

}

var ballX = 5
var ballY = 5
var ballSpeed = 1
var by = ballSpeed
var bx = ballSpeed

function draw() {

    background(39, 207, 135);
    fill(195, 210, 25);
    ellipse(ballX, ballY, 20, 20);

    ballX = ballX + bx;
    ballY = ballY + by;

    if (ballX <= 0 || ballX >= width) {
        bx = bx * -(ballSpeed * 1.2);
    }
    if (ballY <= 0 || ballY >= height) {
        by = by * -(ballSpeed * 1.2);
    }

    if (bx >= 15 || bx <= -15 || by >= 15 || by <= -15) {
        bx = 1;
        by = 1;
    }
}
