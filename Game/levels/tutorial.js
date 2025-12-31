import { showCardEvent } from "/Game/system/cardevent.js";
import { setCredit } from '/Game/system/credit.js';

export function showTutorial(container, onComplete) {
  console.log("Tutorial activated");

  // Display cards or instructions
  setCredit(250);
  showCardEvent(container);

  // Overlay removed = tutorial done
  const observer = new MutationObserver((mutationsList, obs) => {
    if (!container.querySelector("div")) {
      console.log("Tutorial completed");
      onComplete(); // continue to level 1
      obs.disconnect();
    }
  });
  observer.observe(container, { childList: true });
}
