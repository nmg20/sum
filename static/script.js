document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.getElementById("sigilCanvas");
    // const clearButton = document.getElementById("clearButton");
    const spellButton = document.getElementById("spellButton");
    const debugOutput = document.getElementById("debugOutput");
    
    // const sigilCanvas = new SigilCanvas(canvasElement, clearButton, spellButton, debugOutput);
    const sigilCanvas = new SigilCanvas(canvasElement, spellButton, debugOutput);
    // new UI(canvasElement, clearButton, spellButton, debugOutput);
});
