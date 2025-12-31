// Create a new door object
export function createDoor(id, x, floorIndex, options = {}) {
  // Determine type based on knobColor
  let type = 'door'; // default
  if (options.knobColor === '#FFD700') type = 'entry';   // yellow knob = entry
  if (options.knobColor === '#00FF00') type = 'exit';    // green knob = exit
  if (options.knobColor === '#000000') type = 'last';    // black knob = last

  return {
    id: id,
    type: type,
    x: x, // horizontal position
    floor: floorIndex,
    width: options.width || 60,
    height: options.height || 80,
    color: options.color || '#8B4513', // brown
    knobColor: options.knobColor || '#FFD700', // default yellow

    // Calculate y position based on floor
    getY(floors) {
      return floors[this.floor].y - this.height;
    },

    // Check if entity is near door
    isNearby(entity, threshold = 30) {
      return Math.abs(entity.x - this.x) < threshold &&
             entity.floor === this.floor;
    }
  };
}

export function drawDoor(ctx, door, floors) {
  const x = door.x;
  const y = door.getY(floors);
  const width = door.width;
  const height = door.height;

  // Draw main door rectangle (brown)
  ctx.fillStyle = door.color; 
  ctx.fillRect(x - width / 2, y, width, height);

  // Draw black outline for the door
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.strokeRect(x - width / 2, y, width, height);

  // Draw doorknob
  const knobX = x + width / 2 - 10;
  const knobY = y + height / 2;
  const knobRadius = 5;

  ctx.fillStyle = door.knobColor; 
  ctx.beginPath();
  ctx.arc(knobX, knobY, knobRadius, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#000';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(knobX, knobY, knobRadius, 0, Math.PI * 2);
  ctx.stroke();
}
