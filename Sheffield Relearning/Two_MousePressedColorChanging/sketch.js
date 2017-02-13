var col1 = 0
var col2 = 0
var col3 = 0

function setup() {
    createCanvas(750, 550);
    col1 = random(1, 255);
    col2 = random(1, 255);
    col3 = random(1, 255);
}

function draw() {
    background(69, 150, 13);
    fill(col1, col2, col3);
    stroke(col3,col1,col2);
    ellipse(mouseX, mouseY, 30, 30);


}

function mousePressed() {
    col1 = random(1, 255);
    col2 = random(1, 255);
    col3 = random(1, 255);
}
