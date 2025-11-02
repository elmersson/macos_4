import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DOCK_ICON_COUNT } from "../desktop/constants";
import type { DesktopApp, WindowState } from "../desktop/types";

type DockItemProps = {
  app: {
    id: string;
    name: string;
    icon: string;
  };
  isOpen: boolean;
  onClick: () => void;
};

function DockItem({ app, isOpen, onClick }: DockItemProps) {
  return (
    <div className="relative flex flex-col items-center">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="flex size-10 items-center justify-center rounded-xl text-4xl"
            onClick={onClick}
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
}

type DockProps = {
  apps: DesktopApp[];
  windows: WindowState[];
  onOpenWindow: (appId: string, title: string) => void;
};

export function Dock({ apps, windows, onOpenWindow }: DockProps) {
  const isSystemSettingsOpen = windows.some(
    (w) => w.appId === "system-settings"
  );
  const isTrashOpen = windows.some((w) => w.appId === "trash");

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
      {/* Hover zone */}
      <div className="group relative h-16 w-full max-w-5xl">
        {/* Invisible hover area (expands trigger zone) */}
        <div className="absolute inset-x-0 bottom-0 h-8" />

        {/* Dock bar */}
        <div className="dock-bg -translate-x-1/2 absolute bottom-2 left-1/2 flex translate-y-20 transform items-center space-x-3 rounded-xl p-2 transition-all duration-500 ease-in-out group-hover:translate-y-0">
          {apps.slice(0, DOCK_ICON_COUNT).map((app) => {
            const isOpen = windows.some((w) => w.appId === app.id);
            return (
              <DockItem
                app={app}
                isOpen={isOpen}
                key={app.id}
                onClick={() => onOpenWindow(app.id, app.name)}
              />
            );
          })}

          {/* System Settings */}
          {isSystemSettingsOpen && (
            <>
              <div className="mx-2 h-10 w-px bg-white/30" />
              <DockItem
                app={{
                  id: "system-settings",
                  name: "System Settings",
                  icon: "⚙️",
                }}
                isOpen={true}
                onClick={() =>
                  onOpenWindow("system-settings", "System Settings")
                }
              />
            </>
          )}

          <div className="mx-2 h-10 w-px bg-white/30" />
          <DockItem
            app={{ id: "trash", name: "Trash", icon: "🗑️" }}
            isOpen={isTrashOpen}
            onClick={() => onOpenWindow("trash", "Trash")}
          />
        </div>
      </div>
    </div>
  );
}
