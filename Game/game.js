import { createRenderer } from "/Game/core/renderer.js";
import { getPickedCards } from "/Game/storage.js";
import { trigger, on } from "/Game/core/eventhandler.js";
import { setupPlayerCollision } from "/Game/system/playercollision.js";
/* ===== NEW: CREDIT DISPLAY ===== */
import { getCredit, resetCredit, setCredit, addCredit, subtractCredit } from "/Game/system/credit.js";

/* ===== NEW: RENDER CARD & DRAG ===== */
import { createCardElement } from "/Game/draw/renderbody.js";
import { makeDraggable } from "/Game/system/makedraggable.js";

/* ===== NEW: PROGRESS & WIN ===== */
import { markLevelCleared, isLevelUnlocked, isLevelCleared } from "/Game/system/progress.js";
import { showOverlay } from "/Game/system/win.js"; // Combined win/lose overlay
export function showGame(container, level, onExitToLobby) {
  /* ===== GLOBAL NO-SCROLL ===== */
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  container.style.overflow = "hidden";

  /* ===== WRAPPER ===== */
  const wrapper = document.createElement("div");
  wrapper.style.height = "100vh";
  wrapper.style.width = "100vw";
  wrapper.style.display = "flex";
  wrapper.style.flexDirection = "column";
  wrapper.style.padding = "12px";
  wrapper.style.boxSizing = "border-box";
  wrapper.style.overflow = "hidden";

  /* ===== STATIC GRID CANVAS (BACKGROUND) ===== */
  const staticCanvas = document.createElement("canvas");
  staticCanvas.width = window.innerWidth - 24; 
  staticCanvas.height = window.innerHeight * 0.68 - 8;
  staticCanvas.style.display = "block";
  staticCanvas.style.borderRadius = "6px";

  const sCtx = staticCanvas.getContext("2d");
  const rows = 8;
  const cols = 10;
  const cellWidth = staticCanvas.width / cols;
  const cellHeight = staticCanvas.height / rows;

  sCtx.strokeStyle = "rgba(68, 68, 68, 0.5)"; // 50% opacity
  sCtx.lineWidth = 1;

  for (let r = 0; r <= rows; r++) {
    const y = r * cellHeight;
    sCtx.beginPath();
    sCtx.moveTo(0, y);
    sCtx.lineTo(staticCanvas.width, y);
    sCtx.stroke();
  }

  for (let c = 0; c <= cols; c++) {
    const x = c * cellWidth;
    sCtx.beginPath();
    sCtx.moveTo(x, 0);
    sCtx.lineTo(x, staticCanvas.height);
    sCtx.stroke();
  }

  /* ===== RENDERER CANVAS (DYNAMIC LAYER) ===== */
  const canvas = document.createElement("canvas");
  canvas.width = staticCanvas.width;
  canvas.height = staticCanvas.height;
  canvas.style.position = "absolute";
  canvas.style.top = staticCanvas.offsetTop + "px";
  canvas.style.left = staticCanvas.offsetLeft + "px";
  canvas.style.borderRadius = "6px";

  const canvasWrapper = document.createElement("div");
  canvasWrapper.style.position = "relative";
  canvasWrapper.style.height = `${canvas.height}px`;
  canvasWrapper.style.width = `${canvas.width}px`;
  canvasWrapper.style.marginBottom = "12px"; // <-- GAP between canvas and control panel
  canvasWrapper.appendChild(staticCanvas);
  canvasWrapper.appendChild(canvas);

  const creditContainer = document.createElement("div");
  creditContainer.style.position = "absolute";
  creditContainer.style.top = "20px";
  creditContainer.style.right = "10px";
  creditContainer.style.padding = "6px 12px";
  creditContainer.style.borderRadius = "6px";
  creditContainer.style.background = "rgba(0,0,0,0.6)";
  creditContainer.style.color = "#fff";
  creditContainer.style.fontWeight = "bold";
  creditContainer.style.fontSize = "16px";
  creditContainer.style.zIndex = "15";
  creditContainer.style.userSelect = "none";
  canvasWrapper.appendChild(creditContainer);

  creditContainer.textContent = `$${getCredit()}`;

  // Function to update credit display
  function updateCreditDisplay() {
    const current = getCredit();
    creditContainer.textContent = current > 0 ? `$${current}` : "-";
  }
  on("creditEvent", ({ amount }) => {
    console.log(`Credit event received: +${amount}`);
    updateCreditDisplay();
    // You can also add visual effects here, e.g., floating "+50" text
  });

  // Example functions to modify credit
  function purchaseItem(cost) {
    subtractCredit(cost);
    updateCreditDisplay();
  }

  function earnCredit(amount) {
    addCredit(amount);
    updateCreditDisplay();
  }

  wrapper.appendChild(canvasWrapper);

  /* ===== START MOVING BUTTON ===== */
  const startBtn = document.createElement("button");
  startBtn.textContent = "START MOVING";

  startBtn.style.position = "absolute";
  startBtn.style.top = "50%";
  startBtn.style.left = "50%";
  startBtn.style.transform = "translate(-50%, -50%)";

  startBtn.style.padding = "12px 20px";
  startBtn.style.fontSize = "16px";
  startBtn.style.fontWeight = "bold";
  startBtn.style.border = "2px solid black";
  startBtn.style.borderRadius = "6px";
  startBtn.style.cursor = "pointer";
  startBtn.style.background = "#fff";
  startBtn.style.zIndex = "10";

  startBtn.style.opacity = "1";
  startBtn.style.transition = "opacity 0.5s ease";

  startBtn.addEventListener("click", () => {
    startBtn.style.opacity = "0";
    startBtn.style.pointerEvents = "none";
    trigger("startMoving", { message: "Player pressed START MOVING!" });
  });

  canvasWrapper.appendChild(startBtn);

  /* ===== MOVE NEXT BUTTON (bottom-right) ===== */
  const moveNextBtn = document.createElement("button");
  moveNextBtn.textContent = "MOVE NEXT";
  moveNextBtn.style.position = "absolute";
  moveNextBtn.style.bottom = "10px";
  moveNextBtn.style.right = "10px";
  moveNextBtn.style.padding = "10px 16px";
  moveNextBtn.style.fontSize = "14px";
  moveNextBtn.style.fontWeight = "bold";
  moveNextBtn.style.border = "2px solid black";
  moveNextBtn.style.borderRadius = "6px";
  moveNextBtn.style.cursor = "pointer";
  moveNextBtn.style.background = "#0f0";
  moveNextBtn.style.zIndex = "10";
  moveNextBtn.style.opacity = "0";
  moveNextBtn.style.transition = "opacity 0.5s ease";
  moveNextBtn.style.pointerEvents = "none";

moveNextBtn.addEventListener("click", () => {
  // Hide the button
  moveNextBtn.style.opacity = "0";
  moveNextBtn.style.pointerEvents = "none";

  // Mark this level as cleared
  markLevelCleared(level);
showOverlay(wrapper, "win", () => {
container.innerHTML = "";
onExitToLobby();
});
});

  canvasWrapper.appendChild(moveNextBtn);

  /* ===== ROUND INDICATOR ===== */
  const roundIndicator = document.createElement("div");
  roundIndicator.style.position = "absolute";
  roundIndicator.style.top = "10px";
  roundIndicator.style.left = "50%";
  roundIndicator.style.transform = "translateX(-50%)";
  roundIndicator.style.display = "flex";
  roundIndicator.style.gap = "10px";
  canvasWrapper.appendChild(roundIndicator);

  const TOTAL_ROUNDS = 6;
  const roundBoxes = [];

  for (let i = 0; i < TOTAL_ROUNDS; i++) {
    const box = document.createElement("div");
    box.style.width = "20px";
    box.style.height = "20px";
    box.style.background = "rgba(255,255,255,0.3)";
    box.style.border = "1px solid black";
    box.style.borderRadius = "2px";
    roundBoxes.push(box);
    roundIndicator.appendChild(box);
  }

  function setCurrentRound(roundIndex) {
    roundBoxes.forEach((box, i) => {
      box.style.background = i <= roundIndex ? "white" : "rgba(255,255,255,0.3)";
    });
  }

  let currentRound = 0;
  setCurrentRound(currentRound);

  on("readyToNextRound", () => {
    moveNextBtn.style.pointerEvents = "auto";
    moveNextBtn.style.opacity = "1";
    if (currentRound < TOTAL_ROUNDS - 1) {
      currentRound++;
      setCurrentRound(currentRound);
    }
  });

  /* ===== CONTROL PANEL ===== */
  const controlPanel = document.createElement("div");
  controlPanel.style.height = "30vh";
  controlPanel.style.display = "flex";
  controlPanel.style.background = "#aaa";
  controlPanel.style.borderRadius = "6px";
  controlPanel.style.overflow = "hidden";

  const boxColor = "rgba(250, 250, 250, 1)";

  /* ===== LEFT PANEL ===== */
  const leftPanel = document.createElement("div");
  leftPanel.style.width = "40%";
  leftPanel.style.display = "flex";
  leftPanel.style.flexDirection = "column";
  leftPanel.style.padding = "6px";
  leftPanel.style.boxSizing = "border-box";

  for (let i = 0; i < 3; i++) {
    const box = document.createElement("button");
    box.style.flex = "1";
    box.style.border = "1.5px solid black";
    box.style.background = boxColor;
    box.style.marginBottom = i < 2 ? "6px" : "0";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.fontWeight = "bold";
    box.style.fontSize = i === 0 ? "22px" : "14px";
    box.style.userSelect = "none";
    box.style.borderRadius = "4px";
    box.style.cursor = "pointer";
    box.style.transition = "transform 0.25s ease";

    if (i === 0) {
      box.textContent = "revolver";
      box.addEventListener("click", () => {
        box.style.transform = "scale(1.05)";
        setTimeout(() => { box.style.transform = "scale(1)"; }, 100);
      });

    }

if (i === 1) {
  box.textContent = "CLEAR LEVEL";
  box.style.background = "#ffd700";
  box.style.fontSize = "16px";

  box.addEventListener("click", () => {
    // Button click animation
    box.style.transform = "scale(1.05)";
    setTimeout(() => {
      box.style.transform = "scale(1)";
    }, 100);

    // Mark level as cleared
    markLevelCleared(level);

    // Show WIN overlay and return to lobby on continue
    showOverlay(wrapper, "win", () => {
      container.innerHTML = "";
      onExitToLobby();
    });
  });
}

    if (i === 2) {
      box.style.opacity = "0.5";
      box.style.pointerEvents = "none";
    }

    leftPanel.appendChild(box);
  }

  /* ===== RIGHT PANEL (3x4 GRID) ===== */
  const rightPanel = document.createElement("div");
  rightPanel.style.width = "60%";
  rightPanel.style.display = "grid";
  rightPanel.style.gridTemplateColumns = "repeat(3, 1fr)";
  rightPanel.style.gridTemplateRows = "repeat(4, 1fr)";
  rightPanel.style.padding = "6px";
  rightPanel.style.boxSizing = "border-box";

  const rightBoxes = [];

  for (let i = 0; i < 12; i++) {
    const box = document.createElement("div");
    box.style.border = "1.5px solid black";
    box.style.background = boxColor;
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.fontWeight = "bold";
    box.style.fontSize = "14px";
    box.style.userSelect = "none";

    if (i >= 9) {
      box.style.opacity = "0.5";
      box.style.pointerEvents = "none";
    }

    rightBoxes.push(box);
    rightPanel.appendChild(box);
  }

  controlPanel.appendChild(leftPanel);
  controlPanel.appendChild(rightPanel);

  wrapper.appendChild(controlPanel);
  container.appendChild(wrapper);

// Add this to your game.js file, replacing the existing populatePickedCards function

function populatePickedCards() {
  const pickedCards = getPickedCards();
  
  console.log("[POPULATE] Picked cards:", pickedCards);
  
  pickedCards.forEach((cardId, index) => {
    if (index >= rightBoxes.length) {
      console.warn(`[POPULATE] Not enough boxes for card ${cardId} at index ${index}`);
      return;
    }
    
    // Check if box already has a card
    if (rightBoxes[index].firstChild) {
      console.warn(`[POPULATE] Box ${index} already has a card, skipping ${cardId}`);
      return;
    }
    
    const parts = cardId.split("-");
    const cardType = parts[1];
    
    console.log(`[POPULATE] Creating card ${cardId} (type: ${cardType}) for box ${index}`);
    
    // Create card element
    const card = createCardElement(cardType, rightBoxes[index].offsetWidth - 4, rightBoxes[index].offsetHeight - 4);
    
    // Position card at its designated box
    const rect = rightBoxes[index].getBoundingClientRect();
    card.style.left = rect.left + "px";
    card.style.top = rect.top + "px";
    
    // Append to the specific box immediately to claim it
    rightBoxes[index].appendChild(card);
    
    console.log(`[POPULATE] Card ${cardId} placed in box ${index}`);
    
    // Get all OTHER empty boxes as snap targets (exclude the current box)
    const emptyBoxes = rightBoxes.filter((box, i) =>
      i !== index && // Don't include current box
      box.style.opacity !== "0.5" // Don't include disabled boxes
    );
    
    console.log(`[POPULATE] Card ${cardId} can snap to ${emptyBoxes.length} other boxes`);
    
    // Make it draggable with other boxes as snap targets
    makeDraggable(card, emptyBoxes);
  });
  
  console.log("[POPULATE] Finished populating cards");
}
  populatePickedCards();

  /* ===== INIT RENDERER & GAME LOOP ===== */
  const renderer = createRenderer(canvas, level);

  // ===== SETUP PLAYER-ENEMY COLLISION HANDLING =====
  setupPlayerCollision(renderer);
}
