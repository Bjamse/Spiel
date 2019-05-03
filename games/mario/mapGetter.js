let map;
let xmlhttp;

function loadMap(){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = statusforandring;
    xmlhttp.open("get", "map.dat", true);
    xmlhttp.send();
}




function statusforandring(){
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200){
        let data = xmlhttp.responseText;
        let linjer = data.split("\n");
        let mapdataRaw=[];

        for(let i in linjer){
            let t = linjer[i].split("");
            for(let j in t){
                if(t[j] === ""){
                    delete t[j];
                }
            }
            mapdataRaw.push(t);
        }

        map = new BlankMap(mapdataRaw);
        doneLoading = true;
    }
}


function blockClassifier(string, x, y){
    if(string === "g"){
        return new groundBlock(x,y);
    }
    if(string === "b"){
        return new Brick(x,y);
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


