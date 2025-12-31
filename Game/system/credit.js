// /Game/system/credit.js

// ===== GLOBAL CREDIT VARIABLE =====
let currentCredit = 0;

// ===== RESET CREDIT (called at start of level) =====
export function resetCredit() {
  currentCredit = 0; // or you can initialize to 250 here if preferred
}

// ===== SET CREDIT =====
export function setCredit(amount) {
  currentCredit = amount;
}

// ===== GET CURRENT CREDIT =====
export function getCredit() {
  return currentCredit;
}

// ===== ADD CREDIT =====
export function addCredit(amount) {
  currentCredit += amount;
}

// ===== SUBTRACT CREDIT =====
export function subtractCredit(amount) {
  currentCredit -= amount;
  if (currentCredit < 0) currentCredit = 0;
}
