document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    const result = document.getElementById('result');
    const resetBtn = document.getElementById('resetBtn');

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return null;
    };

    const checkTie = () => {
        return !gameBoard.includes('') && !checkWinner();
    };

    const updateResult = () => {
        const winner = checkWinner();

        if (winner) {
            result.textContent = `Player ${winner} wins!`;
        } else if (checkTie()) {
            result.textContent = 'It\'s a tie!';
        } else {
            result.textContent = `Player ${currentPlayer}'s turn`;
        }
    };

    const handleClick = (index) => {
        if (gameBoard[index] || !gameActive) {
            return;
        }

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
        } else if (checkTie()) {
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }

        updateResult();
    };

    const handleCellClick = (event) => {
        const index = event.target.dataset.index;
        handleClick(index);
    };

    const resetGame = () => {
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameActive = true;
        currentPlayer = 'X';

        cells.forEach(cell => {
            cell.textContent = '';
        });

        updateResult();
    };

    cells.forEach((cell, index) => {
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
    });

    resetBtn.addEventListener('click', resetGame);

    updateResult();
});
