import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { IoMdMoon } from "react-icons/io";
import { IoSunny } from "react-icons/io5";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  function handleClick() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }

  return (
    <button
      aria-label="Toggle Theme"
      className="flex h-[100%] w-[100%] flex-row items-center space-x-2 rounded-md border border-slate-400/40 bg-slate-200/10 bg-clip-padding px-3 py-4 shadow-md backdrop-blur-3xl backdrop-filter dark:bg-slate-800/5"
      data-slot="theme-switcher"
      onClick={handleClick}
      type="button"
    >
      <div className="flex h-7 w-7 items-center justify-center rounded-full bg-apple-blue-100">
        {theme === "dark" ? (
          <IoMdMoon style={{ color: "white" }} />
        ) : (
          <IoSunny style={{ color: "black" }} />
        )}
      </div>
      <div>
        <p className="font-semibold text-xs">
          {theme === "dark" ? "Dark" : "Light"}
        </p>
      </div>
    </button>
  );
}
