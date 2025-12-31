/**
 * Creates a card element with fallback box.
 * Does NOT make it draggable — drag is applied later with snap targets.
 * @param {string} cardType - The type/name of the card
 * @param {number} width - Width of the card
 * @param {number} height - Height of the card
 * @returns {HTMLElement} - The card element
 */
export function createCardElement(cardType, width, height) {
  const card = document.createElement("div");
  card.style.width = width + "px";
  card.style.height = height + "px";
  card.style.background = "pink";
  card.style.borderRadius = "6px";
  card.style.display = "flex";
  card.style.alignItems = "center";
  card.style.justifyContent = "center";
  card.style.fontWeight = "bold";
  card.style.fontSize = "14px";
  card.style.position = "absolute";
  card.style.cursor = "grab";
  
  // Store card type and count in dataset
  card.dataset.cardType = cardType;
  card.dataset.count = "1";
  card.textContent = cardType;
  
  return card;
}