import { IoPauseSharp, IoPlayForward, IoPlaySharp } from 'react-icons/io5';

interface MusicProps {
  isPlaying: boolean;
  togglePlayPause: () => void;
}
export function Music({ isPlaying, togglePlayPause }: MusicProps) {
  return (
    <div className="rounded-md px-3 py-3 w-[100%] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-slate-200/10 dark:bg-slate-800/5 shadow-md border-slate-400/40 border">
      <div className="flex flex-row justify-center items-center">
        <div className="shadow-md">
          <image
            src="/images/stockholmsvy.jpeg"
            width={40}
            alt="Stockholmsvy cover"
            height={40}
            className="rounded-sm"
          />
        </div>
        <div className="flex flex-col flex-grow px-2">
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="text-xs font-bold">Stockholmsvy</p>
              <p className="text-xxs">Hannes - Stockholmsvy</p>
            </div>
            <div className="flex flex-row space-x-2">
              <div onClick={togglePlayPause}>
                {isPlaying ? (
                  <IoPauseSharp style={{ fontSize: '20px' }} />
                ) : (
                  <IoPlaySharp style={{ fontSize: '20px' }} />
                )}
              </div>
              <IoPlayForward style={{ fontSize: '20px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}