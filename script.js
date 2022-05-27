



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
            console.log(i);
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


    
    function pickSq(pickedSq) {
     let clickedSq =  document.getElementById(pickedSq);
    //  let clickCount = 0;
    //  clickCount++
    if (clickedSq.classList.contains('empty') === true) {
      if (clickCount === 0) {
    //  console.log(clickedSq);
     document.getElementById(pickedSq).classList.remove('empty');
     clickedSq.classList.add('clickX');
     gameEndCheck();

     } else  {
         document.getElementById(pickedSq).classList.remove('empty')
         document.getElementById(pickedSq).classList.add('clickO');
         clickCount = clickCount - 2;
         gameEndCheck();
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
let board = gameBoardModule.gameBoardArr;
// console.log(board);
function gameEndCheck() {
    sqCount = 0;
    board.forEach(element => {
        // console.log(element)
       if (element.classList.contains('empty') === true) {
            
            sqCount--;
            console.log(sqCount);
       } else if (element.classList.contains('empty') !== true) {
           sqCount++;
           console.log(sqCount);
       }
        
    });
    if (sqCount === 9) {
        alert('game over')
    }
}

const playerFactory = (pName) => {

    return {
        pName: pName
    }

    
};
const pX = playerFactory('X');
const pO = playerFactory('O');