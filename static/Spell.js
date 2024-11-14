class Spell {
  constructor() {
      this.strokes = [];
  }

  addStroke(stroke) {
      this.strokes.push(stroke);
  }

  clearStrokes() {
      this.strokes = [];
  }

  drawSpell(ctx) {
      this.strokes.forEach(stroke => stroke.draw(ctx)); // Draw each stroke in the spell
  }

  getStrokesCoordinates() {
    return this.strokes.map(stroke => stroke.getCoordinates());
  }
}
