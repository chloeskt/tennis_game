import drawScreenDisplay from './display';
import moveElements from './elements';
import {
    player1Score, player2Score, showWinScreen, paddle1Y, PADDLE_HEIGHT,
} from './constants';

let canvas;
let canvasContext;

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
            moveElements(canvas);
            drawScreenDisplay(canvas, canvasContext);
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
