const tiles = getTiles();
const players = getPlayers();
let currentPlayer = 1;
let gameInProgress = true;

function getTiles() {
    return document.getElementsByClassName('tile');
}

function getPlayers() {
    return document.getElementsByClassName('player');
}

function checkWin() {
    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], // Horizontales
        [1, 4, 7], [2, 5, 8], [3, 6, 9], // Verticales
        [1, 5, 9], [3, 5, 7] // Diagonales
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        const cellA = tiles[a - 1].textContent;
        const cellB = tiles[b - 1].textContent;
        const cellC = tiles[c - 1].textContent;

        return cellA !== '' && cellA === cellB && cellB === cellC;
    });
}

function checkDraw() {
    return Array.from(tiles).every(tile => tile.textContent !== '');
}

function markCell(tile) {
    tile.textContent = currentPlayer === 1 ? 'X' : 'O';
}

function switchPlayer() {
    currentPlayer = currentPlayer === 1 ? 2 : 1;
}

function endGame(outcome) {
    gameInProgress = false;
    document.getElementById('status').textContent = outcome;
    document.getElementById('restart-btn').style.display = 'block';
}

function resetGame() {
    Array.from(tiles).forEach(tile => {
        tile.textContent = '';
    });

    gameInProgress = true;
    currentPlayer = 1;
    document.getElementById('status').textContent = 'Game in progress...';
    document.getElementById('restart-btn').style.display = 'none';
}

Array.from(tiles).forEach(tile => {
    tile.addEventListener('click', function () {
        if (!gameInProgress || tile.textContent !== '') {
            return;
        }

        markCell(tile);

        if (checkWin()) {
            endGame(`Player ${currentPlayer} won!`);
        } else if (checkDraw()) {
            endGame('Draw!');
        } else {
            switchPlayer();
            updatePlayerLabels();
        }
    });
});

document.getElementById('restart-btn').addEventListener('click', resetGame);

function updatePlayerLabels() {
    Array.from(players).forEach(player => {
        player.classList.toggle('active', currentPlayer === parseInt(player.textContent));
    });
}
