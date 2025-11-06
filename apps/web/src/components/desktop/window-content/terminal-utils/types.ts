export type FileSystemItem = {
  name: string;
  type: "file" | "directory";
  size?: string;
  modified?: string;
  contents?: FileSystemItem[];
};
