class Sigil {
  constructor(canvas) {
      this.canvas = canvas;
      this.strokes = [];
  }

  addStroke(stroke) {
      this.strokes.push(stroke);
  }
}
