import type { SvgProps } from "react-native-svg";
import Svg, { Path } from "react-native-svg";

function DeliveryTruckSVGComponent(props: SvgProps) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none" {...props}>
      <Path
        d="M9.34 11.99V3.993c0-.736-.597-1.333-1.333-1.333H2.673c-.736 0-1.333.597-1.333 1.333v7.33c0 .369.299.667.667.667H3.34M10 12H6M12.671 12h1.333a.667.667 0 00.666-.667V8.898a.668.668 0 00-.146-.416l-2.319-2.901a.666.666 0 00-.52-.251H9.34"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 11.995a1.335 1.335 0 112.67 0 1.335 1.335 0 01-2.67 0zM3.34 11.995a1.335 1.335 0 112.67 0 1.335 1.335 0 01-2.67 0z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default DeliveryTruckSVGComponent;
