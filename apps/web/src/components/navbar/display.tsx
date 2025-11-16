import { BsFillSunFill } from "react-icons/bs";
import { useDisplayStore } from "@/stores/display-store";
import { Slider } from "../ui/slider";

export function Display() {
  const { display, setDisplay } = useDisplayStore();

  const handleDisplayChange = (value: number[]) => {
    setDisplay(value[0]);
  };

  return (
    <div className="w-[100%] rounded-md border border-slate-400/40 bg-slate-200/10 bg-clip-padding px-3 py-2 shadow-md backdrop-blur-3xl backdrop-filter dark:bg-slate-800/5">
      <div className="mb-2 space-y-2">
        <p className="font-bold text-xs">Display</p>
        <Slider
          className="w-[100%]"
          defaultValue={[display]} // Convert to percentage
          icon={<BsFillSunFill />}
          max={100}
          min={0}
          onValueChange={handleDisplayChange}
          step={1}
        />
      </div>
    </div>
  );
}
