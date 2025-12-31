// /Game/screens/win.js - Combined Win & Lose overlays

/**
 * Show an overlay when the level is completed or player loses
 * @param {HTMLElement} container - The container to append the overlay to
 * @param {string} type - "win" or "lose"
 * @param {number} [level] - The level that was completed (for win)
 * @param {Function} onContinue - Callback when user clicks continue
 */
export function showOverlay(container, type, onContinue, level) {
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.background = "rgba(0,0,0,0.8)";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = "1000";
  overlay.style.opacity = "0";
  overlay.style.transition = "opacity 0.3s ease";

  const box = document.createElement("div");
  box.style.background = "#fff";
  box.style.padding = "40px";
  box.style.borderRadius = "12px";
  box.style.textAlign = "center";
  box.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
  box.style.transform = "scale(0.8)";
  box.style.transition = "transform 0.3s ease";

  const title = document.createElement("div");
  title.style.fontSize = "36px";
  title.style.fontWeight = "bold";
  title.style.marginBottom = "20px";

  const message = document.createElement("div");
  message.style.fontSize = "20px";
  message.style.marginBottom = "30px";
  message.style.color = "#333";

  const continueBtn = document.createElement("button");
  continueBtn.textContent = "Continue";
  continueBtn.style.padding = "12px 32px";
  continueBtn.style.fontSize = "18px";
  continueBtn.style.fontWeight = "bold";
  continueBtn.style.border = "none";
  continueBtn.style.borderRadius = "6px";
  continueBtn.style.cursor = "pointer";
  continueBtn.style.transition = "transform 0.1s ease, background 0.2s ease";

  continueBtn.addEventListener("mouseenter", () => {
    continueBtn.style.background = type === "win" ? "#27ae60" : "#c0392b";
  });
  continueBtn.addEventListener("mouseleave", () => {
    continueBtn.style.background = type === "win" ? "#2ecc71" : "#e74c3c";
  });
  continueBtn.addEventListener("mousedown", () => {
    continueBtn.style.transform = "scale(0.95)";
  });
  continueBtn.addEventListener("mouseup", () => {
    continueBtn.style.transform = "scale(1)";
  });
  continueBtn.addEventListener("click", () => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      overlay.remove();
      onContinue();
    }, 300);
  });

  // Set overlay content based on type
  if (type === "win") {
    title.textContent = "LEVEL COMPLETE!";
    title.style.color = "#2ecc71";
    message.textContent = `Level ${level} Cleared`;
    continueBtn.style.background = "#2ecc71";
    continueBtn.style.color = "#fff";
  } else if (type === "lose") {
    title.textContent = "YOU LOST!";
    title.style.color = "#e74c3c";
    message.textContent = "Try again!";
    continueBtn.style.background = "#e74c3c";
    continueBtn.style.color = "#fff";
  }

  box.appendChild(title);
  box.appendChild(message);
  box.appendChild(continueBtn);
  overlay.appendChild(box);
  container.appendChild(overlay);

  // Animate in
  setTimeout(() => {
    overlay.style.opacity = "1";
    box.style.transform = "scale(1)";
  }, 10);
}

/**
 * Hide the overlay (win or lose)
 */
export function hideOverlay() {
  const overlay = document.querySelector('[style*="position: fixed"]');
  if (overlay) {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), 300);
  }
}
