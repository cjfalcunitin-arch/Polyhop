// Event handler module for the game
const events = {};

/**
 * Subscribe to a custom event
 * @param {string} eventName 
 * @param {Function} callback 
 */
export function on(eventName, callback) {
  if (!events[eventName]) {
    events[eventName] = [];
  }
  events[eventName].push(callback);
}

/**
 * Trigger an event with optional data
 * @param {string} eventName 
 * @param {any} data 
 */
export function trigger(eventName, data) {
  if (!events[eventName]) return;
  events[eventName].forEach(callback => callback(data));
}
