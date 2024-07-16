document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const scoreDisplay = document.querySelector('.score');
    let squares = [];
    let score = 0;

    // Create the playing board
    function createBoard() {
        for (let i = 0; i < 16; i++) {
            const square = document.createElement('div');
            square.classList.add('grid-cell');
            gridContainer.appendChild(square);
            squares.push(square);
        }
        generate();
        generate();
    }

// Generate a number in a random empty square with a delay
function generate() {
    setTimeout(() => {
        let randomNumber = Math.floor(Math.random() * squares.length);
        if (squares[randomNumber].innerHTML == '') {
            squares[randomNumber].innerHTML = 2;
            squares[randomNumber].style.backgroundColor = '#eee4da'; // Initial background color for 2
            squares[randomNumber].style.color = '#776e65'; // Text color for 2
            squares[randomNumber].classList.add('new-tile');
            setTimeout(() => {
                squares[randomNumber].classList.remove('new-tile');
            }, 400); // Remove the class after the animation completes
            checkForGameOver();
        } else generate();
    }, 500); // Half-second delay before the new tile appears
}



    // Swipe right
    function moveRight() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = zeros.concat(filteredRow);

                squares[i].innerHTML = newRow[0] || '';
                squares[i + 1].innerHTML = newRow[1] || '';
                squares[i + 2].innerHTML = newRow[2] || '';
                squares[i + 3].innerHTML = newRow[3] || '';

                moveTile(squares[i]); // Add this line for each square that moved
                moveTile(squares[i + 1]); // Add this line for each square that moved
                moveTile(squares[i + 2]); // Add this line for each square that moved
                moveTile(squares[i + 3]); // Add this line for each square that moved
            }
        }
    }

    // Swipe left
    function moveLeft() {
        for (let i = 0; i < 16; i++) {
            if (i % 4 === 0) {
                let totalOne = squares[i].innerHTML;
                let totalTwo = squares[i + 1].innerHTML;
                let totalThree = squares[i + 2].innerHTML;
                let totalFour = squares[i + 3].innerHTML;
                let row = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

                let filteredRow = row.filter(num => num);
                let missing = 4 - filteredRow.length;
                let zeros = Array(missing).fill('');
                let newRow = filteredRow.concat(zeros);

                squares[i].innerHTML = newRow[0] || '';
                squares[i + 1].innerHTML = newRow[1] || '';
                squares[i + 2].innerHTML = newRow[2] || '';
                squares[i + 3].innerHTML = newRow[3] || '';

                moveTile(squares[i]); // Add this line for each square that moved
                moveTile(squares[i + 1]); // Add this line for each square that moved
                moveTile(squares[i + 2]); // Add this line for each square that moved
                moveTile(squares[i + 3]); // Add this line for each square that moved
            }
        }
    }

    // Swipe down
    function moveDown() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 4].innerHTML;
            let totalThree = squares[i + 8].innerHTML;
            let totalFour = squares[i + 12].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = zeros.concat(filteredColumn);

            squares[i].innerHTML = newColumn[0] || '';
            squares[i + 4].innerHTML = newColumn[1] || '';
            squares[i + 8].innerHTML = newColumn[2] || '';
            squares[i + 12].innerHTML = newColumn[3] || '';

            moveTile(squares[i]); // Add this line for each square that moved
            moveTile(squares[i + 4]); // Add this line for each square that moved
            moveTile(squares[i + 8]); // Add this line for each square that moved
            moveTile(squares[i + 12]); // Add this line for each square that moved
        }
    }

    // Swipe up
    function moveUp() {
        for (let i = 0; i < 4; i++) {
            let totalOne = squares[i].innerHTML;
            let totalTwo = squares[i + 4].innerHTML;
            let totalThree = squares[i + 8].innerHTML;
            let totalFour = squares[i + 12].innerHTML;
            let column = [parseInt(totalOne), parseInt(totalTwo), parseInt(totalThree), parseInt(totalFour)];

            let filteredColumn = column.filter(num => num);
            let missing = 4 - filteredColumn.length;
            let zeros = Array(missing).fill('');
            let newColumn = filteredColumn.concat(zeros);

            squares[i].innerHTML = newColumn[0] || '';
            squares[i + 4].innerHTML = newColumn[1] || '';
            squares[i + 8].innerHTML = newColumn[2] || '';
            squares[i + 12].innerHTML = newColumn[3] || '';

            moveTile(squares[i]); // Add this line for each square that moved
            moveTile(squares[i + 4]); // Add this line for each square that moved
            moveTile(squares[i + 8]); // Add this line for each square that moved
            moveTile(squares[i + 12]); // Add this line for each square that moved
        }
    }

    // Combine row
    function combineRow() {
        for (let i = 0; i < 15; i++) {
            if (squares[i].innerHTML === squares[i + 1].innerHTML && squares[i].innerHTML !== '') {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 1].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
                removeTileClass(squares[i + 1]);
                squares[i].classList.add('merged');
                setTimeout(() => squares[i].classList.remove('merged'), 200);
            }
        }
        checkForWin();
    }

    // Combine column
    function combineColumn() {
        for (let i = 0; i < 12; i++) {
            if (squares[i].innerHTML === squares[i + 4].innerHTML && squares[i].innerHTML !== '') {
                let combinedTotal = parseInt(squares[i].innerHTML) + parseInt(squares[i + 4].innerHTML);
                squares[i].innerHTML = combinedTotal;
                squares[i + 4].innerHTML = '';
                score += combinedTotal;
                scoreDisplay.innerHTML = score;
                removeTileClass(squares[i + 4]);
                squares[i].classList.add('merged');
                setTimeout(() => squares[i].classList.remove('merged'), 200);
            }
        }
        checkForWin();
    }

    // Remove tile class
    function removeTileClass(square) {
        square.className = 'grid-cell';
    }

    // Move tile and remove the moved class after animation
    function moveTile(square) {
        square.classList.add('tile-moved');
        setTimeout(() => {
            square.classList.remove('tile-moved');
            updateTileColor(square);
        }, 200);
    }

    // Update tile background color and text color based on value
    function updateTileColor(square) {
        const value = parseInt(square.innerHTML);
        square.style.color = value <= 4 ? '#776e65' : '#f9f6f2'; // Text color based on value
        switch (value) {
            case 2:
                square.style.backgroundColor = '#eee4da';
                break;
            case 4:
                square.style.backgroundColor = '#ede0c8';
                break;
            case 8:
                square.style.backgroundColor = '#f2b179';
                break;
            case 16:
                square.style.backgroundColor = '#f59563';
                break;
            case 32:
                square.style.backgroundColor = '#f67c5f';
                break;
            case 64:
                square.style.backgroundColor = '#f65e3b';
                break;
            case 128:
                square.style.backgroundColor = '#edcf72';
                break;
            case 256:
                square.style.backgroundColor = '#edcc61';
                break;
            case 512:
                square.style.backgroundColor = '#edc850';
                break;
            case 1024:
                square.style.backgroundColor = '#edc53f';
                break;
            case 2048:
                square.style.backgroundColor = '#edc22e';
                break;
            default:
                square.style.backgroundColor = '#cdc1b4'; // Default color for other values
                break;
        }
    }

    // Assign keycodes
    function control(e) {
        if (e.keyCode === 39) {
            keyRight();
        } else if (e.keyCode === 37) {
            keyLeft();
        } else if (e.keyCode === 38) {
            keyUp();
        } else if (e.keyCode === 40) {
            keyDown();
        }
    }
    document.addEventListener('keyup', control);

    function keyRight() {
        moveRight();
        combineRow();
        moveRight();
        generate();
    }

    function keyLeft() {
        moveLeft();
        combineRow();
        moveLeft();
        generate();
    }

    function keyDown() {
        moveDown();
        combineColumn();
        moveDown();
        generate();
    }

    function keyUp() {
        moveUp();
        combineColumn();
        moveUp();
        generate();
    }

    // Check for the number 2048 in the squares to win
    function checkForWin() {
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == 2048) {
                alert('You WIN!');
                document.removeEventListener('keyup', control);
            }
        }
    }

    // Check for no zeros on the board to lose
    function checkForGameOver() {
        let zeros = 0;
        for (let i = 0; i < squares.length; i++) {
            if (squares[i].innerHTML == '') {
                zeros++;
            }
        }
        if (zeros === 0) {
            alert('You LOSE!');
            document.removeEventListener('keyup', control);
        }
    }

    createBoard();
});

