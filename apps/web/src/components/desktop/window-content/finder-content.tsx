import { useState } from "react";

type FileSystemItem = {
  name: string;
  type: "file" | "directory";
  icon: string;
  size?: string;
  modified?: string;
};

type FinderContentProps = {
  username: string;
};

export function FinderContent({ username }: FinderContentProps) {
  const [currentPath, setCurrentPath] = useState(`/Users/${username}`);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // File system structure matching the terminal implementation
  const fileSystem: Record<string, FileSystemItem[]> = {
    [`/Users/${username}`]: [
      { name: "Desktop", type: "directory", icon: "📁" },
      { name: "Documents", type: "directory", icon: "📁" },
      { name: "Downloads", type: "directory", icon: "📁" },
      { name: "Applications", type: "directory", icon: "📁" },
      { name: "Music", type: "directory", icon: "📁" },
      { name: "Pictures", type: "directory", icon: "📁" },
      { name: "Videos", type: "directory", icon: "📁" },
      { name: "Public", type: "directory", icon: "📁" },
      { name: "Library", type: "directory", icon: "📁" },
      { name: "Movies", type: "directory", icon: "📁" },
      { name: ".bash_profile", type: "file", icon: "📄", size: "1.2 KB" },
      { name: ".zshrc", type: "file", icon: "📄", size: "2.1 KB" },
    ],
    [`/Users/${username}/Desktop`]: [
      {
        name: "Screenshot 2023-01-01.png",
        type: "file",
        icon: "📄",
        size: "2.4 MB",
      },
      {
        name: "Project Proposal.pdf",
        type: "file",
        icon: "📄",
        size: "1.1 MB",
      },
      { name: "My Notes.txt", type: "file", icon: "📄", size: "4.2 KB" },
    ],
    [`/Users/${username}/Documents`]: [
      { name: "Resume.pdf", type: "file", icon: "📄", size: "245 KB" },
      { name: "Financial Reports", type: "directory", icon: "📁" },
      { name: "Project Plans", type: "directory", icon: "📁" },
    ],
    [`/Users/${username}/Documents/Financial Reports`]: [
      { name: "Q1 Report.xlsx", type: "file", icon: "📄", size: "1.8 MB" },
      { name: "Q2 Report.xlsx", type: "file", icon: "📄", size: "2.1 MB" },
    ],
    [`/Users/${username}/Documents/Project Plans`]: [
      {
        name: "Website Redesign.docx",
        type: "file",
        icon: "📄",
        size: "340 KB",
      },
      {
        name: "Mobile App Ideas.txt",
        type: "file",
        icon: "📄",
        size: "12.5 KB",
      },
    ],
    [`/Users/${username}/Downloads`]: [
      { name: "installer.dmg", type: "file", icon: "📄", size: "45.2 MB" },
      { name: "image.jpg", type: "file", icon: "📄", size: "3.7 MB" },
    ],
    [`/Users/${username}/Pictures`]: [
      { name: "Vacation Photos", type: "directory", icon: "📁" },
      { name: "Profile Pictures", type: "directory", icon: "📁" },
    ],
    [`/Users/${username}/Pictures/Vacation Photos`]: [
      { name: "beach.jpg", type: "file", icon: "📄", size: "4.2 MB" },
      { name: "mountains.jpg", type: "file", icon: "📄", size: "3.8 MB" },
      { name: "city-tour.jpg", type: "file", icon: "📄", size: "5.1 MB" },
    ],
    "/Applications": [
      { name: "Safari.app", type: "directory", icon: "📁" },
      { name: "Mail.app", type: "directory", icon: "📁" },
      { name: "Messages.app", type: "directory", icon: "📁" },
      { name: "Photos.app", type: "directory", icon: "📁" },
      { name: "Music.app", type: "directory", icon: "📁" },
      { name: "App Store.app", type: "directory", icon: "📁" },
      { name: "System Settings.app", type: "directory", icon: "📁" },
    ],
  };

  const navigateToPath = (path: string) => {
    setCurrentPath(path);
    setSelectedItem(null);
  };

  const navigateUp = () => {
    const pathSegments = currentPath
      .split("/")
      .filter((segment) => segment !== "");
    if (pathSegments.length > 0) {
      const newPath = "/" + pathSegments.slice(0, -1).join("/");
      setCurrentPath(newPath === "" ? "/" : newPath);
    } else {
      setCurrentPath("/");
    }
    setSelectedItem(null);
  };

  const handleItemClick = (item: FileSystemItem) => {
    if (item.type === "directory") {
      const newPath =
        currentPath === "/" ? `/${item.name}` : `${currentPath}/${item.name}`;
      navigateToPath(newPath);
    } else {
      setSelectedItem(item.name);
    }
  };

  const getPathDisplayName = (path: string): string => {
    if (path === `/Users/${username}`) return "Home";
    if (path.startsWith(`/Users/${username}/`))
      return path.substring(`/Users/${username}/`.length);
    if (path === "/") return "Macintosh HD";
    return path.split("/").pop() || "";
  };

  const breadcrumbs = () => {
    const segments = currentPath.split("/").filter((segment) => segment !== "");
    return (
      <div className="flex items-center text-gray-400 text-xs">
        <button onClick={() => navigateToPath("/")}>📁 Macintosh HD</button>
        {segments.map((segment, index) => {
          const path = "/" + segments.slice(0, index + 1).join("/");
          return (
            <>
              <span className="mx-2">/</span>
              <button key={path} onClick={() => navigateToPath(path)}>
                {segment === username ? "📁 Home" : `📁 ${segment}`}
              </button>
            </>
          );
        })}
      </div>
    );
  };

  const currentItems = fileSystem[currentPath] || [];

  return (
    <div className="flex h-full flex-col rounded-b-lg dark:bg-[#303030]">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {currentItems.map((item) => (
            <div
              className={`flex cursor-pointer flex-col items-center rounded p-2 ${
                selectedItem === item.name
                  ? "bg-gray-100/10"
                  : "hover:bg-gray-100/10"
              }`}
              key={item.name}
              onClick={() => handleItemClick(item)}
            >
              <div className="text-3xl">{item.icon}</div>
              <div className="mt-2 text-center text-gray-200 text-xs">
                {item.name}
              </div>
              {item.size && (
                <div className="text-gray-500 text-xs dark:text-gray-400">
                  {item.size}
                </div>
              )}
            </div>
          ))}
        </div>
        {currentItems.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400">
            This folder is empty.
          </div>
        )}
      </div>
      <div className="border-black border-t border-t-white/20 border-b p-1.5 px-2">
        {breadcrumbs()}
      </div>
      <div className="rounded-b-lg bg-[#404040] p-1 text-center text-gray-500 text-xs">
        1 of 28 selected
      </div>
    </div>
  );
}
