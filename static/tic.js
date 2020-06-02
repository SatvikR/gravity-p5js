let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
]

let node_w;
let node_h;
let cross_off;
let player = 'o'
let over = false;

var cnv;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setup() {
    cnv = createCanvas(600, 600);
    centerCanvas();
    node_w = width / 3;
    node_h = height / 3;
    cross_off = 0.2 * (node_w + node_h) / 2;
}

function draw() {
    background(255);

    for (let i = 1; i < 3; i++) {
        line(i * node_w, 0, i * node_w, height);
        line(0, i * node_h, width, i * node_h);
    }

    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c] === 'o') {
                circle(c * node_w + node_w / 2, r * node_h + node_h / 2, node_w / 2);
            } else if (board[r][c] === 'x') {
                line(
                    c * node_w + cross_off, r * node_h + cross_off,
                    (c + 1) * node_w - cross_off, (r + 1) * node_h - cross_off
                );
                line(
                    (c + 1) * node_w - cross_off, r * node_h + cross_off,
                    c * node_w + cross_off, (r + 1) * node_h - cross_off
                );
            }
        }
    }

    textSize(100);
    textAlign(CENTER, CENTER);
    if (check_win() == 'x') {
        text('X Wins!', width / 2, height / 2);
        over = true;
    } else if (check_win() == 'o') {
        text('O Wins!', width / 2, height / 2);
        over = true;
    } else if (check_win() == 'draw') {
        text('Draw...', width / 2, height / 2);
        over = true;
    }
}

function mousePressed() {
    if (over) {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        over = false;
        player = 'o';
        return;
    }
    let col = int(mouseX / node_w);
    let row = int(mouseY / node_h);

    if (board[row][col] === '') {
        board[row][col] = player;
        if (player === 'x') {
            player = 'o';
        } else {
            player = 'x';
        }
    }
}

function check_win() {
    for (let i = 0; i < board.length; i++) {
        if (
            board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][2] != '') {
            return board[i][0];
        }
        if (
            board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[2][i] != '') {
            return board[0][i];
        }
    }

    if (
        board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[2][2] != '') {
        return board[0][0];
    }
    if (
        board[2][0] == board[1][1] && board[1][1] == board[0][2] && board[0][2] != '') {
        return board[2][0];
    }
    let full = true;
    for (let r = 0; r < board.length; r++) {
        for (let c = 0; c < board[r].length; c++) {
            if (board[r][c] == '') {
                full = false;
            }
        }
    }
    if (full) {
        return 'draw';
    }
}