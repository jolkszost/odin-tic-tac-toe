




const gameBoardModule = (function() {

    let gameBoardArr = [];
    
    let gameBoard = document.getElementById('gameBoard');
    function generateBoard() {
        
        for (let i = 0; i < 9; i++) {
           let sq = document.createElement('div');
            gameBoard.appendChild(sq);
            sq.classList.add('square');
            sq.classList.add('empty');
            sq.setAttribute('id', `${i}`);
            sq.setAttribute('onclick', 'displayController.pickSq(this.id); displayController.clickCounter();');
            // sq.setAttribute('onClick', 'displayController.clickCounter()')
            
           gameBoardArr.push(sq);
            // console.log(i);
        }
console.log(gameBoardArr)
    } 
    return {
        generateBoard: generateBoard,
        gameBoardArr: gameBoardArr
    };


})();

gameBoardModule.generateBoard();

//  console.log(gameBoardModule.gameBoardArr);




const displayController = (function() {
     let clickCount = 0;
    function clickCounter() {
       
        clickCount++
        // console.log(clickCount);
    };


let board = gameBoardModule.gameBoardArr;
// console.log(board);
function gameEndCheck() {
    sqCount = 0;
    board.forEach(element => {
        // console.log(element)
       if (element.classList.contains('empty') === true) {
            
            sqCount--;
            // console.log(sqCount);
       } else if (element.classList.contains('empty') !== true) {
           sqCount++;
        //    console.log(sqCount);
       }
        
    });
    if (sqCount === 9) {
        let drawMessage = document.getElementById('playerMessage');
       
        drawMessage.textContent = 'Tie Game!'
        
    }
}

function checkPlayerWin() {
    const arrayXs = board.filter(checkIfX);
    const  arrayOs = board.filter(checkIfO);

    function checkIfX(value) {
       return value.classList.contains('X'); 
    }
    function checkIfO(value) {
        return value.classList.contains('O');
    }
    // console.log(arrayOs)
// console.log(arrayXs)
 let oHas0 = arrayOs.includes(document.getElementById('0'));
 let oHas1 = arrayOs.includes(document.getElementById('1'));
 let oHas2 = arrayOs.includes(document.getElementById('2'));
 let oHas3 = arrayOs.includes(document.getElementById('3'));
 let oHas4 = arrayOs.includes(document.getElementById('4'));
 let oHas5 = arrayOs.includes(document.getElementById('5'));
 let oHas6 = arrayOs.includes(document.getElementById('6'));
 let oHas7 = arrayOs.includes(document.getElementById('7'));
 let oHas8 = arrayOs.includes(document.getElementById('8'));

 let xHas0 = arrayXs.includes(document.getElementById('0'));
 let xHas1 = arrayXs.includes(document.getElementById('1'));
 let xHas2 = arrayXs.includes(document.getElementById('2'));
 let xHas3 = arrayXs.includes(document.getElementById('3'));
 let xHas4 = arrayXs.includes(document.getElementById('4'));
 let xHas5 = arrayXs.includes(document.getElementById('5'));
 let xHas6 = arrayXs.includes(document.getElementById('6'));
 let xHas7 = arrayXs.includes(document.getElementById('7'));
 let xHas8 = arrayXs.includes(document.getElementById('8'));

 if ((oHas0 && oHas1 && oHas2) || (oHas0 && oHas3 && oHas6) || (oHas0 && oHas4 && oHas8) || (oHas1 && oHas4 && oHas7)
  || (oHas2 && oHas5 && oHas8) || (oHas2 && oHas4 && oHas6) || (oHas3 && oHas4 && oHas5) || (oHas6 && oHas7 && oHas8))
  {
      let winMessage = document.getElementById('playerMessage');
      winMessage.textContent = '';
      winMessage.textContent = `O Wins! Congratulations ${document.getElementById('playerOName').textContent.slice(13)}!`;

      for(let n = 0; n < 9; n++) {
          document.getElementById(`${n}`).removeAttribute('onclick');
      }
      
      
  };

  if ((xHas0 && xHas1 && xHas2) || (xHas0 && xHas3 && xHas6) || (xHas0 && xHas4 && xHas8) || (xHas1 && xHas4 && xHas7)
  || (xHas2 && xHas5 && xHas8) || (xHas2 && xHas4 && xHas6) || (xHas3 && xHas4 && xHas5) || (xHas6 && xHas7 && xHas8))
  {
    let winMessage = document.getElementById('playerMessage');
    winMessage.textContent = '';
    winMessage.textContent = `X Wins! Congratulations ${document.getElementById('playerXName').textContent.slice(13)}!`;
    for(let n = 0; n < 9; n++) {
        document.getElementById(`${n}`).removeAttribute('onclick');
    }
      
  };

};    



    function pickSq(pickedSq) {
     let clickedSq =  document.getElementById(pickedSq);
    //  let clickCount = 0;
    //  clickCount++
    if (clickedSq.classList.contains('empty') === true) {
      if (clickCount === 0) {
    //  console.log(clickedSq);
     document.getElementById(pickedSq).classList.remove('empty');
     clickedSq.classList.add('X');
     clickedSq.textContent = 'X';
     gameEndCheck();
     checkPlayerWin();

     } else  {
         document.getElementById(pickedSq).classList.remove('empty')
         document.getElementById(pickedSq).classList.add('O');
         document.getElementById(pickedSq).textContent = 'O';
         clickCount = clickCount - 2;
         gameEndCheck();
         checkPlayerWin();
    }   
} else {
    clickCount--
}
    }
    return {
        
        pickSq: pickSq,
        clickCounter: clickCounter
    }
 
})();

const playerModule = (function() {
const playerFactory = (pName, xOrO) => {

    return {
        pName: pName,
        xOrO: xOrO
    }

    
};
const fillOName = function() {

   let oName = document.getElementById('playerOName');
   let oNameInput = document.getElementById('playerO');
   if (oName.textContent === 'Player O') {
   oName.textContent = `Player O Is: ${oNameInput.value}!`;
   } else {
       let oSubmit = document.getElementById('playerOSubmit');
       oSubmit.removeEventListener('click', fillOName);
       oSubmit.removeEventListener('click', startGameMessage);
   }
}

const fillXName = function() {
    let xName = document.getElementById('playerXName');
    let xNameInput = document.getElementById('playerX');
    if (xName.textContent === 'Player X') {
    xName.textContent = `Player X Is: ${xNameInput.value}!`;
    } else {
        let xSubmit = document.getElementById('playerXSubmit');
        xSubmit.removeEventListener('click', fillXName);
        xSubmit.removeEventListener('click', startGameMessage);
    }
}

const startGameMessage = function() {
    if (document.getElementById('playerOName').textContent !== 'Player O' && document.getElementById('playerXName').textContent !== 'Player X') {
        document.getElementById('playerMessage').textContent = 'Play Away!';
    }
};

document.getElementById('playerXSubmit').addEventListener('click', fillXName);
document.getElementById('playerOSubmit').addEventListener('click', fillOName);
document.getElementById('playerXSubmit').addEventListener('click', startGameMessage);
document.getElementById('playerOSubmit').addEventListener('click', startGameMessage);

})();