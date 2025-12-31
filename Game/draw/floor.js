/**
 * Draws the floor on the canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} canvasWidth
 * @param {number} canvasHeight
 * @param {number} height - floor thickness
 * @returns {object} hitbox {x, y, width, height}
 */
export function drawFloor(ctx, canvasWidth, canvasHeight, height = 30) {
  const x = 0;
  const y = canvasHeight - height;
  const width = canvasWidth;

  ctx.fillStyle = "#888";
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.rect(x, y, width, height);
  ctx.fill();
  ctx.stroke();

  return { x, y, width, height };
}
