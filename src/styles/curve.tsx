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
          d="M-1958.93 3215.14L3397.29 3215.35C3397.31 2793.18 3328.05 2375.14 3193.48 1985.11C3058.91 1595.07 2861.65 1240.68 2612.98 942.149C2364.3 643.623 2069.08 406.816 1744.16 245.248C1419.25 83.6791 1071 0.513917 719.304 0.500302C367.609 0.486687 19.3553 83.6249 -305.574 245.168C-630.504 406.711 -925.746 643.496 -1174.44 942.003C-1423.14 1240.51 -1620.42 1594.89 -1755.02 1984.92C-1889.63 2374.94 -1958.91 2792.97 -1958.93 3215.14Z"
          fill="black"
          fill-opacity="0.05"
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
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
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
