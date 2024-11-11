class Stroke {
  constructor(startX, startY, initialLineWidth = 40, minLineWidth = 3) {
      this.points = [{ x: startX, y: startY }];
      this.initialLineWidth = initialLineWidth;
      this.minLineWidth = minLineWidth;
      this.lineWidths = [initialLineWidth];
      this.lastX = startX;
      this.lastY = startY;
      this.timeStart = Date.now();
  }

  addPoint(x, y) {
      const distance = Math.sqrt((x - this.lastX) ** 2 + (y - this.lastY) ** 2);

      const newWidth = Math.max(this.minLineWidth, this.lineWidths[this.lineWidths.length - 1] - distance * 0.1);
      this.points.push({ x, y });
      this.lineWidths.push(newWidth);

      this.lastX = x;
      this.lastY = y;
  }

  draw(ctx) {
      ctx.beginPath();
      ctx.moveTo(this.points[0].x, this.points[0].y);

      for (let i = 1; i < this.points.length; i++) {
          const point = this.points[i];
          const prevPoint = this.points[i - 1];
          
          const segmentWidth = this.lineWidths[i];

          ctx.lineWidth = segmentWidth;
          ctx.strokeStyle = "#000";
          ctx.lineCap = "round";
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.stroke();
      }
      ctx.closePath();
  }

  isComplete() {
      return Date.now() - this.timeStart >= 5000;
  }
}
