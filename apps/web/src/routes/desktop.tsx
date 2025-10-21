import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import MacOSDesktop from "@/components/macos-desktop";

export const Route = createFileRoute("/desktop")({
  component: DesktopComponent,
});

function DesktopComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  if (isLoggedIn === null) {
    // Loading state
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <MacOSDesktop />;
}
