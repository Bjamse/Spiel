window.onload = boot;
let world;
let wc;
let pcanvas;
let pc;
let leftscroll = 0;
let doneLoading =false;
let loadloop;
let player =  new Player(22,64);

let score = 0;

function boot() {
    world = document.getElementById("world");
    wc = world.getContext("2d");
    pcanvas = document.getElementById("player");
    pc = pcanvas.getContext("2d");
    loadMap();
    loadloop = setInterval(function () {
       if(doneLoading){
           clearInterval(loadloop);
           animate();
       }
    },200);
}

function updateScore(){
    document.getElementById("score").innerHTML = score +"";
}

function animate() {
    requestAnimFrame( animate );

    drawWorld();
    player.draw();
    updateScore();



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