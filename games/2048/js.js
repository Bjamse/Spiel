window.onload = boot;
let score = 0;
let highscore = 0;
let brikker = [];

function boot() {
    if(isNaN(parseInt(localStorage.getItem("Highscore2048"))) === false){
        highscore = parseInt(localStorage.getItem("Highscore2048"));
    }
    newgame();

}

function newgame(){
    score = 0;
    printscore();
    for(let i in brikker){
        brikker[i].selfRemove();
    }
    brikker = [];
    brikker= [new Tile([Math.floor(Math.random()*4), Math.floor(Math.random()*4)])];
}

document.onkeydown = flyttBrikker;
document.onkeyup = function () { pressed = false};

let pressed = false;
function flyttBrikker(evt) {
    document.onkeydown = flyttBrikker;
    if (pressed) return;
    pressed = true;


    let rettning;
    if (evt.key !== undefined) {
        if(evt.key === "ArrowLeft"){rettning = "left"}
        if(evt.key === "ArrowRight"){rettning = "right"}
        if(evt.key === "ArrowUp"){rettning = "up"}
        if(evt.key === "ArrowDown"){rettning = "down"}
    }
    else if (evt.code !== undefined) {
        if(evt.code === "ArrowLeft"){rettning = "left"}
        if(evt.code === "ArrowRight"){rettning = "right"}
        if(evt.code === "ArrowUp"){rettning = "up"}
        if(evt.code === "ArrowDown"){rettning = "down"}
    }
    else if (evt.which !== undefined) {
        if(evt.which === 37){rettning = "left"}
        if(evt.which === 39){rettning = "right"}
        if(evt.which === 38){rettning = "up"}
        if(evt.which === 40){rettning = "down"}
    }
    else if (evt.keyCode !== undefined) {
        if(evt.keyCode === 37){rettning = "left"}
        if(evt.keyCode === 39){rettning = "right"}
        if(evt.keyCode === 38){rettning = "up"}
        if(evt.keyCode === 40){rettning = "down"}
    }
    else{
    }
    console.log(rettning);


    let moveOrder = getTilesNearest(rettning); // liste med rekkefølge av indexene som skal flyttes

    let didMove= false;

    for(let i in moveOrder){
        let steps = 0;
        if (rettning === "left"){
            for(let j = brikker[moveOrder[i]].x-1; j >= 0; j--){
                let tmp = tileAt(j, brikker[moveOrder[i]].y);
                if(tmp.empty !== true && tmp.score === brikker[moveOrder[i]].score){
                    steps++;
                    brikker[moveOrder[i]].increaseScore();
                    removeTileAt(j, brikker[moveOrder[i]].y);
                    break
                }else if(tmp.empty !== true){
                    break
                }else if(tmp.empty === true){
                    steps ++;
                }
            }
            brikker[moveOrder[i]].move(-steps,0);
        }else if (rettning === "right"){
            for(let j = brikker[moveOrder[i]].x+1; j <= 3; j++){
                let tmp = tileAt(j, brikker[moveOrder[i]].y);
                if(tmp.empty !== true && tmp.score === brikker[moveOrder[i]].score){
                    steps++;
                    brikker[moveOrder[i]].increaseScore();
                    removeTileAt(j, brikker[moveOrder[i]].y);
                    break
                }else if(tmp.empty !== true){
                    break
                }else if(tmp.empty === true){
                    steps ++;
                }
            }
            brikker[moveOrder[i]].move(steps,0);
        }else if (rettning === "up"){
            for(let j = brikker[moveOrder[i]].y-1; j >= 0; j--){
                let tmp = tileAt(brikker[moveOrder[i]].x,j);
                if(tmp.empty !== true&& tmp.score === brikker[moveOrder[i]].score){
                    steps++;
                    brikker[moveOrder[i]].increaseScore();
                    removeTileAt(brikker[moveOrder[i]].x,j);
                    break
                }else if(tmp.empty !== true){
                    break
                }else if(tmp.empty === true){
                    steps ++;
                }
            }
            brikker[moveOrder[i]].move(0,-steps);

        }else if (rettning === "down"){
            for(let j = brikker[moveOrder[i]].y+1; j <= 3; j++){
                let tmp = tileAt(brikker[moveOrder[i]].x,j);
                if(tmp.empty !== true && tmp.score === brikker[moveOrder[i]].score){
                    steps++;
                    brikker[moveOrder[i]].increaseScore();
                    removeTileAt(brikker[moveOrder[i]].x,j);
                    break
                }else if(tmp.empty !== true){
                    break
                }else if(tmp.empty === true){
                    steps ++;
                }
            }
            brikker[moveOrder[i]].move(0,steps);
        }
        console.log(steps);
        if (steps > 0){
            didMove = true;
        }
    }
    console.log(didMove);
    if(didMove){
        addRandomTile();
    }
}
function addRandomTile(){
    if (isNoSpace()){
        endGame();
    }
    while(true){
        let randx = Math.floor(Math.random()*4);
        let randy = Math.floor(Math.random()*4);

        if(tileAt(randx,randy).empty === true){
            brikker.push(new Tile([randx,randy]));
            break;
        }
    }
}

function isNoSpace(){
    let full = true;
    for (let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            if(tileAt(i,j).empty === true){
                full = false;
            }
        }
    }
    return full
}
function removeTileAt(x,y){
    for(let k in brikker){
        if (brikker[k].x === x && brikker[k].y === y){
            brikker[k].selfRemove();
            delete brikker[k];
        }
    }
}

function tileAt(x, y){
    for(let k in brikker){
        if (brikker[k].x === x && brikker[k].y === y){
            return brikker[k];
        }
    }
    return {empty:true};
}

function printscore(){
    document.getElementById("currentScore").innerText = score;

    if(score > highscore){
        highscore = score;
        localStorage.setItem("Highscore2048", highscore);
    }
    document.getElementById("currentHighScore").innerText = highscore;


}

function getTilesNearest(direction){
    let order = [];

    for(let i = 0; i < 4; i++){ // starter på 1 så hopper vi over de som allerede er innat veggen
        for(let j in brikker){
            if (direction === "left" && brikker[j].x === i ){
                order.push(Number(j));
            }else if (direction === "right" && brikker[j].x === 3-i ){
                order.push(Number(j));
            }else if (direction === "up" && brikker[j].y === i ){
                order.push(Number(j));
            }else if (direction === "down" && brikker[j].y === 3-i ){
                order.push(Number(j));
            }
        }
    }
    console.log(order);
    return order;
}