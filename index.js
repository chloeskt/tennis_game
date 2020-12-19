var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;

window.onload = function() {
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");

    var framesPerSecond = 30;
    setInterval(
        function() {
            moveElements();
            drawGame();
        },
        1000/framesPerSecond
    );
}

function moveElements() {
    ballX = ballX + ballSpeedX;
    if(ballX > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
    if(ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }
}

function drawGame() {
    colorRectangle(0, 0, canvas.width, canvas.height, "black");
    colorRectangle(0, 200, 10, 100, "white");
    colorRectangle(800, 200, -10, 100, "white");
    colorRectangle(ballX, 100, 10, 10 ,"red");
}

function colorRectangle(leftX, topY, width, height, drawColor) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}
