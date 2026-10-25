import React from "react";

const TeamPageHeading = ({ text }) => {
  return (
    <div
      className="flex items-center mx-auto mt-8 max-w-7xl"
      style={{ width: "90%" }}
    >
      <div className="flex justify-end">
        <svg
          width="75"
          height="75"
          viewBox="0 0 75 75"
          fill="none"
          className="w-4/5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_139:59)">
            <rect x="15" y="7" width="53" height="53" rx="6" fill="#F53D3D" />
          </g>
          <circle cx="41" cy="33" r="14" fill="white" />
          <defs>
            <filter
              id="filter0_d_139:59"
              x="0"
              y="0"
              width="83"
              height="83"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="2"
                operator="erode"
                in="SourceAlpha"
                result="effect1_dropShadow_139:59"
              />
              <feOffset dy="8" />
              <feGaussianBlur stdDeviation="8.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0.9625 0 0 0 0 0.238219 0 0 0 0 0.238219 0 0 0 0.75 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_139:59"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_139:59"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <div
        className="pl-4 text-white font-bold"
        style={{
          fontSize: "2rem",
          textShadow: "3px 3px 3px rgba(255, 255, 255, 0.31)",
        }}
      >
        {text}
      </div>
    </div>
  );
};

export default TeamPageHeading;
