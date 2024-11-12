class Stroke {
    constructor(x, y) {
        this.points = [{ x, y }];
        this.initialLineWidth = 40;
        this.minLineWidth = 20;
    }

    addPoint(x, y) {
        this.points.push({ x, y });
    }

    draw(ctx) {
        if (this.points.length < 2) return;

        ctx.beginPath();
        ctx.moveTo(this.points[0].x, this.points[0].y);

        let currentLineWidth = this.initialLineWidth;

        for (let i = 1; i < this.points.length; i++) {
            const { x, y } = this.points[i];
            const prevPoint = this.points[i - 1];
            const distance = Math.sqrt((x - prevPoint.x) ** 2 + (y - prevPoint.y) ** 2);

            // Adjust line width gradually
            currentLineWidth = Math.max(this.minLineWidth, currentLineWidth - distance * 0.1);
            ctx.lineWidth = currentLineWidth;
            ctx.lineTo(x, y);
        }

        ctx.strokeStyle = "#000";
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.closePath();
    }
}
