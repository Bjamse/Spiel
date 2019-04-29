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
        this.element.className = "tile";
        this.updateScore();
        document.getElementById("board").appendChild(this.element);

    }

    move(x,y){
        this.x += x;
        this.y += y;

        let lnt = document.getElementById(""+this.y+this.x).getBoundingClientRect().left;
        let tnt = document.getElementById(""+this.y+this.x).getBoundingClientRect().top;

        let lst = document.getElementById(""+this.starty+this.startx).getBoundingClientRect().left;
        let tst = document.getElementById(""+this.starty+this.startx).getBoundingClientRect().top;

        // Code for Safari
        this.element.style.WebkitTransform = "translate("+(lnt-lst)+"px, "+(tnt-tst)+"px)";
        // Code for IE9
        this.element.style.msTransform = "translate("+(lnt-lst)+"px, "+(tnt-tst)+"px)";
        // Standard syntax
        this.element.style.transform = "translate("+(lnt-lst)+"px, "+(tnt-tst)+"px)";

    }
    increaseScore(){
        this.score*=2;
        this.updateScore();
        score+= this.score;
        printscore();
    }
    updateScore(){

        switch (this.score) {
            case 2:
                this.element.style.backgroundColor = "#7CB5E2";
                break;
            case 4:
                this.element.style.backgroundColor = "#397FB3";
                break;
            case 8:
                this.element.style.backgroundColor = "#2F6895";
                break;
            case 16:
                this.element.style.backgroundColor = "#F5BD70";
                break;
            case 32:
                this.element.style.backgroundColor = "#F2A032";
                break;
            case 64:
                this.element.style.backgroundColor = "#CD8829";
                break;
            case 128:
                this.element.style.backgroundColor = "#ff8356";
                break;
            case 256:
                this.element.style.backgroundColor = "#DE5833";
                break;
            case 512:
                this.element.style.backgroundColor = "#BD4A2B";
                break;
            case 1024:
                this.element.style.backgroundColor = "#5454DA";
                break;
            case 2048:
                this.element.style.backgroundColor = "#3B3C99";
                break;
        }
        this.element.innerHTML = "<h2>"+this.score+"</h2>";
    }
    selfRemove(){
        this.element.outerHTML = "";
    }

}