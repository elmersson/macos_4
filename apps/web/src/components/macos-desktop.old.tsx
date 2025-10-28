import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type AppPosition = {
  x: number;
  y: number;
};

type DesktopApp = {
  id: string;
  name: string;
  icon: string;
  position: AppPosition;
};

const MENU_BAR_HEIGHT = 0;
const ICON_WIDTH = 80;
const ICON_HEIGHT = 90;
const ICON_MARGIN = 20;
const ICON_SPACING = 100;
const DOUBLE_SPACING = ICON_SPACING + ICON_SPACING;
const TRIPLE_SPACING = DOUBLE_SPACING + ICON_SPACING;
const QUAD_SPACING = TRIPLE_SPACING + ICON_SPACING;
const QUINT_SPACING = QUAD_SPACING + ICON_SPACING;

const INITIAL_APPS: DesktopApp[] = [
  {
    id: "finder",
    name: "Finder",
    icon: "📁",
    position: { x: ICON_MARGIN, y: MENU_BAR_HEIGHT + ICON_MARGIN },
  },
  {
    id: "safari",
    name: "Safari",
    icon: "🧭",
    position: {
      x: ICON_MARGIN,
      y: MENU_BAR_HEIGHT + ICON_MARGIN + ICON_SPACING,
    },
  },
  {
    id: "mail",
    name: "Mail",
    icon: "✉️",
    position: {
      x: ICON_MARGIN,
      y: MENU_BAR_HEIGHT + ICON_MARGIN + DOUBLE_SPACING,
    },
  },
  {
    id: "photos",
    name: "Photos",
    icon: "🖼️",
    position: {
      x: ICON_MARGIN,
      y: MENU_BAR_HEIGHT + ICON_MARGIN + TRIPLE_SPACING,
    },
  },
  {
    id: "music",
    name: "Music",
    icon: "🎵",
    position: {
      x: ICON_MARGIN,
      y: MENU_BAR_HEIGHT + ICON_MARGIN + QUAD_SPACING,
    },
  },
  {
    id: "trash",
    name: "Trash",
    icon: "🗑️",
    position: {
      x: ICON_MARGIN,
      y: MENU_BAR_HEIGHT + ICON_MARGIN + QUINT_SPACING,
    },
  },
];

type WindowState = {
  id: string;
  appId: string;
  title: string;
  position: AppPosition;
  size: { width: number; height: number };
  isDragging: boolean;
  isResizing: boolean;
  resizeDirection: string;
  isFullscreen: boolean;
  zIndex: number;
  previousState?: {
    position: AppPosition;
    size: { width: number; height: number };
  };
};

export default function MacOSDesktop() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username] = useState(localStorage.getItem("username") || "User");
  const [apps, setApps] = useState<DesktopApp[]>(() => {
    // Load saved positions from localStorage
    const saved = localStorage.getItem("desktopAppPositions");
    return saved ? JSON.parse(saved) : INITIAL_APPS;
  });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [windowDragOffset, setWindowDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const TIMER_INTERVAL = 1000;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, TIMER_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  // Save positions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("desktopAppPositions", JSON.stringify(apps));
  }, [apps]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
    navigate({ to: "/login" });
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const handleMouseDown = (
    e: React.MouseEvent,
    appId: string,
    currentX: number,
    currentY: number
  ) => {
    e.preventDefault();
    setDraggingId(appId);
    setDragOffset({
      x: e.clientX - currentX,
      y: e.clientY - currentY,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingId) {
      return;
    }

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    // Get viewport dimensions
    const maxX = window.innerWidth - ICON_WIDTH + ICON_MARGIN;
    const maxY = window.innerHeight - ICON_HEIGHT - ICON_MARGIN;

    setApps((prevApps) =>
      prevApps.map((app) =>
        app.id === draggingId
          ? {
              ...app,
              position: {
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(MENU_BAR_HEIGHT, Math.min(newY, maxY)),
              },
            }
          : app
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingId(null);
    setWindows((prev) =>
      prev.map((win) => ({
        ...win,
        isDragging: false,
        isResizing: false,
        resizeDirection: "",
      }))
    );
  };

  const openWindow = (appId: string, title: string) => {
    // Check if window already exists
    const existingWindow = windows.find((w) => w.appId === appId);
    if (existingWindow) {
      // Bring to front
      setActiveWindowId(existingWindow.id);
      const maxZ = Math.max(...windows.map((w) => w.zIndex), 50);
      setWindows((prev) =>
        prev.map((w) =>
          w.id === existingWindow.id ? { ...w, zIndex: maxZ + 1 } : w
        )
      );
      return;
    }

    // Create new window
    const newWindow: WindowState = {
      id: `window-${Date.now()}`,
      appId,
      title,
      position: { x: 100 + windows.length * 30, y: 100 + windows.length * 30 },
      size: { width: 600, height: 400 },
      isDragging: false,
      isResizing: false,
      resizeDirection: "",
      isFullscreen: false,
      zIndex: Math.max(...windows.map((w) => w.zIndex), 50) + 1,
    };
    setWindows((prev) => [...prev, newWindow]);
    setActiveWindowId(newWindow.id);
  };

  const closeWindow = (windowId: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== windowId));
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
  };

  const bringToFront = (windowId: string) => {
    const maxZ = Math.max(...windows.map((w) => w.zIndex), 50);
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w))
    );
    setActiveWindowId(windowId);
  };

  const focusWindow = (windowId: string) => {
    bringToFront(windowId);
  };

  const handleTitleBarDoubleClick = (windowId: string) => {
    const MENU_BAR_ACTUAL_HEIGHT = 32; // h-8 in Tailwind

    setWindows((prev) =>
      prev.map((win) => {
        if (win.id !== windowId) {
          return win;
        }

        if (win.isFullscreen) {
          // Restore to previous state
          if (win.previousState) {
            const { position, size } = win.previousState;
            return {
              ...win,
              isFullscreen: false,
              position,
              size,
              previousState: undefined,
            };
          }
          return win;
        }
        // Go fullscreen
        return {
          ...win,
          isFullscreen: true,
          previousState: {
            position: win.position,
            size: win.size,
          },
          position: { x: 0, y: MENU_BAR_ACTUAL_HEIGHT },
          size: {
            width: window.innerWidth,
            height: window.innerHeight - MENU_BAR_ACTUAL_HEIGHT,
          },
        };
      })
    );
  };

  const handleResizeMouseDown = (
    e: React.MouseEvent,
    windowId: string,
    direction: string
  ) => {
    e.stopPropagation();
    e.preventDefault();

    const win = windows.find((w) => w.id === windowId);
    if (!win) {
      return;
    }

    setWindows((prev) =>
      prev.map((w) =>
        w.id === windowId
          ? { ...w, isResizing: true, resizeDirection: direction }
          : w
      )
    );

    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: win.size.width,
      height: win.size.height,
      posX: win.position.x,
      posY: win.position.y,
    });
    setActiveWindowId(windowId);
  };

  const handleResize = (e: React.MouseEvent) => {
    const activeWindow = windows.find((w) => w.isResizing);
    if (!activeWindow) {
      return;
    }

    const MIN_WIDTH = 400;
    const MIN_HEIGHT = 300;
    const MAX_WIDTH = window.innerWidth - resizeStart.posX;
    const MAX_HEIGHT = window.innerHeight - resizeStart.posY;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    let newWidth = resizeStart.width;
    let newHeight = resizeStart.height;
    let newX = resizeStart.posX;
    let newY = resizeStart.posY;

    if (activeWindow.resizeDirection.includes("e")) {
      newWidth = Math.max(
        MIN_WIDTH,
        Math.min(resizeStart.width + deltaX, MAX_WIDTH)
      );
    }
    if (activeWindow.resizeDirection.includes("s")) {
      newHeight = Math.max(
        MIN_HEIGHT,
        Math.min(resizeStart.height + deltaY, MAX_HEIGHT)
      );
    }
    if (activeWindow.resizeDirection.includes("w")) {
      const potentialWidth = resizeStart.width - deltaX;
      const potentialX = resizeStart.posX + deltaX;
      if (potentialWidth >= MIN_WIDTH && potentialX >= 0) {
        newWidth = potentialWidth;
        newX = potentialX;
      }
    }
    if (activeWindow.resizeDirection.includes("n")) {
      const potentialHeight = resizeStart.height - deltaY;
      const potentialY = resizeStart.posY + deltaY;
      const TITLE_BAR_HEIGHT = 40;
      if (
        potentialHeight >= MIN_HEIGHT &&
        potentialY >= MENU_BAR_HEIGHT + TITLE_BAR_HEIGHT
      ) {
        newHeight = potentialHeight;
        newY = potentialY;
      }
    }

    setWindows((prev) =>
      prev.map((w) =>
        w.id === activeWindow.id
          ? {
              ...w,
              size: { width: newWidth, height: newHeight },
              position: { x: newX, y: newY },
            }
          : w
      )
    );
  };

  const handleWindowMouseDown = (
    e: React.MouseEvent,
    windowId: string,
    currentX: number,
    currentY: number
  ) => {
    e.stopPropagation();
    bringToFront(windowId);
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isDragging: true } : w))
    );
    setWindowDragOffset({
      x: e.clientX - currentX,
      y: e.clientY - currentY,
    });
  };

  const handleWindowDrag = (e: React.MouseEvent) => {
    const draggingWindow = windows.find((w) => w.isDragging);
    if (!draggingWindow) {
      return;
    }

    const WINDOW_TITLE_HEIGHT = 40;
    const WINDOW_MIN_MARGIN = 0;
    const newX = e.clientX - windowDragOffset.x;
    const newY = e.clientY - windowDragOffset.y;

    const maxX = window.innerWidth - draggingWindow.size.width;
    const maxY = window.innerHeight - draggingWindow.size.height;

    setWindows((prev) =>
      prev.map((w) =>
        w.id === draggingWindow.id
          ? {
              ...w,
              position: {
                x: Math.max(WINDOW_MIN_MARGIN, Math.min(newX, maxX)),
                y: Math.max(
                  MENU_BAR_HEIGHT + WINDOW_TITLE_HEIGHT,
                  Math.min(newY, maxY)
                ),
              },
            }
          : w
      )
    );
  };

  const handleDesktopIconClick = (appId: string, appName: string) => {
    openWindow(appId, appName);
  };

  const handleAppleMenuClick = () => {
    openWindow("system-settings", "System Settings");
  };

  const getWindowContent = (appId: string) => {
    switch (appId) {
      case "system-settings":
        return (
          <div className="h-full overflow-y-auto bg-white p-6">
            <h2 className="mb-4 font-semibold text-2xl text-gray-800">
              Welcome, {username}!
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "Wi-Fi", icon: "📶" },
                { name: "Bluetooth", icon: "🔵" },
                { name: "Network", icon: "🌐" },
                { name: "Notifications", icon: "🔔" },
                { name: "Sound", icon: "🔊" },
                { name: "Focus", icon: "🎯" },
                { name: "Screen Time", icon: "⏱️" },
                { name: "General", icon: "⚙️" },
                { name: "Appearance", icon: "🎨" },
              ].map((setting) => (
                <button
                  className="flex flex-col items-center space-y-2 rounded-lg bg-gray-100 p-4 transition-colors hover:bg-gray-200"
                  key={setting.name}
                  type="button"
                >
                  <span className="text-3xl">{setting.icon}</span>
                  <span className="text-gray-700 text-sm">{setting.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case "finder":
        return (
          <div className="flex h-full flex-col bg-white p-4">
            <h2 className="mb-4 font-semibold text-xl">Finder</h2>
            <p className="text-gray-600">File browser content goes here...</p>
          </div>
        );
      case "safari":
        return (
          <div className="flex h-full flex-col bg-white p-4">
            <h2 className="mb-4 font-semibold text-xl">Safari</h2>
            <p className="text-gray-600">Web browser content goes here...</p>
          </div>
        );
      case "mail":
        return (
          <div className="flex h-full flex-col bg-white p-4">
            <h2 className="mb-4 font-semibold text-xl">Mail</h2>
            <p className="text-gray-600">Email client content goes here...</p>
          </div>
        );
      case "photos":
        return (
          <div className="flex h-full flex-col bg-white p-4">
            <h2 className="mb-4 font-semibold text-xl">Photos</h2>
            <p className="text-gray-600">Photo library content goes here...</p>
          </div>
        );
      case "music":
        return (
          <div className="flex h-full flex-col bg-white p-4">
            <h2 className="mb-4 font-semibold text-xl">Music</h2>
            <p className="text-gray-600">Music player content goes here...</p>
          </div>
        );
      default:
        return (
          <div className="flex h-full items-center justify-center bg-white">
            <p className="text-gray-600">No content available</p>
          </div>
        );
    }
  };

  const DOCK_ICON_COUNT = 5;

  return (
    <div
      aria-label="macOS Desktop"
      className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
      onMouseMove={(e) => {
        handleMouseMove(e);
        handleWindowDrag(e);
        handleResize(e);
      }}
      onMouseUp={handleMouseUp}
      role="application"
    >
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Menu Bar */}
      <div className="relative z-50 flex h-8 items-center justify-between bg-black/20 px-4 text-white backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <button
            aria-label="Open System Settings"
            className="rounded px-2 py-1 font-bold text-xl transition-colors hover:bg-white/10"
            onClick={handleAppleMenuClick}
            type="button"
          />
          <span className="font-medium text-sm">Finder</span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            className="rounded px-2 py-1 text-sm transition-colors hover:bg-white/10"
            type="button"
          >
            🔋 100%
          </button>
          <button
            className="rounded px-2 py-1 text-sm transition-colors hover:bg-white/10"
            type="button"
          >
            📶
          </button>
          <span className="text-sm">{formatTime(currentTime)}</span>
          <button
            className="rounded px-2 py-1 text-sm transition-colors hover:bg-white/10"
            onClick={handleLogout}
            type="button"
          >
            {username} ▼
          </button>
        </div>
      </div>

      {/* Desktop Icons */}
      <div className="relative z-10 h-full">
        {apps.map((app) => (
          <button
            className={`absolute select-none ${
              draggingId === app.id ? "cursor-grabbing" : "cursor-grab"
            }`}
            key={app.id}
            onDoubleClick={() => handleDesktopIconClick(app.id, app.name)}
            onMouseDown={(e) =>
              handleMouseDown(e, app.id, app.position.x, app.position.y)
            }
            style={{
              left: app.position.x,
              top: app.position.y,
            }}
            type="button"
          >
            <div className="flex flex-col items-center space-y-1 rounded-lg p-2 transition-colors hover:bg-white/10">
              <div className="text-4xl">{app.icon}</div>
              <span className="text-white text-xs drop-shadow-lg">
                {app.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Dock */}
      <div className="-translate-x-1/2 absolute bottom-4 left-1/2 z-50 transform">
        <div className="flex items-center space-x-2 rounded-2xl bg-white/20 p-2 backdrop-blur-md">
          {apps.slice(0, DOCK_ICON_COUNT).map((app) => {
            const isOpen = windows.some((w) => w.appId === app.id);
            return (
              <div className="relative flex flex-col items-center" key={app.id}>
                <button
                  className="flex h-16 w-16 items-center justify-center rounded-xl text-3xl transition-transform hover:scale-110 hover:bg-white/10"
                  onClick={() => openWindow(app.id, app.name)}
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
                    openWindow("system-settings", "System Settings")
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
              onClick={() => openWindow("trash", "Trash")}
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

      {/* Windows */}
      {windows.map((win) => (
        <div
          className="absolute rounded-lg bg-white shadow-2xl"
          key={win.id}
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
            className={`flex w-full items-center justify-between rounded-t-lg bg-gray-200 px-4 py-2 ${
              win.isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onDoubleClick={() => handleTitleBarDoubleClick(win.id)}
            onMouseDown={(e) =>
              handleWindowMouseDown(e, win.id, win.position.x, win.position.y)
            }
            type="button"
          >
            <div className="flex items-center space-x-2">
              <button
                aria-label="Close window"
                className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  closeWindow(win.id);
                }}
                type="button"
              />
              <button
                aria-label="Minimize window"
                className="h-3 w-3 rounded-full bg-yellow-500 transition-colors hover:bg-yellow-600"
                type="button"
              />
              <button
                aria-label="Maximize window"
                className="h-3 w-3 rounded-full bg-green-500 transition-colors hover:bg-green-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleTitleBarDoubleClick(win.id);
                }}
                type="button"
              />
            </div>
            <span className="font-medium text-gray-700 text-sm">
              {win.title}
            </span>
            <div className="w-16" />
          </button>

          {/* Window Content */}
          <button
            className="h-[calc(100%-40px)] w-full text-left"
            onClick={() => focusWindow(win.id)}
            type="button"
          >
            {getWindowContent(win.appId)}
          </button>

          {/* Resize Handles */}
          <button
            aria-label="Resize window from bottom-right"
            className="absolute right-0 bottom-0 h-4 w-4 cursor-se-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, win.id, "se")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from bottom-left"
            className="absolute bottom-0 left-0 h-4 w-4 cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, win.id, "sw")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from top-right"
            className="absolute top-0 right-0 h-4 w-4 cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, win.id, "ne")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from top-left"
            className="absolute top-0 left-0 h-4 w-4 cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, win.id, "nw")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from right"
            className="absolute top-0 right-0 h-[calc(100%-16px)] w-2 cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, win.id, "e")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from left"
            className="absolute top-0 left-0 h-[calc(100%-16px)] w-2 cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, win.id, "w")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from bottom"
            className="absolute bottom-0 left-2 h-2 w-[calc(100%-16px)] cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, win.id, "s")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from top"
            className="absolute top-0 left-2 h-2 w-[calc(100%-16px)] cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, win.id, "n")}
            style={{ zIndex: 60 }}
            type="button"
          />
        </div>
      ))}
    </div>
  );
}
