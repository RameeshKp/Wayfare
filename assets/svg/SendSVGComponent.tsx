import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

function SendSVGComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <G clipPath="url(#clip0_1_437)">
        <Path
          d="M2.5 9.168L18.33 1.67 10.832 17.5l-1.667-6.665L2.5 9.168z"
          stroke="#fff"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_437">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default SendSVGComponent;
