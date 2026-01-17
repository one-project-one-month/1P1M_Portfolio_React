import { EllipseColon } from '@/styles/elipse-colon';
import React from 'react';

export type CountdownItem = {
  value: string;
  label: string;
};

type CountdownTimerProps = {
  items: CountdownItem[];
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ items }) => {
  return (
    <div className="flex items-center gap-[19px]">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col w-fit items-center">
            <div className="size-fit p-5 flex items-center justify-center rounded-xl bg-black text-white text-6xl font-semibold border border-[#9C39FC] shadow-[1px_4px_4px_0px_rgba(156,57,252,0.3)]">
              {item.value}
            </div>

            <span className="mt-4 font-[Actor] text-xl h-[32px] text-[#B4BCD0]">
              {item.label}
            </span>
          </div>

          {index !== items.length - 1 && <EllipseColon />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CountdownTimer;
