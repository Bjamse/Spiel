class Tile {
    constructor(where){ // where= [x,y]
        this.empty = false;
        this.x = where[0];
        this.y = where[1];
        this.startx = this.x;
        this.starty = this.y;
        this.score = Math.random()*10 > 9? 4:2; // Sansynlighet: 90% for 2; 10% for 4
        this.element = document.createElement("div");
        this.element.style.width = document.getElementById(""+this.y+this.x).getBoundingClientRect().width + "px";
        this.element.style.height = document.getElementById(""+this.y+this.x).getBoundingClientRect().height + "px";
        this.element.style.left = (document.getElementById(""+this.y+this.x).getBoundingClientRect().left - document.getElementById("board").getBoundingClientRect().left)+ "px";
        this.element.style.top = (document.getElementById(""+this.y+this.x).getBoundingClientRect().top - document.getElementById("board").getBoundingClientRect().top) + "px";
        this.element.style.backgroundColor = "#FFB741";
        this.element.className = "tile";
        this.updateScore();
        document.getElementById("board").appendChild(this.element);

    }

    move(x,y){
        this.x += x;
        this.y += y;

        let VLen = document.getElementById("11").getBoundingClientRect().top - document.getElementById("01").getBoundingClientRect().top;
        let HLen = document.getElementById("11").getBoundingClientRect().left - document.getElementById("10").getBoundingClientRect().left;
        // Code for Safari
        this.element.style.WebkitTransform = "translate("+((this.x-this.startx)*HLen)+"px, "+((this.y-this.starty)*VLen)+"px)";
        // Code for IE9
        this.element.style.msTransform = "translate("+((this.x-this.startx)*HLen)+"px, "+((this.y-this.starty)*VLen)+"px)";
        // Standard syntax
        this.element.style.transform = "translate("+((this.x-this.startx)*HLen)+"px, "+((this.y-this.starty)*VLen)+"px)";

    }
    increaseScore(){
        this.score*=2;
        this.updateScore();
        score+= this.score;
        printscore();
    }
    updateScore(){
        this.element.innerHTML = "<h2>"+this.score+"</h2>";
    }
    selfRemove(){
        this.element.outerHTML = "";
    }

}