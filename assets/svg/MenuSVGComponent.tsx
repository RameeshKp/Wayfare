import Svg, { Path } from 'react-native-svg';

import type { SvgProps } from 'react-native-svg';

export function MenuSVGComponent(props: SvgProps) {
  return (
    <Svg fill="none" height={28} viewBox="0 0 28 28" width={28} {...props}>
      <Path
        d="M3.5 22.17a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
      />
      <Path
        d="M10.5 22.16h9.917a4.083 4.083 0 1 0 0-8.165H7.583a4.083 4.083 0 1 1 0-8.165H17.5"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
      />
      <Path
        d="M17.5 5.83a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0Z"
        stroke="#FFFFFF"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
      />
    </Svg>
  );
}
