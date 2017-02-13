function setup() {
    createCanvas(640, 360);

}

function draw() {
    background(150);
    ellipseMode(CENTER);
    fill(255, 0, 0); //red
    rect(100, 200, 75, 150);


    fill(0, 255, 0); //green
    ellipse(width * (2 / 3), height / 3, mouseX, 30); //* (2 / 3)
    ellipse(width / 3, height / 3, 30, mouseX);
    fill(0, 0, 255);
    ellipse(width / 3, height / 3, 60, mouseY);
    if (yelCir == true){
      //instead of this v , we would need to put the info in a variable, and add it to an array, so it would stay on the background.

      fill(255, 255, 0);
      ellipse(mouseX, mouseY, 10, 10);
      yelCir = false;
    }

}
var yelCir = false;

function mousePressed() {
    yelCir = true
}
