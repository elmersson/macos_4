import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export function ControlCentre() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button type="button">control centre</button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-[6px] w-[340px] space-y-2 rounded-xl p-3">
        <div className="flex flex-row space-x-2">
          <p>connect control</p>
          <div className="flex w-[50%] flex-col space-y-2">
            <p>Theme Switcher</p>
            <p>StageAndScreen</p>
          </div>
        </div>
        <p>Display</p>
        <p>Sound</p>
        <p>Music</p>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
