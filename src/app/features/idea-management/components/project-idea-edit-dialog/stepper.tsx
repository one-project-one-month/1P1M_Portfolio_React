import { Check } from 'lucide-react';
import type { Step } from './index';

export default function Stepper({ step }: { step: Step }) {
  const steps = [
    { num: '01', label: 'Information' },
    { num: '02', label: 'Project leader' },
    { num: '03', label: 'Change Status' },
  ];

  return (
    <div className="w-full">
      {/* ROW 1: circle + connecting lines */}
      <div className="flex items-center justify-center">
        {steps.map((s, idx) => {
          const isActive = idx === step;
          const isDone = idx < step;

          return (
            <div key={s.num} className="flex items-center">
              {/* left line */}
              {idx !== 0 && (
                <div
                  className={`h-[2px] w-24 ${
                    idx <= step ? 'bg-[#A855F7]' : 'bg-[#374151]'
                  }`}
                />
              )}

              {/* circle */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs ${
                  isActive || isDone
                    ? 'border-[#A855F7] text-white'
                    : 'border-[#374151] text-[#9CA3AF]'
                }`}
              >
                {isDone ? <Check className="h-4 w-4" /> : s.num}
              </div>
            </div>
          );
        })}
      </div>

      {/* ROW 2: labels */}
      <div className="mt-2 flex items-center justify-center">
        {steps.map((s, idx) => {
          const isActive = idx === step;

          return (
            <div
              key={s.num}
              className="w-32 text-center" // <-- spacing width for each label
            >
              <span
                className={`${isActive ? 'text-white' : 'text-[#6B7280]'} text-xs`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
