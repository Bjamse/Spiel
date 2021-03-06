let BB; //birdy mc. bird face
let loop;
let loop2;
let loop3; // logo sprett main menue
let tubes = [];
let score = 0;
let scoreLine = 30;
let highscore;
let newHigh = false;
let keyDown = false;
window.onload = boot;
function boot() {
    // if highscore exists in localstorage, set it
    if(localStorage.highscore !== undefined &&
        localStorage.highscore !== "undefined" &&
        localStorage.highscore !== "null" &&
        !(isNaN(parseInt(localStorage.highscore)))
    ){
        highscore = parseInt(localStorage.highscore);
    }else {
        highscore = 0;
    }
    loop3 = setInterval(logo,500);
}

function startNewGame(){
    BB = new Bird("birdBox");
    loop2= setInterval(makeTube, 2000);

    window.onmousedown = function(){BB.jump()};
    window.onkeydown = keyPressed;
    window.onkeyup = function(){keyDown = false};
    loop = setInterval(moveObjectsOnScreen, 10);
    addScore();

}
function keyPressed(evt) {
    if(evt.keyCode === 32 && !(keyDown)){
        BB.jump();
        keyDown = true;
        document.getElementById("flap").currentTime = 0;
        document.getElementById("flap").play();
    }
}


function moveObjectsOnScreen() {
    if(BB.fall()|| collideTubes()){
        endGame()
    }

    for(let i in tubes){
        if(tubes[i].move()){
            tubes[i].selfRemove();
            tubes.splice(i,1);
        }
    }
    document.getElementById("Score").innerText = score;
}

function collideTubes(){
    for(let i in tubes){
        if(BB.collide(tubes[i].upper) || BB.collide(tubes[i].lower)){
            document.getElementById("die").play();
            return true
        }
    }
    return false
}
let inc = 0;
function sudorandom() {
    let d = new Date();
    inc++;
    return d.getTime() +inc;
}
function makeTube(){
    tubes.push(new Tube());
    let x = tubes[tubes.length -1];
    x.placeLeft(innerWidth + x.upper.getBoundingClientRect().width + 100);
}
function removeElementByID(elementId){
    // Removes a box from the document
    let element = document.getElementById(elementId);
    removeElement(element);
}
function removeElement(element) {
    element.outerHTML = "";
}
function addScore() {document.getElementById("floor").innerHTML = "<div id = 'Score'></div>";}


function endGame() {
    clearInterval(loop);
    clearInterval(loop2);
    BB.box.style.left = "-300px";
    BB = null;
    window.onmousedown = null;
    window.onkeydown = null;
    window.onkeyup = null;
    keyDown = false;
    for(let i in tubes)tubes[i].selfRemove();
    tubes = [];
    updateScoreBoard();
    scoreboard();
    score = 0;
    document.getElementById("Score").innerText = score;
    document.getElementById("die").play();
    document.getElementById("Score").style.display = "none";
}

function updateScoreBoard() {
    if(highscore < score){
        highscore = score;
        newHigh = true;
        localStorage.highscore = score;
    }
    else{
        newHigh = false;
    }
}

function scoreboard() {
    let menu = document.createElement("div");
    menu.id = "Scoreboard";
    menu.className = "menu";
    let table ="<h1>Game over!</h1>";

    if(newHigh){
        table += "<h3 class='rainbowText'>New Highscore!</h3> <br>";
    }
    table += "<table style='margin: auto; text-align: left'>" +
        "<tr><td id='orange'>Score:</td> <td>"+score+"</td></tr>" +
        "<tr><td id='orange'>HighScore:</td><td>"+highscore+"</td></tr>" +
        "</table>" +
        "<div class='button' onclick='startNewGame();removeElement(document.getElementById(\"Scoreboard\"))'>Again!</div>";


    menu.innerHTML = table;

    document.body.appendChild(menu);
} 

let boolean = true;
function logo() {
    boolean = !boolean;
    if (boolean === false) {
        document.getElementById("logoplace").style.top = "-5px";
    } else if (boolean === true) {
        document.getElementById("logoplace").style.top = "0px";
    }
}