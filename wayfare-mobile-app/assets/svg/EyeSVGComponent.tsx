import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

export function EyeSVGComponent(props: SvgProps) {
  return (
    <Svg fill="none" height={18} viewBox="0 0 18 18" width={18} {...props}>
      <Path
        d="M1.5 9.261a.746.746 0 0 1 0-.522A8.113 8.113 0 0 1 9 3.75a8.113 8.113 0 0 1 7.5 4.989.746.746 0 0 1 0 .522A8.113 8.113 0 0 1 9 14.25a8.113 8.113 0 0 1-7.5-4.989Z"
        stroke="#7C8B99"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
      />
      <Path
        d="M6.75 9a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Z"
        stroke="#7C8B99"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
      />
    </Svg>
  );
}
