import { useEffect, useRef, useState } from "react";

type TerminalContentProps = {
  username: string;
};

export function TerminalContent({ username }: TerminalContentProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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
  }, [history]);

  const executeCommand = (cmd: string) => {
    const newHistory = [...history];
    newHistory.push(`$ ${cmd}`);

    const command = cmd.trim();
    if (command === "") {
      setHistory(newHistory);
      return;
    }

    // Add to command history
    setCommandHistory((prev) => [...prev, command]);

    // Process commands
    switch (command.split(" ")[0]) {
      case "help":
        newHistory.push(
          "Available commands: help, clear, ls, pwd, whoami, echo, date"
        );
        break;
      case "clear":
        setHistory([]);
        return;
      case "ls":
        newHistory.push(
          "Desktop    Documents    Downloads    Applications    Music    Pictures    Videos"
        );
        break;
      case "pwd":
        newHistory.push(`/Users/${username}`);
        break;
      case "whoami":
        newHistory.push(username);
        break;
      case "echo":
        newHistory.push(command.substring(5));
        break;
      case "date":
        newHistory.push(new Date().toString());
        break;
      default:
        newHistory.push(`command not found: ${command}`);
    }

    setHistory(newHistory);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
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
    }
  };

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className="flex h-full flex-col bg-black font-hack-nerd-font text-green-400 text-sm"
      onClick={handleTerminalClick}
    >
      <div className="flex-1 overflow-y-auto p-4" ref={terminalRef}>
        <div className="mb-2">
          Last login: {new Date().toLocaleString()} on ttys000
        </div>
        {history.map((line, index) => (
          <div className="mb-1" key={index}>
            {line}
          </div>
        ))}
        <form className="flex items-center" onSubmit={handleSubmit}>
          <span>{username}@macos:~$</span>
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
