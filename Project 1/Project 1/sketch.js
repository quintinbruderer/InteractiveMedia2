var pacman;
var ghost;
var pacSize = 70;
var pacX = 0
var pacY = 0
var ghostX = 0
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
    ghostX = random(width / 2, width - 50); //giving space for ghost
    pacman = new Pacman(pacX, pacY, pacSize);
    ghost = new Ghost(ghostX, 50);
    for (var i = 0; i < 8; i++) {
        pellets[i] = new PacPellet(pacSize);
    }
    //pacmanStart.play();
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
        text("Testing the ghost color random" + ghost.ghostCol, 22, 40);
        pacman.move();
        ghost.display();
        ghost.move();
        ghost.collide(pacman);
        for (var i = 0; i < pellets.length; i++) {
            pellets[i].display();
            pellets[i].collide(pacman);
            if (pellets[i].yum) {
                pellets.splice(i, 1);
                //pacmanChomp.stop();
                pacmanChomp.pause(); //initially used stop, but conitinued to think sound was playing when not. So stop was removed and bandaged the issue, pause was suggested and fixed said issue.
                pacmanEat.play();
                score++;
                if (pacman.size < 130) {
                    pacman.size = pacman.size + 10;
                }
            }
        }
    }
}
// pause the game
var pause = false

function keyPressed() {
    if (keyCode == 32) {
        pause = !pause
        if (pause) {
            pacman.runspeed = 0;
            pacman.mouthspeed = 0;
            pacman.playCue = false;
        }
        if (!pause) {
            pacman.runspeed = 3;
            pacman.mouthspeed = 1.5 * pacman.runspeed
            pacman.playCue = true;
        }
    }
}
