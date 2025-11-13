import { useState } from "react";
import { IoBluetooth } from "react-icons/io5";
import {
  MdWifi,
  MdWifi1Bar,
  MdWifi2Bar,
  MdWifiTethering,
} from "react-icons/md";
import { useNetworkState } from "react-use";

export function ConnectControl() {
  const state = useNetworkState();
  const [wifi, setWifi] = useState(true);
  const [bluetooth, setBluetooth] = useState(false);
  const [airdrop, setAirdrop] = useState(false);

  const handleWifiClick = () => {
    setWifi(!wifi);
  };

  const handleBluetoothClick = () => {
    setBluetooth(!bluetooth);

    if (airdrop) {
      setAirdrop(!airdrop);
    }
  };

  const handleAirdropClick = () => {
    setAirdrop(!airdrop);
  };

  const wifiIcon = () => {
    switch (state.effectiveType) {
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
    <div className="flex w-[50%] flex-col justify-evenly rounded-md border border-slate-400/40 bg-slate-200/10 bg-clip-padding px-3 py-1 shadow-md backdrop-blur-3xl backdrop-filter dark:bg-slate-800/5">
      <div className="flex flex-row space-x-2" onClick={handleWifiClick}>
        <div
          className={`h-7 w-7 ${
            wifi
              ? "bg-apple-blue"
              : "bg-slate-200/30 bg-clip-padding backdrop-blur-3xl backdrop-filter"
          } flex items-center justify-center rounded-full text-white`}
        >
          {wifiIcon()}
        </div>
        <div>
          <p className="font-semibold text-xs">Wi-Fi</p>
          <p className="text-xxs dark:text-slate-200/60">
            {wifi ? "NETGEAR15-5G" : "Not connected"}
          </p>
        </div>
      </div>
      <div className="flex flex-row space-x-2" onClick={handleBluetoothClick}>
        <div
          className={`h-7 w-7 ${
            bluetooth
              ? "bg-apple-blue"
              : "bg-slate-200/30 bg-clip-padding backdrop-blur-3xl backdrop-filter"
          } flex items-center justify-center rounded-full`}
        >
          <IoBluetooth style={{ color: "white" }} />
        </div>
        <div>
          <p className="font-semibold text-xs">Bluetooth</p>
          <p className="text-xxs dark:text-slate-200/60">
            {bluetooth ? "On" : "Off"}
          </p>
        </div>
      </div>
      <div className="flex flex-row space-x-2" onClick={handleAirdropClick}>
        <div
          className={`h-7 w-7 ${
            airdrop
              ? "bg-apple-blue"
              : "bg-slate-200/30 bg-clip-padding backdrop-blur-3xl backdrop-filter"
          } flex items-center justify-center rounded-full`}
        >
          <MdWifiTethering style={{ color: "white" }} />
        </div>
        <div>
          <p className="font-semibold text-xs">Airdrop</p>
          <p className="text-xxs dark:text-slate-200/60">
            {airdrop ? "Contacts only" : "Off"}
          </p>
        </div>
      </div>
    </div>
  );
}
