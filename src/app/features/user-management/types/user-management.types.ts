import type { ApiResponseType } from '@/types/api-response.type';
import type { ReactNode } from 'react';
import z from 'zod';

export const UserManagementStatus = {
  ALL: 'ALL',
  BANNED: 'Banned',
  ACTIVE: 'ACTIVE',
} as const;

export const userManagementSchema = z.object({
  userId: z.number(),
  devId: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  profilePictureUrl: z.string(),
  aboutDev: z.string(),
  telegramUsername: z.string(),
  githubUrl: z.string(),
  linkedUrl: z.string(),
  description: z.string(),
  status: z.enum([UserManagementStatus.ACTIVE, UserManagementStatus.BANNED]),
});

// export const editUserSchema = userManagementSchema.omit({
//   userId: true,
//   email: true,
// });

export const userProfileSchema = z.object({
  userId: z.number(),
  email: z.string(),
  name: z.string(),
  profilePictureUrl: z.string().nullable(),
  telegramUsername: z.string().nullable(),
  passwordLastUpdated: z.string(),
  joinedDate: z.string(),
  phone: z.string().nullable(),
  github: z.string(),
  telegramUsername: z.string(),
  linkedIn: z.string(),
  aboutDev: z.string(),
  techStacks: z.array(z.string()),
  dev_id: z.number(),
});

export const editUserSchema = z.object({
  username: z.string(),
  role: z.string(),
  phone: z.string(),
  telegramUsername: z.string(),
  github_url: z.string(),
  linkedIn_url: z.string(),
  description: z.string(),
  status: z.enum([UserManagementStatus.ACTIVE, UserManagementStatus.BANNED]),
});

export const userDetailShema = z.object({
  username: z.string(),
  role: z.string(),
  email: z.string(),
});

export const projectIdeaSchema = z.object({
  projectIdeaId: z.number(),
  projectIdeaName: z.string(),
  status: z.enum([
    'REJECTED',
    'APPROVED',
    'IN_PROGRESS',
    'COMPLETED',
    'DELETED',
    'PENDING',
  ]),
  // projectName: z.string(),
  // description: z.string(),
  // devUsername: z.string(),
  // reactionCount: z.number(),
  // viewCount: z.number(),
  // dev_id: z.number(),
  // dev_Email: z.string().nullable(),
  // ownerProfilePicUrl: z.string().nullable().optional(),
  // leader_id: z.number(),
  // leaderProfilePicUrl: z.string().nullable(),
  // projectTypes: z.array(z.string()),
  // isAlreadyReacted: z.boolean(),

  description: z.string(),
  reactionCount: z.number(),
  viewCount: z.number(),
  dev_id: z.number(),
  devUsername: z.string(),
  projectName: z.string(),

  ownerProfilePicUrl: z.string().optional(),
  leader_id: z.number().optional(),
  leaderEmail: z.email().optional(),
  leaderProfilePicUrl: z.string().optional(),
  projectTypes: z.array(z.string()),
  dev_Email: z.string().nullable(),
  isAlreadyReacted: z.boolean(),
});

export const assignedDeveloperSchema = z.object({
  id: z.number(),
  name: z.string(),
  profilePictureUrl: z.string().nullable(),
  github: z.string(),
  linkedIn: z.string(),
  aboutDev: z.string(),
  roleInTeam: z.string(),
});

export const projectPortfolioSchema = z.object({
  id: z.number(),
  name: z.string(),
  projectPicUrl: z.string(),
  description: z.string(),
  projectLink: z.string(),
  repoLink: z.string(),
  reaction_count: z.number(),
  assignedDevs: z.object({
    developers: z.array(assignedDeveloperSchema),
  }),
  reactedProjectPortfolios: z.array(z.number()),
  projectPortfolioDetails: z.any().nullable(),
  languageAndTools: z.array(z.string()),
  owner: z.boolean(),
});

export const userProfileResponseSchema = z.object({
  devProfile: userProfileSchema,
  projectIdeas: z.array(projectIdeaSchema),
  projectPortfolios: z.array(projectPortfolioSchema),
});

export const banUserSchema = z.object({
  userId: z.number(),
  desc: z.string(),
});

export const restoreUserSchema = z.object({
  userId: z.number(),
});
export type UserManagementStatusType =
  (typeof UserManagementStatus)[keyof typeof UserManagementStatus];
export type GetUserManagementParamsType = {
  // keyword?: string;
  // page?: number;
  // size?: number;
  // status?: string;
  // sortDirection?: 'oldest' | 'newest' | 'popular';
  // sortDirection?: string;

  keyword?: string;
  status?: UserManagementStatusType;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
};

export type FilterType = {
  order: 'asc' | 'desc' | 'popular';
  status: UserManagementStatusType;
  search?: string;
};

export type UserManagementHeaderType = {
  filter: FilterType;
  setFilter: (val: FilterType) => void;
};

export type UserManagementContainerPropsType = {
  filter?: FilterType;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export type UserManagementEditFormPropsType = {
  trigger?: ReactNode;
  data: UserManagementType;
};

export type UserManagementType = z.infer<typeof userManagementSchema>;
export type EditUserManagementType = z.infer<typeof editUserSchema>;
export type BanUserType = z.infer<typeof banUserSchema>;
export type RestoreUserType = z.infer<typeof restoreUserSchema>;
export type UserManagementDetailType = z.infer<typeof userDetailShema>;
export type UserProfileType = z.infer<typeof userProfileSchema>;
export type ProjectIdeaType = z.infer<typeof projectIdeaSchema>;
export type AssignedDeveloperType = z.infer<typeof assignedDeveloperSchema>;
export type ProjectPortfolioType = z.infer<typeof projectPortfolioSchema>;
export type UserProfileResponseType = z.infer<typeof userProfileResponseSchema>;

export type UserManagementResponseType = ApiResponseType<UserManagementType[]>;
export type UserManagementByIdResponseType =
  ApiResponseType<UserManagementType>;
export type UserManagementEditResponseType =
  ApiResponseType<EditUserManagementType>;
export type UserBanResponseType = ApiResponseType<BanUserType>;
export type UserRestoreResponseType = ApiResponseType<RestoreUserType>;
export type UserManagementDetailResponseType =
  ApiResponseType<UserManagementDetailType>;
export type UserProfileDetailResponseType =
  ApiResponseType<UserProfileResponseType>;
