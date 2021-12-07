import * as React from 'react';

const SvgComponent = (props) => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19 14-7 7m0 0-7-7m7 7V3"
    />
  </svg>
);

export default SvgComponent;
