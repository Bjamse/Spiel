// <table id="boardpiece"><tr><td></td><td></td><td></td><td></td></tr></table>

class Row{
    constructor(StartPercent){
        this.element = document.createElement("table");
        this.element.className = "boardpiece";
        this.element.id = sudorandom();
        this.row = this.element.insertRow(0);
        this.cells = [this.row.insertCell(0),this.row.insertCell(1),this.row.insertCell(2), this.row.insertCell(3)];
        this.blackTile = this.cells[Math.floor(Math.random()*4)];
        this.blackTile.className = "tile";
        this.bottomPercent = StartPercent;
        this.element.style.bottom = this.bottomPercent+"%";
        this.notCounted = true;
        document.getElementById("wrapper").appendChild(this.element);

    }
    move(){
        if( this.bottomPercent < -20 && this.blackTile.style.backgroundColor !== "gray"){
            this.blackTile.style.backgroundColor ="red";
            clearInterval(loop);
            scrollAllUP();
        }else if(this.bottomPercent < -20){
            replaceMe(this);
            return
        }
        this.bottomPercent -= speed;
        this.element.style.bottom = this.bottomPercent+ "%";
    }
}