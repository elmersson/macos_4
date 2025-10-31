import { useEffect, useState } from "react";

type TimeHook = Date;
type Interval = number | undefined;

const DEFAULT_INTERVAL = 1000;

const useTime = (interval?: Interval): TimeHook => {
  const [time, setTime] = useState<TimeHook>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, interval || DEFAULT_INTERVAL);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  return time;
};

export default useTime;
