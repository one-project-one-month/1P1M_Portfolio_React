import type { ApiResponseType } from '@/types/api-response.type';

export type PaginationType = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export type ProjectIdeaType = {
  id: number;
  dev_id: number;
  projectName: string;
  description: string;
  profilePictureUrl: string;
  devName: string;
  reaction_count: number;
  projectTypes: string[];
  reactedProjects: number[];
  status: 'Pending' | 'Approved' | 'Archived';
};

export interface GetProjectIdeaParams {
  keyword?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export type GetProjectIdeas = ApiResponseType<ProjectIdeaType[]>;

export type ProjectIdeaContainerProps = {
  view: 'list' | 'grid';
  searchQuery?: string;
  selectedFilter?: string;
  page: number;
  size: number;
  onPageChange?: (page: number) => void;
  onTotalChange?: (total: number) => void;
};

export interface IdeaManagementTableProps {
  data: ProjectIdeaType[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleViewDetail: (id: number) => void;
  handleStatusChange: (status: 'Pending' | 'Approved' | 'Archived') => void;
  handleImportPortfolio: (id: number) => void;
}
