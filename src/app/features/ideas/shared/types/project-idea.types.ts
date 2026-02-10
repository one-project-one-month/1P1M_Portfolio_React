import type { ApiResponseType } from '@/types/api-response.type';
import type { ReactNode } from 'react';
import z from 'zod';

export const IdeaStatus = {
  ALL: '',
  REJECTED: 'REJECTED',
  APPROVED: 'APPROVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
  DELETED: 'DELETED',
} as const;

// TYPE VALIDATION WITH ZOD
export const IdeaSchema = z.object({
  projectIdeaId: z.number(),
  projectIdeaName: z.string(),
  status: z.enum([
    IdeaStatus.REJECTED,
    IdeaStatus.APPROVED,
    IdeaStatus.IN_PROGRESS,
    IdeaStatus.COMPLETED,
    IdeaStatus.PENDING,
    IdeaStatus.DELETED,
  ]),
  description: z.string(),
  reactionCount: z.number(),
  viewCount: z.number(),
  dev_id: z.number(),
  devName: z.string().optional(),
  dev_Email: z.email().optional(),
  ownerProfilePicUrl: z.string().optional(),
  leader_id: z.number().optional(),
  leaderName: z.string().optional(),
  leaderEmail: z.email().optional(),
  leaderProfilePicUrl: z.string().optional(),
  projectTypes: z.array(z.string()),
});

export const createIdeaSchema = z.object({
  projectIdeaName: z.string().min(1, 'Project idea name is required'),
  description: z.string().min(1, 'Description is required'),
  projectTypes: z.array(z.string()).min(1, 'Select at least one project type'),
});

export const editIdeaSchema = createIdeaSchema.extend({
  status: z.enum([
    IdeaStatus.REJECTED,
    IdeaStatus.APPROVED,
    IdeaStatus.IN_PROGRESS,
    IdeaStatus.COMPLETED,
    IdeaStatus.PENDING,
    IdeaStatus.DELETED,
  ]),
  dev_id: z.number(),
  devName: z.string().optional(),
  ownerProfilePicUrl: z.string().optional(),
  leader_id: z.number(),
  leaderProfilePicUrl: z.string().optional(),
});

export const IdeaStatusSchema = editIdeaSchema.pick({
  status: true,
});

export const deleteIdeaSchema = IdeaSchema.pick({
  projectIdeaId: true,
});

export const DeveloperSchema = z.object({
  dev_id: z.number().int(),
  email: z.email(),
  name: z.string(),
  profilePictureUrl: z.string().optional(),
  github: z.string(),
  linkedIn: z.string(),
  aboutDev: z.string(),
  tech_stack: z.array(z.string()),
});

export type DeveloperType = z.infer<typeof DeveloperSchema>;
export type IdeaType = z.infer<typeof IdeaSchema>;
export type CreateIdeaType = z.infer<typeof createIdeaSchema>;
export type EditIdeaType = z.infer<typeof editIdeaSchema>;
export type IdeaStatusType = z.infer<typeof IdeaStatusSchema>;
export type DeleteIdeaType = z.infer<typeof deleteIdeaSchema>;

// ------------------------------------- //

// CUSTOM TYPE VALIDATION
export type GetIdeaParamsType = {
  keyword?: string;
  page?: number;
  size?: number;
  status?:
    | ''
    | 'REJECTED'
    | 'APPROVED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DELETED'
    | 'PENDING';
  sortOrder?: 'popular' | 'newest' | 'oldest';
};

export type FilterType = {
  order: 'popular' | 'newest' | 'oldest';
  status:
    | ''
    | 'REJECTED'
    | 'APPROVED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DELETED'
    | 'PENDING';
  search: string;
};

export type IdeaContainerPropsType = {
  view: 'list' | 'grid';
  filter?: FilterType;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export type IdeaDropDownPropsType = {
  type: 'list' | 'grid';
  data: IdeaType;
};

export type IdeaHeaderPropsType = {
  filter: FilterType;
  setFilter: (val: FilterType) => void;
  viewMode: 'list' | 'grid';
  setViewMode: (mode: 'list' | 'grid') => void;
};

export type IdeaEditFormPropsType = {
  data: IdeaType;
  trigger?: ReactNode;
};

// export type LeaderRole = 'Backend' | 'Frontend' | 'UI | UX Designer';
export type Step = 0 | 1 | 2;

export type IdeasResponseType = ApiResponseType<IdeaType[]>;
export type IdeaByIdResponseType = ApiResponseType<IdeaType>;
export type IdeaCreateResponseType = ApiResponseType<CreateIdeaType>;
export type IdeaEditResponseType = ApiResponseType<EditIdeaType>;
export type IdeaStatusUpdateResponseType = ApiResponseType<IdeaStatusType>;
export type IdeaDeleteResponseType = ApiResponseType<DeleteIdeaType>;
