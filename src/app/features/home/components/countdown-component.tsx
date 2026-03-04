import { EllipseColon } from '@/styles/elipse-colon';
import React, { useEffect, useRef } from 'react';

export type CountdownItem = {
  value: string;
  label: string;
};

type CountdownTimerProps = {
  items: CountdownItem[];
  deadline: Date | string;
  onTimeEnd?: () => void;
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  items,
  deadline,
  onTimeEnd,
}) => {
  const endtime = typeof deadline === 'string' ? new Date(deadline) : deadline;

  const dayRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: number;

    const updateClock = () => {
      const total = endtime.getTime() - Date.now();

      if (total <= 0) {
        clearInterval(interval);

        if (dayRef.current) dayRef.current.textContent = '00';
        if (hourRef.current) hourRef.current.textContent = '00';
        if (minRef.current) minRef.current.textContent = '00';
        if (secRef.current) secRef.current.textContent = '00';

        onTimeEnd?.();
        return;
      }

      const days = String(Math.floor(total / (1000 * 60 * 60 * 24))).padStart(
        2,
        '0',
      );
      const hours = String(
        Math.floor((total / (1000 * 60 * 60)) % 24),
      ).padStart(2, '0');
      const minutes = String(Math.floor((total / 1000 / 60) % 60)).padStart(
        2,
        '0',
      );
      const seconds = String(Math.floor((total / 1000) % 60)).padStart(2, '0');

      if (dayRef.current) dayRef.current.textContent = days;
      if (hourRef.current) hourRef.current.textContent = hours;
      if (minRef.current) minRef.current.textContent = minutes;
      if (secRef.current) secRef.current.textContent = seconds;
    };

    updateClock();
    interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, [deadline, onTimeEnd]);

  const getRef = (label: string) => {
    switch (label) {
      case 'Days':
        return dayRef;
      case 'Hours':
        return hourRef;
      case 'Minutes':
        return minRef;
      case 'Seconds':
        return secRef;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-start gap-1 sm:gap-2 lg:gap-4.75">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col w-fit items-center">
            <div
              ref={getRef(item.label)}
              className="size-fit backdrop-blur-[3px] p-1.5 sm:p-2.5 lg:p-5 flex items-center justify-center rounded-lg lg:rounded-xl bg-transparent text-white text-2xl sm:text-3xl lg:text-6xl font-semibold border-2 lg:border-3 border-[#9C39FC] shadow-[1px_2px_3px_0px_rgba(156,57,252,0.8)] lg:shadow-[3px_4px_5px_0px_rgba(156,57,252,1)]"
            >
              00
            </div>
            <span className="mt-4 font-[Actor] text-sm lg:text-xl h-8 text-[#B4BCD0]">
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
