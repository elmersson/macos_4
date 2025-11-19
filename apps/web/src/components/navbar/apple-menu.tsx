import { useLoginStore } from "@/stores/login-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function AppleMenu() {
  const { username } = useLoginStore();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">Apple</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]">
        <DropdownMenuLabel className="flex flex-row items-center justify-between pb-0 text-white">
          <p>About This Mac</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center space-x-2">
            <p>System Settings...</p>
          </div>
          <div className="flex flex-row items-center justify-center space-x-1 rounded-xl bg-white/10 px-2 py-1">
            <p className="text-xxs">2 updates</p>
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p>App Store</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p>Recent Items</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row items-center justify-between">
          <p>Force Quit...</p>
          <p className="text-xs opacity-50">⌥⌘Q</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p>Sleep</p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p>Restart...</p>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <p>Shutdown...</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex flex-row items-center justify-between">
          <p>Lock Screen</p>
          <p className="text-xs opacity-50">^⌘Q</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex flex-row items-center justify-between">
          <p>Logout {username}...</p>
          <p className="text-xs opacity-50">⇧⌘Q</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
