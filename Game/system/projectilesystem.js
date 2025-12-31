// /Game/system/projectile.js
import { trigger } from "Game/core/eventhandler.js";

export function createProjectileSystem(renderer) {
  const projectiles = [];
  const PLAYER_OFFSET = 20; // spawn offset from player
  const SIZE = 10; // projectile size
  const SPEED = 300; // px per second

  let lastFireTime = 0;
  const FIRE_INTERVAL = 1; // seconds

  function spawnProjectile(player) {
    const dir = player.direction;
    const proj = {
      x: player.x + dir * PLAYER_OFFSET,
      y: player.y,
      size: SIZE,
      direction: dir,
      floor: player.floor,
      hitbox: { width: SIZE, height: SIZE }
    };
    projectiles.push(proj);
  }

  function update(delta, player, enemies) {
    // Auto-fire
    lastFireTime += delta;
    if (lastFireTime >= FIRE_INTERVAL) {
      spawnProjectile(player);
      lastFireTime = 0;
    }

    // Move projectiles
    for (let i = projectiles.length - 1; i >= 0; i--) {
      const proj = projectiles[i];

      // move with player
      if (proj.floor === player.floor && proj.direction === player.direction) {
        proj.x += SPEED * delta * proj.direction;
      }

      proj.hitbox.x = proj.x;
      proj.hitbox.y = proj.y;

      // Check collision with enemies
      enemies.forEach(enemy => {
        if (!enemy.moving) return;
        const eHit = {
          x: enemy.x,
          y: enemy.y,
          width: enemy.size,
          height: enemy.size
        };
        if (checkCollision(proj.hitbox, eHit)) {
          trigger("playerEnemyCollision", { player, enemy });
          projectiles.splice(i, 1); // remove projectile
        }
      });

      // Remove if offscreen
      if (proj.x < 0 || proj.x > renderer.canvas.width) {
        projectiles.splice(i, 1);
      }
    }
  }

  function draw(ctx) {
    ctx.fillStyle = "red";
    projectiles.forEach(p => ctx.fillRect(p.x, p.y, p.size, p.size));
  }

  function checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  return { update, draw, projectiles };
}
