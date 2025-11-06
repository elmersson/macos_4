import { createFileSystem, resolvePath } from "./fileSystem";

export const executeCdCommand = (
  args: string[],
  newHistory: string[],
  currentPath: string,
  setCurrentPath: (path: string) => void,
  username: string
) => {
  // Trim username to handle any trailing/leading spaces
  const trimmedUsername = username.trim();

  const targetPath = args[0] || "~";
  if (targetPath === "~" || targetPath === "") {
    setCurrentPath(`/Users/${trimmedUsername}`);
  } else if (targetPath.startsWith("/")) {
    // Absolute path
    const fileSystem = createFileSystem(trimmedUsername);
    if (fileSystem[targetPath]) {
      setCurrentPath(targetPath);
    } else {
      newHistory.push(`cd: ${targetPath}: No such file or directory`);
    }
  } else {
    // Handle relative paths including .. and ../..
    const newPath = resolvePath(targetPath, currentPath, trimmedUsername);
    const fileSystem = createFileSystem(trimmedUsername);

    // Check if the resolved path exists in our file system
    if (fileSystem[newPath]) {
      setCurrentPath(newPath);
    } else {
      newHistory.push(`cd: ${targetPath}: No such file or directory`);
    }
  }
};
