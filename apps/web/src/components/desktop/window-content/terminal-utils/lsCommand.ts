import { createFileSystem, getDirectoryContents } from "./fileSystem";

const PADDING_WIDTH = 8;

export const executeLsCommand = (
  args: string[],
  newHistory: string[],
  currentPath: string,
  username: string
) => {
  // Trim username to handle any trailing/leading spaces
  const trimmedUsername = username.trim();

  const fileSystem = createFileSystem(trimmedUsername);
  const contents = getDirectoryContents(currentPath, fileSystem);
  if (args.includes("-l")) {
    // Detailed listing
    for (const item of contents) {
      const typeIndicator = item.type === "directory" ? "d" : "-";
      const size = item.size || "-";
      const modified = item.modified || "Jan 1 12:00";
      newHistory.push(
        `${typeIndicator}rwxr-xr-x  ${size.padEnd(PADDING_WIDTH)}  ${modified}  ${item.name}${item.type === "directory" ? "/" : ""}`
      );
    }
  } else {
    // Simple listing
    const dirs = contents
      .filter((item) => item.type === "directory")
      .map((item) => `${item.name}/`);
    const files = contents
      .filter((item) => item.type === "file")
      .map((item) => item.name);
    newHistory.push([...dirs, ...files].join("    "));
  }
};
