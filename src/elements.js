import {
    ballX,
    ballY,
    ballSpeedX,
    ballSpeedY,
    player1Score,
    player2Score,
    showWinScreen,
    WINNING_SCORE,
    paddle1Y,
    paddle2Y,
    PADDLE_HEIGHT,
} from './constants';

function ballReset(canvas) {
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

export default function moveElements(canvas) {
    if (showWinScreen) {
        return;
    }

    computerMovement(canvas);

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
