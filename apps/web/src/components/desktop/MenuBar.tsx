import { format } from "date-fns";
import { useEffect } from "react";
import { useAudio } from "react-use";
import useTime from "@/hooks/useTime";
import { useAudioStore } from "@/stores/audio-store";
import { AppleMenu } from "../navbar/apple-menu";
import { Battery } from "../navbar/battery";
import { ControlCentre } from "../navbar/control-centre";
import { Wifi } from "../navbar/wifi";

type MenuBarProps = {
  onAppleMenuClick: () => void;
};

export function MenuBar({ onAppleMenuClick }: MenuBarProps) {
  const currentTime = useTime();
  const [audio, state, controls] = useAudio({
    src: "/sound/Stockholmsvy.mp3",
    autoPlay: false,
  });

  const { volume, isPlaying, setVolume, setIsPlaying } = useAudioStore();

  const togglePlayPause = () => {
    if (isPlaying) {
      controls.pause();
    } else {
      controls.play();
    }
    setIsPlaying(!isPlaying);
    setIsPlaying(!isPlaying);
    controls.volume(volume); // Ensure volume is set when toggling play/pause
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    controls.volume(newVolume);
  };

  // Sync the isPlaying state with the actual audio state
  useEffect(() => {
    setIsPlaying(!state.paused);
  }, [state.paused]);

  return (
    <div className="relative z-50 flex h-8 items-center justify-between bg-black/20 px-4 text-white backdrop-blur-md">
      {/* Hidden audio element - always rendered to prevent audio from stopping */}
      <div className="hidden">{audio}</div>
      <div className="flex items-center space-x-2">
        <AppleMenu onAppleMenuClick={onAppleMenuClick} />
        <span className="font-medium text-sm">Finder</span>
      </div>

      <div className="flex items-center space-x-2">
        <Battery />
        <Wifi />
        <ControlCentre
          isPlaying={isPlaying}
          setVolume={(newVolume) => {
            handleVolumeChange(newVolume);
          }}
          togglePlayPause={togglePlayPause}
          volume={volume}
        />
        <button className="flex items-center text-sm" type="button">
          {format(currentTime, "EEE d MMM HH:mm")}
        </button>
      </div>
    </div>
  );
}
