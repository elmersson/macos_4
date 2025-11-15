import { useAudio } from "react-use";

type MusicContentProps = {
  // Add any props needed for Music content
};

export function MusicContent({}: MusicContentProps) {
  const [audio, state, controls, ref] = useAudio({
    src: "/sound/Stockholmsvy.mp3",
    autoPlay: false,
  });

  const togglePlayback = () => {
    if (state.paused) {
      controls.play();
    } else {
      controls.pause();
    }
  };

  return (
    <div className="h-full rounded-b-lg bg-white p-6 dark:bg-gray-900">
      <h2 className="mb-4 font-semibold text-xl dark:text-gray-100">Music</h2>
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-gray-500 dark:text-gray-400 mb-4">Stockholmsvy</p>
        <button
          onClick={togglePlayback}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          {state.paused ? "Play" : "Pause"}
        </button>
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {Math.floor(state.time)}s / {Math.floor(state.duration)}s
        </div>
      </div>
      {audio}
    </div>
  );
}
