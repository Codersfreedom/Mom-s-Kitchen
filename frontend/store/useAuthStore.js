import { toast } from "react-hot-toast";
import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,
  isCheckingAuth: true,
  signup: async (authData) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });
      const data = await response.json();
      console.log(data);
      if (data.satus == false) {
        throw new Error(data.message);
      } else {
        set({ user: data.user, isLoading: false });
        toast.success("🚀 Account created!");
      }
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },
  login: async (authData) => {
    set({ isLoading: true });
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });
      const data = await response.json();
      if (data.status == true) {
        set({ user: data.user, isLoading: false });
        toast.success("🚀 Login success!");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      set({ isLoading: false });
    }
  },
  logout: async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      set({ user: null });
      toast.success("🚀 Logged out!");
    } catch (error) {}
  },
  checkAuth: async () => {
    try {
      const response = await fetch("/api/auth/checkAuth", {
        method: "GET",
      });
      const data = await response.json();
      set({ user: data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false });
    }
  },
}));

export default useAuthStore;
