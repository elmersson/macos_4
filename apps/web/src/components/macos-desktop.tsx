import { useEffect, useState } from "react";
import { DesktopIcon } from "./desktop/DesktopIcon";
import { Dock } from "./desktop/Dock";
import { MenuBar } from "./desktop/MenuBar";
import { useDesktopIcons } from "./desktop/useDesktopIcons";
import { useWindowManagement } from "./desktop/useWindowManagement";
import { Window } from "./desktop/Window";

export default function MacOSDesktop() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [username] = useState(localStorage.getItem("username") || "User");

  const {
    apps,
    draggingId,
    handleMouseDown: handleIconMouseDown,
    handleMouseMove: handleIconMouseMove,
    handleMouseUp: handleIconMouseUp,
  } = useDesktopIcons();

  const {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    handleWindowMouseDown,
    handleWindowDrag,
    handleResizeMouseDown,
    handleResize,
    handleTitleBarDoubleClick,
    handleMouseUp: handleWindowMouseUp,
  } = useWindowManagement();

  useEffect(() => {
    const TIMER_INTERVAL = 1000;
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, TIMER_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const handleAppleMenuClick = () => {
    openWindow("system-settings", "System Settings");
  };

  const handleIconDoubleClick = (appId: string, appName: string) => {
    openWindow(appId, appName);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleIconMouseMove(e);
    handleWindowDrag(e);
    handleResize(e);
  };

  const handleMouseUp = () => {
    handleIconMouseUp();
    handleWindowMouseUp();
  };

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
      <MenuBar onAppleMenuClick={handleAppleMenuClick} />

      {/* Desktop Icons */}
      <div className="relative z-10 h-full">
        {apps.map((app) => (
          <DesktopIcon
            app={app}
            isDragging={draggingId === app.id}
            key={app.id}
            onDoubleClick={handleIconDoubleClick}
            onMouseDown={handleIconMouseDown}
          />
        ))}
      </div>

      {/* Dock */}
      <Dock apps={apps} onOpenWindow={openWindow} windows={windows} />

      {/* Windows */}
      {windows.map((win) => (
        <Window
          key={win.id}
          onClose={closeWindow}
          onDoubleClick={handleTitleBarDoubleClick}
          onDragStart={handleWindowMouseDown}
          onFocus={focusWindow}
          onResizeStart={handleResizeMouseDown}
          username={username}
          window={win}
        />
      ))}
    </div>
  );
}
