export type AppPosition = {
  x: number;
  y: number;
};

export type DesktopApp = {
  id: string;
  name: string;
  icon: string;
  position: AppPosition;
};

export type WindowState = {
  id: string;
  appId: string;
  title: string;
  position: AppPosition;
  size: { width: number; height: number };
  isDragging: boolean;
  isResizing: boolean;
  resizeDirection: string;
  isFullscreen: boolean;
  previousState?: {
    position: AppPosition;
    size: { width: number; height: number };
  };
  zIndex: number;
};

export type ResizeStartState = {
  x: number;
  y: number;
  width: number;
  height: number;
  posX: number;
  posY: number;
};
