const canvas = document.getElementById("ticTacToeCanvas");
const ctx = canvas.getContext("2d");

const boardSize = 3; // Размер игрового поля (3x3)
const cellSize = canvas.width / boardSize; // Размер одной клетки
let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null)); // Игровое поле
let currentPlayer = "X"; // Текущий игрок
let gameOver = false; // Флаг окончания игры

// Рисуем игровое поле
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Рисуем сетку
    ctx.strokeStyle = "#000";
    for (let i = 1; i < boardSize; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }

    // Рисуем крестики и нолики
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === "X") {
                drawX(col, row);
            } else if (board[row][col] === "O") {
                drawO(col, row);
            }
        }
    }
}

// Рисуем крестик
function drawX(col, row) {
    const padding = 20;
    ctx.strokeStyle = "#FF0000";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.moveTo(col * cellSize + padding, row * cellSize + padding);
    ctx.lineTo((col + 1) * cellSize - padding, (row + 1) * cellSize - padding);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo((col + 1) * cellSize - padding, row * cellSize + padding);
    ctx.lineTo(col * cellSize + padding, (row + 1) * cellSize - padding);
    ctx.stroke();
}

// Рисуем нолик
function drawO(col, row) {
    const padding = 20;
    const centerX = col * cellSize + cellSize / 2;
    const centerY = row * cellSize + cellSize / 2;
    const radius = (cellSize - padding * 2) / 2;

    ctx.strokeStyle = "#0000FF";
    ctx.lineWidth = 4;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
}

// Проверка на победителя
function checkWinner() {
    // Проверяем строки, столбцы и диагонали
    for (let i = 0; i < boardSize; i++) {
        // Проверяем строки
        if (board[i][0] && board[i].every((cell) => cell === board[i][0])) {
            return board[i][0];
        }

        // Проверяем столбцы
        if (board[0][i] && board.every((row) => row[i] === board[0][i])) {
            return board[0][i];
        }
    }

    // Проверяем диагонали
    if (
        board[0][0] &&
        board.every((row, index) => row[index] === board[0][0])
    ) {
        return board[0][0];
    }

    if (
        board[0][boardSize - 1] &&
        board.every((row, index) => row[boardSize - 1 - index] === board[0][boardSize - 1])
    ) {
        return board[0][boardSize - 1];
    }

    // Проверяем на ничью
    if (board.flat().every((cell) => cell)) {
        return "draw";
    }

    return null;
}

// Обработчик клика
canvas.addEventListener("click", (e) => {
    if (gameOver) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (!board[row][col]) {
        board[row][col] = currentPlayer;
        currentPlayer = currentPlayer === "X" ? "O" : "X";

        const winner = checkWinner();
        if (winner) {
            gameOver = true;
            setTimeout(() => {
                if (winner === "draw") {
                    alert("Ничья!");
                } else {
                    alert(`Победитель: ${winner}`);
                }
                resetGame();
            }, 100);
        }
    }

    drawBoard();
});

// Сброс игры
function resetGame() {
    board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    currentPlayer = "X";
    gameOver = false;
    drawBoard();
}

// Инициализация
drawBoard();