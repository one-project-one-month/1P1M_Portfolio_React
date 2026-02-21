export type Developer = {
  id: number;
  name: string;
  profilePictureUrl: string | null;
  github: string | null;
  linkedIn: string | null;
  telegramUsername: string | null;
  phone: string | null;
  aboutDev: string | null;
  roleInTeam: string;
};

export type Team = {
  id: number;
  teamName: string;
  description: string | null;
  imageUrl: string | null;
  members: Developer[];
};

export type LanguageTool = {
  id: number;
  name: string;
  type: 'Frontend' | 'Backend' | string;
};
export type ProjectPortfolioStatus =
  | 'PENDING'
  | 'PLANNING'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UNQUALIFIED';

export type statusChangeDataProps = {
  name: ProjectPortfolioStatus;
  description: string;
  label: string;
};

export type ProjectPortfolio = {
  id: number;
  name: string;
  projectPicUrl: string;
  description: string;
  projectLink: string;
  repoLink: string;
  viewCount: number;
  reactedCount: number;
  teams: Team[];
  languageAndTools: LanguageTool[];
  projectPortfolioStatus: ProjectPortfolioStatus;
  isAlreadyReacted: boolean;
};

export type ApiResponse<T> = {
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
  data: T[];
};
// Edit project
export type EditProjectPortfolioDto = {
  id: number;
  name?: string;
  description?: string;
  projectLink?: string;
  repoLink?: string;
  projectPicUrl?: string;
  languageAndTools?: LanguageTool[];
};

// Delete project
export type DeleteProjectPortfolioDto = {
  id: number;
};

// Change status
export type ChangeStatusDto = {
  id: number;
  status: ProjectPortfolioStatus;
};

export type ProjectPortfolioResponse = ApiResponse<ProjectPortfolio>;
