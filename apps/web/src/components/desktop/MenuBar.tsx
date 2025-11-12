import { format } from "date-fns";
import useTime from "@/hooks/useTime";
import { Battery } from "../navbar/battery";
import { ControlCentre } from "../navbar/control-centre";
import { Wifi } from "../navbar/wifi";

type MenuBarProps = {
  onAppleMenuClick: () => void;
};

export function MenuBar({ onAppleMenuClick }: MenuBarProps) {
  const currentTime = useTime();
  return (
    <div className="relative z-50 flex h-8 items-center justify-between bg-black/20 px-4 text-white backdrop-blur-md">
      <div className="flex items-center space-x-4">
        <button
          aria-label="Open System Settings"
          className="rounded px-2 py-1 font-bold text-xl transition-colors hover:bg-white/10"
          onClick={onAppleMenuClick}
          type="button"
        />
        <span className="font-medium text-sm">Finder</span>
      </div>

      <div className="flex items-center space-x-2">
        <Battery />
        <Wifi />
        <ControlCentre />
        <button className="flex items-center text-sm" type="button">
          {format(currentTime, "EEE d MMM HH:mm")}
        </button>
      </div>
    </div>
  );
}
