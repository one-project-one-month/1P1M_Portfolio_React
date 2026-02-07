import type { ApiResponseType } from '@/types/api-response.type';
import type { ReactNode } from 'react';
import z from 'zod';

export const UserManagementStatus = {
  BANNED: 'BANNED',
  ACTIVE: 'ACTIVE',
} as const;

export const userManagementSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  role: z.string(),
  profilePictureUrl: z.string(),
  telegramUsername: z.string(),
  githubUrl: z.string(),
  linkedInUrl: z.string(),
  description: z.string(),
  status: z.enum([UserManagementStatus.ACTIVE, UserManagementStatus.BANNED]),
});

export const editUserSchema = userManagementSchema.omit({
  id: true,
  email: true,
});

export const banUserSchema = userManagementSchema.pick({
  id: true,
});

export type GetUserManagementParamsType = {
  keyword?: string;
  page?: number;
  size?: number;
  status?: string;
  sortDirection?: 'oldest' | 'newest' | 'popular';
};

export type FilterType = {
  order: 'asc' | 'desc' | 'popular';
  status: 'ALL' | 'BANNED' | 'ACTIVE';
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

export type UserManagementResponseType = ApiResponseType<UserManagementType[]>;
export type UserManagementByIdResponseType =
  ApiResponseType<UserManagementType>;
export type UserManagementEditResponseType =
  ApiResponseType<EditUserManagementType>;
export type UserBanResponseType = ApiResponseType<BanUserType>;
