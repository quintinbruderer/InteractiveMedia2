var ghostA;
var ghostB;
var ghostC;
var ghostArr = [];

var bounds = {
    size: 0
};


function setup() {
    createCanvas(windowWidth, windowHeight);
    var whoIsIt = floor(random(2.99));

    bounds.left = 0 - bounds.size;
    bounds.right = windowWidth + bounds.size;
    bounds.top = 0 - bounds.size;
    bounds.bottom = windowHeight + bounds.size;

    var bluGhost = '#4adfcb';
    var redGhost = '#ff3a10';
    var yelGhost = '#ffbe56';
    ghostA = new Ghost(random(width), random(height), bluGhost, 3, 'blue')
    ghostB = new Ghost(random(width), random(height), redGhost, 4, 'red')
    ghostC = new Ghost(random(width), random(height), yelGhost, 2, 'yell')
    ghostArr = [ghostA, ghostB, ghostC];
    //var colArray = [bluGhost, redGhost, yelGhost];
    // for (var i = 0; i < 3; i++) {
    //     ghosts[i] = new Ghost(random(0, width), random(0, height), colArray[i]);
    // }
    ghostArr[whoIsIt].ImIT = true;


}

function draw() {

    background(180);
    // ghosts.forEach(function(GhostTest, idx) {
    //     ghostTest.display();
    //     //ghosts[i].display();
    // });
    for (var i = 0; i < ghostArr.length; i++) {
        ghostArr[i].display();
        ghostArr[i].walls();
    }
    ghostArr[0].moveA(ghostArr[1], ghostArr[2]);
    ghostArr[1].moveB(ghostArr[0], ghostArr[2]);
    ghostArr[2].moveC(ghostArr[0], ghostArr[1]);
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
