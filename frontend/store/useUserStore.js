import { create } from "zustand";

const useUserStore = create((set,get) => ({
  favorites: [],
  questions: [],
  isLoading: false,
  fetchFavorites: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/user/favorites", {
        method: "GET",
      });
      const recipies = await response.json();

      set({ favorites: recipies, isLoading: false });
    } catch (error) {
      console.log(error.message);
      set({ isLoading: false });
    }
  },
  fetchQuestions: async (id) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/user/questions/${id}`, {
        method: "GET",
      });
      const data = await response.json();
      if (data.status == true) {
        set({ questions: data.questions[0].questions, isLoading: false });
      } else {
        throw new Error("Internal server error");
      }
    } catch (error) {
      console.log(error.message);
      set({ isLoading: false });
    }
  },
  askQuestions: async (recipeId, query) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/user/askQuestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId, query }),
      });
      const data = await response.json();
      
      if (data.status == true) {
        set((prev) => ({
          ...prev,
          questions: data.questions, // Set the questions directly from response
        }));
        console.log(get().questions)
        set({ isLoading: false });
      } else {
        throw Error;
      }
    } catch (error) {
      console.log(error.message);
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
