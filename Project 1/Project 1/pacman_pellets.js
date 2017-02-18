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
    this.mouthspeed = 1.2 * this.runspeed;

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
    // if chomp sound plays
    this.playCue = true

    this.move = function() {
        this.mouthdeg = this.mouthdeg + this.mouthspeed;
        if (this.mouthdeg >= 40 || this.mouthdeg <= 5) {
            if (this.mouthdeg >= 40) {
                this.mouthdeg = 40;
            }
            if (this.mouthdeg <= 5) {
                this.mouthdeg = 5;
            }
            this.mouthspeed = this.mouthspeed * -1;
        }
        if ( /*keyIsDown(37) || keyIsDown(39) ||*/ keyIsDown(38) || keyIsDown(40)) {
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
            var playing = pacmanChomp.isPlaying()
            //console.log(playing);
            //console.log("eat", pacmanEat.isPlaying());
            if (!playing && !pacmanEat.isPlaying()) {
                pacmanChomp.play();
            }
        }
        if (this.y + (this.size / 2) >= height || this.y - (this.size / 2) <= 0) {
          pacman.size = pacman.size - 1.5;
            if (this.y + (this.size / 2) >= height) {
                this.y = height - (this.size / 2);
            }
            if (this.y - (this.size / 2) <= 0) {
                this.y = 0 + (this.size / 2);
            }
        }
    }
}


function PacPellet(size) {
    this.pacSize = size
    this.yum = false;
    this.px = random(100, width - 10);
    this.py = random(this.pacSize / 4, height - (this.pacSize / 4)); //75 is pacmans size, so we're getting Radius
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
                //console.log("hit");
            }
        }
    }
}
