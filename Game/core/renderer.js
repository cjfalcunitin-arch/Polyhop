// /Game/core/renderer.js
import { drawPlayer } from "Game/draw/player.js";
import { drawEnemy } from "Game/draw/enemy.js";
import { drawFloor } from "Game/draw/floor.js";
import { createDoor, drawDoor } from "Game/draw/door.js";
import { on, trigger } from "Game/core/eventhandler.js";
import { createProjectileSystem } from "Game/system/projectilesystem.js";
import { getLevelConfig } from "Game/levels/level.js";
import { setCredit } from "Game/system/credit.js";
import { showCardEvent } from "Game/system/cardevent.js";

export function createRenderer(canvas, level) {
  const ctx = canvas.getContext("2d");

  // Get level-specific configuration
  const levelConfig = getLevelConfig(level);

  // Set initial credit for this level
  setCredit(levelConfig.credit);

  const floorHeight = 30;
  const floor4Height = 90;
  const numFloors = 4;
  const floorGap = 150;

  const floors = [];
  for (let i = 0; i < numFloors; i++) {
    const height = i === 3 ? floor4Height : floorHeight;
    floors.push({
      id: `floor-${i}`,
      y: canvas.height - height - i * floorGap,
      height: height,
      entities: [],
      doors: []
    });
  }

  // ===== PLAYER DEFINITION =====
  const player = {
    id: `player-1`,
    size: 20,
    floor: 0,
    x: 50 + 20,
    speed: 100,
    direction: 1,
    moving: false,
    get y() {
      return floors[this.floor].y - 40;
    },
    hitbox: null
  };
  
  // ===== INITIAL ENEMIES (from level config) =====
  const allInitialEnemies = [];
  
  levelConfig.initialEnemies.forEach((enemyConfig) => {
    const enemy = {
      ...enemyConfig,
      x: canvas.width - 20 - 20,
      direction: -1,
      moving: false,
      get y() {
        return floors[this.floor].y - 5;
      },
      hitbox: null
    };
    allInitialEnemies.push(enemy);
  });

  // ===== CREATE DOORS =====
  const edgeOffset = 30;
  const doorWidth = 40;
  const doorHeight = 60;

  const door0Right = createDoor('door-floor0-right', canvas.width - edgeOffset - doorWidth / 2, 0, { width: doorWidth, height: doorHeight, color: '#8B4513', knobColor: '#00FF00' });
  floors[0].doors.push(door0Right);

  const door1Left = createDoor('door-floor1-left', edgeOffset + doorWidth / 2, 1, { width: doorWidth, height: doorHeight, color: '#8B4513', knobColor: '#FFD700' });
  const door1Right = createDoor('door-floor1-right', canvas.width - edgeOffset - doorWidth / 2, 1, { width: doorWidth, height: doorHeight, color: '#8B4513', knobColor: '#00FF00' });
  floors[1].doors.push(door1Left, door1Right);

  const door2Right = createDoor('door-floor2-right', canvas.width - edgeOffset - doorWidth / 2, 2, { width: doorWidth, height: doorHeight, color: '#8B4513', knobColor: '#FFD700' });
  const door2Left = createDoor('door-floor2-left', edgeOffset + doorWidth / 2, 2, { width: doorWidth, height: doorHeight, color: '#8B4513', knobColor: '#000000' });
  floors[2].doors.push(door2Right, door2Left);

  const door3Left = createDoor('door-floor3-left', edgeOffset + doorWidth / 2, 3, { width: doorWidth, height: doorHeight, color: '#8B4513', knobColor: '#FFD700' });
  const door3Right = createDoor('door-floor3-right', canvas.width - edgeOffset - doorWidth / 2, 3, { width: doorWidth, height: doorHeight, color: '#8B4513', knobColor: '#00FF00' });
  floors[3].doors.push(door3Left, door3Right);

  // ===== HELPER FUNCTIONS =====
  function attachEntityToFloor(entity, floorIndex) {
    floors[floorIndex].entities.push(entity);
    entity.floor = floorIndex;

    if (floorIndex === 2 && entity.id.startsWith("player")) {
      entity.direction = -1;
    }
  }

  function spawnWaveEnemies(floorIndex) {
    const floorWave = levelConfig.waves[floorIndex];
    if (!floorWave || floorWave.length === 0) return;

    floorWave.forEach(eInfo => {
      const enemy = {
        ...eInfo,
        floor: floorIndex,
        direction: -1,
        x: canvas.width - 80 - 20,
        moving: true,
        get y() { 
          return floors[this.floor].y - 5; 
        },
        hitbox: null
      };
      attachEntityToFloor(enemy, floorIndex);
    });
  }

  function floorHasEnemies(floorIndex) {
    return floors[floorIndex].entities.some(entity => 
      entity.id.startsWith("enemy") || entity.id.startsWith("wave-enemy")
    );
  }

  // ===== INITIAL SETUP =====
  attachEntityToFloor(player, player.floor);
  
  // Add all initial enemies to their designated floors
  allInitialEnemies.forEach(enemy => {
    attachEntityToFloor(enemy, enemy.floor);
  });

  const projectileSystem = createProjectileSystem({ canvas });
  let projectilesActive = false;

  // ===== EVENT HANDLERS =====
  on("startMoving", () => {
    projectilesActive = true;
    
    if (!floorHasEnemies(player.floor)) player.moving = true;

    // Start moving all initial enemies
    allInitialEnemies.forEach(enemy => {
      enemy.moving = true;
    });

    // Spawn wave for floor 0
    spawnWaveEnemies(0);

    // Make wave enemies move when player moves
    floors[0].entities.forEach(entity => {
      if (entity.id.startsWith("wave-enemy")) {
        entity.moving = true;
      }
    });
  });

  on("playerDoorCollision", ({ player, door }) => {
    // Spawn waves for the floor the player just entered
    const currentFloor = player.floor;
    
    if (currentFloor >= 0 && currentFloor < floors.length) {
      // Activate enemies on this floor
      floors[currentFloor].entities.forEach(entity => {
        if (entity.id.startsWith("enemy") || entity.id.startsWith("wave-enemy")) {
          entity.moving = true;
        }
      });
      
      // Spawn wave enemies for this floor if not already spawned
      spawnWaveEnemies(currentFloor);
    }
  });

  // ===== COLLISION DETECTION =====
  function checkCollision(a, b) {
    return (
      a.x < b.x + b.width &&
      a.x + a.width > b.x &&
      a.y < b.y + b.height &&
      a.y + a.height > b.y
    );
  }

  // ===== MAIN DRAW LOOP =====
  let lastTime = 0;

  function draw(timestamp) {
    const delta = (timestamp - lastTime) / 1000;
    lastTime = timestamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Auto-move player if no enemies on floor
    if (!floorHasEnemies(player.floor)) {
      player.moving = true;
    }

    // Update positions
    if (player.moving) player.x += player.speed * delta * player.direction;

    // Update all entities (initial enemies + wave enemies)
    floors.forEach((floor) => {
      floor.entities.forEach(entity => {
        if ((entity.id.startsWith("wave-enemy") || entity.id.startsWith("enemy")) && entity.moving) {
          entity.x += entity.speed * delta * entity.direction;
          
          // Keep entities within canvas bounds
          if (entity.x < 20) entity.direction = 1;
          if (entity.x > canvas.width - 20) entity.direction = -1;
        }
      });
    });

    // Keep player within canvas bounds
    if (player.x < 20) player.direction = 1;
    if (player.x > canvas.width - 20) player.direction = -1;

    // Draw everything
    floors.forEach(floor => {
      drawFloor(ctx, canvas.width, floor.y + floor.height, floor.height);
      floor.doors.forEach(door => drawDoor(ctx, door, floors));

      floor.entities.forEach(entity => {
        let hb;
        if (entity.id.startsWith("player")) {
          hb = drawPlayer(ctx, entity.x, entity.y, entity.size);
        } else {
          hb = drawEnemy(ctx, entity.x, entity.y, entity.size);
        }
        entity.hitbox = hb;
      });
    });

    // Update and draw projectiles
    if (projectilesActive) {
      // Get all enemies from all floors
      const allEnemies = floors.flatMap(floor => 
        floor.entities.filter(e => e.id.startsWith("enemy") || e.id.startsWith("wave-enemy"))
      );
      projectileSystem.update(delta, player, allEnemies);
    }
    projectileSystem.draw(ctx);
// Check collisions
floors.forEach((floor, floorIndex) => {
  floor.doors.forEach(door => {
    const doorHitbox = { 
      x: door.x - door.width / 2, 
      y: door.getY(floors), 
      width: door.width, 
      height: door.height 
    };

    // Player-door collision
    if (player.hitbox && checkCollision(player.hitbox, doorHitbox)) {
      // Only trigger next round when last door is reached
      if (door.type === 'last') {
        player.moving = false;
        trigger("readyToNextRound", { player, floor: player.floor, door });
      } else {
        // Handle normal door movement for 'exit' or 'entry' doors
        if (door.type === 'exit') {
          const nextFloor = floors[floorIndex + 1];
          const entryDoor = nextFloor?.doors.find(d => d.type === 'entry');

          if (entryDoor) {
            player.x = entryDoor.x;
            if (!nextFloor.entities.some(e => e.id === player.id)) {
              attachEntityToFloor(player, floorIndex + 1);
            }
          }
        }
      }
    }

    // Player-enemy collision
    floor.entities.forEach(entity => {
      if ((entity.id.startsWith("enemy") || entity.id.startsWith("wave-enemy")) && 
          player.hitbox && entity.hitbox) {
        if (checkCollision(player.hitbox, entity.hitbox)) {
          trigger("playerEnemyCollision", { player, enemy: entity });
        }
      }
    });
  });
});
requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);

  // ===== UTILITY FUNCTIONS =====
  function moveEntityToFloor(entity, floorIndex) {
    if (floorIndex < 0 || floorIndex >= floors.length) return;
    const currentFloor = floors[entity.floor];
    currentFloor.entities = currentFloor.entities.filter(e => e.id !== entity.id);
    attachEntityToFloor(entity, floorIndex);
  }

  return {
    player,
    enemy: allInitialEnemies[0],  // For backwards compatibility
    enemyFloor1: allInitialEnemies[1],  // For backwards compatibility
    allInitialEnemies,
    floors,
    moveEntityToFloor,
    doors: floors.flatMap(f => f.doors),
    projectiles: projectileSystem.projectiles,
    level,
    levelConfig
  };
}
