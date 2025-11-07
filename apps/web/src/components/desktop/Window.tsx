import { ChevronsLeftRight, Minus, X } from "lucide-react";
import { ResizeHandles } from "./ResizeHandles";
import type { WindowState } from "./types";
import { WindowContent } from "./WindowContent";

type WindowProps = {
  window: WindowState;
  username: string;
  onClose: (windowId: string) => void;
  onDragStart: (
    e: React.MouseEvent,
    windowId: string,
    x: number,
    y: number
  ) => void;
  onDoubleClick: (windowId: string) => void;
  onResizeStart: (
    e: React.MouseEvent,
    windowId: string,
    direction: string
  ) => void;
  onFocus: (windowId: string) => void;
};

export function Window({
  window: win,
  username,
  onClose,
  onDragStart,
  onDoubleClick,
  onResizeStart,
  onFocus,
}: WindowProps) {
  return (
    <div
      className="absolute z-50 rounded-lg bg-transparent shadow-2xl shadow-black"
      style={{
        left: win.position.x,
        top: win.position.y,
        width: win.size.width,
        height: win.size.height,
        zIndex: win.zIndex,
      }}
    >
      {/* Window Title Bar */}
      <button
        className={`flex w-full items-center justify-between rounded-t-lg bg-gray-200 p-2 ring-1 ring-white/20 dark:bg-[#464646] ${
          win.isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onDoubleClick={() => onDoubleClick(win.id)}
        onMouseDown={(e) =>
          onDragStart(e, win.id, win.position.x, win.position.y)
        }
        type="button"
      >
        <div className="group flex items-center space-x-2">
          <button
            aria-label="Close window"
            className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-600 group-hover:bg-red-600"
            onClick={() => onClose(win.id)}
            type="button"
          >
            <X className="hidden h-full w-full text-gray-800/50 group-hover:block" />
          </button>
          <button
            aria-label="Minimize window"
            className="h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600 group-hover:bg-yellow-600"
            type="button"
          >
            <Minus className="hidden h-full w-full text-gray-800/50 group-hover:block" />
          </button>
          <button
            aria-label="Maximize window"
            className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-600 group-hover:bg-green-600"
            onClick={() => onDoubleClick(win.id)}
            type="button"
          >
            <ChevronsLeftRight className="hidden h-full w-full rotate-45 text-gray-800/50 group-hover:block" />
          </button>
        </div>
        <span className="font-medium text-neutral-700 text-xs dark:text-neutral-300">
          {win.title}
        </span>
        <div className="w-16" />
      </button>

      {/* Window Content */}
      <button
        className="h-[calc(100%-32px)] w-full rounded-b-lg text-left ring-1 ring-white/10"
        onClick={() => onFocus(win.id)}
        type="button"
      >
        <WindowContent appId={win.appId} username={username} />
      </button>

      {/* Resize Handles */}
      <ResizeHandles onResizeStart={onResizeStart} windowId={win.id} />
    </div>
  );
}
