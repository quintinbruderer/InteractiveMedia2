function Ghost(x, y) {
    this.ouch = false
    this.ghostSize = 70;
    this.gx = x;
    this.gy = y;
    this.eYe = this.ghostSize / 6;
    this.ghostSpeed = 4;

    this.ghostCol = floor(random(3.99)); //chose not to use round() as that'd lower 0%, yelGhost.
    // changed from rgb to 6digit hexidecimal for array, as otherwise it wasn't working
    this.yelGhost = '#ffbe56';
    this.bluGhost = '#4adfcb';
    this.pinGhost = '#fdc2d4';
    this.redGhost = '#ff3a10';

    this.ghostColAr = [this.yelGhost, this.bluGhost, this.pinGhost, this.redGhost];

    this.display = function() {
        push();
        ellipseMode(CENTER);
        rectMode(CENTER)
        noStroke();
        fill(this.ghostColAr[this.ghostCol]);
        translate(this.gx, this.gy);
        ellipse(0, 0, this.ghostSize, this.ghostSize);
        rect(0, 18, this.ghostSize, this.ghostSize / 1.8);
        var gIncriment = 17.5
        var x1 = -35
        var x2 = -17.5
        var x3 = -26.25
        for (var p = 0; p < 4; p++) {
            triangle(x1, 35, x2, 35, x3, 45);
            x1 = x1 + gIncriment
            x2 = x2 + gIncriment
            x3 = x3 + gIncriment
        }
        fill('white'); //figured I'd try yet another method of "fill"
        ellipse(-16, -this.ghostSize / 4, 25, 30);
        ellipse(16, -this.ghostSize / 4, 25, 30);
        fill('#263e88') // blue eyes
        //this.eYe     size/4 is center, size/3 is looking up, size/6 is looking down.
        ellipse(-16, -this.eYe, 10, 10);
        ellipse(16, -this.eYe, 10, 10);

        pop();
    }

    this.move = function() {
        this.gy = this.gy + this.ghostSpeed;
        if (this.gy + 45 >= height || this.gy - (this.ghostSize / 2) <= 0) { //45 is a hard coded number, as there is both radius, some rectangle and triangles.
            this.ghostSpeed = -1 * this.ghostSpeed;
            if (this.ghostSpeed > 0) {
                this.eYe = this.ghostSize / 6;
            } else {
                this.eYe = this.ghostSize / 3;
            }
        }
    }
    this.collide = function(pacman) {
        this.ouch = collideCircleCircle(this.gx, this.gy, 70, pacman.x, pacman.y, pacman.size);
        if (this.ouch) {
            pacman.size = pacman.size - 1.5;
        }
    }
}
