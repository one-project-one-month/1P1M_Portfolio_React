import React from 'react';

type GlassCurveProps = {
  className?: string;
};

const Curve: React.FC<GlassCurveProps> = ({ className }) => {
  return (
    <svg
      width="1440"
      height="3137"
      viewBox="0 0 1440 3137"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g filter="url(#filter0_i_11578_26922)">
        <path
          d="M1.75391 378.956C1.7539 332.225 20.3772 285.951 56.5606 242.777C92.744 199.602 145.779 160.373 212.637 127.329C279.495 94.2848 358.867 68.0728 446.222 50.1894C533.576 32.306 627.202 23.1016 721.754 23.1016C816.306 23.1016 909.932 32.306 997.286 50.1894C1084.64 68.0728 1164.01 94.2848 1230.87 127.329C1297.73 160.373 1350.76 199.602 1386.95 242.777C1423.13 285.951 1441.75 332.225 1441.75 378.956"
          stroke="#155DFC"
          strokeWidth="5"
        />
      </g>
      <path
        d="M719.304 0.250302C1071.04 0.263919 1419.32 83.4385 1744.27 245.023C2069.22 406.608 2364.47 643.439 2613.17 941.99C2861.86 1240.54 3059.13 1594.96 3193.71 1985.03C3328.3 2375.09 3397.56 2793.15 3397.54 3215.35L3397.54 3215.6L-1959.18 3215.39L-1959.18 3215.14C-1959.16 2792.94 -1889.87 2374.89 -1755.26 1984.84C-1620.65 1594.78 -1423.35 1240.37 -1174.64 941.843C-925.917 643.312 -630.648 406.504 -305.685 244.944C19.2776 83.3842 367.57 0.236686 719.304 0.250302Z"
        stroke="#BD7AFD"
        stroke-width="0.5"
      />
      <defs>
        <filter
          id="filter0_i_11578_26922"
          x="-1959.43"
          y="0"
          width="5357.22"
          height="3226.84"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="11" />
          <feGaussianBlur stdDeviation="32" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.992157 0 0 0 0 0.564706 0 0 0 0 1 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_11578_26922"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Curve;
