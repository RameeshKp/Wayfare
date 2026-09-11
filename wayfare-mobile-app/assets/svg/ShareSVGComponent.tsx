import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function ShareSVGComponent(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M10 9.33l3.33-3.335L10 2.66"
        stroke="#111F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.67 13.33V8.665A2.666 2.666 0 015.337 6h8.003"
        stroke="#111F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default ShareSVGComponent;
