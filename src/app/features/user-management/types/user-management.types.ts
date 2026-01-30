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
  telegramUsername: z.string(),
  githubUrl: z.string(),
  linkedUrl: z.string(),
  status: z.enum([UserManagementStatus.ACTIVE, UserManagementStatus.BANNED]),
});

export const editUserManagementShema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
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
  status?: any;
  type?: 'list' | 'grid';
  data?: any;

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
export type UserManagementType = z.infer<typeof userManagementSchema>;

export type UserManagementResponseType = ApiResponseType<UserManagementType[]>;
export type UserManagementByIdResponseType =
  ApiResponseType<UserManagementType>;
export type EditUserManagementType = z.infer<typeof editUserManagementShema>;
export type DeleteUserManagementResponseType =
  ApiResponseType<DeleteUserManagementType>;
