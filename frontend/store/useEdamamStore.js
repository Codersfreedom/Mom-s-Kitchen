import { create } from "zustand";

const useEdamamStore = create((set) => ({
  isLoading: false,
  recipe: [],

  getAllRecipes: async (query) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/edamam/search/${query}`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.status == true) {
        set({ recipe: data.recipes.hits, isLoading: false });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      set({ isLoading: false });
    }
  },

  getRecipeByUri: async (uri) => {
    set({ isLoading: true });
    try {
      const encodedUri = encodeURIComponent(uri);
      const response = await fetch(`/api/edamam/recipe/${encodedUri}`, {
        method: "GET",
      });
      const data = await response.json();

      console.log(data);

      return data.recipe.hits[0];
    } catch (error) {
      set({ isLoading: false });
      console.log(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useEdamamStore;
