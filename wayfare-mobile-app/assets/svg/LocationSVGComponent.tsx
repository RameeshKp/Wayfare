import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function LocationSVGComponent(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M13.34 6.726c0 3.362-3.694 6.863-4.934 7.944a.662.662 0 01-.802 0c-1.24-1.081-4.934-4.582-4.934-7.944 0-2.975 2.388-5.386 5.335-5.386 2.946 0 5.335 2.411 5.335 5.386z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6 6.67a2 2 0 114 0 2 2 0 01-4 0z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default LocationSVGComponent;
