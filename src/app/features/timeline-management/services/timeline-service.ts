import apiClient from '@/api/axios.ts';
import type {
  StatusOption,
  Timeline,
} from '@/app/features/timeline-management/services/types.ts';
import { API_ENDPOINTS } from '@/config/api.ts';

const BASE_URL = API_ENDPOINTS.TIMELINES;

export const timelineService = {
  // GET : All Timelines
  getAllTimelines: async (p: {
    searchTerm: string;
    selectedStatus: StatusOption | undefined;
    curPage: number;
  }): Promise<Timeline[]> => {
    const response = await apiClient.get<Timeline[]>(BASE_URL);
    return response.data;
  },

  // GET : Timelines By ID
  getTimelineById: async (id: string): Promise<Timeline[]> => {
    const response = await apiClient.get<Timeline[]>(`${BASE_URL}/${id}`);
    return response.data;
  },

  // POST : Create Timeline
  createTimeline: async (data: Omit<Timeline, 'id'>): Promise<Timeline> => {
    const response = await apiClient.post<Timeline>(BASE_URL, data);
    return response.data;
  },

  // PUT : Update Timeline
  updateTimeline: async (
    id: string,
    data: Partial<Timeline>,
  ): Promise<Timeline> => {
    const response = await apiClient.put<Timeline>(`${BASE_URL}/${id}`, data);
    return response.data;
  },

  // DELETE : Delete Timeline
  deleteTimeline: async (id: string): Promise<void> => {
    await apiClient.delete(`${BASE_URL}/${id}`);
  },
};
