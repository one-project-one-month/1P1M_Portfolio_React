import React from 'react';

type GlassCurveProps = {
  className?: string;
};

const Curve: React.FC<GlassCurveProps> = ({ className }) => {
  return (
    <svg
      width="1440"
      height="400"
      viewBox="0 0 1440 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_f_11174_152701)">
        <path
          d="M1.75391 378.956C1.7539 332.225 20.3772 285.951 56.5606 242.777C92.744 199.602 145.779 160.373 212.637 127.329C279.495 94.2848 358.867 68.0728 446.222 50.1894C533.576 32.306 627.202 23.1016 721.754 23.1016C816.306 23.1016 909.932 32.306 997.286 50.1894C1084.64 68.0728 1164.01 94.2848 1230.87 127.329C1297.73 160.373 1350.76 199.602 1386.95 242.777C1423.13 285.951 1441.75 332.225 1441.75 378.956"
          stroke="#155DFC"
          stroke-width="5"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_11174_152701"
          x="-21.3461"
          y="0.00156212"
          width="1486.2"
          height="399.552"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="10.3"
            result="effect1_foregroundBlur_11174_152701"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Curve;
