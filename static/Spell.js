class Spell {
  constructor() {
      this.strokes = [];
  }

  addStroke(stroke) {
      this.strokes.push(stroke);
  }

  drawSpell(ctx) {
      this.strokes.forEach(stroke => stroke.draw(ctx));
  }

  isComplete() {
      return this.strokes.length > 0 && this.strokes[this.strokes.length - 1].isComplete();
  }
}
