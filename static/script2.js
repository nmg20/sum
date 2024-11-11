const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const clearButton = document.querySelector("button");

let canvasWidth = 500;
let canvasHeight = 500;
let radius = canvasWidth / 2.01;

let initialLineWidth = 40;
let minLineWidth = 3;
let currentLineWidth = initialLineWidth;

function drawSigilCircle() {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();
}

function initCanvas() {
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSigilCircle();
    ctx.lineCap = "round";
    canvas.addEventListener("mousedown", startDrawing);
    clearButton.addEventListener("click", clearCanvas);
}

function insideSigil(x, y) {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) <= radius;
}

function startDrawing(event) {
    if (insideSigil(event.offsetX, event.offsetY)) {
        ctx.beginPath();
        ctx.moveTo(event.offsetX, event.offsetY);
        ctx.lastX = event.offsetX;
        ctx.lastY = event.offsetY;
        currentLineWidth = initialLineWidth;
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
    }
}

function draw(event) {
    if (insideSigil(event.offsetX, event.offsetY)) {
        const distance = Math.sqrt(
            (event.offsetX - ctx.lastX) ** 2 + (event.offsetY - ctx.lastY) ** 2
        );

        const minLineWidth = initialLineWidth * 0.5;
        currentLineWidth = Math.max(minLineWidth, currentLineWidth - distance * 0.1);

        ctx.lineWidth = currentLineWidth;
        ctx.strokeStyle = "#000";
        
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();

        ctx.lastX = event.offsetX;
        ctx.lastY = event.offsetY;
    } else {
        stopDrawing();
    }
}

function stopDrawing() {
    ctx.closePath();
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
    currentLineWidth = initialLineWidth;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSigilCircle();
}


initCanvas();
