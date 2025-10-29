import { Battery } from "../navbar/battery";

type MenuBarProps = {
  currentTime: Date;
  username: string;
  onAppleMenuClick: () => void;
};

export function MenuBar({
  currentTime,
  username,
  onAppleMenuClick,
}: MenuBarProps) {
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

      <div className="flex items-center space-x-4">
        <Battery />
        <button
          className="rounded px-2 py-1 text-sm transition-colors hover:bg-white/10"
          type="button"
        >
          📶
        </button>
        <span className="text-sm">
          {currentTime.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}{" "}
          {currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
        <button
          className="rounded px-2 py-1 text-sm transition-colors hover:bg-white/10"
          type="button"
        >
          {username}
        </button>
      </div>
    </div>
  );
}
