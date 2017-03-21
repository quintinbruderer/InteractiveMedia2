var ghosts = [];



function setup() {
    createCanvas(windowWidth, windowHeight);
    var whoIsIt = floor(random(2.99));

    var bluGhost = '#4adfcb';
    var redGhost = '#ff3a10';
    var yelGhost = '#ffbe56';
    var colArray = [bluGhost, redGhost, yelGhost];

    for (var i = 0; i < 3; i++) {
        ghosts[i] = new Ghosts(random(0, width), random(0, height), colArray[i]);
    }
    ghosts[whoIsIt].ImIT = true;
    console.log(ghosts[whoIsIt].gCol);

}

function draw() {
    background(180);
    // ghosts.forEach(function(GhostTest, idx) {
    //     ghostTest.display();
    //     //ghosts[i].display();
    // });
    for (var i = 0; i < ghosts.length; i++) {
        ghosts[i].display();
        ghosts[i].movement(ghosts);
      }

}

//
//
//
//
//
//
//
// var ghosts[];
//
// function setup() {
//     createCanvas(800, 600);
//
//     for (var i = 0; i < 3; i++) {
//         ghosts[i] = new GhostTest();
//     }
// }
//
// function draw() {
//     background(180);
//
//     for (var i = 0; i < ghosts.length; i++) {
//         ghosts[i].display();
//     }
//     // ghosts.forEach(function(tag, idx) {
//     //     ghostTest.display();
//     // });
// }
