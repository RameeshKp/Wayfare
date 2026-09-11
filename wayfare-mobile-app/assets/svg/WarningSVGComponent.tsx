import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function WarningSVGComponent(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M14.66 12L9.18 2.666A1.376 1.376 0 007.99 1.99c-.493 0-.948.258-1.192.676L1.32 12c-.246.414-.245.925.003 1.338.248.414.704.666 1.195.662h10.957c.49 0 .94-.255 1.185-.667.244-.413.244-.92 0-1.333zM8 6v2.67M8 11.33h.01"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default WarningSVGComponent;
