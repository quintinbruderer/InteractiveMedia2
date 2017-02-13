var cirInfo = {
    cirX: 0,
    cirY: 0,
    hueD: 0,
    place: 0
};

function setup() {
    createCanvas(650, 400);
    cirInfo.hueD = random(0, 50);
}

function draw() {
    background(0);
    cirInfo.hueD = map(cirInfo.hueD, 0, 50, 0, 360);
    fill(255);
    text(cirInfo.cirX, 20, 20);
    text(cirInfo.cirY, 20, 45);
    cirInfo.place = dist(0,0,cirInfo.cirX,cirInfo.cirY); // 0's for top corner, x y circle center. Tested with mouse coordinances in cir placement. 
    text(cirInfo.place + " is where the ball is at from the top corner.", 20, 65);
    colorMode(HSB)
    fill(cirInfo.hueD, 100, 100);
    ellipse(cirInfo.cirX, cirInfo.cirY, 18, 18);
    cirInfo.cirX++;
    cirInfo.cirY = cirInfo.cirX * 1.5;
    cirInfo.hueD = random(0, 50);

}
