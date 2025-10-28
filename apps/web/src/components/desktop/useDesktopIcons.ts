import { useEffect, useState } from "react";
import {
  ICON_HEIGHT,
  ICON_MARGIN,
  ICON_WIDTH,
  INITIAL_APPS,
  MENU_BAR_HEIGHT,
} from "./constants";
import type { DesktopApp } from "./types";

export function useDesktopIcons() {
  const [apps, setApps] = useState<DesktopApp[]>(() => {
    const saved = localStorage.getItem("desktopAppPositions");
    return saved ? JSON.parse(saved) : INITIAL_APPS;
  });
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // Save positions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("desktopAppPositions", JSON.stringify(apps));
  }, [apps]);

  const handleMouseDown = (
    e: React.MouseEvent,
    appId: string,
    currentX: number,
    currentY: number
  ) => {
    e.stopPropagation();
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

  return {
    apps,
    draggingId,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
