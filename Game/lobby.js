import { markLevelCleared, isLevelUnlocked, isLevelCleared } from "/Game/system/progress.js";

export function showLobby(container, onSelectLevel) {
  const lobby = document.createElement("div");
  styleCenter(lobby);
  
  const title = document.createElement("div");
  title.textContent = "LOBBY.JS";
  title.style.marginBottom = "20px";
  
  const buttons = document.createElement("div");
  buttons.style.display = "grid";
  buttons.style.gridTemplateColumns = "repeat(4, 60px)";
  buttons.style.gap = "10px";
  
  for (let i = 1; i <= 12; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.style.position = "relative";
    btn.style.padding = "10px";
    btn.style.fontSize = "16px";
    btn.style.fontWeight = "bold";
    btn.style.borderRadius = "4px";

    const unlocked = isLevelUnlocked(i);

    if (unlocked) {
      btn.onclick = () => onSelectLevel(i);
      btn.style.cursor = "pointer";
      btn.style.border = "2px solid black";
      btn.style.color = "#000";

      // 🔥 Fiery orange for levels less than 6, else white
      if (i > 6  ) {
        btn.style.background = "orange";
        btn.style.color = "#fff"; // optional, better contrast
      } else {
        btn.style.background = "#fff";
      }

    } else {
      btn.disabled = true;
      btn.title = "Finish previous levels first";
      btn.style.cursor = "not-allowed";
      btn.style.background = "#ccc";
      btn.style.border = "2px solid #999";
      btn.style.color = "#666";
      btn.onclick = () => {
        alert("You must finish the previous level first!");
      };
    }
    
    // Add cleared indicator
    if (isLevelCleared(i)) {
      const checkmark = document.createElement("div");
      checkmark.textContent = "✓";
      checkmark.style.position = "absolute";
      checkmark.style.top = "-8px";
      checkmark.style.right = "-8px";
      checkmark.style.width = "20px";
      checkmark.style.height = "20px";
      checkmark.style.background = "#2ecc71";
      checkmark.style.color = "#fff";
      checkmark.style.borderRadius = "50%";
      checkmark.style.display = "flex";
      checkmark.style.alignItems = "center";
      checkmark.style.justifyContent = "center";
      checkmark.style.fontSize = "14px";
      checkmark.style.fontWeight = "bold";
      checkmark.style.border = "2px solid white";
      checkmark.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";
      btn.appendChild(checkmark);
    }
    
    buttons.appendChild(btn);
  }
  
  lobby.appendChild(title);
  lobby.appendChild(buttons);
  container.appendChild(lobby);
}

function styleCenter(el) {
  el.style.height = "100vh";
  el.style.display = "flex";
  el.style.flexDirection = "column";
  el.style.justifyContent = "center";
  el.style.alignItems = "center";
  el.style.fontSize = "24px";
}