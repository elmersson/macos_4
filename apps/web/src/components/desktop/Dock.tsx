import { DOCK_ICON_COUNT } from "./constants";
import type { DesktopApp, WindowState } from "./types";

type DockProps = {
  apps: DesktopApp[];
  windows: WindowState[];
  onOpenWindow: (appId: string, title: string) => void;
};

export function Dock({ apps, windows, onOpenWindow }: DockProps) {
  return (
    <div className="-translate-x-1/2 absolute bottom-4 left-1/2 z-50 transform">
      <div className="flex items-center space-x-2 rounded-2xl bg-white/20 p-2 backdrop-blur-md">
        {apps.slice(0, DOCK_ICON_COUNT).map((app) => {
          const isOpen = windows.some((w) => w.appId === app.id);
          return (
            <div className="relative flex flex-col items-center" key={app.id}>
              <button
                className="flex h-16 w-16 items-center justify-center rounded-xl text-3xl transition-transform hover:scale-110 hover:bg-white/10"
                onClick={() => onOpenWindow(app.id, app.name)}
                type="button"
              >
                {app.icon}
              </button>
              {isOpen && (
                <div className="-bottom-1 absolute h-1 w-1 rounded-full bg-white" />
              )}
            </div>
          );
        })}

        {/* System Settings - Only show if open */}
        {windows.some((w) => w.appId === "system-settings") && (
          <>
            <div className="mx-2 h-12 w-px bg-white/30" />
            <div className="relative flex flex-col items-center">
              <button
                className="flex h-16 w-16 items-center justify-center rounded-xl text-3xl transition-transform hover:scale-110 hover:bg-white/10"
                onClick={() =>
                  onOpenWindow("system-settings", "System Settings")
                }
                type="button"
              >
                ⚙️
              </button>
              <div className="-bottom-1 absolute h-1 w-1 rounded-full bg-white" />
            </div>
          </>
        )}

        <div className="mx-2 h-12 w-px bg-white/30" />
        <div className="relative flex flex-col items-center">
          <button
            className="flex h-16 w-16 items-center justify-center rounded-xl text-3xl transition-transform hover:scale-110 hover:bg-white/10"
            onClick={() => onOpenWindow("trash", "Trash")}
            type="button"
          >
            🗑️
          </button>
          {windows.some((w) => w.appId === "trash") && (
            <div className="-bottom-1 absolute h-1 w-1 rounded-full bg-white" />
          )}
        </div>
      </div>
    </div>
  );
}
