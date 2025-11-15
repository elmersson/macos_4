import { create } from "zustand";
import { persist } from "zustand/middleware";

type AudioState = {
  volume: number;
  isPlaying: boolean;
  setVolume: (volume: number) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  togglePlayPause: () => void;
};

export const useAudioStore = create<AudioState>()(
  persist(
    (set, get) => ({
      volume: 0.5, // Default volume at 50%
      isPlaying: false,
      setVolume: (volume) => set({ volume }),
      setIsPlaying: (isPlaying) => set({ isPlaying }),
      togglePlayPause: () => set({ isPlaying: !get().isPlaying }),
    }),
    {
      name: "audio-storage", // name of the item in the storage (must be unique)
    }
  )
);
