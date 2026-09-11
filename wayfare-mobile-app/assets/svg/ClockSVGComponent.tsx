import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

function ClockSVGComponent(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <G
        clipPath="url(#clip0_1_166)"
        stroke="#111F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M1.5 9a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z" />
        <Path d="M9 4.5V9l3 1.5" />
      </G>

      <Defs>
        <ClipPath id="clip0_1_166">
          <Path fill="#fff" d="M0 0H18V18H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ClockSVGComponent;
