function Ghost(x, y, color, maxSpeed, id) {
    this.ImIT = false;
    this.pos = createVector(x, y);
    this.size = 70;
    this.gCol = color;
    this.eyes = this.size / 4;
    this.velocity = createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.cntDownTimer = 60;
    this.id = id;

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
        ellipse(-16, -this.size / 3.5, 26, 28);
        ellipse(16, -this.size / 3.5, 26, 28);
        var heading = this.velocity.copy();
        heading.normalize();
        heading.mult((this.velocity.mag() / this.maxSpeed) * 10);
        heading.limit(10);
        translate(heading.x, heading.y);
        if (this.ImIT) {
            fill('#263e88'); // blue eyes
        } else {
            fill(0);
        }
        ellipse(-16, -this.eyes, 10, 10);
        ellipse(16, -this.eyes, 10, 10);
        pop();
        //console.log(this.id, this.pos);
    }

    this.walls = function() {
        // if (this.pos.x - (this.size / 2) <= 0) {
        //     this.pos.x = (this.size / 2) + 1;
        // } else if (this.pos.x + (this.size / 2) >= width) {
        //     this.pos.x = width - ((this.size / 2) - 1);
        // } else if (this.pos.y + 45 >= height) {
        //     this.pos.y = height - 46;
        // } else if (this.pos.y - (this.size / 2) <= 0) {
        //     this.pos.y = (this.size / 2) + 1;
        // }

        var adjust = 0;

        if (this.pos.x < bounds.left) {
            adjust = this.pos.x - bounds.left;
            this.pos.x = bounds.right + adjust;
        } else if (this.pos.x > bounds.right) {
            adjust = bounds.right - this.pos.x;
            this.pos.x = bounds.left + adjust;
        }
        if (this.pos.y < bounds.top) {
            adjust = this.pos.y - bounds.top;
            this.pos.y = bounds.bottom + adjust;
        } else if (this.pos.y > bounds.bottom) {
            adjust = bounds.bottom - this.pos.y;
            this.pos.y = bounds.top + adjust;
        }
    }

    this.moveA = function(ghost1, ghost2) {
        this.run(ghost1, ghost2);
        this.attackA(ghost1, ghost2);
    }
    this.moveB = function(ghost1, ghost2) {
        this.run(ghost1, ghost2);
        this.attackB(ghost1, ghost2);
    }
    this.moveC = function(ghost1, ghost2) {
        this.run(ghost1, ghost2);
        this.attackC(ghost1, ghost2);
    }

    this.run = function(ghost1, ghost2) {
        var dist1 = this.pos.dist(ghost1.pos);
        var dist2 = this.pos.dist(ghost2.pos);
        if (!this.ImIT) {
            if (ghost1.ImIT) {
                if (dist1 < 300) {

                    // this.velocity = p5.Vector.sub(ghost1.pos, this.pos);
                    // this.velocity.normalize();
                    // this.velocity.mult(5);

                    this.acc = p5.Vector.sub(ghost1.pos, this.pos);
                    this.velocity.add(this.acc);
                    this.velocity.limit(this.maxSpeed);


                    this.velocity.rotate(PI); //without rotate, it goes toward "IT".
                } else {
                    this.fear();
                }
            } else if (ghost2.ImIT) {
                if (dist2 < 300) {
                    // this.velocity = p5.Vector.sub(ghost2.pos, this.pos);
                    // this.velocity.normalize()
                    // this.velocity.mult(3)
                    // this.velocity.rotate(PI);

                    this.acc = p5.Vector.sub(ghost2.pos, this.pos);
                    this.velocity.add(this.acc);
                    this.velocity.limit(this.maxSpeed);

                    this.velocity.rotate(PI); //without rotate, it goes toward "IT".
                } else {
                    this.fear();
                }
            } else {
                this.fear(); //only needed as a safe measure for smoothness
            }
            this.pos.add(this.velocity);
        };
    }
    this.fear = function() {
        this.acc = p5.Vector.random2D()
        this.acc.div(2);
        // this.velocity.mult(3) //shaking in fear!
        this.velocity.add(this.acc);
        this.velocity.limit(this.maxSpeed);
    }

    this.attackA = function(ghost1, ghost2) { //the blue Ghost
        if (this.ImIT) {
            var dist1 = this.pos.dist(ghost1.pos);
            var dist2 = this.pos.dist(ghost2.pos);
            if (frameCount % 30 == 0) { //blue checks each second
                if (dist1 < dist2) {
                    // this.velocity = p5.Vector.sub(ghost1.pos, this.pos);
                    // this.velocity.normalize();
                    // this.velocity.mult(4);
                    this.acc = p5.Vector.sub(ghost1.pos, this.pos);

                } else {
                    // this.velocity = p5.Vector.sub(ghost2.pos, this.pos);
                    // this.velocity.normalize();
                    // this.velocity.mult(4);
                    this.acc = p5.Vector.sub(ghost2.pos, this.pos);
                }
                this.velocity.add(this.acc);
                this.velocity.limit(this.maxSpeed + 2);
            }
            if (dist1 < this.size * 0.75) {
                this.ImIT = false;
                ghost1.setImIt();
            }
            if (dist2 < this.size * 0.75) {
                this.ImIT = false;
                ghost2.setImIt();
            }
            this.pos.add(this.velocity);
        }
    }
    this.attackB = function(ghost1, ghost2) { //working on getting red to sometimes get yellow
        if (this.ImIT) {
            var distB = this.pos.dist(ghost1.pos);
            if (frameCount % 60 == 0) { //red takes 1 second to process.
                if (distB < 150) {
                    this.acc = p5.Vector.sub(ghost2.pos, this.pos);
                } else {
                    this.acc = p5.Vector.sub(ghost1.pos, this.pos);
                }
                this.velocity.add(this.acc);
                this.velocity.limit(this.maxSpeed + 1);
            }
            if (distB < this.size * 0.75) {
                this.ImIT = false;
                ghost1.setImIt();
            } else if (this.pos.dist(ghost2.pos) < (this.size * 0.75)) {
                this.ImIT = false;
                ghost2.setImIt();
            }
            this.pos.add(this.velocity);
            //console.log(distB);;
        }
    }

    this.attackC = function(ghost1, ghost2) {
        if (this.ImIT) {
            if (frameCount % 10 == 0) { //yellow quickly decides. Very quick think type.
                if (frameCount % 120 == 0) {
                  var yelRand = round(random(1, 2));
                } //although quick to decide, sticks to 1 ghost for a solid
                if (yelRand == 1) {
                    this.acc = p5.Vector.sub(ghost1.pos, this.pos);
                } else {
                    this.acc = p5.Vector.sub(ghost2.pos, this.pos);
                }
            }
            this.velocity.add(this.acc);
            this.velocity.limit(this.maxSpeed + 2);
            console.log(yelRand);
        }
        this.pos.add(this.velocity);
    }


    // this.updatePos = function() {
    //     if (this.cntDownTimer <= 0) {
    //     this.pos.add(this.velocity);
    //     // } else {
    //     // this.cntDownTimer--;
    //     // }
    // }

    this.setImIt = function() {
        this.ImIT = true;
        if (frameCount % 30 == 0) {
            var test = false;
        } else {
            var test = true;
        }
        //  console.log(test);
        console.log(this.gCol); // add back into setup upon completion
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
//     this.updatePos();
// }
