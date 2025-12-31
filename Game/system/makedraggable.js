/**
 * Makes a given element draggable with mouse and touch support,
 * snaps to original position if not dropped onto a snap target.
 * Merges cards of the same type when dropped together.
 * @param {HTMLElement} element
 * @param {HTMLElement[]} snapTargets - array of elements to snap to
 */
export function makeDraggable(element, snapTargets = []) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;
  
  // Store original position
  const originalLeft = element.offsetLeft;
  const originalTop = element.offsetTop;
  
  const startDrag = (clientX, clientY) => {
    isDragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = clientX - rect.left;
    offsetY = clientY - rect.top;
    element.style.cursor = "grabbing";
    element.style.zIndex = "1000";
    document.body.appendChild(element); // ensure on top
  };
  
  const dragMove = (clientX, clientY) => {
    if (!isDragging) return;
    
    // Calculate new position
    let newLeft = clientX - offsetX;
    let newTop = clientY - offsetY;
    
    // Constrain within viewport
    const maxLeft = window.innerWidth - element.offsetWidth;
    const maxTop = window.innerHeight - element.offsetHeight;
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));
    
    element.style.left = newLeft + "px";
    element.style.top = newTop + "px";
  };
  
  const endDrag = () => {
    if (!isDragging) return;
    isDragging = false;
    element.style.cursor = "grab";
    element.style.zIndex = "10";
    
    let snapped = false;
    
    if (snapTargets.length > 0) {
      let closest = null;
      let minDist = Infinity;
      const elRect = element.getBoundingClientRect();
      
      snapTargets.forEach((target) => {
        const tRect = target.getBoundingClientRect();
        const dx = elRect.left - tRect.left;
        const dy = elRect.top - tRect.top;
        const dist = Math.hypot(dx, dy);
        if (dist < minDist) {
          minDist = dist;
          closest = target;
        }
      });
      
      if (closest && minDist < 50) { // Snap if within 50px
        // Check if target has a card already
        const existingCard = closest.firstChild;
        
        if (existingCard) {
          // Get card types
          const draggedType = element.dataset.cardType || element.textContent.replace(/\sx\d+/, '').trim();
          const existingType = existingCard.dataset.cardType || existingCard.textContent.replace(/\sx\d+/, '').trim();
          
          if (draggedType === existingType) {
            // Cards are the same type - merge them!
            const draggedCount = parseInt(element.dataset.count || '1');
            const existingCount = parseInt(existingCard.dataset.count || '1');
            const newCount = draggedCount + existingCount;
            
            // Update existing card
            existingCard.dataset.count = newCount;
            existingCard.textContent = `${existingType} x${newCount}`;
            
            // Remove dragged card
            element.remove();
            
            console.log(`[MERGE] Merged ${draggedType} cards: ${draggedCount} + ${existingCount} = ${newCount}`);
            snapped = true;
          } else {
            // Different types - don't merge, return to original
            console.log(`[SNAP] Cannot merge different card types: ${draggedType} vs ${existingType}`);
          }
        } else {
          // Empty box - just snap
          const tRect = closest.getBoundingClientRect();
          element.style.left = tRect.left + "px";
          element.style.top = tRect.top + "px";
          
          // Append to target box
          closest.appendChild(element);
          
          console.log(`[SNAP] Card snapped to empty box at:`, {
            left: tRect.left,
            top: tRect.top,
          });
          snapped = true;
        }
      }
    }
    
    // If not snapped, return to original position
    if (!snapped) {
      element.style.left = originalLeft + "px";
      element.style.top = originalTop + "px";
      console.log(`[SNAP] Card returned to original position:`, {
        left: originalLeft,
        top: originalTop,
      });
    }
  };
  
  // ===== Mouse Events =====
  element.addEventListener("mousedown", (e) => {
    e.preventDefault();
    startDrag(e.clientX, e.clientY);
  });
  document.addEventListener("mousemove", (e) => dragMove(e.clientX, e.clientY));
  document.addEventListener("mouseup", endDrag);
  
  // ===== Touch Events =====
  element.addEventListener("touchstart", (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    startDrag(touch.clientX, touch.clientY);
  });
  document.addEventListener("touchmove", (e) => {
    const touch = e.touches[0];
    dragMove(touch.clientX, touch.clientY);
  });
  document.addEventListener("touchend", endDrag);
}