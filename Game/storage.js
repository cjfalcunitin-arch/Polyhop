// storage.js

const STORAGE_KEY = "pickedCards";

/* ===== GET PICKED CARDS ===== */
export function getPickedCards() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

/* ===== ADD PICKED CARD ===== */
export function addPickedCard(cardId) {
  const picked = getPickedCards();

  if (!picked.includes(cardId)) {
    picked.push(cardId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(picked));

    // ✅ Console log when card is added
    console.log(`[STORAGE] Card added: ${cardId}`);
    console.log(`[STORAGE] Current picked cards:`, picked);
  } else {
    // Optional: log duplicate attempts
    console.log(`[STORAGE] Card already picked: ${cardId}`);
  }
}

/* ===== CHECK IF CARD IS PICKED ===== */
export function isCardPicked(cardId) {
  return getPickedCards().includes(cardId);
}

/* ===== RESET PICKED CARDS ===== */
export function resetPickedCards() {
  localStorage.removeItem(STORAGE_KEY);
  console.log(`[STORAGE] Picked cards have been reset.`);
}
