import { EllipseColon } from '@/styles/elipse-colon';
import React, { useEffect, useRef } from 'react';

export type CountdownItem = {
  value: string;
  label: string;
};

type CountdownTimerProps = {
  items: CountdownItem[];
};

const CountdownTimer: React.FC<CountdownTimerProps> = ({ items }) => {
  const endtime = new Date('December 31, 2026 23:59:59');

  const dayRef = useRef<HTMLDivElement>(null);
  const hourRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);
  const secRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateClock = () => {
      const total = endtime.getTime() - Date.now();

      if (total < 0) {
        clearInterval(interval);
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
    const interval = setInterval(updateClock, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRef = (value: string) => {
    switch (value) {
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
    <div className="flex items-center gap-4.75">
      {items.map((item, index) => (
        <React.Fragment key={item.label}>
          <div className="flex flex-col w-fit items-center">
            <div
              ref={getRef(item.label)}
              style={{
                boxShadow: '3px 4px 5px 0px rgba(156, 57, 252, 1)',
                border:
                  '3px solid var(--PrimaryColor-brandcolor-500, rgba(156, 57, 252, 1))',
              }}
              className="size-fit p-5 flex items-center justify-center rounded-xl bg-transparent text-white text-6xl font-semibold border border-[#9C39FC] shadow-[1px_4px_4px_0px_rgba(156,57,252,0.3)]"
            >
              00
            </div>
            <span className="mt-4 font-[Actor] text-xl h-8 text-[#B4BCD0]">
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
