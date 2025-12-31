import { on } from "Game/core/eventhandler.js";
import { addCredit } from "Game/system/credit.js";
import { trigger } from "Game/core/eventhandler.js";

/**
 * Handles player-enemy collisions
 * @param {object} renderer - the renderer object returned by createRenderer
 */
export function setupPlayerCollision(renderer) {
  const playerHasWeapon = true;
  const enemyHasWeapon = true;

  function situation1(player, enemy) {
    console.log("Situation 1 triggered: Player hit by enemy without weapons");

    const currentFloor = renderer.floors[player.floor];
    currentFloor.entities = currentFloor.entities.filter(e => e.id !== player.id);
    player.moving = false;
    renderer.player = null;

    console.log("Player removed from canvas.");
  }

  function situation2(player, enemy) {
    console.log("Situation 2 triggered: Player hit enemy while both have weapons");

    const currentFloor = renderer.floors[enemy.floor];
    currentFloor.entities = currentFloor.entities.filter(e => e.id !== enemy.id);
    enemy.moving = false;
    renderer.enemy = null;

    // ===== ADD RANDOM CREDIT =====
    const possibleCredits = [45, 50, 55];
    const randomCredit = possibleCredits[Math.floor(Math.random() * possibleCredits.length)];
    addCredit(randomCredit);

    // ===== TRIGGER CREDIT EVENT =====
    trigger("creditEvent", { amount: randomCredit });

    console.log(`Enemy defeated! Added ${randomCredit} credits.`);
  }

  on("playerEnemyCollision", ({ player, enemy }) => {
    if (!playerHasWeapon && !enemyHasWeapon) {
      situation1(player, enemy);
    } else if (playerHasWeapon && enemyHasWeapon) {
      situation2(player, enemy);
    }
  });
}
