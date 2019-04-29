window.onload = boot;
let score = 0;
let highscore = 0;
let rows = [];
let loop;
let speed= 0.6;

function boot(){
    if(isNaN(parseInt(localStorage.getItem("HighscorePiano"))) === false){
        highscore = parseInt(localStorage.getItem("HighscorePiano"));
    }
    newgame();
}

function newgame(){
    for(let i in rows){
        removeElementByID(rows[i].element.id);

    }
    score = -1;
    increaseScore();
    rows = [];
    rows.push(  new Row(0),new Row(20),new Row(40),
                new Row(60),new Row(80),new Row(100),
                new Row(120), new Row(140)
    );
    rows[0].blackTile.onclick = function(){ loop = setInterval(flytt,15)};
    window.onmousedown = tileClick;
    speed= 0.6;
}

let g= true;
function flytt(){
    for(let i in rows){
        rows[i].move();
    }
    if(score%4 === 0 &&g ){
        speed+=0.1;
        g = false;
        console.log(speed);
    }
    if(score%4===1){
        g=true;
    }
}


function increaseScore() {
    score += 1;
    document.getElementById("currentScore").innerText = score;

    if(score > highscore){
        highscore = score;
        localStorage.setItem("HighscorePiano", highscore);
    }
    document.getElementById("currentHighScore").innerText = highscore;
}


function tileClick(evt){
    window.onmousedown = tileClick;
    let end = false;
    for(let i in rows){
        if(end){break;}
        for(let j in rows[i].cells){
            let cellRect = rows[i].cells[j].getBoundingClientRect();
            let px = evt.clientX;
            let py = evt.clientY;
            if(
                px<=cellRect.right &&
                px>=cellRect.left &&
                py<=cellRect.bottom&&
                py>=cellRect.top
            ){
                if(rows[i].cells[j].className === "tile" && rows[i].notCounted){
                    rows[i].cells[j].style.backgroundColor = "gray";
                    increaseScore();
                }else{
                    rows[i].cells[j].style.backgroundColor = "red";
                    window.onmousedown = null;
                    clearInterval(loop);
                }
                end = true;
                break;
            }
        }
    }


}

function scrollAllUP(){
    for(i in rows){
        rows[i].element.style.transition = "1s";
        rows[i].element.style.transform = "translate(0,-100%)";

    }
}


function replaceMe(obj){
    for(let i in rows){
        if(rows[i] === obj){
            delete rows[i];
        }
    }
    rows.push(new Row(140));
}


let inc = 0;
function sudorandom() {
    let d = new Date();
    inc++;
    return d.getTime() +inc;
}
function removeElementByID(elementId){
    // Removes an box from the document
    let element = document.getElementById(elementId);
    removeElement(element);
}
function removeElement(element) {
    element.outerHTML = "";
}