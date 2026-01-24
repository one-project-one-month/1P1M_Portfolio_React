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
};

export type PortfolioProjectType = {
  id: number;
  name: string;
  projectPicUrl?: string;
  description: string;
  projectLink: string;
  repoLink: string;
  reaction_count?: number;
  assignedDevs: {
    developers: DeveloperType[];
  };
  view_count?: number;
  reactedProjectPortfolios: number[];
  projectPortfolioDetails: {
    languageAndTools: string[];
  };
};

export type projectSectionViewType = {
  isLoading: boolean;
  projects: PortfolioProjectType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type GetPortfolioParamsType = {
  keyword?: string;
  page?: number;
  sortDirection?: string | null;
  sortField?: string;
  size?: number;
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
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
};

export interface ProjectRequestBody {
  // name: string;
  // description: string;
  // projectLink?: string;
  // repoLink?: string;
  // languageAndTools: string[];
  // developerEmails: string[];
  projectName: string;
  description: string;
  startDate: string;
  completedDate: string;
  status: string;
  technologies: string;
  teams: string;
  projectLink: string;
  image: string;
}
