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
        <Sound  setAudioVolume={(newVolume) => {
          console.log(`New audio volume set to: ${newVolume}`);
        }} />
        <p className="text-xs font-bold">Control Centre</p>
        <Music isPlaying={false} togglePlayPause={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
