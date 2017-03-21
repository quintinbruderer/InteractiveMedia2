function Ghosts(x, y, color) {
    this.ImIT = false;
    this.pos = createVector(x,y);
    this.size = 70;
    this.gCol = color;
    this.eyes = this.size / 4;
    this.velocity = createVector(0,0);

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



    this.movement = function(ghosts){

      for (var i = 0; i < ghosts.length; i++) {
              var test = ghosts[i];
              var ghostDist = p5.Vector.dist(test.pos,this.pos);
      }


      if (!this.ImIT){
        this.velocity = p5.Vector.random2D()
        this.velocity.mult(3)//shaking in fear!

      }

      this.pos.add(this.velocity);
    }
}
