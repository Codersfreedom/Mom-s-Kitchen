import toast from "react-hot-toast";
import { create } from "zustand";

const useUserStore = create((set) => ({
  favorites: [],
  questions: [],
  isLoading: false,

  getProfile: async (id) => {
    set({ isLoading: true });
    try {
      const response = await fetch(`/api/user/getProfile/${id}`, {
        method: "GET",
      });
      const data = await response.json();

      return data.user;
    } catch (error) {
      console.log(error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchFavorites: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/user/favorites", {
        method: "GET",
      });
      const recipies = await response.json();
      console.log(recipies)
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
        set({
          questions: data.questions[0]?.questions
            ? data.questions[0].questions
            : [],
          isLoading: false,
        });
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
      console.log(data);
      if (data.status == true) {
        set((prev) => ({
          ...prev,
          questions: data.questions, // Set the questions directly from response
        }));

        set({ isLoading: false });
        toast.success("Questions posted!");
      } else {
        throw new Error(data);
      }
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },

  postReply: async (id, reply) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/user/postReply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, reply }),
      });
      const data = await response.json();

      if (data.status == true) {
        const newAnswer = data.question.questions
          .find((q) => q._id === id)
          .answers.slice(-1)[0]; // Get only the latest (new) answer

        set((prev) => ({
          questions: prev.questions.map((question) =>
            question._id === id
              ? { ...question, answers: [...question.answers, newAnswer] }
              : question
          ),
          isLoading: false,
        }));
        toast.success("Reply posted!");
      } else {
        throw new Error(data);
      }
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },
  deleteQuestion: async (id) => {
    set({ isLoading: true });

    try {
      const response = await fetch(`/api/user/deleteQuestion/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status == true) {
        set((prev) => ({
          questions: prev.questions.filter((question) => question._id !== id),
          isLoading: false,
        }));
        toast.success("Question deleted");
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
      set({ isLoading: false });
    }
  },
  deleteReply: async (questionId, answerId) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `/api/user/deleteReply/${questionId}/${answerId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.status == true) {
        set((prev) => ({
          questions: prev.questions.map((question) =>
            question._id === questionId
              ? {
                  ...question,
                  answers: question.answers.filter(
                    (answer) => answer._id !== answerId
                  ),
                }
              : question
          ),
          isLoading: false,
        }));
        toast.success("Reply deleted!");
      } else {
        throw new Error(data);
      }
    } catch (error) {
      console.log(error.message);
      set({ isLoading: false });
    }
  },
}));

export default useUserStore;
