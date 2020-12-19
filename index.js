let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 4;

let paddle1Y = 250;
const PADDLE_HEIGHT = 100;

function moveElements() {
  ballX += ballSpeedX;
  if (ballX > canvas.width) {
    ballSpeedX = -ballSpeedX;
  }
  if (ballX < 0) {
    ballSpeedX = -ballSpeedX;
  }

  ballY += ballSpeedY;
  if (ballY > canvas.height) {
    ballSpeedY = -ballSpeedY;
  }
  if (ballY < 0) {
    ballSpeedY = -ballSpeedY;
  }
}

function calculateMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  const root = document.documentElement;
  const mouseX = event.clientX - rect.left - root.scrollLeft;
  const mouseY = event.clientY - rect.top - root.scrollTop;
  return {
    x: mouseX,
    y: mouseY,
  };
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
  drawRectangle(0, paddle1Y, 10, PADDLE_HEIGHT, 'white');
  drawRectangle(800, 200, -10, 100, 'white');
  drawBall(ballX, ballY, 10, 'white');
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

  canvas.addEventListener(
    'mousemove',
    (event) => {
      const mousePosition = calculateMousePosition(event);
      paddle1Y = mousePosition.y - (PADDLE_HEIGHT / 2);
    },

  );
};
