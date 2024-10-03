import { create } from "zustand";

const useUserStore = create((set) => ({
  favorites: [],
  isLoading: false,
  fetchFavorites: async () => {
    try {
      const response = await fetch("/api/user/favorites", {
        method: "GET",
      });
      const recipies = await response.json();

      set({ favorites: recipies });
    } catch (error) {
      console.log(error.message);
    }
  },
  
}));

export default useUserStore;
