class block{
    constructor(bx,by,width,height, solid){
        this.x = bx * width;
        this.y = 240 - by * width;
        this.width = width;
        this.height = height;
        this.solid = solid;
    }
}


class groundBlock extends block{
    constructor(bx,by){
        super(bx,by,16,16, true);
        this.texture = new Image();
        this.texture.src = "./textures/ground.png";


    }
}

class Brick extends block{
    constructor(bx,by){
        super(bx,by,16,16, true);
        this.texture = new Image();
        this.texture.src = "./textures/brick.png";


    }
}
class PipeTopRight extends block{
    constructor(bx,by) {
        super(bx, by, 16, 16, true);
        this.texture = new Image();
        this.texture.src = "./textures/PipeTopR.png";
    }
}

class PipeTopLeft extends block{
    constructor(bx,by) {
        super(bx, by, 16, 16, true);
        this.texture = new Image();
        this.texture.src = "./textures/PipeTopL.png";
    }
}
class PipeMiddleRight extends block{
    constructor(bx,by) {
        super(bx, by, 16, 16, true);
        this.texture = new Image();
        this.texture.src = "./textures/PipeMiddleR.png";
    }
}
class PipeMiddleLeft extends block{
    constructor(bx,by) {
        super(bx, by, 16, 16, true);
        this.texture = new Image();
        this.texture.src = "./textures/PipeMiddleL.png";
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

        if(KEY_STATUS["space"]&& this.onTheGround){
            this.yspeed = -13;
            this.onTheGround = false;
        }
        if(KEY_STATUS["left"]){
            this.xspeed = -2
        }else if(KEY_STATUS["right"]){
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
                    this.y = o.y + o.height;
                    this.yspeed = 0;
                }

                // bottom
                if(this.x + (this.width/2) <= o.x + o.width &&
                    o.x <= this.x + (this.width/2)  &&
                    this.y + this.height <= o.y + o.height &&
                    o.y <= this.y+ this.height){
                    this.y = o.y -this.height;
                    this.yspeed = 0;
                    this.onTheGround = true;
                }
                // left
                if(this.x <= o.x + o.width&&
                    o.x<= this.x &&
                    this.y + (this.height/2)<= o.y + o.height &&
                    o.y <= this.y+ (this.height/2)){
                    this.x = o.x + o.width;
                    this.xspeed = 0;
                }
                // right
                if(this.x + this.width<= o.x + o.width &&
                    o.x <= this.x + this.width &&
                    this.y + (this.height/2)<= o.y + o.height &&
                    o.y <= this.y+ (this.height/2)){
                    this.x = o.x - this.width;
                    this.xspeed = 0;
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