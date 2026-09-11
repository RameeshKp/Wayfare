import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function TargetSVGComponent(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M1.5 9h2.25M14.25 9h2.25M9 1.5v2.25M9 14.25v2.25M3.75 9a5.25 5.25 0 1110.5 0 5.25 5.25 0 01-10.5 0z"
        stroke="#111F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.75 9a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0z"
        stroke="#111F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default TargetSVGComponent;
