import type { ProjectData } from '@/app/features/portfolio-management/constants/data';

export type QueryType = {
  query: string | null;
};

export type DeveloperType = {
  id: number;
  name: string;
  profilePictureUrl?: string;
  github?: string;
  linkedIn?: string;
  aboutDev?: string;
};

export type PortfolioSectionContainerProps = {
  query: string | null;
  sortDirection: 'asc' | 'desc' | null;
  status?: string;
};

export type PortfolioProjectType = {
  id: number;
  name: string;
  projectPicUrl?: string;
  description: string;
  projectLink: string;
  repoLink: string;
  viewCount?: number;
  reactedCount?: number;
  isAlreadyReacted: boolean;
  projectPortfolioStatus: string;
  teams: {
    members: DeveloperType[];
  }[];
  languageAndTools: string[];
};

export type projectSectionViewType = {
  isLoading: boolean;
  projects: ProjectData[] | null;
  currentPage: number | 1;
  totalPages: number | 0;
  onPageChange: (page: number) => void;
};

export type GetPortfolioParamsType = {
  keyword?: string;
  page?: number;
  sortDirection?: string | null;
  sortField?: string;
  size?: number;
  projectPortfolioStatus?: string;
};

export type ProjectPortfolioDetailType = {
  projectId: string | number;
  isOpen: boolean;
  onClose: () => void;
};

export interface ProjectRequestBody {
  name: string;
  description: string;
  startDate: string;
  completedDate: string;
  status: string;
  languageAndTools: { name: string; type: string }[];
  teamIds: string[];
  projectLink: string;
  repoLink: string;
  image: string;
}

export interface Developer {
  id: number;
  name: string;
  profilePictureUrl: string | null;
  github: string;
  linkedIn: string;
  aboutDev: string;
  roleInTeam: string;
}

export interface AssignedDevs {
  developers: Developer[];
}

export interface ProjectPortfolio {
  id: number;
  name: string;
  projectPicUrl: string;
  description: string;
  projectLink: string;
  repoLink: string;
  reaction_count: number;

  assignedDevs: AssignedDevs;

  reactedProjectPortfolios: unknown[]; // change later if API returns structure
  projectPortfolioDetails: unknown | null;

  status: 'PENDING' | 'APPROVED' | 'REJECTED' | string;

  languageAndTools: string[];

  owner: boolean;
  alreadyReacted: boolean;
}
