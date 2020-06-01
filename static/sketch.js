let player = {
    x: 30,
    y: 100,
    width: 30,
    height: 60,
    x_vel: 0,
    y_vel: 0
}

var cnv;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}
function setup() {
    cnv = createCanvas(600, 600);
    centerCanvas();
}

function draw() {
    background('#d29a8c');

    update_player();

    fill(color('#b3ae6d'));
    rect(player.x, player.y, player.width, player.height);

    let x_val = 'x_pos: ' + str(player.x);
    let y_val = 'y_pos: ' + str(round(player.y));
    let x_vel = 'x_vel: ' + str(player.x_vel);
    let y_vel = 'y_vel: ' + str(round(player.y_vel));

    textSize(15);
    fill('#000000');
    text(x_val, 10, 20);
    text(y_val, 90, 20);
    text(x_vel, 450, 20);
    text(y_vel, 530, 20);

    textSize(25);
    text('Gravity Simulator', 215, 35);

}

function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        player.x_vel = -4;
        console.log("LEFT");
    } else if (keyCode === RIGHT_ARROW) {
        player.x_vel = 4;
    } else if (keyCode === UP_ARROW) {
        jump();
    }
}
function keyReleased() {
    if (keyCode === LEFT_ARROW) {
        player.x_vel = 0;
    } else if (keyCode === RIGHT_ARROW) {
        player.x_vel = 0;
    }
}

function update_player() {
    // gravity
    player.y_vel += 1.2;
    if (player.y + player.height >= height && player.y_vel > 0) {
        player.y_vel = 0;
        player.y = height - player.height
    }

    player.y += player.y_vel;

    if (player.x_vel > 0 && player.x + player.width < width) {
        player.x += player.x_vel;
    } else if (player.x_vel < 0 && player.x > 0) {
        player.x += player.x_vel;
    }
}

function jump() {
    if (player.y_vel === 0) {
        player.y_vel = -20;
    }
}