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
  isOpen: boolean;
  position: AppPosition;
  isDragging: boolean;
  size: { width: number; height: number };
  isResizing: boolean;
  resizeDirection: string;
  isFullscreen: boolean;
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
  const [systemSettings, setSystemSettings] = useState<WindowState>({
    isOpen: false,
    position: { x: 100, y: 100 },
    isDragging: false,
    size: { width: 600, height: 400 },
    isResizing: false,
    resizeDirection: "",
    isFullscreen: false,
  });
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
    if (systemSettings.isDragging) {
      setSystemSettings((prev) => ({ ...prev, isDragging: false }));
    }
    if (systemSettings.isResizing) {
      setSystemSettings((prev) => ({
        ...prev,
        isResizing: false,
        resizeDirection: "",
      }));
    }
  };

  const handleTitleBarDoubleClick = () => {
    const MENU_BAR_ACTUAL_HEIGHT = 32; // h-8 in Tailwind

    if (systemSettings.isFullscreen) {
      // Restore to previous state
      if (systemSettings.previousState) {
        const { position, size } = systemSettings.previousState;
        setSystemSettings((prev) => ({
          ...prev,
          isFullscreen: false,
          position,
          size,
          previousState: undefined,
        }));
      }
    } else {
      // Go fullscreen
      setSystemSettings((prev) => ({
        ...prev,
        isFullscreen: true,
        previousState: {
          position: prev.position,
          size: prev.size,
        },
        position: { x: 0, y: MENU_BAR_ACTUAL_HEIGHT },
        size: {
          width: window.innerWidth,
          height: window.innerHeight - MENU_BAR_ACTUAL_HEIGHT,
        },
      }));
    }
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    e.preventDefault();
    setSystemSettings((prev) => ({
      ...prev,
      isResizing: true,
      resizeDirection: direction,
    }));
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: systemSettings.size.width,
      height: systemSettings.size.height,
      posX: systemSettings.position.x,
      posY: systemSettings.position.y,
    });
  };

  const handleResize = (e: React.MouseEvent) => {
    if (!systemSettings.isResizing) {
      return;
    }

    const MIN_WIDTH = 400;
    const MIN_HEIGHT = 300;
    const MAX_WIDTH = window.innerWidth - systemSettings.position.x;
    const MAX_HEIGHT = window.innerHeight - systemSettings.position.y;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    let newWidth = systemSettings.size.width;
    let newHeight = systemSettings.size.height;
    let newX = systemSettings.position.x;
    let newY = systemSettings.position.y;

    if (systemSettings.resizeDirection.includes("e")) {
      newWidth = Math.max(
        MIN_WIDTH,
        Math.min(resizeStart.width + deltaX, MAX_WIDTH)
      );
    }
    if (systemSettings.resizeDirection.includes("s")) {
      newHeight = Math.max(
        MIN_HEIGHT,
        Math.min(resizeStart.height + deltaY, MAX_HEIGHT)
      );
    }
    if (systemSettings.resizeDirection.includes("w")) {
      const potentialWidth = resizeStart.width - deltaX;
      const potentialX = resizeStart.posX + deltaX;
      if (potentialWidth >= MIN_WIDTH && potentialX >= 0) {
        newWidth = potentialWidth;
        newX = potentialX;
      }
    }
    if (systemSettings.resizeDirection.includes("n")) {
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

    setSystemSettings((prev) => ({
      ...prev,
      size: { width: newWidth, height: newHeight },
      position: { x: newX, y: newY },
    }));
  };

  const handleWindowMouseDown = (
    e: React.MouseEvent,
    currentX: number,
    currentY: number
  ) => {
    e.stopPropagation();
    setSystemSettings((prev) => ({ ...prev, isDragging: true }));
    setWindowDragOffset({
      x: e.clientX - currentX,
      y: e.clientY - currentY,
    });
  };

  const handleWindowDrag = (e: React.MouseEvent) => {
    if (!systemSettings.isDragging) {
      return;
    }

    const WINDOW_TITLE_HEIGHT = 40;
    const WINDOW_MIN_MARGIN = 0;
    const newX = e.clientX - windowDragOffset.x;
    const newY = e.clientY - windowDragOffset.y;

    const WINDOW_WIDTH = 600;
    const WINDOW_HEIGHT = 400;
    const maxX = window.innerWidth - WINDOW_WIDTH;
    const maxY = window.innerHeight - WINDOW_HEIGHT;

    setSystemSettings((prev) => ({
      ...prev,
      position: {
        x: Math.max(WINDOW_MIN_MARGIN, Math.min(newX, maxX)),
        y: Math.max(
          MENU_BAR_HEIGHT + WINDOW_TITLE_HEIGHT,
          Math.min(newY, maxY)
        ),
      },
    }));
  };

  const toggleSystemSettings = () => {
    setSystemSettings((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      position: prev.isOpen ? prev.position : { x: 100, y: 100 },
    }));
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
            onClick={toggleSystemSettings}
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
          {apps.slice(0, DOCK_ICON_COUNT).map((app) => (
            <button
              className="flex h-16 w-16 items-center justify-center rounded-xl text-3xl transition-transform hover:scale-110 hover:bg-white/10"
              key={app.id}
              type="button"
            >
              {app.icon}
            </button>
          ))}
          <div className="mx-2 h-12 w-px bg-white/30" />
          <button
            className="flex h-16 w-16 items-center justify-center rounded-xl text-3xl transition-transform hover:scale-110 hover:bg-white/10"
            type="button"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* System Settings Window */}
      {systemSettings.isOpen && (
        <div
          className="absolute z-50 rounded-lg bg-white shadow-2xl"
          style={{
            left: systemSettings.position.x,
            top: systemSettings.position.y,
            width: systemSettings.size.width,
            height: systemSettings.size.height,
          }}
        >
          {/* Window Title Bar */}
          <button
            className={`flex w-full items-center justify-between rounded-t-lg bg-gray-200 px-4 py-2 ${
              systemSettings.isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            onDoubleClick={handleTitleBarDoubleClick}
            onMouseDown={(e) =>
              handleWindowMouseDown(
                e,
                systemSettings.position.x,
                systemSettings.position.y
              )
            }
            type="button"
          >
            <div className="flex items-center space-x-2">
              <button
                aria-label="Close window"
                className="h-3 w-3 rounded-full bg-red-500 transition-colors hover:bg-red-600"
                onClick={toggleSystemSettings}
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
                type="button"
              />
            </div>
            <span className="font-medium text-gray-700 text-sm">
              System Settings
            </span>
            <div className="w-16" />
          </button>

          {/* Window Content */}
          <div className="h-[calc(100%-40px)] overflow-y-auto bg-white p-6">
            <h2 className="mb-4 font-semibold text-2xl text-gray-800">
              System Settings
            </h2>

            {/* Settings Grid */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: "🖥️", name: "Display" },
                { icon: "🔊", name: "Sound" },
                { icon: "🌐", name: "Network" },
                { icon: "🔒", name: "Privacy" },
                { icon: "👤", name: "Users" },
                { icon: "⚡", name: "Battery" },
                { icon: "🎨", name: "Appearance" },
                { icon: "⌨️", name: "Keyboard" },
                { icon: "🖱️", name: "Mouse" },
              ].map((setting) => (
                <button
                  className="flex flex-col items-center space-y-2 rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-400 hover:bg-blue-50"
                  key={setting.name}
                  type="button"
                >
                  <span className="text-4xl">{setting.icon}</span>
                  <span className="text-center text-gray-700 text-sm">
                    {setting.name}
                  </span>
                </button>
              ))}
            </div>

            {/* User Info Section */}
            <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="mb-2 font-medium text-gray-800">User Account</h3>
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-2xl text-white">
                  👤
                </div>
                <div>
                  <p className="font-medium text-gray-800">{username}</p>
                  <p className="text-gray-600 text-sm">Administrator</p>
                </div>
              </div>
            </div>
          </div>

          {/* Resize Handles */}
          <button
            aria-label="Resize window from bottom-right"
            className="absolute right-0 bottom-0 h-4 w-4 cursor-se-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "se")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from bottom-left"
            className="absolute bottom-0 left-0 h-4 w-4 cursor-sw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from top-right"
            className="absolute top-0 right-0 h-4 w-4 cursor-ne-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from top-left"
            className="absolute top-0 left-0 h-4 w-4 cursor-nw-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from right"
            className="absolute top-0 right-0 h-[calc(100%-16px)] w-2 cursor-e-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "e")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from left"
            className="absolute top-0 left-0 h-[calc(100%-16px)] w-2 cursor-w-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "w")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from bottom"
            className="absolute bottom-0 left-2 h-2 w-[calc(100%-16px)] cursor-s-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "s")}
            style={{ zIndex: 60 }}
            type="button"
          />
          <button
            aria-label="Resize window from top"
            className="absolute top-0 left-2 h-2 w-[calc(100%-16px)] cursor-n-resize"
            onMouseDown={(e) => handleResizeMouseDown(e, "n")}
            style={{ zIndex: 60 }}
            type="button"
          />
        </div>
      )}
    </div>
  );
}
