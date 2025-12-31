import { addPickedCard, isCardPicked, resetPickedCards } from "/Game/storage.js";
import { getCredit, subtractCredit } from "/Game/system/credit.js";

export function showCardEvent(container) {
  // DON'T reset picked cards at start - let them persist
  // resetPickedCards(); // <-- REMOVED
  
  let cardSet = 0;
  const CARDS_PER_SET = 3;
  const CARD_POOL = ["Knife", "Bullets", "HP", "Square", "Rectangle"];
  
  // Fixed prices
  const CARD_PRICES = {
    Bullets: 35,
    Square: 50,
    Rectangle: 50,
    Knife: 80,
    HP: 40,
  };
  
  // Overlay container
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0,0,0,0.3)";
  overlay.style.display = "flex";
  overlay.style.flexDirection = "column";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.transition = "opacity 0.5s ease";
  overlay.style.zIndex = "999"; // Ensure overlay is on top
  container.appendChild(overlay);
  
  // Title
  const title = document.createElement("div");
  title.textContent = "Pick a Card!";
  title.style.color = "white";
  title.style.fontSize = "32px";
  title.style.marginBottom = "20px";
  overlay.appendChild(title);
  
  // Cards container
  const cardsContainer = document.createElement("div");
  cardsContainer.style.display = "flex";
  cardsContainer.style.gap = "20px";
  overlay.appendChild(cardsContainer);
  
  function getRandomCards() {
    const shuffled = CARD_POOL.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, CARDS_PER_SET);
  }
  
  function createCards() {
    cardsContainer.innerHTML = "";
    const selectedCards = getRandomCards();
    
    selectedCards.forEach((cardName) => {
      const cardId = `card-${cardName}-${cardSet}`;
      const price = CARD_PRICES[cardName];
      
      const card = document.createElement("button");
      card.textContent = `${cardName} ($${price})`;
      card.style.width = "120px";
      card.style.height = "180px";
      card.style.fontSize = "16px";
      card.style.cursor = "pointer";
      card.style.border = "2px solid black";
      card.style.borderRadius = "8px";
      card.style.background = "white";
      
      if (isCardPicked(cardId)) {
        card.disabled = true;
        card.style.opacity = "0.5";
        card.style.cursor = "not-allowed";
      }
      
      card.onclick = () => {
        if (getCredit() >= price) {
          subtractCredit(price);
          addPickedCard(cardId);
          card.disabled = true;
          card.style.opacity = "0.5";
          card.style.cursor = "not-allowed";
          
          // Update credit display if exists
          const creditDisplay = document.querySelector("#creditContainer");
          if (creditDisplay) {
            creditDisplay.textContent = `$${getCredit()}`;
          }
        } else {
          alert("Not enough credits!");
        }
      };
      
      cardsContainer.appendChild(card);
    });
  }
  
  // Initial cards
  createCards();
  
  // Buttons container
  const buttonsContainer = document.createElement("div");
  buttonsContainer.style.marginTop = "20px";
  buttonsContainer.style.display = "flex";
  buttonsContainer.style.gap = "10px";
  overlay.appendChild(buttonsContainer);
  
  // Ready button
  const readyBtn = document.createElement("button");
  readyBtn.textContent = "Ready";
  readyBtn.style.padding = "10px 20px";
  readyBtn.style.fontSize = "16px";
  readyBtn.style.cursor = "pointer";
  readyBtn.style.border = "2px solid black";
  readyBtn.style.borderRadius = "6px";
  readyBtn.style.background = "#4CAF50";
  readyBtn.style.color = "white";
  readyBtn.style.fontWeight = "bold";
  readyBtn.onclick = () => {
    overlay.style.opacity = "0";
    setTimeout(() => {
      container.removeChild(overlay);
    }, 500);
  };
  buttonsContainer.appendChild(readyBtn);
  
  // Reset button (resets the card selection, costs $10)
  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Reset Cards ($10)";
  resetBtn.style.padding = "10px 20px";
  resetBtn.style.fontSize = "16px";
  resetBtn.style.cursor = "pointer";
  resetBtn.style.border = "2px solid black";
  resetBtn.style.borderRadius = "6px";
  resetBtn.style.background = "#FF9800";
  resetBtn.style.color = "white";
  resetBtn.style.fontWeight = "bold";
resetBtn.onclick = () => {
  const resetCost = 10;

  if (getCredit() >= resetCost) {
    // Subtract cost
    subtractCredit(resetCost);

    // Simply refresh the cards WITHOUT touching storage
    cardSet++; // increment card set so new IDs don’t collide visually
    createCards(); 

    // Update credit display if exists
    const creditDisplay = document.querySelector("#creditContainer");
    if (creditDisplay) {
      creditDisplay.textContent = `$${getCredit()}`;
    }
  } else {
    alert("Not enough credits to refresh cards!");
  }
};
  buttonsContainer.appendChild(resetBtn);
  
  // ===== Check Round Button =====
  const checkBtn = document.createElement("button");
  checkBtn.textContent = "Check Round";
  checkBtn.style.padding = "10px 20px";
  checkBtn.style.fontSize = "16px";
  checkBtn.style.cursor = "pointer";
  checkBtn.style.border = "2px solid black";
  checkBtn.style.borderRadius = "6px";
  checkBtn.style.background = "#2196F3";
  checkBtn.style.color = "white";
  checkBtn.style.fontWeight = "bold";
  checkBtn.onclick = () => {
    // Disable all buttons temporarily
    const allButtons = overlay.querySelectorAll("button");
    allButtons.forEach((btn) => (btn.disabled = true));
    
    // Fade out
    overlay.style.opacity = "0";
    
    // Wait for any click on overlay to fade back in
    function handleClick() {
      overlay.style.opacity = "1";
      allButtons.forEach((btn) => (btn.disabled = false));
      overlay.removeEventListener("click", handleClick);
    }
    
    overlay.addEventListener("click", handleClick);
  };
  buttonsContainer.appendChild(checkBtn);
}