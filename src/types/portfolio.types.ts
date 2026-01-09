export type QueryType = {
  query: string | null;
};

export type PortfolioSectionContainerProps = {
  query: string | null;
  sortDirection: 'asc' | 'desc' | null;
};

export type PortfolioProjectType = {
  id: string;
  name: string;
  description: string;
  projectPicUrl?: string;
  reaction_count?: number;
  view_count?: number;
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
