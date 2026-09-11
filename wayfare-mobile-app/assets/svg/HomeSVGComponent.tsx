import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function HomeSVGComponent(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M11.25 15.75v-6A.75.75 0 0010.5 9h-3a.75.75 0 00-.75.75v6"
        stroke="#111F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.25 7.29c0-.453.194-.883.532-1.175L8.032 1.5a1.472 1.472 0 011.936 0l5.25 4.615c.338.292.532.722.532 1.175v6.922c0 .85-.672 1.538-1.5 1.538H3.75c-.828 0-1.5-.689-1.5-1.538V7.29z"
        stroke="#111F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default HomeSVGComponent;
