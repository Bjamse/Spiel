
function drawWorld(){
    wc.clearRect(0, 0, 256, 256);
    for(let i = 0; i < map.grid.length; i++){
        if((i*16)- leftscroll <= 256 && (i*16)- leftscroll >= -16){
            for(let j in map.grid[i]){
                map.grid[i][j] !== undefined? wc.drawImage(map.grid[i][j].texture,map.grid[i][j].x - leftscroll, map.grid[i][j].y): null;
            }
        }
    }
}