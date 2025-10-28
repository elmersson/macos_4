import type { DesktopApp } from "./types";

type DesktopIconProps = {
  app: DesktopApp;
  isDragging: boolean;
  onMouseDown: (e: React.MouseEvent, id: string, x: number, y: number) => void;
  onDoubleClick: (id: string, name: string) => void;
};

export function DesktopIcon({
  app,
  isDragging,
  onMouseDown,
  onDoubleClick,
}: DesktopIconProps) {
  return (
    <button
      className={`absolute select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onDoubleClick={() => onDoubleClick(app.id, app.name)}
      onMouseDown={(e) =>
        onMouseDown(e, app.id, app.position.x, app.position.y)
      }
      style={{
        left: app.position.x,
        top: app.position.y,
      }}
      type="button"
    >
      <div className="flex flex-col items-center space-y-1 rounded-lg p-2 transition-colors hover:bg-white/10">
        <div className="text-4xl">{app.icon}</div>
        <span className="text-white text-xs drop-shadow-lg">{app.name}</span>
      </div>
    </button>
  );
}
