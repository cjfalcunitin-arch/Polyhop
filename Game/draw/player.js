/**
 * Draws the player on the canvas
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x - center X
 * @param {number} y - top of head
 * @param {number} size
 * @returns {object} hitbox {x, y, width, height}
 */
export function drawPlayer(ctx, x, y, size = 20) {
  const color = "#ADD8E6";
  const outlineColor = "#000";
  const headRadius = size * 0.4;

  ctx.fillStyle = color;
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = 2;

  // Head
  ctx.beginPath();
  ctx.arc(x, y + headRadius, headRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Body (trapezoid)
  const bodyHeight = size;
  const topWidth = size * 0.5;
  const bottomWidth = size;
  const bodyTopY = y + headRadius * 2;
  const bodyBottomY = bodyTopY + bodyHeight;

  ctx.beginPath();
  ctx.moveTo(x - topWidth / 2, bodyTopY);
  ctx.lineTo(x + topWidth / 2, bodyTopY);
  ctx.lineTo(x + bottomWidth / 2, bodyBottomY);
  ctx.lineTo(x - bottomWidth / 2, bodyBottomY);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Hitbox
  return {
    x: x - bottomWidth / 2,
    y: y,
    width: bottomWidth,
    height: headRadius * 2 + bodyHeight
  };
}
