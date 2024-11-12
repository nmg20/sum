class Spell {
  constructor() {
      this.strokes = [];
  }

  addStroke(stroke) {
      this.strokes.push(stroke);
  }

  clearStrokes() {
      this.strokes = []; // Clear all strokes in the spell
  }

  drawSpell(ctx) {
      this.strokes.forEach(stroke => stroke.draw(ctx)); // Draw each stroke in the spell
  }
}
