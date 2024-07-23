document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const circles = document.querySelectorAll('.circle');
    const winner = document.getElementById('winner');
    const restartButton = document.getElementById('restartButton');
    let currentPlayer = 'red';
    let gameBoard = Array(42).fill(null);
    let gameActive = true;

    board.addEventListener('click', handleClick);
    restartButton.addEventListener('click', restartGame);

    function handleClick(e) {
        if (!gameActive) return;

        const clickedCircle = e.target;
        if (!clickedCircle.classList.contains('circle') || clickedCircle.style.backgroundColor) return;

        const column = Array.from(circles).indexOf(clickedCircle) % 7;
        const row = getLowestEmptyRow(column);

        if (row === -1) return;

        dropPiece(row, column);

        if (checkWin(row, column)) {
            winner.textContent = `${currentPlayer.toUpperCase()} wins!`;
            gameActive = false;
        } else if (gameBoard.every(cell => cell !== null)) {
            winner.textContent = "It's a draw!";
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
        }
    }

    function getLowestEmptyRow(column) {
        for (let row = 5; row >= 0; row--) {
            if (!gameBoard[row * 7 + column]) {
                return row;
            }
        }
        return -1;
    }

    function dropPiece(row, column) {
        const index = row * 7 + column;
        gameBoard[index] = currentPlayer;
        circles[index].style.backgroundColor = currentPlayer;
    }

    function checkWin(row, column) {
        return (
            checkDirection(row, column, 0, 1) || // Horizontal
            checkDirection(row, column, 1, 0) || // Vertical
            checkDirection(row, column, 1, 1) || // Diagonal /
            checkDirection(row, column, 1, -1)   // Diagonal \
        );
    }

    function checkDirection(row, column, rowDir, colDir) {
        const player = gameBoard[row * 7 + column];
        let count = 1;

        for (let i = 1; i <= 3; i++) {
            const newRow = row + rowDir * i;
            const newCol = column + colDir * i;
            if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7) break;
            if (gameBoard[newRow * 7 + newCol] === player) {
                count++;
            } else {
                break;
            }
        }

        for (let i = 1; i <= 3; i++) {
            const newRow = row - rowDir * i;
            const newCol = column - colDir * i;
            if (newRow < 0 || newRow >= 6 || newCol < 0 || newCol >= 7) break;
            if (gameBoard[newRow * 7 + newCol] === player) {
                count++;
            } else {
                break;
            }
        }

        return count >= 4;

        
    }

    function restartGame() {
        gameBoard = Array(42).fill(null);
        currentPlayer = 'red';
        gameActive = true;
        winner.textContent = '';
        circles.forEach(circle => {
            circle.style.backgroundColor = 'white';
        });
    }
});