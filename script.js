document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetBtn = document.getElementById('reset-btn');
    const resetLeaderboardBtn = document.getElementById('reset-leaderboard-btn');
    const modal = document.getElementById('modal');
    const span = document.getElementsByClassName('close')[0];
    const confirmReset = document.getElementById('confirm-reset');
    const modalText = document.getElementById('modal-text');
    const currentPlayerElement = document.getElementById('current-player');
    const scoreXElement = document.getElementById('score-x');
    const scoreOElement = document.getElementById('score-o');
    const resultElement = document.getElementById('result');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    let scoreX = 0;
    let scoreO = 0;
    let resetLeaderboard = false;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a == '' || b == '' || c == '') {
                continue;
            }
            if (a == b && b == c) {
                roundWon = true;
                winCondition.forEach(index => {
                    cells[index].classList.add('highlight');
                    currentPlayerElement.innerText = 'No next turn';
                });
                if (currentPlayer == 'X') {
                    scoreX++;
                } else {
                    scoreO++;
                }
                updateScores();
                if (scoreX==scoreO){
                    scoreXElement.classList.add('highlighted_1');
                    scoreOElement.classList.add('highlighted_1');
                }
                else if(scoreX<scoreO){
                    scoreOElement.classList.add('highlighted');
                    scoreXElement.classList.remove('highlighted');
                }
                else if (scoreX>scoreO){
                    scoreXElement.classList.add('highlighted');
                    scoreOElement.classList.remove('highlighted');
                }
                resultElement.innerText = `Player ${currentPlayer} Wins!`;
                break;
            }
        }

        if (roundWon) {
            isGameActive = false;
            return;
        }

        if (!board.includes('')) {
            isGameActive = false;
            resultElement.innerText = `It's a Draw!`;
            currentPlayerElement.innerText = 'No next turn';
        }
    }

    function userAction(cell, index) {
        if (isValidAction(cell) && isGameActive) {
            cell.innerText = currentPlayer;
            cell.classList.add(`player${currentPlayer}`);
            board[index] = currentPlayer;
            handleResultValidation();
            currentPlayer = currentPlayer == 'X' ? 'O' : 'X';
            updateTurnIndicator();
        }
    }

    function isValidAction(cell) {
        if (cell.innerText == 'X' || cell.innerText == 'O') {
            return false;
        }
        return true;
    }

    function resetBoard() {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        currentPlayer = 'X';
        updateTurnIndicator();
        resultElement.innerText = '';

        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('highlight');
        });
    }

    function resetLeaderboardScores() {
        scoreX = 0;
        scoreO = 0;
        scoreOElement.classList.remove('highlighted');
        scoreXElement.classList.remove('highlighted');
        updateScores();
    }

    function updateTurnIndicator() {
        currentPlayerElement.innerText = currentPlayer;
    }

    function updateScores() {
        scoreXElement.innerText = scoreX;
        scoreOElement.innerText = scoreO;
    }

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index));
    });

    resetBtn.onclick = function() {
        resetLeaderboard = false;
        modalText.innerText = 'Are you sure you want to reset the game?';
        modal.style.display = "block";
    }

    resetLeaderboardBtn.onclick = function() {
        resetLeaderboard = true;
        modalText.innerText = 'Are you sure you want to reset the leaderboard?';
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    confirmReset.onclick = function() {
        modal.style.display = "none";
        if (resetLeaderboard) {
            resetLeaderboardScores();
        } else {
            resetBoard();
        }
    }

    updateTurnIndicator();
    updateScores();
});
