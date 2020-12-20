import {
    ballX,
    ballY,
    player1Score,
    player2Score,
    showWinScreen,
    WINNING_SCORE,
    paddle1Y,
    paddle2Y,
    PADDLE_HEIGHT,
    PADDLE_THICKNESS,
} from './constants';

function drawRectangle(canvasContext, leftX, topY, width, height, drawColor) {
    // eslint-disable-next-line no-param-reassign
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);
}

function drawBall(canvasContext, centerX, centerY, radius, drawColor) {
    // eslint-disable-next-line no-param-reassign
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill();
}

function drawNet(canvas) {
    for (let i = 0; i < canvas.height; i += 40) {
        drawRectangle(canvas.width / 2 - 1, i, 2, 20, 'white');
    }
}

function drawEndGame(canvasContext) {
    // eslint-disable-next-line no-param-reassign
    canvasContext.fillStyle = 'white';

    if (player1Score >= WINNING_SCORE) {
        canvasContext.fillText('YOU WON!!', 300, 250);
    } else if (player2Score >= WINNING_SCORE) {
        canvasContext.fillText('The computer won :(', 300, 250);
    }
    canvasContext.fillText('Click to continue', 300, 400);
}

function drawGame(canvas, canvasContext) {
    drawRectangle(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    drawRectangle(canvas.width, paddle2Y, -PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
    drawNet();
    drawBall(ballX, ballY, 10, 'white');
    canvasContext.fillText(player1Score, 100, 100);
    canvasContext.fillText(player2Score, canvas.width - 100, 100);
}

export default function drawScreenDisplay(canvas, canvasContext) {
    drawRectangle(0, 0, canvas.width, canvas.height, 'black');

    if (showWinScreen) {
        drawEndGame(canvasContext);
        return;
    }
    drawGame(canvas, canvasContext);
}
