import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Image } from "../ui/image";
import { ConnectControl } from "./connect-control";
import { Display } from "./display";
import { Music } from "./music";
import { Sound } from "./sound";
import { StageAndScreen } from "./stage-and-screen";
import { ThemeSwitcher } from "./theme-switcher";

type ControlCentreProps = {
  isPlaying: boolean;
  togglePlayPause: () => void;
  setVolume: (volume: number) => void;
  volume: number;
};

export function ControlCentre({
  isPlaying,
  togglePlayPause,
  setVolume,
  volume,
}: ControlCentreProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center rounded-md px-2.5 py-1"
          type="button"
        >
          <Image
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
        <Sound setVolume={setVolume} volume={volume} />
        <p className="font-bold text-xs">Control Centre</p>
        <Music isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
