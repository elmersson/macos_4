import { useState } from 'react';
import { Slider } from '../ui/slider';


interface SoundProps {
  // eslint-disable-next-line no-unused-vars
  setAudioVolume: (newVolume: number) => void;
}

export function Sound({ setAudioVolume }: SoundProps) {
  const [ volume, setVolume ] = useState(50);

  const handleDisplayChange = (value: number[]) => {
    setVolume(value[0]);
    setAudioVolume(value[0] / 100);
  };

  return (
    <div className="rounded-md px-3 py-2 w-[100%] bg-clip-padding backdrop-filter backdrop-blur-3xl bg-slate-200/10 dark:bg-slate-800/5 shadow-md border-slate-400/40 border">
      <div className="space-y-2 mb-2">
        <p className="text-xs font-bold">Sound</p>
        <Slider
          defaultValue={[volume]}
          max={100}
          step={1}
          className="w-[100%]"
          onValueChange={handleDisplayChange}
        />
      </div>
    </div>
  );
}