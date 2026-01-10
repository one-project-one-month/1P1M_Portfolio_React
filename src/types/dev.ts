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

export interface DevProfileCardProps {
  devProfile: DevProfile;
  viewProfile: () => void;
}

export interface FeaturedDevProps {
  error: Error | null;
  loading: boolean;
  profiles: DevProfile[] | null | undefined;
}

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
