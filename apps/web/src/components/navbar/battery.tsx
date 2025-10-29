import { useBattery } from "@/hooks/useBattery";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import BatteryLevelIndicator from "./battery-level-indicator";

export function Battery() {
  const { level, charging } = useBattery();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center rounded-md px-2 py-1"
          type="button"
        >
          <p className="text-shadow text-xs">{(level * 100).toFixed(0)} %</p>
          <div className="relative flex items-center drop-shadow-lg">
            <BatteryLevelIndicator batteryLevel={level} />
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-[6px] w-[270px]">
        <DropdownMenuLabel className="pb-0 text-white">
          Battery
        </DropdownMenuLabel>
        <DropdownMenuItem>
          <p className="text-slate-300 text-xs">
            Power source: {charging ? "Power Adapter" : "Battery"}
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p className="text-slate-300 text-xs">
            No Apps Using Significant Energy
          </p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p className="text-white text-xs">Battery Settings...</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
