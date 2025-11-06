import { createFileSystem, resolvePath } from "./fileSystem";

export const executeZCommand = (
  args: string[],
  newHistory: string[],
  setCurrentPath: (path: string) => void,
  currentPath: string,
  username: string
) => {
  // Trim username to handle any trailing/leading spaces
  const trimmedUsername = username.trim();

  if (args.length === 0) {
    newHistory.push("z: Expected argument");
    return;
  }

  const target = args[0];

  // Handle special shortcuts for common directories
  const shortcuts: Record<string, string> = {
    Desktop: `/Users/${trimmedUsername}/Desktop`,
    Documents: `/Users/${trimmedUsername}/Documents`,
    Downloads: `/Users/${trimmedUsername}/Downloads`,
    Pictures: `/Users/${trimmedUsername}/Pictures`,
    Music: `/Users/${trimmedUsername}/Music`,
    Videos: `/Users/${trimmedUsername}/Videos`,
    Movies: `/Users/${trimmedUsername}/Movies`,
  };

  // Check if target is a shortcut
  if (shortcuts[target]) {
    const shortcutPath = shortcuts[target];
    const fileSystem = createFileSystem(trimmedUsername);
    if (fileSystem[shortcutPath]) {
      setCurrentPath(shortcutPath);
      return;
    }
  }

  // If not a shortcut, treat like cd command
  const targetPath = target;
  if (targetPath === "~" || targetPath === "") {
    setCurrentPath(`/Users/${trimmedUsername}`);
  } else if (targetPath.startsWith("/")) {
    // Absolute path
    const fileSystem = createFileSystem(trimmedUsername);
    if (fileSystem[targetPath]) {
      setCurrentPath(targetPath);
    } else {
      newHistory.push(`z: ${targetPath}: No such file or directory`);
    }
  } else {
    // Handle relative paths including .. and ../..
    const newPath = resolvePath(targetPath, currentPath, trimmedUsername);
    const fileSystem = createFileSystem(trimmedUsername);

    // Check if the resolved path exists in our file system
    if (fileSystem[newPath]) {
      setCurrentPath(newPath);
    } else {
      newHistory.push(`z: ${targetPath}: No such file or directory`);
    }
  }
};
