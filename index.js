/*
How it will be designed:

Every class has the numbers and bombs already placed. This is the
base grid. 

There will be 3 types of classes for cell: 
 - hidden (blank tile)
 - mine (contains mine)
 - number
    - one, two, three


*/
var mine_cnt = 0;
// I need to initalize every cell
for(let i = 0; i < 16; i++){
  for(let j = 0; j < 30; j++){
    board[i][j] = {
      mine: false,
      adjacent: 0,
      revealed: false,
      flagged: false
    };
  }
}
//placing mines
for(let k = 0; k < 99; k++){
  var i = Math.round(Math.random() * 16);
  var j = Math.round(Math.random() * 30);
  if(board[i][j].mine == true) continue;
  board[i][j].mine = true;
  mine_cnt++;

}
//find the number of adjacent mines 
for(let i = 0; i < rows; i++){
  for(let j = 0; j < cols; j++){
    if(board[i][j].mine) continue;  
    var cnt = 0;
    // Check the 8 surrounding cells
    for(let x = -1; x <= 1; x++){
      for(let y = -1; y <= 1; y++){
        const ni = i + x;
        const nj = j + y;
        if(ni >= 0 && ni < rows && nj >= 0 && nj < cols && board[ni][nj].mine) cnt++;
      }
    }
    board[i][j].adjacent = cnt;
  }
}
//add eventListener to each cell for clicks
// If clicked, change the class of the cell for visuals and keep 
// track of the number of mines left in javascript


// Called when a cell is clicked
function reveal_cell(i, j){
  // Is the cell you clicked a mine?
  //Else:
  if(board[i][j] == 0){
    cell.classList.add('blank');
  }else if(board[i][j] == 1){
    cell.classList.add('one');
  }else if(board[i][j] == 2){
    cell.classList.add('two');
  }else{
    cell.classList.add('three');
  }
  //Now uncover the other 8 tiles surrounding it, its neighbors
}

