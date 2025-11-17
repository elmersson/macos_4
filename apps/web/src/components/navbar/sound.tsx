import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Slider } from "../ui/slider";

type SoundProps = {
  volume: number;
  setVolume: (newVolume: number) => void;
};

const VOLUME_MULTIPLIER = 100;

export function Sound({ setVolume, volume }: SoundProps) {
  const handleDisplayChange = (value: number[]) => {
    setVolume(value[0] / VOLUME_MULTIPLIER);
  };

  return (
    <div className="w-[100%] rounded-md border border-slate-400/40 bg-slate-200/10 bg-clip-padding px-3 py-2 shadow-md backdrop-blur-3xl backdrop-filter dark:bg-slate-800/5">
      <div className="mb-2 space-y-2">
        <p className="font-bold text-xs">Sound</p>
        <Slider
          className="w-[100%]"
          defaultValue={[volume * VOLUME_MULTIPLIER]}
          icon={volume === 0 ? <HiSpeakerXMark /> : <HiSpeakerWave />}
          max={100}
          onValueChange={handleDisplayChange}
          step={1}
        />
      </div>
    </div>
  );
}
