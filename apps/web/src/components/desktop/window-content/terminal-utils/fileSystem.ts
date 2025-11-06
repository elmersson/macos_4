import type { FileSystemItem } from "./types";

// Virtual file system structure
export const createFileSystem = (
  username: string
): Record<string, FileSystemItem[]> => {
  // Trim username to handle any trailing/leading spaces
  const trimmedUsername = username.trim();

  return {
    "/": [
      { name: "Applications", type: "directory" },
      { name: "System", type: "directory" },
      { name: "Users", type: "directory" },
      { name: "Volumes", type: "directory" },
      { name: "bin", type: "directory" },
      { name: "dev", type: "directory" },
      { name: "etc", type: "directory" },
      { name: "private", type: "directory" },
      { name: "tmp", type: "directory" },
      { name: "var", type: "directory" },
    ],
    "/Users": [{ name: trimmedUsername, type: "directory" }],
    [`/Users/${trimmedUsername}`]: [
      { name: "Desktop", type: "directory" },
      { name: "Documents", type: "directory" },
      { name: "Downloads", type: "directory" },
      { name: "Applications", type: "directory" },
      { name: "Music", type: "directory" },
      { name: "Pictures", type: "directory" },
      { name: "Videos", type: "directory" },
      { name: "Public", type: "directory" },
      { name: "Library", type: "directory" },
      { name: "Movies", type: "directory" },
      { name: ".bash_profile", type: "file", size: "1.2 KB" },
      { name: ".zshrc", type: "file", size: "2.1 KB" },
    ],
    [`/Users/${trimmedUsername}/Desktop`]: [
      { name: "Screenshot 2023-01-01.png", type: "file", size: "2.4 MB" },
      { name: "Project Proposal.pdf", type: "file", size: "1.1 MB" },
      { name: "My Notes.txt", type: "file", size: "4.2 KB" },
    ],
    [`/Users/${trimmedUsername}/Documents`]: [
      { name: "Resume.pdf", type: "file", size: "245 KB" },
      { name: "Financial Reports", type: "directory" },
      { name: "Project Plans", type: "directory" },
    ],
    [`/Users/${trimmedUsername}/Documents/Financial Reports`]: [
      { name: "Q1 Report.xlsx", type: "file", size: "1.8 MB" },
      { name: "Q2 Report.xlsx", type: "file", size: "2.1 MB" },
    ],
    [`/Users/${trimmedUsername}/Documents/Project Plans`]: [
      { name: "Website Redesign.docx", type: "file", size: "340 KB" },
      { name: "Mobile App Ideas.txt", type: "file", size: "12.5 KB" },
    ],
    [`/Users/${trimmedUsername}/Downloads`]: [
      { name: "installer.dmg", type: "file", size: "45.2 MB" },
      { name: "image.jpg", type: "file", size: "3.7 MB" },
    ],
    [`/Users/${trimmedUsername}/Pictures`]: [
      { name: "Vacation Photos", type: "directory" },
      { name: "Profile Pictures", type: "directory" },
    ],
    [`/Users/${trimmedUsername}/Pictures/Vacation Photos`]: [
      { name: "beach.jpg", type: "file", size: "4.2 MB" },
      { name: "mountains.jpg", type: "file", size: "3.8 MB" },
      { name: "city-tour.jpg", type: "file", size: "5.1 MB" },
    ],
    "/Applications": [
      { name: "Safari.app", type: "directory" },
      { name: "Mail.app", type: "directory" },
      { name: "Messages.app", type: "directory" },
      { name: "Photos.app", type: "directory" },
      { name: "Music.app", type: "directory" },
      { name: "App Store.app", type: "directory" },
      { name: "System Settings.app", type: "directory" },
    ],
  };
};

export const getDirectoryContents = (
  path: string,
  fileSystem: Record<string, FileSystemItem[]>
): FileSystemItem[] => fileSystem[path] || [];

export const getPathSegments = (path: string): string[] =>
  path.split("/").filter((segment) => segment !== "");

export const resolvePath = (
  path: string,
  currentPath: string,
  username: string
): string => {
  // Trim username to handle any trailing/leading spaces
  const trimmedUsername = username.trim();

  if (path.startsWith("/")) {
    return path;
  }

  if (path === "~") {
    return `/Users/${trimmedUsername}`;
  }

  if (path === ".") {
    return currentPath;
  }

  // Handle multiple ../ segments
  if (path.startsWith("../")) {
    let segments = getPathSegments(currentPath);
    const pathSegments = path.split("/");

    // Count how many ../ segments there are
    let backCount = 0;
    while (pathSegments[backCount] === "..") {
      backCount++;
    }

    // Remove that many segments from the current path
    if (backCount >= segments.length) {
      segments = [];
    } else {
      segments = segments.slice(0, segments.length - backCount);
    }

    // Add any remaining path segments
    const remainingPathSegments = pathSegments.slice(backCount);
    if (segments.length === 0) {
      if (remainingPathSegments.length === 0) {
        return "/";
      }
      return `/${remainingPathSegments.join("/")}`;
    }
    if (remainingPathSegments.length === 0) {
      return `/${segments.join("/")}`;
    }
    return `/${segments.join("/")}/${remainingPathSegments.join("/")}`;
  }

  if (path === "..") {
    const segments = getPathSegments(currentPath);
    if (segments.length <= 1) {
      return "/";
    }
    return `/${segments.slice(0, -1).join("/")}`;
  }

  // Handle relative paths
  if (currentPath === "/") {
    return `/${path}`;
  }
  return `${currentPath}/${path}`;
};
