// Storage management utilities for debugging and cleanup

/**
 * Clear all corrupted localStorage data
 */
export const clearAppStorage = () => {
  localStorage.removeItem('devtracker-storage');
  console.log('✅ Cleared devtracker storage');
};

/**
 * Get current storage state for debugging
 */
export const getStorageDebugInfo = () => {
  const storage = localStorage.getItem('devtracker-storage');
  const parsed = storage ? JSON.parse(storage) : null;
  
  console.log('=== STORAGE DEBUG INFO ===');
  console.log('Raw storage:', storage);
  console.log('Parsed storage:', parsed);
  console.log('Projects count:', parsed?.state?.projects?.length || 0);
  
  return parsed;
};

/**
 * Force reload app state from storage
 */
export const forceRefreshStorage = () => {
  // This will trigger Zustand to reload from localStorage
  window.location.reload();
};