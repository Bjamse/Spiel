class block{
    constructor(bx,by,width,height, solid){
        this.index = [bx,by];
        this.x = bx * width;
        this.y = 240 - by * width;
        this.width = width;
        this.height = height;
        this.solid = solid;
        this.texture = new Image();
    }
    draw(){
        try {
            wc.drawImage(this.texture, this.x - leftscroll, this.y)
        }
        catch (e) {
            console.log(this.index+ " has no textures!");
            this.texture.src = "./textures/error404.png";
        }
    }
    blockUpdate(x){
    }

}


class groundBlock extends block{
    constructor(bx,by){
        super(bx,by,16,16, true);
        this.texture.src = "./textures/ground.png";

    }
}

class Brick extends block{
    constructor(bx,by){
        super(bx,by,16,16, true);
        this.texture.src = "./textures/brick.png";
        this.coinExists = false;
    }
    draw() {
        super.draw();
        if(this.coinExists){
            this.coin.y-= .4;
            this.coin.draw();
            if(this.coin.y < this.y - 32){
                this.coinExists = false;
            }
        }
    }

    blockUpdate(where) {
        if(where === "under"){
            if(Math.floor(Math.random()*2) === 1){
                this.coin = new coin(0,0);
                this.coin.x = this.x;
                this.coin.y = this.y -16;
                this.coinExists = true;
                score++;
            }else {
                delete map.grid[this.index[0]][this.index[1]]
            }
        }
    }
}
class PipeTopRight extends block{
    constructor(bx,by) {
        super(bx, by, 16, 16, true);
        this.texture.src = "./textures/PipeTopR.png";
    }
}
class PipeTopLeft extends block{
    constructor(bx,by) {
        super(bx, by, 16, 16, true);
        this.texture.src = "./textures/PipeTopL.png";
    }
}
class PipeMiddleRight extends block{
    constructor(bx,by) {
        super(bx, by, 16, 16, true);
        this.texture.src = "./textures/PipeMiddleR.png";
    }
}
class PipeMiddleLeft extends block{
    constructor(bx,by) {
        super(bx, by, 16, 16, true);
        this.texture.src = "./textures/PipeMiddleL.png";
    }
}

class coin extends block{
    constructor(bx,by){
        super(bx,by,16,16,false);
        this.texture.src ="./textures/coin.png";
    }
    blockUpdate(x) {
        score++;
        delete map.grid[this.index[0]][this.index[1]]
    }
}




class Player{
    constructor(x, y){
        this.x = x;
        this.y = 240-y;
        this.height = 12;
        this.width = 12;
        this.yspeed = 3;
        this.xspeed = 0;

        this.onTheGround = false;

        this.texture = new Image();
        this.texture.src = "./textures/player.png";


    }


    draw(){
        pc.clearRect(this.x, this.y, 12, 12);

        if((KEY_STATUS["space"]|| KEY_STATUS["up"] || KEY_STATUS["W"])&& this.onTheGround){
            this.yspeed = -10.5;
            this.onTheGround = false;
        }
        if(KEY_STATUS["left"]|| KEY_STATUS["A"]){
            this.xspeed = -2
        }else if(KEY_STATUS["right"]|| KEY_STATUS["D"]){
            this.xspeed = 2;
        }else {
            this.xspeed = 0;
        }




        this.yspeed +=1;
        this.yspeed = Math.min(this.yspeed, 6);
        this.y += this.yspeed;
        this.x += this.xspeed + leftscroll;

        let leftChunkIndex = (this.x - (this.x % 16))/16;
        let rightChunkIndex = ((this.x + this.width)- ((this.x+ this.width) % 16) )/16;
        for(let i = leftChunkIndex-1; i <= rightChunkIndex +1; i++){
            for(let j in map.grid[i]){
                if (map.grid[i][j] === undefined){
                    continue
                }
                let o = map.grid[i][j];
                // top of player collision

                if(this.x + (this.width/2) <= o.x + o.width &&
                    o.x<= this.x + (this.width/2)  &&
                    this.y <= o.y + o.height &&
                    o.y <= this.y){
                    if((o.solid)){
                        this.y = o.y + o.height;
                        this.yspeed = 0;
                    }

                    o.blockUpdate("under");
                }

                // bottom
                if(this.x + (this.width/2) <= o.x + o.width &&
                    o.x <= this.x + (this.width/2)  &&
                    this.y + this.height <= o.y + o.height &&
                    o.y <= this.y+ this.height){
                    if((o.solid)){
                        this.y = o.y -this.height;
                        this.yspeed = 0;
                        this.onTheGround = true;
                    }

                    o.blockUpdate("over");

                }
                // left
                if(this.x <= o.x + o.width&&
                    o.x<= this.x &&
                    this.y + (this.height/2)<= o.y + o.height &&
                    o.y <= this.y+ (this.height/2)){
                    if((o.solid)){
                        this.x = o.x + o.width;
                        this.xspeed = 0;
                    }

                    o.blockUpdate("left");

                }
                // right
                if(this.x + this.width<= o.x + o.width &&
                    o.x <= this.x + this.width &&
                    this.y + (this.height/2)<= o.y + o.height &&
                    o.y <= this.y+ (this.height/2)){
                    if((o.solid)){
                        this.x = o.x - this.width;
                        this.xspeed = 0;
                    }
                    o.blockUpdate("right");

                }

            }
        }
        if(this.x >= 100){
            leftscroll = this.x - 100;
            this.x = 100;
        }
        if (this.x <= 1){
            this.x = 1;
            this.xspeed = 0;
        }


        pc.drawImage(this.texture,this.x,this.y)
    }
}

class BlankMap{
    constructor(data){
        // making a 2d array of objects === to what letter is in mapp raw data
        this.grid = [];
        for(let i in data){
            for(let j in data[i]) {
                if(typeof this.grid[i] === "undefined"){
                    this.grid[i] = [];
                }
                this.grid[i][j] = blockClassifier(data[i][j], i, j)

            }

        }

    }
}