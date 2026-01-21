import React from 'react';

type GlassCurveProps = {
  className?: string;
};

const Curve: React.FC<GlassCurveProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 1440 356"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      preserveAspectRatio="none"
    >
      <path
        d="M0 356 C200 0 1240 0 1440 356"
        stroke="#155DFC"
        strokeWidth="5"
        filter="url(#glow)"
      />

      <defs>
        <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
    </svg>
  );
};

export default Curve;
