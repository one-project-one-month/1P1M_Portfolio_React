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
  reactedCount?: number;
  projectPortfolioStatus: string;
  teams: {
    members: DeveloperType[];
  }[];
  view_count?: number;
  reactedProjectPortfolios: number[];
  languageAndTools: string[];
};

export type projectSectionViewType = {
  isLoading: boolean;
  projects: PortfolioProjectType[] | null;
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

export type ProjectCardType = {
  image: string;
  title: string;
  description: string;
  initialLikes?: number;
  initialViews?: number;
  onClickReact: () => void;
  project: PortfolioProjectType;
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
