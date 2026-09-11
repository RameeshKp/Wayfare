import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";
function BackButtonSVGComponent(props: SvgProps) {
  return (
    <Svg width={9} height={15} viewBox="0 0 9 15" fill="none" {...props}>
      <Path
        d="M7.375 13.375l-6-6 6-6"
        stroke="#111F2C"
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BackButtonSVGComponent;
