import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // For demo purposes, any username/password works
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username || "User");

    setIsLoading(false);
    navigate({ to: "/desktop" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 p-4">
      {/* macOS Big Sur style wallpaper overlay */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 w-full max-w-md">
        {/* User Avatar */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gray-300 text-6xl text-gray-600 shadow-lg">
            👤
          </div>
          <h1 className="mb-2 font-light text-2xl text-white">
            {username || "User"}
          </h1>
        </div>

        {/* Login Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <Label className="sr-only" htmlFor="username">
                Username
              </Label>
              <Input
                className="h-12 w-full rounded-lg border-0 bg-white/90 px-4 text-gray-900 backdrop-blur-sm placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500/50"
                id="username"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                type="text"
                value={username}
              />
            </div>

            <div>
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                className="h-12 w-full rounded-lg border-0 bg-white/90 px-4 text-gray-900 backdrop-blur-sm placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500/50"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                type="password"
                value={password}
              />
            </div>
          </div>

          <Button
            className="h-12 w-full rounded-lg border-0 bg-blue-600 font-medium text-white transition-all duration-200 hover:bg-blue-700 disabled:opacity-50"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        {/* Additional Options */}
        <div className="mt-8 space-y-4 text-center">
          <button className="text-sm text-white/80 transition-colors hover:text-white">
            Forgot your password?
          </button>

          <div className="flex items-center justify-center space-x-4 text-white/60 text-xs">
            <button className="transition-colors hover:text-white/80">
              Sleep
            </button>
            <button className="transition-colors hover:text-white/80">
              Restart
            </button>
            <button className="transition-colors hover:text-white/80">
              Shut Down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
