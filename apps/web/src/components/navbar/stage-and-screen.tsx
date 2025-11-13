import { IoApps } from "react-icons/io5";
import { TbBoxMultiple } from "react-icons/tb";

export function StageAndScreen() {
  return (
    <div className="flex flex-row space-x-2">
      <div className="flex w-[100%] flex-col items-center justify-center rounded-md border border-slate-400/40 bg-slate-200/10 bg-clip-padding px-3 py-1 shadow-md backdrop-blur-3xl backdrop-filter dark:bg-slate-800/5">
        <div className="flex items-center justify-center py-1 dark:text-slate-200/40">
          <IoApps style={{ fontSize: "24px" }} />
        </div>
        <div>
          <p className="text-center text-xs">Stage Manager</p>
        </div>
      </div>
      <div className="flex w-[100%] flex-col items-center justify-center rounded-md border border-slate-400/40 bg-slate-200/10 bg-clip-padding px-3 py-1 shadow-md backdrop-blur-3xl backdrop-filter dark:bg-slate-800/5">
        <div className="darktext-slate-200/40 flex items-center justify-center py-1">
          <TbBoxMultiple style={{ fontSize: "24px" }} />
        </div>
        <div>
          <p className="text-center text-xs">Screen Mirroring</p>
        </div>
      </div>
    </div>
  );
}
