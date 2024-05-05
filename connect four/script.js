var rows = 6;
var columns = 7;
var board;
var currentPlayer=1;
let gameover=false;
let fixedColumn=[];
let move =document.querySelector('.move');
move.innerHTML=currentPlayer;
window.onload = function () {
  setgame();
};

function setgame() {
  board = [];
  fixedColumn=[5,5,5,5,5,5,5]
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let y = 0; y < columns; y++) {
      row.push(" ");
      let tile = document.createElement("div"); //<div class='tile'></div>
      tile.classList.add("tile");
      tile.id=i.toString()+'-'+y.toString();
      tile.addEventListener('click',setpiece)
      document.getElementById("board").append(tile);
    }
    board.push(row);
 }
}

function setpiece(){
    if (gameover)
    {
        return;
    }
    
    let coOrd=this.id.split("-")   //0-0  ["0","0"]
    let r=parseInt(coOrd[0]);
    let c=parseInt(coOrd[1]);
  board[r][c]=currentPlayer;
  r=fixedColumn[c];
  if(r<0){
    return;
  }
  let currentTile=document.getElementById(r.toString()+"-"+c.toString())
  
  if (currentPlayer==1)
  {currentTile.classList.add('player-one')

  currentPlayer=2;
  move.innerHTML=currentPlayer;
}
 else if(currentPlayer==2)
  {
    currentTile.classList.add('player-two')
    currentPlayer=1;
    move.innerHTML=currentPlayer;
  }
r-=1;
fixedColumn[c]=r;
checkWinner();
}
function checkWinner() {
    // horizontal
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++){
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r][c+1] && board[r][c+1] == board[r][c+2] && board[r][c+2] == board[r][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
        }
   }

   // vertical
   for (let c = 0; c < columns; c++) {
       for (let r = 0; r < rows - 3; r++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r+1][c] && board[r+1][c] == board[r+2][c] && board[r+2][c] == board[r+3][c]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }

   // anti diagonal
   for (let r = 0; r < rows - 3; r++) {
       for (let c = 0; c < columns - 3; c++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r+1][c+1] && board[r+1][c+1] == board[r+2][c+2] && board[r+2][c+2] == board[r+3][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }

   // diagonal
   for (let r = 3; r < rows; r++) {
       for (let c = 0; c < columns - 3; c++) {
           if (board[r][c] != ' ') {
               if (board[r][c] == board[r-1][c+1] && board[r-1][c+1] == board[r-2][c+2] && board[r-2][c+2] == board[r-3][c+3]) {
                   setWinner(r, c);
                   return;
               }
           }
       }
   }
}

function setWinner(r, c) {
   let winner = document.querySelector(".winner");
   if (board[r][c] == 1) {
       winner.innerText = "Player 1 Wins";             
   } else {
       winner.innerText = "Player 2 Wins";
   }
   gameover = true;
}