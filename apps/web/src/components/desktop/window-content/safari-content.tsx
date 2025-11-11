import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type SafariContentProps = {
  // Add any props needed for Safari content
};

// Curated list of websites that work well in iframes
const IFRAME_COMPATIBLE_SITES = [
  { name: "Wikipedia", url: "https://www.wikipedia.org" },
  { name: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/" },
  { name: "GitHub", url: "https://github.com" },
  { name: "Stack Overflow", url: "https://stackoverflow.com" },
  { name: "BBC News", url: "https://www.bbc.com/news" },
  { name: "CNN", url: "https://www.cnn.com" },
  { name: "The Guardian", url: "https://www.theguardian.com/international" },
  { name: "Weather", url: "https://www.weather.com" },
];

export function SafariContent({}: SafariContentProps) {
  const [url, setUrl] = useState("https://www.wikipedia.org");
  const [inputUrl, setInputUrl] = useState("https://www.wikipedia.org");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = (newUrl: string) => {
    setLoading(true);
    setError(null);

    // Handle URL formatting
    let formattedUrl = newUrl.trim();
    if (formattedUrl && !formattedUrl.startsWith("http")) {
      if (formattedUrl.startsWith("www.")) {
        formattedUrl = `https://${formattedUrl}`;
      } else {
        formattedUrl = `https://www.google.com/search?q=${encodeURIComponent(formattedUrl)}`;
      }
    }

    setUrl(formattedUrl);
    setInputUrl(formattedUrl);
  };

  const handleBack = () => {
    try {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.history.back();
      }
    } catch (e) {
      // Cross-origin security error is expected, show user-friendly message
      console.warn("Cannot navigate back due to cross-origin restrictions");
    }
  };

  const handleForward = () => {
    try {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.history.forward();
      }
    } catch (e) {
      // Cross-origin security error is expected, show user-friendly message
      console.warn("Cannot navigate forward due to cross-origin restrictions");
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      setLoading(true);
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  const handleIframeLoad = () => {
    setLoading(false);
    // Note: We can't reliably update the URL due to cross-origin restrictions
  };

  const handleIframeError = () => {
    setLoading(false);
    setError("Unable to load this website");
  };

  const visitSite = (siteUrl: string) => {
    navigate(siteUrl);
  };

  useEffect(() => {
    // Set initial URL to a site that works well in iframes
    navigate("https://www.wikipedia.org");
  }, []);

  return (
    <div className="flex h-full flex-col rounded-b-lg bg-white dark:bg-gray-900">
      <div className="flex items-center space-x-2 border-b p-2 dark:border-gray-700">
        <div className="flex space-x-1">
          <Button
            className="h-6 w-6 p-0"
            onClick={handleBack}
            size="sm"
            variant="ghost"
          >
            ←
          </Button>
          <Button
            className="h-6 w-6 p-0"
            onClick={handleForward}
            size="sm"
            variant="ghost"
          >
            →
          </Button>
          <Button
            className="h-6 w-6 p-0"
            onClick={handleRefresh}
            size="sm"
            variant="ghost"
          >
            ↻
          </Button>
        </div>
        <form
          className="flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            navigate(inputUrl);
          }}
        >
          <input
            className="w-full rounded border px-3 py-1 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search or enter website name"
            type="text"
            value={inputUrl}
          />
        </form>
      </div>

      {/* Quick access to iframe-compatible sites */}
      <div className="flex flex-wrap gap-2 border-b p-2 dark:border-gray-700">
        <span className="text-xs text-gray-500 dark:text-gray-400 self-center mr-2">
          Quick Access:
        </span>
        {IFRAME_COMPATIBLE_SITES.map((site) => (
          <Button
            key={site.url}
            variant="outline"
            size="sm"
            className="h-6 px-2 text-xs"
            onClick={() => visitSite(site.url)}
          >
            {site.name}
          </Button>
        ))}
      </div>

      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">Loading...</p>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white p-4 text-center dark:bg-gray-900">
            <p className="mb-2 text-red-500 dark:text-red-400">{error}</p>
            <p className="mb-4 text-gray-500 text-sm dark:text-gray-400">
              Many websites block embedding for security reasons. This is a
              limitation of iframe embedding in web browsers.
            </p>
            <p className="mb-4 text-gray-500 text-sm dark:text-gray-400">
              Browser security features may limit navigation within embedded
              sites.
            </p>
            <Button
              onClick={() => window.open(url, "_blank")}
              size="sm"
              variant="outline"
            >
              Open in New Tab
            </Button>
          </div>
        )}
        <iframe
          className="h-full w-full"
          onError={handleIframeError}
          onLoad={handleIframeLoad}
          ref={iframeRef}
          src={url}
        />
      </div>
    </div>
  );
}
