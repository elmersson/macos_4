import { useEffect, useRef, useState } from "react";
import { executeCdCommand } from "./terminal-utils/cdCommand";
import { executeLsCommand } from "./terminal-utils/lsCommand";
import { executeZCommand } from "./terminal-utils/zCommand";

type TerminalContentProps = {
  username: string;
};

export function TerminalContent({ username }: TerminalContentProps) {
  // Trim username to handle any trailing/leading spaces
  const trimmedUsername = username.trim();

  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentPath, setCurrentPath] = useState(`/Users/${trimmedUsername}`);
  const [pathHistory, setPathHistory] = useState<string[]>([
    `/Users/${trimmedUsername}`,
  ]);
  const [pathHistoryIndex, setPathHistoryIndex] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Custom setCurrentPath function that updates path history
  const updateCurrentPath = (newPath: string) => {
    setCurrentPath(newPath);

    // Update path history
    if (pathHistoryIndex < pathHistory.length - 1) {
      // If we're not at the end of history, truncate everything after current index
      const truncatedHistory = pathHistory.slice(0, pathHistoryIndex + 1);
      setPathHistory([...truncatedHistory, newPath]);
      setPathHistoryIndex(truncatedHistory.length);
    } else {
      // If we're at the end, just add the new path
      setPathHistory((prev) => [...prev, newPath]);
      setPathHistoryIndex((prev) => prev + 1);
    }
  };

  // Focus the input when the component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history.length]);

  const executeHelpCommand = (newHistory: string[]) => {
    newHistory.push(
      "Available commands: help, clear, ls, pwd, whoami, echo, date, cd, z, back, forward"
    );
  };

  const executeCommand = (cmd: string) => {
    const newHistory = [...history];
    newHistory.push(
      `${trimmedUsername}@macos:${currentPath === `/Users/${trimmedUsername}` ? "~" : currentPath}$ ${cmd}`
    );

    const command = cmd.trim();
    if (command === "") {
      setHistory(newHistory);
      return;
    }

    // Add to command history
    setCommandHistory((prev) => [...prev, command]);

    const [cmdName, ...args] = command.split(" ");

    // Process commands
    switch (cmdName) {
      case "help":
        executeHelpCommand(newHistory);
        break;
      case "clear":
        setHistory([]);
        return;
      case "ls":
        executeLsCommand(args, newHistory, currentPath, trimmedUsername);
        break;
      case "pwd":
        newHistory.push(currentPath);
        break;
      case "whoami":
        newHistory.push(trimmedUsername);
        break;
      case "echo":
        newHistory.push(args.join(" "));
        break;
      case "date":
        newHistory.push(new Date().toString());
        break;
      case "cd":
        executeCdCommand(
          args,
          newHistory,
          currentPath,
          updateCurrentPath,
          trimmedUsername
        );
        break;
      case "z":
        executeZCommand(
          args,
          newHistory,
          updateCurrentPath,
          currentPath,
          trimmedUsername
        );
        break;
      case "back":
        if (pathHistoryIndex > 0) {
          const newIndex = pathHistoryIndex - 1;
          setPathHistoryIndex(newIndex);
          setCurrentPath(pathHistory[newIndex]);
        } else {
          newHistory.push("back: Already at the earliest directory");
        }
        break;
      default:
        newHistory.push(`command not found: ${cmdName}`);
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
    setHistoryIndex(-1);
  };

  const handleArrowUp = () => {
    if (commandHistory.length > 0) {
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      setInput(commandHistory[newIndex] ?? "");
    }
  };

  const handleArrowDown = () => {
    if (historyIndex !== -1) {
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] ?? "");
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      handleArrowUp();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      handleArrowDown();
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="flex h-full flex-col bg-black font-mono text-green-400 text-sm"
      onClick={handleTerminalClick}
      role="application"
      tabIndex={0}
    >
      <div className="flex-1 overflow-y-auto p-4" ref={terminalRef}>
        <div className="mb-2">
          Last login: {new Date().toLocaleString()} on ttys000
        </div>
        {history.map((line, index) => (
          <div className="mb-1" key={`${line}-${index}`}>
            {line}
          </div>
        ))}
        <form className="flex items-center" onSubmit={handleSubmit}>
          <span>
            {trimmedUsername}@macos:
            {currentPath === `/Users/${trimmedUsername}` ? "~" : currentPath}$
          </span>
          <input
            autoFocus
            className="ml-2 flex-1 bg-transparent caret-green-400 outline-none"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            type="text"
            value={input}
          />
        </form>
      </div>
    </div>
  );
}
