
import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipe: [],
  setRecipe: (recipe) => set(recipe),
  isLoading: false,

  postRecipe: async (recipeData) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/recipe/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });
      const data = await response.json();
      if (data.status == true) {
        set({ isLoading: false });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      Toast.error(error.message);
      set({ isLoading: false });
    }
  },
  getAllRecipes: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/recipe/fetchAll", {
        method: "GET",
      });
      const data = await response.json();
      if (data.status == true) {
        set({ recipe: data.recipes, isLoading: false });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      set({ isLoading: false });
    }
  },
}));

export default useRecipeStore;
