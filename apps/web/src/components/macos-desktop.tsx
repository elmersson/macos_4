import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const DESKTOP_APPS = [
  { id: "finder", name: "Finder", icon: "📁", position: { x: 20, y: 20 } },
  { id: "safari", name: "Safari", icon: "🧭", position: { x: 20, y: 120 } },
  { id: "mail", name: "Mail", icon: "✉️", position: { x: 20, y: 220 } },
  { id: "photos", name: "Photos", icon: "🖼️", position: { x: 20, y: 320 } },
  { id: "music", name: "Music", icon: "🎵", position: { x: 20, y: 420 } },
  { id: "trash", name: "Trash", icon: "🗑️", position: { x: 20, y: 520 } },
];

export default function MacOSDesktop() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username] = useState(localStorage.getItem("username") || "User");
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <div className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      {/* Desktop Wallpaper */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Menu Bar */}
      <div className="relative z-50 flex h-8 items-center justify-between bg-black/20 px-4 text-white backdrop-blur-md">
        <div className="flex items-center space-x-4">
          <button
            className="rounded px-2 py-1 font-bold text-xl transition-colors hover:bg-white/10"
            type="button"
          ></button>
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
        {DESKTOP_APPS.map((app) => (
          <div
            className="absolute cursor-pointer select-none"
            key={app.id}
            style={{
              left: app.position.x,
              top: app.position.y + 32, // Account for menu bar
            }}
          >
            <div className="flex flex-col items-center space-y-1 rounded-lg p-2 transition-colors hover:bg-white/10">
              <div className="text-4xl">{app.icon}</div>
              <span className="text-white text-xs drop-shadow-lg">
                {app.name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Dock */}
      <div className="-translate-x-1/2 absolute bottom-4 left-1/2 z-50 transform">
        <div className="flex items-center space-x-2 rounded-2xl bg-white/20 p-2 backdrop-blur-md">
          {DESKTOP_APPS.slice(0, 5).map((app) => (
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
