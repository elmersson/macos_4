import { useState } from "react";
import type { ResizeStartState, WindowState } from "./types";

export function useWindowManagement() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [draggedWindowId, setDraggedWindowId] = useState<string | null>(null);
  const [windowDragOffset, setWindowDragOffset] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState<ResizeStartState>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    posX: 0,
    posY: 0,
  });

  const openWindow = (appId: string, title: string) => {
    // Check if window already exists
    const existingWindow = windows.find((w) => w.appId === appId);
    if (existingWindow) {
      // Bring to front
      bringToFront(existingWindow.id);
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

  const handleWindowMouseDown = (
    e: React.MouseEvent,
    windowId: string,
    currentX: number,
    currentY: number
  ) => {
    e.stopPropagation();
    bringToFront(windowId);
    setDraggedWindowId(windowId);
    setWindowDragOffset({
      x: e.clientX - currentX,
      y: e.clientY - currentY,
    });
    setWindows((prev) =>
      prev.map((w) => (w.id === windowId ? { ...w, isDragging: true } : w))
    );
  };

  const handleWindowDrag = (e: React.MouseEvent) => {
    if (!draggedWindowId) {
      return;
    }

    const newX = e.clientX - windowDragOffset.x;
    const newY = e.clientY - windowDragOffset.y;

    setWindows((prev) =>
      prev.map((w) =>
        w.id === draggedWindowId
          ? {
              ...w,
              position: {
                x: Math.max(
                  0,
                  Math.min(newX, window.innerWidth - w.size.width)
                ),
                y: Math.max(
                  0,
                  Math.min(newY, window.innerHeight - w.size.height)
                ),
              },
            }
          : w
      )
    );
  };

  const handleResizeMouseDown = (
    e: React.MouseEvent,
    windowId: string,
    direction: string
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const targetWindow = windows.find((w) => w.id === windowId);
    if (!targetWindow) return;

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
      width: targetWindow.size.width,
      height: targetWindow.size.height,
      posX: targetWindow.position.x,
      posY: targetWindow.position.y,
    });
  };

  const handleResize = (e: React.MouseEvent) => {
    const resizingWindow = windows.find((w) => w.isResizing);
    if (!resizingWindow) {
      return;
    }

    const MIN_WIDTH = 400;
    const MIN_HEIGHT = 300;
    const MAX_WIDTH = window.innerWidth - resizingWindow.position.x;
    const MAX_HEIGHT = window.innerHeight - resizingWindow.position.y;

    const deltaX = e.clientX - resizeStart.x;
    const deltaY = e.clientY - resizeStart.y;

    let newWidth = resizingWindow.size.width;
    let newHeight = resizingWindow.size.height;
    let newX = resizingWindow.position.x;
    let newY = resizingWindow.position.y;

    if (resizingWindow.resizeDirection.includes("e")) {
      newWidth = Math.max(
        MIN_WIDTH,
        Math.min(resizeStart.width + deltaX, MAX_WIDTH)
      );
    }
    if (resizingWindow.resizeDirection.includes("s")) {
      newHeight = Math.max(
        MIN_HEIGHT,
        Math.min(resizeStart.height + deltaY, MAX_HEIGHT)
      );
    }
    if (resizingWindow.resizeDirection.includes("w")) {
      const potentialWidth = resizeStart.width - deltaX;
      const potentialX = resizeStart.posX + deltaX;
      if (potentialWidth >= MIN_WIDTH && potentialX >= 0) {
        newWidth = potentialWidth;
        newX = potentialX;
      }
    }
    if (resizingWindow.resizeDirection.includes("n")) {
      const potentialHeight = resizeStart.height - deltaY;
      const potentialY = resizeStart.posY + deltaY;
      const MENU_BAR_ACTUAL_HEIGHT = 32;
      const TITLE_BAR_HEIGHT = 40;
      if (
        potentialHeight >= MIN_HEIGHT &&
        potentialY >= MENU_BAR_ACTUAL_HEIGHT + TITLE_BAR_HEIGHT
      ) {
        newHeight = potentialHeight;
        newY = potentialY;
      }
    }

    setWindows((prev) =>
      prev.map((w) =>
        w.id === resizingWindow.id
          ? {
              ...w,
              size: { width: newWidth, height: newHeight },
              position: { x: newX, y: newY },
            }
          : w
      )
    );
  };

  const handleTitleBarDoubleClick = (windowId: string) => {
    const MENU_BAR_ACTUAL_HEIGHT = 32;

    setWindows((prev) =>
      prev.map((w) => {
        if (w.id !== windowId) return w;

        if (w.isFullscreen) {
          // Restore to previous state
          if (w.previousState) {
            const { position, size } = w.previousState;
            return {
              ...w,
              isFullscreen: false,
              position,
              size,
              previousState: undefined,
            };
          }
          return w;
        }
        // Go fullscreen
        return {
          ...w,
          isFullscreen: true,
          previousState: {
            position: w.position,
            size: w.size,
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

  const handleMouseUp = () => {
    setDraggedWindowId(null);
    setWindows((prev) =>
      prev.map((w) => ({
        ...w,
        isDragging: false,
        isResizing: false,
        resizeDirection: "",
      }))
    );
  };

  return {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    handleWindowMouseDown,
    handleWindowDrag,
    handleResizeMouseDown,
    handleResize,
    handleTitleBarDoubleClick,
    handleMouseUp,
  };
}
