import type { SvgProps } from "react-native-svg";
import Svg, { ClipPath, Defs, G, Path } from "react-native-svg";

function LayersSVGComponent(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <G
        clipPath="url(#clip0_1_356)"
        stroke="#111F2C"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M10.833 11.67a1.603 1.603 0 01-1.667 0L2.082 7.424a.88.88 0 01-.422-.759.88.88 0 01.422-.759L9.166 1.66a1.603 1.603 0 011.667 0l7.084 4.246a.88.88 0 01.423.759.88.88 0 01-.423.759l-7.084 4.246z" />
        <Path d="M16.667 11.9l1.25.73a.87.87 0 01.423.752.87.87 0 01-.423.751l-7.084 4.207a1.616 1.616 0 01-1.667 0l-7.084-4.207a.87.87 0 01-.422-.751.87.87 0 01.422-.752l1.25-.73" />
      </G>

      <Defs>
        <ClipPath id="clip0_1_356">
          <Path fill="#fff" d="M0 0H20V20H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default LayersSVGComponent;
