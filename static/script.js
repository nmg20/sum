document.addEventListener("DOMContentLoaded", () => {
    const canvasElement = document.querySelector("canvas");
    const clearButton = document.querySelector("button");

    const sigilCanvas = new SigilCanvas(canvasElement, clearButton);
});
