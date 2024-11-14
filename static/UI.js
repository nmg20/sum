// UI.js
import SigilCanvas from './SigilCanvas.js';

class UI {
    constructor(canvasElement, clearButton, spellButton, outputElement) {
      this.SigilCanvas = new SigilCanvas(canvasElement, clearButton, spellButton, outputElement);
    }
}