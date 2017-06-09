var pacman;
var ghost = []
var pacSize = 70;
var pacX = 0
var pacY = 0
var ghostX = 0
var title;
var theme;
var pacmanChomp;
var pacmanEat;
var pacmanStart;
var pellets = [];
var score = 0
var die = false

function preload() {
	theme = loadSound('Pacman_Dub_Dwayne_ Pritchett.mp3');
	pacmanChomp = loadSound('pacman_chomp.wav');
	pacmanEat = loadSound('pacman_eatfruit.wav');
	pacmanStart = loadSound('pacman_beginning.wav')
	title = loadImage('Title.png');
}

function setup() {
	//createCanvas(1200, 700);
	createCanvas(screen.width, screen.height);
	frameRate(30);
	push();
	fill(225, 72, 53);
	for (var p = 1; p < width; p + 5) {
		rect(p, 1, 5, 5, 2);
		rect(p, height, 5, 5, 2);
	}
	pop();
	pacX = 50;
	pacY = height / 2;
	ghostX = random(width / 2, width - 50); //giving space for ghost
	pacman = new Pacman(pacX, pacY, pacSize);
	ghost[0] = new Ghost(ghostX, 50);
	for (var i = 0; i < 8; i++) {
		pellets[i] = new PacPellet(pacSize);
	}
	pacmanStart.play();
	pacmanChomp.setVolume(0.7);

}

function draw() {
	background(0);

	ScreenRefresh();
	pacman.display();

	if (pacmanStart.isPlaying()) {
		imageMode(CENTER);
		image(title, width / 2, height / 2);
		textSize(15);
		fill(255);
		text("Pacman sounds copyright to intended owners. Theme Music created by Dwayne Pritchett.", 22, 22);
		push();
		textAlign(CENTER);
		textSize(35);
		text("Stay Large! Collect as many Pac-Pellets as Possible!", width / 2, 3 / 4 * height + 10);
		text("Control using Up and Down Arrow Keys. Space Bar to Pause.", width / 2, 3 / 4 * height + 45);
		pop();
	} else {
		if (!theme.isPlaying()) {
			theme.loop();
			theme.play();
		}

		if (!die) {
			//text(score + " Pellets ate. Size is: " + pacman.size + ".", 22, 22);
			text(score + " Pellet(s) ate.", 22, 22);
			// text("Testing the ghost color random" + ghost.ghostCol, 22, 40);
		}
		pacman.move();
		for (var i = 0; i < pellets.length; i++) {
			pellets[i].display();
			pellets[i].collide(pacman);
			if (pellets[i].yum) {
				pellets.splice(i, 1);
				//pacmanChomp.stop();
				pacmanChomp.pause(); //initially used stop, but conitinued to think sound was playing when not. So stop was removed and bandaged the issue, pause was suggested and fixed said issue.
				pacmanEat.play();
				score++;
				if (pacman.size > 130) {
					pacman.size = 130;
				}
				if (pacman.size < 130) {
					pacman.size = pacman.size + 10;
				}
			}
		}
		for (var g = 0; g < ghost.length; g++) {
			ghost[g].display();
			ghost[g].move();
			ghost[g].collide(pacman);
		}
	}
	if (pacman.size <= 25) {
		Death();
	}
}
// pause the game
var pause = false

function keyPressed() {
	var tempspeed
	if (keyCode == 32) {
		if (!die) {
			pause = !pause
			if (pause) {
				tempspeed = pacman.runspeed;
				pacman.runspeed = 0;
				pacman.mouthspeed = 0;
				pacman.playCue = false;
				for (var s = 0; s < ghost.length; s++) {
					ghost[s].ghostSpeed = 0;
				}
			}
			if (!pause) {
				pacman.runspeed = tempspeed;
				pacman.mouthspeed = 1.2 * pacman.runspeed
				pacman.playCue = true;
				for (var s = 0; s < ghost.length; s++) {
					ghost[s].ghostSpeed = 4;
				}
			}
		} else {
			die = false;
			score = 0
			ghost.splice(0, ghost.length);
			ghostX = random(width / 2, width - 50); //giving space for ghost
			pacman = new Pacman(pacX, pacY, pacSize);
			ghost[0] = new Ghost(ghostX, 50);
			for (var i = 0; i < 8; i++) {
				pellets[i] = new PacPellet(pacSize);
			}
		}
	}
}


function Death() {
	die = true;
	pacmanChomp.pause();
	pacman.runspeed = 0;
	pacman.mouthspeed = 0;
	push();
	textSize(50);
	textAlign(CENTER);
	text("You ate " + score + " pellets. Space Bar to restart.", width / 2, height / 2);
	pop();
}

function ScreenRefresh() {
	if (pacman.x > width) {
		pacman.x = 50;
		pellets.splice(0, pellets.length);
		for (var i = 0; i < 8 - (.5 * pacman.runspeed); i++) {
			pellets[i] = new PacPellet(pacSize);
		}
		if (ghost.length < 8) {
			ghostX = random(width / 4.5, width - 50);
			ghost.ghostCol = floor(random(3.99));
			ghost.push(new Ghost(ghostX, 50));
		}
		if (pacman.runspeed < 8) {
			pacman.runspeed = pacman.runspeed * 2;
			pacman.mouthspeed = 1.2 * pacman.runspeed;
			for (var sp = 0; sp < ghost.length; sp++) {
				ghost[sp].ghostSpeed = ghost[0].ghostSpeed + 2;
				ghost[sp].pain = ghost[sp].pain * 2.5;
			}
		}
	}
}
