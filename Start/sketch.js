function setup() {
    createCanvas(600, 300);

}

var move = 10

function draw() {

    background(39, 207, 135);
    fill(195, 210, 25);
    ellipse(move, move, 20, 20);
    move = move + 1;
}
