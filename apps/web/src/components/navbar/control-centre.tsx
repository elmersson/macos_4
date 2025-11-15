import { useEffect, useState } from "react";
import { useAudio } from "react-use";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ConnectControl } from "./connect-control";
import { Display } from "./display";
import { Music } from "./music";
import { Sound } from "./sound";
import { StageAndScreen } from "./stage-and-screen";
import { ThemeSwitcher } from "./theme-switcher";

export function ControlCentre() {
  const [audio, state, controls] = useAudio({
    src: "/sound/Stockholmsvy.mp3",
    autoPlay: false,
  });

  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      controls.pause();
    } else {
      controls.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Sync the isPlaying state with the actual audio state
  useEffect(() => {
    setIsPlaying(!state.paused);
  }, [state.paused]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center rounded-md px-2.5 py-1"
          type="button"
        >
          <img
            alt="Control Centre"
            className="size-3.5"
            src="/icons/control-center.svg"
          />
          <span className="sr-only">Open Control Centre</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-[6px] w-[340px] space-y-2 rounded-xl p-3">
        <div className="flex flex-row space-x-2">
          <ConnectControl />
          <div className="flex w-[50%] flex-col space-y-2">
            <ThemeSwitcher />
            <StageAndScreen />
          </div>
        </div>
        <Display />
        <Sound
          setAudioVolume={(newVolume) => {
            controls.volume(newVolume);
          }}
        />
        <p className="font-bold text-xs">Control Centre</p>
        <Music isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
        {/* Hidden audio element */}
        <div className="hidden">{audio}</div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
