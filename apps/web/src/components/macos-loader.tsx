import { useEffect, useState } from "react";
import { Apple } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function MacOSLoader() {
  const [progress, setProgress] = useState(0);
  const [showApple, setShowApple] = useState(false);
  const [showProgress, setShowProgress] = useState(false);

  useEffect(() => {
    // Show apple logo after a short delay
    const appleTimer = setTimeout(() => {
      setShowApple(true);
    }, 500);

    // Show progress bar after a delay
    const progressTimer = setTimeout(() => {
      setShowProgress(true);
    }, 1500);

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Slow down progress as it approaches 100%
        const increment = prev > 95 ? 0.2 : prev > 90 ? 0.5 : prev > 80 ? 1 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => {
      clearTimeout(appleTimer);
      clearTimeout(progressTimer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-black transition-opacity duration-1000">
      <div className="flex flex-col items-center">
        {showApple && (
          <div className="mb-8 animate-pulse transition-opacity duration-1000">
            <Apple className="h-24 w-24 text-white" />
          </div>
        )}
        {showProgress && (
          <div className="w-64 transition-opacity duration-1000">
            <Progress value={progress} className="h-1 bg-gray-800" />
          </div>
        )}
      </div>
    </div>
  );
}
