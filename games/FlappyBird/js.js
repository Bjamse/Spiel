let BB; //birdy mc. bird face
let loop;
let loop2;
let tubes = [];
let score = 0;
let scoreLine = 30;
let highscores = [];

window.onload = boot;
function boot() {
    // if highscore exists in localstorage, set it
    if(localStorage.highscores !== undefined){highscores = JSON.parse(localStorage.highscores);}
}

function startNewGame(){
    BB = new Bird("birdBox");
    loop2= setInterval(makeTube, 2000);

    window.onmousedown = function(){BB.jump()};
    loop = setInterval(moveObjectsOnScreen, 10);
    addScore();

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
    document.getElementById("Score").innerText = "Score = "+ score;

}

function collideTubes(){
    for(let i in tubes){
        if(BB.collide(tubes[i].upper) || BB.collide(tubes[i].lower)){
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
    // Removes an box from the document
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
    for(let i in tubes)tubes[i].selfRemove();
    tubes = [];
    updateScoreBoard();
    scoreboard();
    score = 0;
    document.getElementById("Score").innerText = "Score = "+ score;


}

function updateScoreBoard() {
    let addIndex;
    let username = prompt("Add your score of "+score+" to the scoreboard", "Username");
    if( username === null){
        alert("You opted to not add your score to the scoreboard");
        return false;
    }

    if(highscores.length === 0){
        addIndex = 0;
    }else {
        for(let i in highscores){
            if(score > highscores[i].score){
                addIndex = i;
            }
        }
    }

    highscores.splice(addIndex, 0, {score: score.toString(), name: username.toString()});
    while(highscores.length > 10){
        highscores.pop();
    }
    highscores.sort(function(a, b) {
        return a.score - b.score;
    });
    highscores.reverse();
    localStorage.highscores = JSON.stringify(highscores);
    return true;
}

function scoreboard() {
    let menu = document.createElement("div");
    menu.id = "Scoreboard";
    menu.className = "menu";
    let table ="<h1>Scoreboard</h1>";
    if (highscores.length > 0){
        table += "<h4>Player:Score</h4>";
        for(let i in highscores){
            table += ""+highscores[i].name+":"+highscores[i].score+"<br>";
        }
    }else {
        table += "<h2>no highscores saved</h2>"
    }
    table += "<div class='button' onclick='startNewGame();removeElement(document.getElementById(\"Scoreboard\"))'>New Game</div>" +
        "<div class='button' onclick='window.close()'>Quit</div>";

    menu.innerHTML = table;

    document.body.appendChild(menu);
}