import { create } from "zustand";

const useUserStore = create((set) => ({
  favorites: [],
  isLoading: false,
  fetchFavorites: async () => {
    set({isLoading:true})
    try {
      const response = await fetch("/api/user/favorites", {
        method: "GET",
      });
      const recipies = await response.json();

      set({ favorites: recipies,isLoading:false });
    } catch (error) {
      console.log(error.message);
      set({isLoading:false})
    }
  },
  
}));

export default useUserStore;
