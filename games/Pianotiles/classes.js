class Row {
    constructor(y){

        this.tiles = [new tile(0,y), new tile(250,y), new tile(500,y), new tile(750,y)];
        this.black = this.tiles[Math.floor(Math.random()*4)];
        this.black.black = true;
    }
    draw(){
        for(let i in this.tiles){
            this.tiles[i].draw();
        }
    }
    move(){
        for(let k in this.tiles){
            this.tiles[k].y += speed;
        }
    }
}

class tile {
    constructor(x,y){
        this.x= x;
        this.y= y;
        this.black = false;
        this.color = "black";
    }
    draw(){

        if(this.black){
            cc.beginPath();
            cc.fillStyle = this.color;
            cc.rect(this.x, this.y, 250, 200);
            cc.fill()
        }
    }
}