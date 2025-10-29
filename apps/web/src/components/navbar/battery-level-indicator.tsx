import { useTheme } from "next-themes";

type BatteryLevelIndicatorProps = {
  batteryLevel: number;
};

function mapBatteryStateToRange(batteryState: number) {
  if (batteryState < 0 || batteryState > 1) {
    throw new Error("Battery state must be between 0 and 1");
  }

  const newMin = 0;
  const newMax = 19;

  const scaledValue = batteryState * (newMax - newMin) + newMin;

  return scaledValue;
}

export default function BatteryLevelIndicator({
  batteryLevel,
}: BatteryLevelIndicatorProps) {
  const { resolvedTheme } = useTheme();
  const batteryWidth = mapBatteryStateToRange(batteryLevel).toFixed(0);

  const fillColor =
    resolvedTheme === "dark" ? "rgba(226, 232, 240, 1)" : "#090909";

  return (
    <svg
      className="ml-2"
      fill="none"
      height="13"
      viewBox="0 0 26 13"
      width="26"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Battery level at {Math.round(batteryLevel * 100)}%</title>
      <g clipPath="url(#clip0_208_1555)">
        <path
          clipRule="evenodd"
          d="M0 3.5C0 1.84315 1.34315 0.5 3 0.5H20C21.6569 0.5 23 1.84315 23 3.5V9.5C23 11.1569 21.6569 12.5 20 12.5H3C1.34315 12.5 0 11.1569 0 9.5V3.5ZM1 3.5C1 2.39543 1.89543 1.5 3 1.5H20C21.1046 1.5 22 2.39543 22 3.5V9.5C22 10.6046 21.1046 11.5 20 11.5H3C1.89543 11.5 1 10.6046 1 9.5V3.5ZM25.5 6.5C25.5 7.61042 24.8967 8.57994 24 9.09865V3.90135C24.8967 4.42006 25.5 5.38958 25.5 6.5Z"
          fill={fillColor}
          fillRule="evenodd"
        />
        <rect
          fill={batteryLevel < 0.11 ? "rgba(255, 78, 78, 0.92)" : fillColor}
          height="8"
          rx="1"
          width={batteryWidth}
          x="2"
          y="2.5"
        />
      </g>
      <defs>
        <clipPath id="clip0_208_1555">
          <rect
            fill={fillColor}
            height="12"
            transform="translate(0 0.5)"
            width="25.5"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
