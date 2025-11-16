import { create } from "zustand";
import { persist } from "zustand/middleware";

type DisplayState = {
  display: number;
  setDisplay: (display: number) => void;
};

export const useDisplayStore = create<DisplayState>()(
  persist(
    (set) => ({
      display: 80, // Default display value
      setDisplay: (display) => set({ display }),
    }),
    {
      name: "display-storage", // name of the item in the storage (must be unique)
    }
  )
);
