import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function CloseSVGComponent(props: SvgProps) {
  return (
    <Svg width={14} height={14} viewBox="0 0 14 14" fill="none" {...props}>
      <Path
        d="M10.5 3.5l-7 7M3.5 3.5l7 7"
        stroke="#7C8B99"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CloseSVGComponent;
