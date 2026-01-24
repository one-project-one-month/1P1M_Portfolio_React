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

export type ProjectIdeaType = z.infer<typeof projectIdeaSchema>;
export type UpdateProjectIdeaType = z.infer<typeof updateProjectIdeaSchema>;

export type GetProjectIdeaParamsType = {
  keyword?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
};

export type FilterType = {
  status: string;
  search: string;
};

export type ProjectIdeaContainerPropsType = {
  view: 'list' | 'grid';
  filter: FilterType;
  setFilter: (val: FilterType) => void;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onEdit: (isEdit: boolean) => void;
};

export type ProjectIdeaTableType = {
  type: 'list' | 'grid';
  data: ProjectIdeaType[];
  handleEdit: (idea: ProjectIdeaType) => void;
  handleDelete: (id: number) => void;
  handleViewDetail: (id: number) => void;
  handleStatusChange: (status: 'PENDING' | 'APPROVED' | 'ARCHIVED') => void;
};

export type ProjectIdeaHeaderType = {
  filter: FilterType;
  setFilter: (val: FilterType) => void;
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
  onCreate: () => void;
};

// For Idea Creation Form
export interface IdeaCreateFormValues {
  projectName: string;
  description: string;
  projectTypes: string[];
}

export interface IdeaCreateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: IdeaCreateFormValues) => void;
}

export type IdeaEditFormValues = IdeaCreateFormValues & {
  id: number;
  dev_id: number;
  status: 'PENDING' | 'APPROVED' | 'ARCHIVED';
};

export type LeaderRole = 'Backend' | 'Frontend' | 'UI | UX Designer';
export type Step = 0 | 1 | 2;

export type Leader = {
  id: number;
  name: string;
  email: string;
  role: LeaderRole;
  avatarUrl?: string;
};

export interface IdeaEditFormProps extends Omit<
  IdeaCreateFormProps,
  'onSubmit'
> {
  initialValues: IdeaEditFormValues;
  onSubmit?: (value: IdeaEditFormValues) => void;
  availableLeaders?: Leader[];
}

// PLEASE WRITE ONLY API RESPONSE TYPE BELOW
// With axios response
export type ProjectIdeasResponseType = ApiResponseType<ProjectIdeaType[]>;
export type ProjectIdeaByIdResponseType = ApiResponseType<ProjectIdeaType>;
export type ProjectIdeaUpdateResponseType =
  ApiResponseType<UpdateProjectIdeaType>;
