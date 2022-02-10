let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = (canvas.width / 2) + 10;
let y = canvas.height / 2;

let x2 = (canvas.width / 2) + 30;
let y2 = canvas.height / 2 - 30;

speed = 10;

let dx = 2;
let dy = -2;

let dx2 = -2;
let dy2 = 2;

//create lives
let lives = 3;

//score
let score = 0;

//creating the dodgeable object
let ballSize = 20;

//charater values
let charSize = 10;
let charX = canvas.width / 2;
let charY = canvas.height - 60;

//Function creates the initial ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "#C724B1";
    ctx.fill();
    ctx.closePath();
}

//Second Ball
function drawBall2() {
    ctx.beginPath();
    ctx.arc(x2, y2, ballSize, 0, Math.PI * 2);
    ctx.fillStyle = "#FF6037";
    ctx.fill();
    ctx.closePath();
}

//Creates the movable character
function drawCharacter() {
    ctx.beginPath();
    ctx.arc(charX, charY, charSize, 0, Math.PI * 2);
    ctx.fillStyle = "#FF3131";
    ctx.fill();
    ctx.closePath();
}

//Draw the score in the top right corner of the canvas
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 5, 20);
}

//Draws the lives in the top right of the canvas below the score.
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 60, 20);
}

//Drawing all of the objects
function draw() {
    //clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //draw the ball
    drawBall();

    //draws the score
    drawScore();

    //draws the lives
    drawLives();

    //draw character
    drawCharacter();

    //check if the character and the initial ball collide
    collisionDetection();

    //Creates more balls
    if(score >= 200){
        drawBall2();
    }

    //Change the x and y values of the ball
    x += dx;
    y += dy;

    //Change the x and y values of the second ball
    x2 += dx2;
    y2 += dy2;

    //check if the initial ball has hit the sides.
    if (x + dx > canvas.width - ballSize || x + dx < ballSize) {
        dx = -dx;
    }
    if (y + dy > canvas.height - ballSize || y + dy < ballSize) {
        dy = -dy;
    }

    //Checks if the second ball hits the sides
    if (x2 + dx2 > canvas.width - ballSize || x2 + dx2 < ballSize) {
        dx2 = -dx2;
    }
    if (y2 + dy2 > canvas.height - ballSize || y2 + dy2 < ballSize) {
        dy2 = -dy2;
    }

    //character controls
    if (rightPressed) {
        charX += 3;
        if(charX + charSize > canvas.width){
            charX = canvas.width - charSize;
        }
    }
    else if (leftPressed) {
        charX -= 3;
        if (charX < 0){
            charX = 0 + 2*charSize;
        }
    }
    else if (upPressed){
        charY -= 3;
        if (charY < 0){
            charY = 0 + 2*charSize;
        }
    }
    else if (downPressed){
        charY += 3;
        if(charY + charSize > canvas.height){
            charY = canvas.height - charSize;
        }
    }
    
}
function collisionDetection(){
    if (Math.sqrt(Math.pow((x-charX),2) + Math.pow((y-charY),2)) < charSize + ballSize){
        dy = -dy;
        dx = -dx;
    }
}

// Score counter based on lives
function counter() {
    let n = 4
    if (lives > 0) {
        score = score + n;
        if (lives = lives--) {
            n -= n;
        }
    }
    else if(score >= 200){
        drawBall();
    }
}

//tells when the keys are being pressed
function keyDownHandler(e) {
    if (e.key == 'Right' || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == 'Left' || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    else if (e.key == 'Up' || e.key == "ArrowUp") {
        upPressed = true;
    }
    else if (e.key == 'Down' || e.key == "ArrowDown") {
        downPressed = true;
    }

//tells when the keys are NOT being pressed
}
function keyUpHandler(e) {
    if (e.key == 'Right' || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == 'Left' || e.key == "ArrowLeft") {
        leftPressed = false;
    }
    else if (e.key == 'Up' || e.key == "ArrowUp") {
        upPressed = false;
    }
    else if (e.key == 'Down' || e.key == "ArrowDown") {
        downPressed = false;
    }
}


document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let increase = setInterval(counter, 1000);
let interval = setInterval(draw, speed);
