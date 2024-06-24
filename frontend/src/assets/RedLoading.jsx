import React from "react";

const RedLoading = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
    width="50"
    height="50"
    style={{
      shapeRendering: "auto",
      display: "block",
      background: "rgb(255, 255, 255)",
    }}
  >
    <g>
      <path
        strokeWidth="12"
        stroke="#FF0000"
        fill="none"
        d="M50 15A35 35 0 1 0 74.74873734152916 25.251262658470843"
      ></path>
      <path fill="#FF0000" d="M49 3L49 27L61 15L49 3"></path>
      <animateTransform
        keyTimes="0;1"
        values="0 50 50;360 50 50"
        dur="1s"
        repeatCount="indefinite"
        type="rotate"
        attributeName="transform"
      ></animateTransform>
    </g>
  </svg>
);

export default RedLoading;
