import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoginState = {
  username: string | null;
  password: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
  setSavedCredentials: (username: string, password: string) => void;
  logout: () => void;
  reset: () => void;
};

export const useLoginStore = create<LoginState>()(
  persist(
    (set) => ({
      username: null,
      password: null,
      isLoggedIn: false,
      isLoading: false,
      savedUsername: null,
      savedPassword: null,
      setUsername: (username) => set({ username }),
      setPassword: (password) => set({ password }),
      setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setSavedCredentials: (username, password) => set({ username, password }),
      logout: () => set({ username: "", password: "", isLoggedIn: false }),
      reset: () =>
        set({
          isLoggedIn: false,
          isLoading: false,
          username: null,
          password: null,
        }),
    }),
    {
      name: "login-storage",
      partialize: (state) => ({
        username: state.username,
        password: state.password,
        isLoggedIn: state.isLoggedIn,
      }), // Persist relevant values
    }
  )
);
