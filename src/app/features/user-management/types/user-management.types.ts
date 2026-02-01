import type { ApiResponseType } from '@/types/api-response.type';
import z from 'zod';

export const UserManagementStatus = {
  BANNED: 'BANNED',
  ACTIVE: 'ACTIVE',
} as const;

export const userManagementSchema = z.object({
  userId: z.number(),
  name: z.string(),
  email: z.string(),
  role: z.string(),
  telegramUsername: z.string(),
  githubUrl: z.string(),
  linkedUrl: z.string(),
  status: z
    .enum([UserManagementStatus.ACTIVE, UserManagementStatus.BANNED])
    .nullable(),
});

export const editUserManagementShema = z.object({
  username: z.string(),
  email: z.string(),
  role: z.string(),
  phone: z.string().optional(),
  telegramUsername: z.string().optional(),
  gitHub_url: z.string().optional(),
  linkedIn_url: z.string().optional(),
});

export const deleteUserManagementSchema = userManagementSchema.pick({
  userId: true,
});

export type GetUserManagementParamsType = {
  keyword: string | undefined;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
};
export type UserManagementType = z.infer<typeof userManagementSchema>;

export type UserManagementContainePropsType = {
  // view: 'list' | 'grid';
  searchQuery?: string;
  selectedFilter?: string;
  sortedField?: string;
  page: number;
  size: number;
  onPageChange?: (page: number) => void;
  onTotalChange?: (total: number) => void;
  totalUser: number;
};

export type UserManagementTableType = {
  userId: number;
  status?: any;
  type?: 'list' | 'grid';
  data?: UserManagementType[];

  handleEdit: (id: number) => void;
  handleViewDetail: (id: number) => void;
  handleBanned: (id: number) => void;
  handleRestore: (id: number) => void;
};

export type UserManagementHeaderType = {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
};

export type DeleteUserManagementType = z.infer<
  typeof deleteUserManagementSchema
>;

export type UserManagementResponseType = ApiResponseType<UserManagementType[]>;
export type UserManagementByIdResponseType =
  ApiResponseType<UserManagementType>;
export type EditUserManagementType = z.infer<typeof editUserManagementShema>;
export type DeleteUserManagementResponseType =
  ApiResponseType<DeleteUserManagementType>;
