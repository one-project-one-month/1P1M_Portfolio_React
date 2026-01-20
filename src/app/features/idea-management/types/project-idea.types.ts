import type { ApiResponseType } from '@/types/api-response.type';
import z from 'zod';

export const ProjectIdeaStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  ARCHIVED: 'ARCHIVED',
} as const;

const projectIdeaSchema = z.object({
  id: z.number(),
  dev_id: z.number(),
  projectName: z.string(),
  description: z.string(),
  profilePictureUrl: z.string(),
  reaction_count: z.number(),
  projectTypes: z.array(z.string()),
  status: z.enum([
    ProjectIdeaStatus.PENDING,
    ProjectIdeaStatus.APPROVED,
    ProjectIdeaStatus.ARCHIVED,
  ]),
});

export const updateProjectIdeaSchema = projectIdeaSchema.omit({
  reaction_count: true,
});

export type GetProjectIdeaParamsType = {
  keyword?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
};

export type ProjectIdeaContainerPropsType = {
  view: 'list' | 'grid';
  searchQuery?: string;
  selectedFilter?: string;
  page: number;
  size: number;
  onPageChange?: (page: number) => void;
  onTotalChange?: (total: number) => void;
  totalIdeas: number;
  onEditIdea: () => void;
};

export type ProjectIdeaTableType = {
  type: 'list' | 'grid';
  data: ProjectIdeaType[];
  handleEdit: (id: number) => void;
  handleDelete: (id: number) => void;
  handleViewDetail: (id: number) => void;
  handleStatusChange: (status: 'PENDING' | 'APPROVED' | 'ARCHIVED') => void;
};

export type ProjectIdeaHeaderType = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  viewMode: string;
  setViewMode: (mode: 'list' | 'grid') => void;
  onCreate: () => void;
};

export type ProjectIdeaType = z.infer<typeof projectIdeaSchema>;
export type UpdateProjectIdeaType = z.infer<typeof updateProjectIdeaSchema>;

// With axios response
export type ProjectIdeasResponseType = ApiResponseType<ProjectIdeaType[]>;
export type ProjectIdeaByIdResponseType = ApiResponseType<ProjectIdeaType>;
export type ProjectIdeaUpdateResponseType =
  ApiResponseType<UpdateProjectIdeaType>;

// For Idea Creation Form
export interface IdeaCreateFormValues {
  name: string;
  description: string;
  projectTypes: string[];
}

export interface IdeaCreateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: IdeaCreateFormValues) => void;
}
