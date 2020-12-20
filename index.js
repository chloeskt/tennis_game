let canvas;
let canvasContext;
let ballX = 50;
let ballSpeedX = 10;
let ballY = 50;
let ballSpeedY = 4;

let paddle1Y = 250;
let paddle2Y = 250;
const PADDLE_HEIGHT = 120;
const PADDLE_THICKNESS = 10;
const WINNING_SCORE = 3;

let player1Score = 0;
let player2Score = 0;

let showWinScreen = false;

function ballReset() {
  if (player1Score >= WINNING_SCORE || player2Score >= WINNING_SCORE) {
    showWinScreen = true;
  }

  ballSpeedX = -ballSpeedX;
  ballX = canvas.width / 2;
  ballSpeedY = -ballSpeedY;
  ballY = canvas.height / 2;
}

function computerMovement() {
  const paddle2YCenter = paddle2Y + (PADDLE_HEIGHT / 2);
  if (paddle2YCenter < ballY - 35) {
    paddle2Y += 10;
  } else if (paddle2YCenter > ballY + 35) {
    paddle2Y -= 10;
  }
}

function moveElements() {
  if (showWinScreen) {
    return;
  }

  computerMovement();

  ballX += ballSpeedX;

  if (ballX > canvas.width) {
    if (ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      const deltaY = ballY - (paddle2Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.33;
    } else {
      player1Score++;
      ballReset();
    }
  }

  if (ballX < 0) {
    if (ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT) {
      ballSpeedX = -ballSpeedX;

      const deltaY = ballY - (paddle1Y + PADDLE_HEIGHT / 2);
      ballSpeedY = deltaY * 0.33;
    } else {
      player2Score++;
      ballReset();
    }
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

function drawNet() {
  for (let i = 0; i < canvas.height; i += 40) {
    drawRectangle(canvas.width / 2 - 1, i, 2, 20, 'white');
  }
}

function drawEndGame() {
  canvasContext.fillStyle = 'white';

  if (player1Score >= WINNING_SCORE) {
    canvasContext.fillText('YOU WON!!', 300, 250);
  } else if (player2Score >= WINNING_SCORE) {
    canvasContext.fillText('The computer won :(', 300, 250);
  }
  canvasContext.fillText('Click to continue', 300, 400);
}

function drawGame() {
  drawRectangle(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
  drawRectangle(canvas.width, paddle2Y, -PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
  drawNet();
  drawBall(ballX, ballY, 10, 'white');
  canvasContext.fillText(player1Score, 100, 100);
  canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

function drawScreenDisplay() {
  drawRectangle(0, 0, canvas.width, canvas.height, 'black');

  if (showWinScreen) {
    drawEndGame();
    return;
  }
  drawGame();
}

function handleMouseClick() {
  if (showWinScreen) {
    player1Score = 0;
    player2Score = 0;
    showWinScreen = false;
  }
}

window.onload = () => {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.font = '28px serif';

  const framesPerSecond = 30;
  setInterval(
    () => {
      moveElements();
      drawScreenDisplay();
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

  canvas.addEventListener('mousedown', handleMouseClick);
};
