import { IoPauseSharp, IoPlayForward, IoPlaySharp } from "react-icons/io5";

interface MusicProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
}
export function Music({ isPlaying, togglePlayPause }: MusicProps) {
  return (
    <div className="w-[100%] rounded-md border border-slate-400/40 bg-slate-200/10 bg-clip-padding px-3 py-3 shadow-md backdrop-blur-3xl backdrop-filter dark:bg-slate-800/5">
      <div className="flex flex-row items-center justify-center">
        <div className="shadow-md">
          <img
            alt="Stockholmsvy cover"
            className="rounded-sm"
            height={40}
            src="/images/stockholmsvy.jpeg"
            width={40}
          />
        </div>
        <div className="flex flex-grow flex-col px-2">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="font-bold text-xs">Stockholmsvy</p>
              <p className="text-xxs">Hannes - Stockholmsvy</p>
            </div>
            <div className="flex flex-row space-x-2">
              <div onClick={togglePlayPause} className="cursor-pointer">
                {isPlaying ? (
                  <IoPauseSharp style={{ fontSize: "20px" }} />
                ) : (
                  <IoPlaySharp style={{ fontSize: "20px" }} />
                )}
              </div>
              <IoPlayForward style={{ fontSize: "20px" }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
