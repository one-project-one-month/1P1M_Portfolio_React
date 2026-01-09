export type DevProfile = {
  dev_id: number;
  email: string;
  name: string;
  profilePictureUrl: string;
  github: string;
  linkedIn: string;
  aboutDev: string;
  techStack: [string];
};

export type GetDevProfiles = {
  success: number;
  code: number;
  message: string;
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    method: string;
    endpoint: string;
  };
  data: DevProfile[];
};

export interface GetDevProfilesParams {
  keyword?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}
