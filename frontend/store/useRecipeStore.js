import toast from "react-hot-toast";
import { create } from "zustand";

const useRecipeStore = create((set) => ({
  recipe: [],
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
        toast.success("Recipe posted");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
  getRecipeById: async (id) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/recipe/fetch/${id}`, {
        method: "GET",
      });
      const recipe = await response.json();
      if (recipe.status == true) {
        set({ isLoading: false });

        return recipe.recipe;
      } else {
        throw new Error(recipe.message);
      }
    } catch (error) {
      console.log(error.message);
      set({ isLoading: false });
    }
  },
  getRecipeByUserId: async (id) => {
    try {
      const response = await fetch(`/api/recipe/getRecipeByUserId/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      
      if (data.status == true) {
        return data.recipes;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  },
  getSimilar: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/recipe/similar", {
        method: "GET",
      });
      const data = await response.json();
      if (data.status == true) {
        return data.similar;
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useRecipeStore;
