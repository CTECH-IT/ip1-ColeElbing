let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let x = canvas.width / 2
let y = canvas.height - 30;

let dx = 2;
let dy = -2;

//create lives
let lives = 3;

//score
let score = 0;

// Creating the dodgeable object
let ballSize = 10;

//Function creates the initial ball

function drawBall(){
    ctx.beginPath();
    ctx.arc(x,y,ballSize, 0, Math.PI*2);
    ctx.fillStyle = "#C724B1";
    ctx.fill();
    ctx.closePath();
}


//Draw the score in the top right corner of the canvas
function drawScore(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 5, 20);
}

//Draws the lives in the top right of the canvas below the score.
function drawLives(){
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width-60, 20);
}

//Drawing all of the objects
function draw(){
    //clear the canvas
    ctx.clearRect(0,0,canvas.width, canvas.height);

    //draw the ball
    drawBall();

    //draws the score
    drawScore();

    //draws the lives
    drawLives();

    //Change the x and y values of the ball
    x += dx;
    y += dy;

    //check if the ball has hit the sides.
    if (x + dx > canvas.width - ballSize || x + dx < ballSize){
        dx = -dx;
    }
    if (y + dy > canvas.height - ballSize || y + dy < ballSize){
        dy = -dy;
    }

}

function counter(){
    let n = 4
    if(lives > 0){
        score = score + n;
        if(lives = lives--){
            n -= n;
        }
    }
}

let increase = setInterval(counter,1000);
let interval = setInterval(draw, 10);
