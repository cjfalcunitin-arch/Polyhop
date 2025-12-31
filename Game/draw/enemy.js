/**
 * Draws the enemy on the canvas with feet at floor level
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x - center X
 * @param {number} y - Y position of feet (floor level)
 * @param {number} size
 * @returns {object} hitbox {x, y, width, height}
 */
export function drawEnemy(ctx, x, y, size = 20) {
  const color = "#54C571";
  const outlineColor = "#000";
  const headRadius = size * 0.4;
  
  // Calculate total height of enemy
  const bodyHeight = size;
  const headHeight = headRadius * 2;
  const totalHeight = headHeight + bodyHeight;
  
  // Calculate top of head position (work backwards from feet)
  const feetY = y;
  const bodyTopY = feetY - bodyHeight;
  const headCenterY = bodyTopY - headRadius;
  
  ctx.lineWidth = 2;
  
  // Draw Head (circle at top)
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.strokeStyle = outlineColor;
  ctx.arc(x, headCenterY, headRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Draw Body (triangle below head)
  ctx.beginPath();
  ctx.moveTo(x, bodyTopY); // top point (neck)
  ctx.lineTo(x + size / 2, feetY); // bottom right (foot)
  ctx.lineTo(x - size / 2, feetY); // bottom left (foot)
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Hitbox (from top of head to feet)
  return {
    x: x - size / 2,
    y: feetY - totalHeight, // top of head
    width: size,
    height: totalHeight
  };
}

/**
 * Draws the player on the canvas with feet at floor level
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x - center X
 * @param {number} y - Y position of feet (floor level)
 * @param {number} size
 * @returns {object} hitbox {x, y, width, height}
 */
export function drawPlayer(ctx, x, y, size = 20) {
  const color = "#ADD8E6";
  const outlineColor = "#000";
  const headRadius = size * 0.4;
  
  // Calculate dimensions
  const bodyHeight = size;
  const headHeight = headRadius * 2;
  const totalHeight = headHeight + bodyHeight;
  const topWidth = size * 0.5;
  const bottomWidth = size;
  
  // Calculate positions from feet upward
  const feetY = y;
  const bodyTopY = feetY - bodyHeight;
  const headCenterY = bodyTopY - headRadius;
  
  ctx.fillStyle = color;
  ctx.strokeStyle = outlineColor;
  ctx.lineWidth = 2;
  
  // Draw Head
  ctx.beginPath();
  ctx.arc(x, headCenterY, headRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();
  
  // Draw Body (trapezoid below head)
  ctx.beginPath();
  ctx.moveTo(x - topWidth / 2, bodyTopY); // top left
  ctx.lineTo(x + topWidth / 2, bodyTopY); // top right
  ctx.lineTo(x + bottomWidth / 2, feetY); // bottom right
  ctx.lineTo(x - bottomWidth / 2, feetY); // bottom left
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Hitbox
  return {
    x: x - bottomWidth / 2,
    y: feetY - totalHeight, // top of head
    width: bottomWidth,
    height: totalHeight
  };
}