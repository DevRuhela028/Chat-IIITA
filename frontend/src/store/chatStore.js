import { create } from 'zustand';

export const useChatStore = create((set) => ({
  searches: JSON.parse(localStorage.getItem('lastSearches')) || [],
  
  addSearch: (newSearch) => {
    set((state) => {
      const updatedSearches = [newSearch, ...state.searches].slice(0, 10); // Keep only last 10 searches
      console.log("Updated Searches Array:", updatedSearches); // Debugging output
      
      // Save to localStorage
      localStorage.setItem('lastSearches', JSON.stringify(updatedSearches));
      return { searches: updatedSearches };
    });
  },
}));
