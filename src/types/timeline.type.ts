import type { ApiResponse } from './common';

export type Timeline = {
  countStartFrom: number;
  creatorName: string;
  description: string | null;
  endDate: string;
  id: number;
  name: string;
  startDate: string;
  timeLineStatus: 'FINISHED' | string;
};

export type TimelineResponse = ApiResponse<Timeline>;
