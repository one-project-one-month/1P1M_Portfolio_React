import type { ApiResponseType } from '@/types/api-response.type';
import type { ReactNode } from 'react';
import z from 'zod';

export const UserManagementStatus = {
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

export const editUserSchema = z.object({
  username: z.string(),
  role: z.string(),
  phone: z.string(),
  telegramUsername: z.string(),
  github_url: z.string(),
  linkedIn_url: z.string(),
  description: z.string(),
  status: z.enum(['ACTIVE', 'Banned']),
});

export const userDetailShema = z.object({
  username: z.string(),
  role: z.string(),
  email: z.string(),
});

// export const banUserSchema = userManagementSchema.pick({
//   userId: true,
//   desc: string,
// });

export const banUserSchema = z.object({
  userId: z.number(),
  desc: z.string(),
});

export type GetUserManagementParamsType = {
  // keyword?: string;
  // page?: number;
  // size?: number;
  // status?: string;
  // sortDirection?: 'oldest' | 'newest' | 'popular';
  // sortDirection?: string;

  keyword?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
};

export type FilterType = {
  order: 'asc' | 'desc' | 'popular';
  status: 'ALL' | 'Banned' | 'ACTIVE';
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
export type UserManagementDetailType = z.infer<typeof userDetailShema>;

export type UserManagementResponseType = ApiResponseType<UserManagementType[]>;
export type UserManagementByIdResponseType =
  ApiResponseType<UserManagementType>;
export type UserManagementEditResponseType =
  ApiResponseType<EditUserManagementType>;
export type UserBanResponseType = ApiResponseType<BanUserType>;
export type UserManagementDetailResponseType =
  ApiResponseType<UserManagementDetailType>;
