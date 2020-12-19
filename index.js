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

function drawRectangle(leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX, topY, width, height);
}

function drawBall(centerX, centerY, radius, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
  canvasContext.fill();
}

function drawGame() {
  drawRectangle(0, 0, canvas.width, canvas.height, 'black');
  drawRectangle(0, 200, 10, 100, 'white');
  drawRectangle(800, 200, -10, 100, 'white');
  drawBall(ballX, 50, 10, 'white');
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
