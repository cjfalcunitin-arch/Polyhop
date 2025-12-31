import { showLoading } from "Game/loading.js";
import { showLobby } from "Game/lobby.js";
import { showGame } from "Game/game.js";
import { showTutorial } from "Game/levels/tutorial.js";
import { getCredit } from "Game/system/credit.js";
import { resetPickedCards } from "Game/storage.js"; 
import { markLevelCleared, isLevelUnlocked, isLevelCleared } from "Game/system/progress.js";

/* ===== GLOBAL FONT ===== */
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href = "https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap";
document.head.appendChild(fontLink);

const globalStyle = document.createElement("style");
globalStyle.textContent = `
  * {
    font-family: 'Patrick Hand', system-ui, -apple-system, BlinkMacSystemFont,
                 'Segoe UI', Arial, sans-serif !important;
  }
`;
document.head.appendChild(globalStyle);

/* ===== GLOBAL NO SCROLL ===== */
document.documentElement.style.overflow = "hidden";
document.body.style.overflow = "hidden";

/* ===== APP ROOT ===== */
const app = document.createElement("div");
document.body.appendChild(app);

/* ===== RESET PROGRESS BUTTON ===== */
const resetBtn = document.createElement("button");
resetBtn.textContent = "Reset Progress";
resetBtn.style.position = "fixed";
resetBtn.style.top = "10px";
resetBtn.style.right = "10px";
resetBtn.style.opacity = '0.5';
resetBtn.style.zIndex = "1000";
resetBtn.onclick = () => {
  localStorage.clear();
  alert("Progress has been reset!");
};
document.body.appendChild(resetBtn);

/* ===== SHOW CREDIT BUTTON ===== */
const creditBtn = document.createElement("button");
creditBtn.textContent = "Show Credit";
creditBtn.style.position = "fixed";
creditBtn.style.top = "50px";
creditBtn.style.right = "10px";
creditBtn.style.opacity = "0.5";
creditBtn.style.zIndex = "1000";
creditBtn.onclick = () => {
  alert(`Current Credit: $${getCredit()}`);
};
document.body.appendChild(creditBtn);

/* ===== RESET PICKED CARDS BUTTON ===== */
const resetCardsBtn = document.createElement("button");
resetCardsBtn.textContent = "Reset Cards";
resetCardsBtn.style.position = "fixed";
resetCardsBtn.style.top = "90px";
resetCardsBtn.style.right = "10px";
resetCardsBtn.style.opacity = "0.5";
resetCardsBtn.style.zIndex = "1000";
resetCardsBtn.onclick = () => {
  resetPickedCards();
  alert("Picked cards have been reset for this level!");
};
document.body.appendChild(resetCardsBtn);


/* ===== HELPERS ===== */
function clearApp() {
  app.innerHTML = "";
}

/* ===== DEBUG FLAG ===== */
const DEBUG_SKIP_LOADING = true;

/* ===== START FLOW ===== */
if (DEBUG_SKIP_LOADING) {
  showLobby(app, startGame);
} else {
  showLoading(app);
  setTimeout(() => {
    clearApp();
    showLobby(app, startGame);
  }, 2000);
}

/* ===== START GAME ===== */
function startGame(level) {
  clearApp();

  if (level === 1) {
    showTutorial(app, () => {
      clearApp();
      showGame(app, level, returnToLobby);
    });
  } else {
    showGame(app, level, returnToLobby);
  }
}

/* ===== RETURN TO LOBBY ===== */
function returnToLobby() {
  clearApp();
  showLobby(app, startGame);
}
