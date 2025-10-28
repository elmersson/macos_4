import type { DesktopApp } from "./types";

export const MENU_BAR_HEIGHT = 0;
export const ICON_WIDTH = 80;
export const ICON_HEIGHT = 90;
export const ICON_MARGIN = 20;
export const ICON_SPACING = 100;
export const DOUBLE_SPACING = ICON_SPACING + ICON_SPACING;
export const TRIPLE_SPACING = DOUBLE_SPACING + ICON_SPACING;
export const QUAD_SPACING = TRIPLE_SPACING + ICON_SPACING;
export const QUINT_SPACING = QUAD_SPACING + ICON_SPACING;
export const DOCK_ICON_COUNT = 5;

export const INITIAL_APPS: DesktopApp[] = [
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
    icon: "📷",
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
