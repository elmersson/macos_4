import { useState } from "react";
import { FaLink } from "react-icons/fa6";
import { IoBatteryHalf, IoCellularSharp, IoLockClosed } from "react-icons/io5";
import { MdWifi, MdWifi1Bar, MdWifi2Bar } from "react-icons/md";
import { useNetworkState } from "react-use";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Switch } from "../ui/switch";

export const otherNetworks = [
  "Pretty Fly For a Wifi",
  "Wu-Tang LAN",
  "I am watching you",
  "Drop it like it's a Hotspot",
  "Dunder Mifflin",
  "Routers of Rohan",
  "Never Gonna Give You Wifi",
  "Yer A Wifi Harry",
  "The Ping of the North",
  "404 Network Unavailable",
];

export function Wifi() {
  const { effectiveType, online } = useNetworkState();
  const [activeNetwork, setActiveNetwork] = useState(otherNetworks[0]);
  const [wifi, setWifi] = useState(true);

  const wifiIcon = () => {
    switch (effectiveType) {
      case "4g":
        return <MdWifi />;
      case "3g":
        return <MdWifi2Bar />;
      case "2g":
        return <MdWifi1Bar />;
      case "slow-2g":
        return <MdWifi1Bar />;
      default:
        return <MdWifi />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center rounded-md px-2.5 py-1"
          type="button"
        >
          {wifiIcon()}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-[6px] w-[270px]">
        <DropdownMenuLabel className="flex flex-row items-center justify-between pb-0 text-white">
          <p>Wifi</p>
          <Switch checked={wifi} onCheckedChange={(bol) => setWifi(bol)} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <p className="ml-2 font-bold text-slate-300 text-sm">
          Personal Hotspot
        </p>
        <DropdownMenuItem className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200/30 bg-clip-padding backdrop-blur-3xl backdrop-filter">
              <FaLink style={{ color: "white" }} />
            </div>
            <p>Rasmus - Iphone</p>
          </div>
          <div className="flex flex-row items-center justify-center space-x-1">
            <IoCellularSharp />
            <p className="text-xs">5G</p>
            <IoBatteryHalf />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <p className="ml-2 font-bold text-slate-300 text-sm">Known Networks</p>
        <DropdownMenuItem className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200/30 bg-clip-padding backdrop-blur-3xl backdrop-filter">
              <MdWifi style={{ color: "white" }} />
            </div>
            <p>NETGEAR15</p>
          </div>
          <div className="flex flex-row items-center justify-center space-x-1">
            <IoLockClosed />
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex flex-row items-center justify-between"
          onClick={() => setWifi(!wifi)}
        >
          <div className="flex flex-row items-center justify-center space-x-2">
            <div
              className={`h-7 w-7 ${
                wifi
                  ? "bg-apple-blue"
                  : "bg-slate-200/30 bg-clip-padding backdrop-blur-3xl backdrop-filter"
              } flex items-center justify-center rounded-full text-white`}
            >
              {wifiIcon()}
            </div>
            <p>NETGEAR15-5G </p>
          </div>
          <div className="flex flex-row items-center justify-center space-x-1">
            <IoLockClosed />
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Accordion className="mx-2" collapsible type="single">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-bold text-slate-300 text-sm">
              Other Networks
            </AccordionTrigger>
            <AccordionContent className="space-y-2">
              {otherNetworks.map((wifiName) => (
                <div
                  className="flex flex-row items-center justify-between"
                  key={wifiName}
                >
                  <div className="flex flex-row items-center justify-center space-x-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200/30 bg-clip-padding backdrop-blur-3xl backdrop-filter">
                      <MdWifi style={{ color: "white" }} />
                    </div>
                    <p>{wifiName}</p>
                  </div>
                  <div className="flex flex-row items-center justify-center space-x-1">
                    <IoLockClosed />
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <p className="text-sm text-white">Wifi Settings...</p>
        </DropdownMenuItem>
      </DropdownMenuContent>{" "}
    </DropdownMenu>
  );
}
