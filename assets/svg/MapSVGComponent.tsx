import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function MapSVGComponent(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M10.58 4.049c.422.216.918.216 1.34 0l2.745-1.407a.734.734 0 01.73.034c.221.14.355.388.355.655v9.812a.77.77 0 01-.415.687l-3.415 1.75a1.467 1.467 0 01-1.34 0l-3.16-1.619a1.467 1.467 0 00-1.34 0l-2.745 1.407a.734.734 0 01-.73-.034.773.773 0 01-.355-.656v-9.81a.77.77 0 01.415-.688L6.08 2.43a1.467 1.467 0 011.34 0l3.16 1.619zM11.25 4.32v11.25M6.75 2.43v11.25"
        stroke="#111F2C"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default MapSVGComponent;
