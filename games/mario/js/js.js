window.onload = boot;
let world;
let wc;
let pcanvas;
let pc;
let leftscroll = 0;

let doneLoading =false;
let loadloop;
let player =  new Player(22,64);

function boot() {
    world = document.getElementById("world");
    wc = world.getContext("2d");
    pcanvas = document.getElementById("player");
    pc = pcanvas.getContext("2d");
    loadMap();
    loadloop = setInterval(function () {
       if(doneLoading){
           clearInterval(loadloop);
           startup();
       }
    },200);
}

function startup() { //hvis det er no mer som skal gjøres før vi starter animasjonen og etter at alt er lasta inn så gjør det her
    animate();// fjern hvis ubrukelig
}

function animate() {
    requestAnimFrame( animate );

    drawWorld();
    player.draw();



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