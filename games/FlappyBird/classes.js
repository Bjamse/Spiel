class Bird{
    constructor(box){
        this.box = document.getElementById(box);
        // this.img = this.box.children[0];                 Not in use!
        this.sides = Math.floor(innerHeight/14);
        this.box.style.width = Math.floor(this.sides * (144/122)-1)+"px";
        this.box.style.height = (this.sides-2)+"px";
        this.box.style.left = "5%";
        this.box.style.top = (innerHeight/2 - this.sides/2)+ "px";

        this.speed = innerHeight/1000;
        this.ax = this.speed*0.3;
        this.jumpHeight = this.speed * -9;
        this.floorLimit = document.getElementById("floor").getBoundingClientRect().top;
        scoreLine = this.box.getBoundingClientRect().left + this.box.getBoundingClientRect().width/2;
    }
    fall(){
        let rect = this.box.getBoundingClientRect();

        this.box.style.top = (rect.top + this.speed) +"px";
        this.speed += this.ax;
        if(rect.bottom >= this.floorLimit){
            this.box.style.top = (this.floorLimit - this.sides) + "px";
            return true
        }


        return false


    }
    jump(){
        if(this.box.getBoundingClientRect().top > -10){
            this.speed = this.jumpHeight;
        }
        document.getElementById("flap").currentTime = 0;
        document.getElementById("flap").play();
    }

    collide(x){
        let r1 = this.box.getBoundingClientRect();
        let r2 = x.getBoundingClientRect();
        return (r1.left <= r2.left + r2.width &&
            r2.left <= r1.left + r1.width &&
            r1.top <= r2.top + r2.height &&
            r2.top <= r1.top + r1.height
        )
    }
}


class Tube{
    constructor(){
        this.upper = document.createElement("div");
        this.upper.className = "upper";
        this.upper.style.width = innerWidth*.08 + "px";
        this.upper.style.height = (innerWidth*.08/(260/3000))+ "px";
        this.upper.id= ""+sudorandom();

        this.lower = document.createElement("div");
        this.lower.className = "lower";
        this.lower.style.width = innerWidth*.08 + "px";
        this.lower.style.height = (innerWidth*.08/(260/3000))+ "px";
        this.lower.id= ""+sudorandom();

        document.body.appendChild(this.upper);
        document.body.appendChild(this.lower);
        //-------------------- definerte objekter---------
        // ikke behandle objekter mtp andre objekter over denne linja
        // under er koden for å
        this.upper.style.left = "-800px";
        this.upper.style.bottom = (Math.floor(Math.random()*40)+40)+"%";

        this.gap = innerHeight*.25;

        this.lower.style.left = "-800px";
        this.lower.style.top = (this.upper.getBoundingClientRect().bottom + this.gap) + "px";

        this.speed = 4;
        this.width = this.upper.getBoundingClientRect().width;
        this.counted = false;
    }
    placeLeft(x){
        this.upper.style.left = (x)+"px";
        this.lower.style.left = (x)+"px";
    }
    move(){
        let l = this.upper.getBoundingClientRect().left;
        this.placeLeft(this.upper.getBoundingClientRect().left - this.speed);
        if(l <= scoreLine && !(this.counted)){
            this.counted = true;
            score ++;
            document.getElementById("point").play();
        }
        return l + this.width + 30 < 0;
    }

    selfRemove(){
        this.upper.outerHTML = null;
        this.lower.outerHTML = null;
    }

}
