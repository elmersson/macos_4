import { useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { Slider } from "../ui/slider";

type SoundProps = {
  setAudioVolume: (newVolume: number) => void;
};

export function Sound({ setAudioVolume }: SoundProps) {
  const [volume, setVolume] = useState(50);

  const handleDisplayChange = (value: number[]) => {
    setVolume(value[0]);
    setAudioVolume(value[0] / 100);
  };

  return (
    <div className="w-[100%] rounded-md border border-slate-400/40 bg-slate-200/10 bg-clip-padding px-3 py-2 shadow-md backdrop-blur-3xl backdrop-filter dark:bg-slate-800/5">
      <div className="mb-2 space-y-2">
        <p className="font-bold text-xs">Sound</p>
        <Slider
          className="w-[100%]"
          defaultValue={[volume]}
          icon={volume === 0 ? <HiSpeakerXMark /> : <HiSpeakerWave />}
          max={100}
          onValueChange={handleDisplayChange}
          step={1}
        />
      </div>
    </div>
  );
}
