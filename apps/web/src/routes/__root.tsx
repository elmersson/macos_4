import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Header from "@/components/header";
import Loader from "@/components/loader";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import "../index.css";
import { useDisplayStore } from "@/stores/display-store";

export type RouterAppContext = {};

export const Route = createRootRouteWithContext<RouterAppContext>()({
  component: RootComponent,
  head: () => ({
    meta: [
      {
        title: "my-better-t-app",
      },
      {
        name: "description",
        content: "my-better-t-app is a web application",
      },
    ],
    links: [
      {
        rel: "icon",
        href: "/favicon.ico",
      },
    ],
  }),
});

const NORMAL_VALUE = 75;

function RootComponent() {
  const isFetching = useRouterState({
    select: (s) => s.isLoading,
  });
  const location = useRouterState({
    select: (s) => s.location.pathname,
  });

  const { display } = useDisplayStore();

  // Hide header on login and desktop pages (macOS UI)
  const showHeader = location !== "/login" && location !== "/desktop";

  // Calculate overlay opacity (50% display = normal, above 50% = brighter, below 50% = darker)
  const darkOverlayOpacity =
    display < NORMAL_VALUE ? (NORMAL_VALUE - display) / NORMAL_VALUE : 0;
  const brightOverlayOpacity =
    display > NORMAL_VALUE ? (display - NORMAL_VALUE) / NORMAL_VALUE : 0;

  return (
    <>
      <HeadContent />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
        storageKey="vite-ui-theme"
      >
        <div className={"grid h-svh grid-rows-[auto_1fr]"}>
          {showHeader && <Header />}
          {isFetching ? <Loader /> : <Outlet />}
          {/* Dark overlay for values below 50% */}
          <div
            className="pointer-events-none fixed inset-0"
            style={{
              backgroundColor: "black",
              opacity: darkOverlayOpacity,
              zIndex: 9999,
              mixBlendMode: "darken",
            }}
          />
          {/* Bright overlay for values above 50% */}
          <div
            className="pointer-events-none fixed inset-0"
            style={{
              backgroundColor: "white",
              opacity: brightOverlayOpacity * 0.3, // Subtle glow effect
              zIndex: 9999,
              mixBlendMode: "luminosity",
            }}
          />
        </div>
        <Toaster richColors />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-left" />
    </>
  );
}
