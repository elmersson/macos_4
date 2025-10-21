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
  };

  const DOCK_ICON_COUNT = 5;

  return (
    <div
      aria-label="macOS Desktop"
      className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      role="application"
    >
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Menu Bar */}
      <div className="relative z-50 flex h-8 items-center justify-between bg-black/20 px-4 text-white backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <button
            className="rounded px-2 py-1 font-bold text-xl transition-colors hover:bg-white/10"
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
    </div>
  );
}
