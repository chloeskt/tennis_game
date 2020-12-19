let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 10;

function moveElements() {
  ballX += ballSpeedX;
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }
}

function colorRectangle(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawGame() {
  colorRectangle(0, 0, canvas.width, canvas.height, 'black');
  colorRectangle(0, 200, 10, 100, 'white');
  colorRectangle(800, 200, -10, 100, 'white');
  colorRectangle(ballX, 100, 10, 10, 'red');
}

window.onload = () => {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');

  const framesPerSecond = 30;
  setInterval(
    () => {
      moveElements();
      drawGame();
    },
    1000 / framesPerSecond,
  );
};
