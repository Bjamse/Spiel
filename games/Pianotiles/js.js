window.onload = boot;
let score = -1;
let highscore = 0;
let rows = [];
let speed;

let canvas;
let cc;



function boot(){
    if(isNaN(parseInt(localStorage.getItem("HighscorePiano"))) === false){
        highscore = parseInt(localStorage.getItem("HighscorePiano"));
    }
    canvas = document.getElementById("board");
    cc = canvas.getContext("2d");
    increaseScore();// bare for å print highscore
    newgame();
    animate();


}

function newgame(){
    speed = 0;
    window.onmousedown = click;
    score = 0;
    rows = [new Row(1000-200),
        new Row(1000-400),
        new Row(1000-600),
        new Row(1000-800),
        new Row(1000-1000),
        new Row(1000-1200),
        new Row(1000-1400)];

}


function animate() {
    requestAnimFrame( animate );
    cc.clearRect(0, 0, 1000, 1000);
    for (let i in rows){

        rows[i].draw();

        rows[i].move();
        if(rows[i].tiles[0].y >= 1000){
            if(rows[i].black.color !== "gray"){
                endGame(true);
            }
            delete rows[i];
            rows.push(new Row(-400))
        }

    }
}
window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(/* function */ callback,){
            window.setTimeout(callback, 1000 / 60);
        };
})();

function endGame(late){
    speed = 0;
    if(late){
        for(let i in rows){
            rows[i].black.color = "red";
        }
    }

    window.onmousedown = null;

}

function click(evt){
    window.onmousedown = click;
    if(speed === 0){
        speed = 3;
    }
    console.log(speed);

    let cl= document.getElementById("board").getBoundingClientRect().left;
    let cw = document.getElementById("board").getBoundingClientRect().width;
    for(let i in rows){
        for(let j in rows[i].tiles){
            let r = rows[i].tiles[j];
            let x = evt.clientX;
            let y = evt.clientY;
            let tx = Math.floor((r.x*cw/1000 )+ cl);
            let txw = Math.floor(((r.x + 250)*cw/1000 )+ cl);
            let ty = Math.floor(r.y * innerHeight/1000);
            let tyh = Math.floor((r.y+200) * innerHeight/1000);
            if( x >= tx && x<= txw &&
                y >= ty && y <= tyh){
                if(r.black){
                    r.color = "gray";
                    increaseScore();
                    return
                }else{
                    r.black = true;
                    r.color = "red";
                    endGame(false);
                    return
                }
            }
        }
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

    if(score%4 === 0){
        speed+=1;
    }
}
