import { create } from "zustand";
import { persist } from "zustand/middleware";
import API from "../services/api";

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      // Login
      login: async (email, password) => {
        set({ loading: true, error: null });

        try {
          const res = await API.post("/auth/login", { email, password });

          set({
            user: res.data,
            token: res.data.token,
            isAuthenticated: true,
            loading: false,
          });
          return true;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Login failed",
            loading: false,
          });
          return false;
        }
      },

      // Register
      register: async ({ name, email, password, location }) => {
        set({ loading: true, error: null });

        try {
          const res = await API.post("auth/register", {
            name,
            email,
            password,
            location,
          });

          set({
            user: res.data,
            token: res.data.token,
            isAuthenticated: true,
            loading: false,
          });

          return true;
        } catch (error) {
          set({
            error: error.response?.data?.message || "Registration failed",
            loading: false,
          });
          return false;
        }
      },

      // Logout
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

    }),

    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
