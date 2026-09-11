import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function SwapVerticalSVGComponent(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M15.75 12l-3 3-3-3M12.75 15V3M2.25 6l3-3 3 3M5.25 3v12"
        stroke="#111F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default SwapVerticalSVGComponent;
