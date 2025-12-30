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
const board = [];
for(let i = 0; i < 16; i++){
  board[i] = [];
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
while(mine_cnt < 99){
  var i = Math.floor(Math.random() * 16);
  var j = Math.floor(Math.random() * 30);
  if(board[i][j].mine) continue;
  board[i][j].mine = true;
  mine_cnt++;
}
//find the number of adjacent mines 
var sprite_sheet = document.getElementById("board");
for(let i = 0; i < 16; i++){
  for(let j = 0; j < 30; j++){
    const cell = document.createElement('div');
    cell.classList.add('cell', 'hidden');
    cell.dataset.row = i;
    cell.dataset.col = j;

    sprite_sheet.appendChild(cell);
  }
}

for(let i = 0; i < 16; i++){
  for(let j = 0; j < 30; j++){
    if(board[i][j].mine) continue;  
    var cnt = 0;
    // Check the 8 surrounding cells
    for(let x = -1; x <= 1; x++){
      for(let y = -1; y <= 1; y++){
        const ni = i + x;
        const nj = j + y;
        if(x == 0 && y == 0) continue;
        if(ni >= 0 && ni < 16 && nj >= 0 && nj < 30 && board[ni][nj].mine) cnt++;
      }
    }
    console.log(cnt);
    board[i][j].adjacent = cnt;
  }
}

//Create the grid with cells


const cells = document.querySelectorAll('.cell.hidden');

//add eventListener to each cell for clicks
// If clicked, change the class of the cell for visuals and keep 
// track of the number of mines left in javascript

for(let i = 0; i < 16; i++){
  for(let j = 0; j < 30; j++){
    cells[30*i+j].addEventListener("click", () => reveal_cell(i, j));
  }
}

// Called when a cell is clicked
function reveal_cell(i, j){
  var index = 30*i + j;
  cells[index].classList.remove('hidden');
  // Is the cell you clicked a mine?
  //Else:
  if(board[i][j].mine == true){
    cells[index].classList.add('mine');
  }else{
    cells[index].classList.add(number_to_string(board[i][j].adjacent));
    if(board[i][j].adjacent == 0){
      reveal_adjacent_cells(i, j);
    }
  }
}

function reveal_adjacent_cells(i, j){
  for(let x = -1; x <= 1; x++){
      for(let y = -1; y <= 1; y++){
        const ni = i + x;
        const nj = j + y;
        var index = ni*30 + nj;
        if(x == 0 && y == 0) continue;
        if(ni >= 0 && ni < 16 && nj >= 0 && nj < 30){
          if(!board[ni][nj].mine){
            cells[index].classList.add(number_to_string(board[ni][nj].adjacent));
          }
        }
      }
  }
}
function number_to_string(n){
  if(n == 1) return 'one';
  else if(n == 2) return 'two';
  else if(n == 3) return 'three';
  else if(n == 4) return 'four';
  else if(n == 5) return 'five';
  else if(n == 6) return 'six';
  else if(n == 7) return 'seven';
  else if(n == 8) return 'eight';
  else return 'blank';
}
