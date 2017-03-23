function Ghost(x, y, color) {
    this.ImIT = false;
    this.pos = createVector(x, y);
    this.size = 70;
    this.gCol = color;
    this.eyes = this.size / 4;
    this.velocity = createVector(0, 0);

    this.display = function() {
        push();
        ellipseMode(CENTER);
        rectMode(CENTER)
        noStroke();
        fill(this.gCol);
        translate(this.pos.x, this.pos.y);
        ellipse(0, 0, this.size, this.size);
        rect(0, 18, this.size, this.size / 1.8);
        var gap = 17.5;
        var x1 = -35;
        var x2 = -17.5;
        var x3 = -26.25;
        for (var p = 0; p < 4; p++) {
            triangle(x1, 35, x2, 35, x3, 45);
            x1 = x1 + gap
            x2 = x2 + gap
            x3 = x3 + gap
        }
        fill(255);
        ellipse(-16, -this.size / 3.5, 25, 28);
        ellipse(16, -this.size / 3.5, 25, 28);
        fill('#263e88') // blue eyes
        ellipse(-16, -this.eyes, 10, 10);
        ellipse(16, -this.eyes, 10, 10);
        pop();
    }

    this.walls = function() {
        if (this.pos.x - (this.size / 2) <= 0) {
            this.pos.x = (this.size / 2) + 1;
        } else if (this.pos.x + (this.size / 2) >= width) {
            this.pos.x = width - ((this.size / 2) - 1);
        } else if (this.pos.y + 45 >= height) {
            this.pos.y = height - 46;
        } else if (this.pos.y - (this.size / 2) <= 0) {
            this.pos.y = (this.size / 2) + 1;
        }
    }

    this.moveA = function(ghost1, ghost2) {
        this.run(ghost1, ghost2);
        this.attackA(ghost1, ghost2);
    }
    this.moveB = function(ghost1, ghost2) {
        this.run(ghost1, ghost2);
        this.attackB(ghost1);
    }
    this.moveC = function(ghost1, ghost2) {
        this.run(ghost1, ghost2);
        //this.attackC(ghost1, ghost2);
    }

    this.run = function(ghost1, ghost2) {
        var dist1 = this.pos.dist(ghost1.pos);
        var dist2 = this.pos.dist(ghost2.pos);
        if (!this.ImIT) {
            if (ghost1.ImIT) {
                //changed velocity multiplier to 3 and 5, giving quick and slow.
                //secretly dependant on who is it, as that changes if the ghost is
                //either the 1st one, or the 2nd to the "it" ghost's eyes
                if (dist1 < 300) {
                    this.velocity = p5.Vector.sub(ghost1.pos, this.pos);
                    this.velocity.normalize();
                    this.velocity.mult(5);
                    this.velocity.rotate(PI); //without rotate, it goes toward "IT".
                } else {
                    this.fear();
                }
            } else if (ghost2.ImIT) {
                if (dist2 < 300) {
                    this.velocity = p5.Vector.sub(ghost2.pos, this.pos);
                    this.velocity.normalize()
                    this.velocity.mult(3)
                    this.velocity.rotate(PI);
                } else {
                    this.fear();
                }
            } else {
                this.fear();
            }
            this.pos.add(this.velocity);
        };
    }
    this.fear = function() {
        this.velocity = p5.Vector.random2D()
        this.velocity.mult(3) //shaking in fear!
    }

    this.attackA = function(ghost1, ghost2) { //the blue Ghost
        if (this.ImIT) {
            var dist1 = this.pos.dist(ghost1.pos);
            var dist2 = this.pos.dist(ghost2.pos);
            if (frameCount % 30 == 0) { //blue checks each second
                if (dist1 < dist2) {
                    this.velocity = p5.Vector.sub(ghost1.pos, this.pos);
                    this.velocity.normalize();
                    this.velocity.mult(4);

                } else {
                    this.velocity = p5.Vector.sub(ghost2.pos, this.pos);
                    this.velocity.normalize();
                    this.velocity.mult(4);
                }
            }
            if (dist1 < this.size / 2) {
                this.ImIT = false;
                ghost1.ImIT = true;
            }
            if (dist2 < this.size / 2) {
                this.ImIT = false;
                ghost2.ImIT = true;
            }
            this.pos.add(this.velocity);
        }
    }
    this.attackB = function(ghostB) {
        if (this.ImIT) {
            var distB = this.pos.dist(ghostB.pos);
            if (frameCount % 60 == 0) { //red takes 1 second to process.
                this.velocity = p5.Vector.sub(ghostB.pos, this.pos);
                this.velocity.normalize(); //slows insane speed down
                this.velocity.mult(4); //brings speed up minorly
            }
            if (distB < this.size / 2) {
                this.ImIT = false;
                ghostB.ImIT = true;
            }
            this.pos.add(this.velocity);
        }
    }
}








//
// this.movement = function() {
//     var run = false
//     for (var i = 0; i < ghosts.length; i++) {
//         var test = ghosts[i];
//         var ghostDist = p5.Vector.dist(test.pos, this.pos);
//         console.log(ghostDist);
//         if (ghostDist <= 45) {
//             var run = true;
//         }
//     }
//
//     if (!this.ImIT) {
//         if (run) {
//             this.velocity = p5.Vector.random2D()
//             this.velocity.mult(3) //shaking in fear!
//         }
//     }
//
//     this.pos.add(this.velocity);
// }
