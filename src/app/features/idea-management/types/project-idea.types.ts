import type { ApiResponseType } from '@/types/api-response.type';
import type { ReactNode } from 'react';
import z from 'zod';

export const ProjectIdeaStatus = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  ARCHIVED: 'ARCHIVED',
} as const;

// TYPE VALIDATION WITH ZOD
export const projectIdeaSchema = z.object({
  projectIdeaId: z.number(),
  projectIdeaName: z.string(),
  status: z.enum([
    ProjectIdeaStatus.PENDING,
    ProjectIdeaStatus.APPROVED,
    ProjectIdeaStatus.ARCHIVED,
  ]),
  description: z.string(),
  reactionCount: z.number(),
  viewCount: z.number(),
  dev_id: z.number(),
  devName: z.string().optional(),
  ownerProfilePicUrl: z.string().optional(),
  leader_id: z.number(),
  leaderProfilePicUrl: z.string().optional(),
  projectTypes: z.array(z.string()),
});

export const createProjectIdeaSchema = z.object({
  projectIdeaName: z.string().min(1, 'Project idea name is required'),
  description: z.string().min(1, 'Description is required'),
  projectTypes: z.array(z.string()).min(1, 'Select at least one project type'),
});

export const editProjectIdeaSchema = createProjectIdeaSchema.extend({
  status: z.enum([
    ProjectIdeaStatus.PENDING,
    ProjectIdeaStatus.APPROVED,
    ProjectIdeaStatus.ARCHIVED,
  ]),
  dev_id: z.number(),
  devName: z.string().optional(),
  ownerProfilePicUrl: z.string().optional(),
  leader_id: z.number(),
  leaderProfilePicUrl: z.string().optional(),
});

export const updateProjectIdeaStatusSchema = editProjectIdeaSchema.pick({
  status: true,
});

export const deleteProjectIdeaSchema = projectIdeaSchema.pick({
  projectIdeaId: true,
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
  order: string;
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
