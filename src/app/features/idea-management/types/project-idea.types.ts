import type { ApiResponseType } from '@/types/api-response.type';
import type { ReactNode } from 'react';
import z from 'zod';

// TYPE VALIDATION WITH ZOD
export const ProjectIdeaStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  ARCHIVED: 'ARCHIVED',
} as const;

const projectIdeaSchema = z.object({
  id: z.number(),
  dev_id: z.number(),
  projectIdeaName: z.string().min(1, 'Project idea name is required'),
  description: z.string().min(1, 'Description is required'),
  profilePictureUrl: z.string(),
  devName: z.string(),
  reaction_count: z.number(),
  projectTypes: z.array(z.string()).min(1, 'Select at least one project type'),
  reactedProjects: z.array(z.number()),
  status: z.enum([
    ProjectIdeaStatus.PENDING,
    ProjectIdeaStatus.APPROVED,
    ProjectIdeaStatus.ARCHIVED,
  ]),
});

export const createProjectIdeaSchema = projectIdeaSchema.pick({
  projectIdeaName: true,
  description: true,
  projectTypes: true,
});

export const editProjectIdeaSchema = projectIdeaSchema.omit({
  id: true,
  reaction_count: true,
});

export const updateProjectIdeaStatusSchema = projectIdeaSchema.pick({
  status: true,
});

export const deleteProjectIdeaSchema = projectIdeaSchema.pick({
  id: true,
});

export type ProjectIdeaType = z.infer<typeof projectIdeaSchema>;
export type CreateProjectIdeaType = z.infer<typeof createProjectIdeaSchema>;
export type EditProjectIdeaType = z.infer<typeof editProjectIdeaSchema>;
export type UpdateProjectIdeaStatusType = z.infer<
  typeof updateProjectIdeaStatusSchema
>;
export type DeleteProjectIdeaType = z.infer<typeof deleteProjectIdeaSchema>;

// ------------------------------------- //

// CUSTOM TYPE VALIDATION
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
  filter?: FilterType;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export type ProjectIdeaDropDownPropsType = {
  type: 'list' | 'grid';
  data: ProjectIdeaType;
};

export type ProjectIdeaHeaderPropsType = {
  filter: FilterType;
  setFilter: (val: FilterType) => void;
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
};

export type ProjectIdeaEditFormPropsType = {
  data: ProjectIdeaType;
  trigger?: ReactNode;
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

export type ProjectIdeasResponseType = ApiResponseType<ProjectIdeaType[]>;
export type ProjectIdeaByIdResponseType = ApiResponseType<ProjectIdeaType>;
export type ProjectIdeaCreateResponseType =
  ApiResponseType<CreateProjectIdeaType>;
export type ProjectIdeaEditResponseType = ApiResponseType<EditProjectIdeaType>;
export type ProjectIdeaStatusUpdateResponseType =
  ApiResponseType<UpdateProjectIdeaStatusType>;
export type ProjectIdeaDeleteResponseType =
  ApiResponseType<DeleteProjectIdeaType>;
