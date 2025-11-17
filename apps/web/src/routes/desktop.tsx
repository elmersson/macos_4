import { createFileRoute, Navigate } from "@tanstack/react-router";
import MacOSDesktop from "@/components/macos-desktop";
import { useLoginStore } from "@/stores/login-store";

export const Route = createFileRoute("/desktop")({
  component: DesktopComponent,
});

function DesktopComponent() {
  const { isLoggedIn } = useLoginStore();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <MacOSDesktop />;
}
