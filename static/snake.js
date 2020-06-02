class Node {
	constructor(x, y, direct) {
		this.x = x;
		this.y = y;
		this.direct = direct;
	}
}

class Food {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
}

var node_w;
var node_h;

const rows = 40;
const cols = 40;

let snake = [new Node(20, 20, 'right')];
let food;

var cnv;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setup() {
	cnv = createCanvas(600, 600);
	centerCanvas();
	frameRate(7);
	node_w = 600 / rows;
	node_h = 600 / cols;
	food = new Food(int(random(0, 40)), int(random(0, 40)));
}


function draw() {
	background(255);
	drawGrid();
	drawSnake(snake);
	moveSnake(snake);
	updateSnake(snake);
	drawFood(food);
	if (checkWin(snake)) {
		snake = [new Node(20, 20, 'right')];
	}
}

function drawGrid() {
	for (let i = 0; i < rows + 1; i++) {
		line(i * node_w, 0, i * node_w, height);
		line(0, i * node_h, width, i * node_h);
	}
}

function drawSnake(snake) {
	for (let i = 0; i < snake.length; i++) {
		fill('#000000');
		rect(node_w * snake[i].x, node_h * snake[i].y, node_w, node_h);
	}
}


function addNode(snake) {
	let last = snake[snake.length - 1];

	if (last.direct == 'up') {
		snake.push(
		new Node(last.x, last.y + 1, last.direct)
		);
	} else if (last.direct == 'down') {
		snake.push(
		new Node(last.x, last.y - 1, last.direct)
		);
	} else if (last.direct == 'left') {
		snake.push(
		new Node(last.x + 1, last.y, last.direct)
		);
	} else if (last.direct == 'right') {
		snake.push(
		new Node(last.x - 1, last.y, last.direct)
		);
	}
}

function moveSnake(snake) {
	for (let i = 0; i < snake.length; i++) {
		let node = snake[i];
		if (node.direct == 'up') {
			node.y -= 1;
		} else if (node.direct == 'down') {
			node.y += 1;
		} else if (node.direct == 'left') {
			node.x -= 1;
		} else if (node.direct == 'right') {
			node.x += 1
		}
	}
}

function checkWin(snake) {
	if (
		snake[0].x == -1 || snake[0].x == rows || 
		snake[0].y == -1 || snake[0].y == cols
	) {
		return true;
	}
	for (let i = 1; i < snake.length; i++) {
		if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
			return true;
		}
	}
	return false;
}

function onSnake(snake, x, y) {
	for (let i = 0; i < snake.length; i++) {
		if (snake[i].x == x && snake[i].y == y) {
			return true;
		}
	}
	return false;
}

function updateSnake(snake) {
	for (let i = snake.length - 1; i > 0; i--) {
		snake[i].direct = snake[i - 1].direct;
	}
	let head = snake[0];
	if (head.x == food.x && head.y == food.y) {
		addNode(snake);
		while (true) {
			food = new Food(int(random(0, 40)), int(random(0, 40)));
			if (!onSnake(snake, food.x, food.y)) {
				break;
			}
		}
	}
}

function drawFood(food) {
	fill('#FF0000');
	rect(food.x * node_w, food.y * node_h, node_w, node_h);
}

function keyPressed() {
	if (keyCode == UP_ARROW) {
		if (snake[0].direct != 'down') {
			snake[0].direct = 'up';
		}
	} else if (keyCode == DOWN_ARROW) {
		if (snake[0].direct != 'up') {
			snake[0].direct = 'down';
		}
	} else if (keyCode == RIGHT_ARROW) {
		if (snake[0].direct != 'left') {
			snake[0].direct = 'right';
		}
	} else if (keyCode == LEFT_ARROW) {
		if (snake[0].direct != 'right') {
			snake[0].direct = 'left';
		}
	}
}
