let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let sizeInput = document.getElementById('size');
let changeSize = document.getElementById('change-size');
let scoreLabel = document.getElementById('score');

let score = 0;
let size = 4;
let width = canvas.width / size - 6;

let cells = [];
let fontSize;
let loss = false;

startGame();

function startGame() {
    createCells();
    drawAllCells();
    pasteNewCell();
    pasteNewCell();
};

function cell(row, coll) {
    this.value = 0;
    this.x = coll * width + 5 * (coll + 1);
    this.y = row * width + 5 * (row + 1);
};

function createCells() {
    for (let i = 0; i < size; i++) {
        cells[i] = [];
        for (let j = 0; j < size; j++) {
            cells[i][j] = new cell(i, j);
        }
    }
};

function drawCell(cell) {
    ctx.beginPath();
    ctx.rect(cell.x, cell.y, width, width);

    switch (cell.value) {
        case 0 : ctx.fillStyle = "#FF0000"; break;
        case 2 : ctx.fillStyle = "#FF0033"; break;
        case 4 : ctx.fillStyle = "#FF00A6"; break;
        case 8 : ctx.fillStyle = "#DE00FF"; break;
        case 16 : ctx.fillStyle = "#6F00FF"; break;
        case 32 : ctx.fillStyle = "#003CFF"; break;
        case 64 : ctx.fillStyle = "#00EBFF"; break;
        case 128 : ctx.fillStyle = "#00FF8D"; break;
        case 256 : ctx.fillStyle = "#00FF22"; break;
        case 512 : ctx.fillStyle = "#7CFF00"; break;
        case 1024 : ctx.fillStyle = "#F7FF00"; break;
        case 2048 : ctx.fillStyle = "#FF7C00"; break;
        case 4096 : ctx.fillStyle = "#FF2F00"; break;
        default : ctx.fillStyle = "#FFFFFF";
    };

    ctx.fill();
    if (cell.value) {
        fontSize = width / 2;
        ctx.font = fontSize + "px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(cell.value, cell.x + width / 2, cell.y + width / 2);
    }
};

function drawAllCells() {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            drawCell(cells[i][j]);
        }
    }
};

function pasteNewCell() {
    while (true){
        let row = Math.floor(Math.random() * size);
        let coll = Math.floor(Math.random() * size);
        if (!cells[row][coll].value) {
            cells[row][coll].value = 2 * Math.ceil(Math.random() * 2);
            drawAllCells();
            return;
        }
    }
};

document.onkeydown = function (event) {
    if (!loss) {
        if (event.keyCode === 38 || event.keyCode === 87) moveUp();
        else if (event.keyCode === 39 || event.keyCode === 68) moveRight();
        else if (event.keyCode === 40 || event.keyCode === 83) moveDown();
        else if (event.keyCode === 37 || event.keyCode === 65) moveLeft();
        scoreLabel.innerHTML = "Score : " + score;
    }
};

function moveUp() {
    for (let j = 0; j < size; j++) {
        for (let i = 0; i < size; i++) {
            if (cells[i][j].value) {
                let row = i;
                while (row > 0) {
                    if (!cells[row-1][j].value) {
                        cells[row-1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row--;
                    }
                    else if (cells[row-1][j].value == cells[row][j].value) {
                        cells[row-1][j].value *= 2;
                        score += cells[row-1][j].value;
                        cells[row][j].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    pasteNewCell();
};

function moveRight() {
    for (let i = 0; i < size; i++) {
        for (let j = size - 2; j >= 0; j--) {
            if (cells[i][j].value) {
                let coll = j;
                while (coll + 1 < size) {
                    if (!cells[i][coll+1].value) {
                        cells[i][coll+1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll++;
                    }
                    else if (cells[i][coll].value == cells[i][coll+1].value) {
                        cells[i][coll+1].value *= 2;
                        score += cells[i][coll+1].value;
                        cells[i][coll].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    pasteNewCell();
};

function moveDown() {
    for (let j = 0; j < size; j++) {
        for (let i = size - 2; i >= 0; i--) {
            if (cells[i][j].value) {
                let row = i;
                while (row + 1 < size) {
                    if (!cells[row+1][j].value) {
                        cells[row+1][j].value = cells[row][j].value;
                        cells[row][j].value = 0;
                        row++;
                    }
                    else if (cells[row+1][j].value == cells[row][j].value) {
                        cells[row+1][j].value *= 2;
                        score += cells[row+1][j].value;
                        cells[row][j].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    pasteNewCell();
};

function moveLeft() {
    for (let i = 0; i < size; i++) {
        for (let j = 1; j < size; j++) {
            if (cells[i][j].value) {
                let coll = j;
                while (coll - 1 >= 0) {
                    if (!cells[i][coll-1].value) {
                        cells[i][coll-1].value = cells[i][coll].value;
                        cells[i][coll].value = 0;
                        coll--;
                    }
                    else if (cells[i][coll].value == cells[i][coll-1].value) {
                        cells[i][coll-1].value *= 2;
                        score += cells[i][coll-1].value;
                        cells[i][coll].value = 0;
                        break;
                    }
                    else break;
                }
            }
        }
    }
    pasteNewCell();
};