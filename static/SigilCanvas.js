class SigilCanvas {
  constructor(canvasElement, clearButton) {
      this.canvasElement = canvasElement;
      this.ctx = canvasElement.getContext("2d");
      this.clearButton = clearButton;
      this.canvasWidth = 500;
      this.canvasHeight = 500;
      this.canvasElement.width = this.canvasWidth;
      this.canvasElement.height = this.canvasHeight;
      this.radius = this.canvasWidth / 2.01;
      this.currentStroke = null;
      this.spell = new Spell();
      this.initCanvas();
  }

  initCanvas() {
      this.clearCanvas();
      this.drawSigilCircle();
      this.canvasElement.addEventListener("mousedown", this.startDrawing.bind(this));
      this.canvasElement.addEventListener("mousemove", this.draw.bind(this));
      this.canvasElement.addEventListener("mouseup", this.stopDrawing.bind(this));
      this.clearButton.addEventListener("click", this.clearCanvas.bind(this));
  }

  drawSigilCircle() {
      const centerX = this.canvasWidth / 2;
      const centerY = this.canvasHeight / 2;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, this.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = "#333";
      this.ctx.lineWidth = 3;
      this.ctx.stroke();
      this.ctx.closePath();
  }

  clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      this.drawSigilCircle();
  }

  insideSigil(x, y) {
      const centerX = this.canvasWidth / 2;
      const centerY = this.canvasHeight / 2;
      return Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2) <= this.radius;
  }

  startDrawing(event) {
      if (this.insideSigil(event.offsetX, event.offsetY)) {
          this.currentStroke = new Stroke(event.offsetX, event.offsetY);
          this.spell.addStroke(this.currentStroke);
      }
  }

  draw(event) {
      if (this.currentStroke && event.buttons === 1 && this.insideSigil(event.offsetX, event.offsetY)) {
          this.currentStroke.addPoint(event.offsetX, event.offsetY);
          this.clearCanvas();
          this.spell.drawSpell(this.ctx);
      }
  }

  stopDrawing() {
      if (this.currentStroke) {
          this.currentStroke = null;
      }
  }

  update() {
      if (this.spell.isComplete()) {
          this.clearCanvas();
          this.spell.drawSpell(this.ctx);
      }
  }
}
