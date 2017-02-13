var pacman;
var pacSize = 75;
var pacX = 0
var pacY = 0
var title;
var pacmanChomp;
var pacmanEat;
var pacmanStart;
var pellets = [];
var score = 0

function preload() {
    pacmanChomp = loadSound('pacman_chomp.wav');
    pacmanEat = loadSound('pacman_eatfruit.wav');
    pacmanStart = loadSound('pacman_beginning.wav')
    title = loadImage('Title.png');
}

function setup() {
    createCanvas(1200, 700);
    frameRate(30);
    pacX = 50;
    pacY = height / 2;
    pacman = new Pacman(pacX, pacY, pacSize);
    for (var i = 0; i < 8; i++) {
        pellets[i] = new PacPellet(pacSize);
    }
    pacmanStart.play();
}

function draw() {
    background(0);
    pacman.display();
    if (pacmanStart.isPlaying()) {
        imageMode(CENTER);
        image(title, width / 2, height / 2);
    } else {
        textSize(15);
        fill(255);
        text("Score is: " + score + ". Size is: " + round(pacman.size) + ".", 22, 22);
        pacman.move();
        for (var i = 0; i < pellets.length; i++) {
            pellets[i].display();
            pellets[i].collide(pacman);
            if (pellets[i].yum) {
                pellets.splice(i, 1);
                pacmanChomp.stop();
                pacmanEat.play();
                pacman.size = pacman.size * 1.1;
            }
        }
    }
}

function Pacman(x, y, size) {
    //parameters
    this.x = x;
    this.y = y;
    //pacmans' size
    this.size = size;

    //pacman's arc angles
    this.eyedeg = 25;
    this.eDegR = radians(this.eyedeg);
    this.mouthdeg = 5;
    this.runspeed = 3;
    this.mouthspeed = 1.5 * this.runspeed;

    this.display = function() {
        push();
        noStroke();
        fill(230, 255, 0);
        translate(this.x, this.y);

        if (keyIsDown(38)) {
            rotate(-HALF_PI);
        } else if (keyIsDown(40)) {
            rotate(HALF_PI);
            //} else if (keyIsDown(37)) {
            //     scale(-1, 1);
        } else {
            scale(1, 1);
        }

        //pacman
        this.mDegR = radians(this.mouthdeg);
        arc(0, 0, this.size, this.size, this.mDegR, TWO_PI - this.mDegR, PIE);
        //eyes
        fill(0);
        arc(0, -this.size / 4, this.size / 8, this.size / 8, PI + this.eDegR, PI - this.eDegR, PIE);
        pop();


    };
    this.move = function() {
        this.playCue = false;
        if ( /*keyIsDown(37) || keyIsDown(39) ||*/ keyIsDown(38) || keyIsDown(40)) {
            this.mouthdeg = this.mouthdeg + this.mouthspeed;
            this.playCue = true
            if (this.mouthdeg >= 40 || this.mouthdeg <= 5) {
                if (this.mouthdeg >= 40) {
                    this.mouthdeg = 40;
                }
                if (this.mouthdeg <= 5) {
                    this.mouthdeg = 5;
                }
                this.mouthspeed = this.mouthspeed * -1;
            }

            if (keyIsDown(38)) {
                this.x = this.x;
                this.y = this.y - this.runspeed;
                //rotate()
            } else if (keyIsDown(40)) {
                this.x = this.x;
                this.y = this.y + this.runspeed;
            }
        } else { // if (keyIsDown(39))
            this.x = this.x + this.runspeed;
            this.y = this.y;
            //this.size = this.size + 2; //test to make pacman larger. Works. #Snake
            //else if (keyIsDown(37)) {
            //this.x = this.x - this.runspeed;
            //  this.y = this.y;
            //}
        }
        if (this.playCue) {
            pacmanChomp.playMode('restart');
            pacmanChomp.play();
            var playing = pacmanChomp.isPlaying()
            if (playing = true) {
                //pacmanChomp.stop();
            }
        }
    }
}


function PacPellet(size) {
    this.pacSize = size
    this.yum = false;
    this.px = random(100, width - 10);
    this.py = random(this.pacSize / 2, height - (this.pacSize / 2)); //75 is pacmans size, so we're getting Radius
    this.display = function() {
        push();
        noStroke();
        fill(230, 255, 0);
        ellipseMode(CENTER);
        ellipse(this.px, this.py, 15, 15);
        pop();

        this.collide = function(pacman) {
            this.yum = collideCircleCircle(this.px, this.py, 15, pacman.x, pacman.y, pacman.size);
            if (this.yum) {
                console.log("hit");
            }
        }
    }
}
