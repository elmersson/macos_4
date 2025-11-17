import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginStore } from "@/stores/login-store";
import { type LoginFormData, loginSchema } from "./login-schema";

export const Route = createFileRoute("/login")({
  component: LoginComponent,
});

function LoginComponent() {
  const {
    username,
    isLoading,
    isLoggedIn,
    password,
    setUsername: setStoreUsername,
    setPassword: setStorePassword,
    setIsLoading,
    setIsLoggedIn,
    setSavedCredentials,
  } = useLoginStore();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    // If user is already logged in, redirect to desktop
    if (isLoggedIn) {
      navigate({ to: "/desktop" });
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if credentials are saved
    if (username && password) {
      // Check if entered credentials match saved ones
      if (data.username === username && data.password === password) {
        // Credentials match, log in
        setIsLoggedIn(true);
        setStoreUsername(data.username);
        setStorePassword(data.password);
      } else {
        // Credentials don't match
        setError("root", {
          message: "Invalid username or password",
        });
        setIsLoading(false);
        return;
      }
    } else {
      // No saved credentials, save them and log in
      setSavedCredentials(data.username, data.password);
      setIsLoggedIn(true);
      setStoreUsername(data.username);
      setStorePassword(data.password);
    }

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
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div className="space-y-4">
            <div>
              <Label className="sr-only" htmlFor="username">
                Username
              </Label>
              <Input
                className="h-12 w-full rounded-lg border-0 bg-white/90 px-4 text-gray-900 backdrop-blur-sm placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500/50"
                id="username"
                placeholder="Username"
                type="text"
                {...register("username")}
              />
              {errors.username && (
                <p className="mt-1 text-red-200 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <Label className="sr-only" htmlFor="password">
                Password
              </Label>
              <Input
                className="h-12 w-full rounded-lg border-0 bg-white/90 px-4 text-gray-900 backdrop-blur-sm placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-blue-500/50"
                id="password"
                placeholder="Password"
                type="password"
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-red-200 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {errors.root && (
            <p className="text-center text-red-200 text-sm">
              {errors.root.message}
            </p>
          )}

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
