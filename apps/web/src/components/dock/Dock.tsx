import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DOCK_ICON_COUNT } from "../desktop/constants";
import type { DesktopApp, WindowState } from "../desktop/types";

type DockProps = {
  apps: DesktopApp[];
  windows: WindowState[];
  onOpenWindow: (appId: string, title: string) => void;
};

export function Dock({ apps, windows, onOpenWindow }: DockProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
      {/* Hover zone */}
      <div className="group relative h-16 w-full max-w-5xl">
        {/* Invisible hover area (expands trigger zone) */}
        <div className="absolute inset-x-0 bottom-0 h-8" />

        {/* Dock bar */}
        <div className="-translate-x-1/2 absolute bottom-2 left-1/2 flex translate-y-20 transform items-center space-x-3 rounded-xl border border-neutral-100/20 bg-neutral-300/20 bg-clip-padding p-2 opacity-0 backdrop-blur-xl backdrop-filter transition-all duration-500 ease-in-out group-hover:translate-y-0 group-hover:opacity-100 dark:border-neutral-300/20 dark:bg-neutral-500/10">
          {apps.slice(0, DOCK_ICON_COUNT).map((app) => {
            const isOpen = windows.some((w) => w.appId === app.id);
            return (
              <div className="relative flex flex-col items-center" key={app.id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="flex size-10 items-center justify-center rounded-xl text-4xl"
                      onClick={() => onOpenWindow(app.id, app.name)}
                      type="button"
                    >
                      {app.icon}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>{app.name}</TooltipContent>
                </Tooltip>
                {isOpen && (
                  <div className="-bottom-1 absolute h-1 w-1 rounded-full bg-white" />
                )}
              </div>
            );
          })}

          {/* System Settings */}
          {windows.some((w) => w.appId === "system-settings") && (
            <>
              <div className="mx-2 h-10 w-px bg-white/30" />
              <div className="relative flex flex-col items-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="flex size-10 items-center justify-center rounded-xl text-4xl"
                      onClick={() =>
                        onOpenWindow("system-settings", "System Settings")
                      }
                      type="button"
                    >
                      ⚙️
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>System Settings</TooltipContent>
                </Tooltip>
                <div className="-bottom-1 absolute h-1 w-1 rounded-full bg-white" />
              </div>
            </>
          )}

          <div className="mx-2 h-10 w-px bg-white/30" />
          <div className="relative flex flex-col items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="flex size-10 items-center justify-center rounded-xl text-4xl"
                  onClick={() => onOpenWindow("trash", "Trash")}
                  type="button"
                >
                  🗑️
                </button>
              </TooltipTrigger>
              <TooltipContent>Trash</TooltipContent>
            </Tooltip>
            {windows.some((w) => w.appId === "trash") && (
              <div className="-bottom-1 absolute h-1 w-1 rounded-full bg-white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
