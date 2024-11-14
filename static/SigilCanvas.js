class SigilCanvas {
    // constructor(canvasElement, clearButton, spellButton, debugOutput) {
    constructor(canvasElement, spellButton, debugOutput) {
        this.canvasElement = canvasElement;
        this.ctx = canvasElement.getContext("2d");
        // this.clearButton = clearButton;
        this.spellButton = spellButton;
        this.debugOutput = debugOutput;

        this.canvasWidth = this.canvasElement.width = 500;
        this.canvasHeight = this.canvasElement.height = 500;
        this.center = { x: this.canvasWidth / 2, y: this.canvasHeight / 2 };
        this.radius = this.canvasWidth / 2.1;
        // this.spell = new Spell();
        this.spell = new Spell();

        this.offscreenCanvas = document.createElement('canvas');
        this.offscreenCanvas.width = this.canvasWidth;
        this.offscreenCanvas.height = this.canvasHeight;
        this.offscreenCtx = this.offscreenCanvas.getContext("2d");

        this.initCanvas();
        this.attachEventListeners();
    }

    initCanvas() {
        this.clearCanvas();
        this.canvasElement.addEventListener("mousedown", this.startDrawing.bind(this));
        this.spellButton.addEventListener("click", this.executeSpell.bind(this));
        // this.clearButton.addEventListener("click", this.clearCanvas.bind(this));
        // this.spellButton.addEventListener("click", this.displaySpellCoordinates.bind(this));
    }

    drawSigilCircle() {
        this.ctx.beginPath();
        this.ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
        this.ctx.strokeStyle = "#333";
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.offscreenCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.spell = new Spell();
        this.drawSigilCircle();
    }

    insideSigil(x, y) {
        return Math.sqrt((x - this.center.x) ** 2 + (y - this.center.y) ** 2) <= this.radius;
    }

    startDrawing(event) {
        if (this.insideSigil(event.offsetX, event.offsetY)) {
            this.currentStroke = new Stroke(event.offsetX, event.offsetY);
            this.spell.addStroke(this.currentStroke);
            this.canvasElement.addEventListener("mousemove", this.draw.bind(this));
            this.canvasElement.addEventListener("mouseup", this.stopDrawing.bind(this));
        }
    }

    draw(event) {
        if (this.currentStroke && this.insideSigil(event.offsetX, event.offsetY)) {
            this.currentStroke.addPoint(event.offsetX, event.offsetY);
            this.currentStroke.draw(this.offscreenCtx);

            this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            this.drawSigilCircle();
            this.ctx.drawImage(this.offscreenCanvas, 0, 0);
        } else {
            this.stopDrawing();
        }
    }

    stopDrawing() {
        this.canvasElement.removeEventListener("mousemove", this.draw.bind(this));
        this.canvasElement.removeEventListener("mouseup", this.stopDrawing.bind(this));
        this.currentStroke = null;
    }

    displaySpellCoordinates() {
        coordinates = this.spell.getStrokesCoordinates();
        this.outputElement.innerHTML = "";
        this.spell.getStrokesCoordinates().forEach((stroke, index) => {
            const strokeCoords = document.createElement("p",id="coords")
            strokeCoords.style.color = "red";
            strokeCoords.textContent = 'Stroke ${index}: ${JSON.stringify(stroke)}';
            this.outputElement.appendChild(strokeCoords);
        })
        this.spell = null;
    }

    executeSpell() {
        this.displaySpellCoordinates();
        this.clearCanvas();
    }
}