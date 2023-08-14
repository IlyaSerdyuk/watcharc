/* eslint-disable react/jsx-props-no-spreading */
import { forwardRef } from 'react';

function InstagramIcon(
  { ...props }: React.SVGProps<SVGElement>,
  svgRef?: React.LegacyRef<SVGSVGElement>,
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="-15 -15 271 271"
      preserveAspectRatio="xMidYMid"
      stroke="none"
      {...props}
      ref={svgRef}
    >
      <path d="M128 23c34.2 0 38.2.2 51.7.8 12.5.6 19.3 2.7 23.8 4.4 6 2.3 10.2 5.1 14.7 9.6s7.3 8.7 9.6 14.7a70.8 70.8 0 0 1 4.4 23.8c.6 13.5.7 17.5.7 51.7s0 38.2-.7 51.7a70.8 70.8 0 0 1-4.4 23.8c-2.3 6-5.1 10.2-9.6 14.7a39.7 39.7 0 0 1-14.7 9.6 70.8 70.8 0 0 1-23.8 4.4c-13.5.6-17.5.7-51.7.7s-38.2 0-51.7-.7a70.8 70.8 0 0 1-23.8-4.4c-6-2.3-10.2-5.1-14.7-9.6a39.7 39.7 0 0 1-9.6-14.7 70.8 70.8 0 0 1-4.4-23.8c-.6-13.5-.7-17.5-.7-51.7s0-38.2.7-51.7a70.8 70.8 0 0 1 4.4-23.8c2.3-6 5.1-10.2 9.6-14.7s8.7-7.3 14.7-9.6a70.8 70.8 0 0 1 23.8-4.4c13.5-.6 17.5-.7 51.7-.7M128 0a908 908 0 0 0-52.8.8 94 94 0 0 0-31 6 62.7 62.7 0 0 0-22.7 14.7A62.7 62.7 0 0 0 6.7 44.2a94 94 0 0 0-6 31C.2 89 0 93.2 0 128s.1 39.1.8 52.8a94 94 0 0 0 6 31 62.7 62.7 0 0 0 14.7 22.7 62.7 62.7 0 0 0 22.7 14.8 94 94 0 0 0 31 6c13.7.6 18 .7 52.8.7s39.1-.1 52.8-.8a94 94 0 0 0 31-6 62.7 62.7 0 0 0 22.7-14.7 62.7 62.7 0 0 0 14.8-22.7 94 94 0 0 0 6-31c.6-13.7.7-18 .7-52.8a908 908 0 0 0-.8-52.8 94 94 0 0 0-6-31 62.7 62.7 0 0 0-14.7-22.7 62.7 62.7 0 0 0-22.7-14.8 94 94 0 0 0-31-6A908 908 0 0 0 128 0Zm0 62.3a65.7 65.7 0 1 0 0 131.4 65.7 65.7 0 0 0 0-131.4Zm0 108.4a42.7 42.7 0 1 1 0-85.4 42.7 42.7 0 0 1 0 85.4Zm83.7-111a15.4 15.4 0 1 1-30.7 0 15.4 15.4 0 0 1 30.7 0Z" />
    </svg>
  );
}

export default forwardRef(InstagramIcon);
