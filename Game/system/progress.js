// progress.js - Manages level completion and unlocking

const PROGRESS_KEY = "game_progress";

/**
 * Get the current progress object
 * @returns {Object} Progress data with cleared levels
 */
export function getProgress() {
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse progress:", e);
    }
  }
  // Default progress: only level 1 is unlocked
  return { clearedLevels: [] };
}

/**
 * Mark a level as cleared
 * @param {number} level - The level number to mark as cleared
 */
export function markLevelCleared(level) {
  const progress = getProgress();
  if (!progress.clearedLevels.includes(level)) {
    progress.clearedLevels.push(level);
    progress.clearedLevels.sort((a, b) => a - b);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }
}

/**
 * Check if a level is cleared
 * @param {number} level - The level number to check
 * @returns {boolean} True if the level is cleared
 */
export function isLevelCleared(level) {
  const progress = getProgress();
  return progress.clearedLevels.includes(level);
}

/**
 * Check if a level is unlocked (accessible)
 * Level 1 is always unlocked
 * Other levels are unlocked if the previous level is cleared
 * @param {number} level - The level number to check
 * @returns {boolean} True if the level is unlocked
 */
export function isLevelUnlocked(level) {
  if (level === 1) return true;
  return isLevelCleared(level - 1);
}

/**
 * Get the highest unlocked level
 * @returns {number} The highest level number that is unlocked
 */
export function getHighestUnlockedLevel() {
  const progress = getProgress();
  if (progress.clearedLevels.length === 0) return 1;
  return Math.max(...progress.clearedLevels) + 1;
}

/**
 * Reset all progress (for debugging/testing)
 */
export function resetProgress() {
  localStorage.removeItem(PROGRESS_KEY);
}