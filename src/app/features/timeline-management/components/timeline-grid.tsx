import type { TimelineProps } from '@/app/features/timeline-management/services/types.ts';
import React from 'react';

const TimelineGrid: React.FC<TimelineProps> = () => {
  const data = [];

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg">No timelines found</p>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
  );
};

export default TimelineGrid;
