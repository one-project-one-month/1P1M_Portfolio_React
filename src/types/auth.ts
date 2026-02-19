import z from 'zod';

export const userRoleSchema = z.enum(['USER', 'ADMIN', '']);
export type UserRole = z.infer<typeof userRoleSchema>;

export interface LoginResponse {
  userId: number | undefined;
  username: string | undefined;
  email: string | undefined;
  profilePictureUrl: string | null | undefined;
  roleId: number;
  role: 'ADMIN' | 'USER' | null;
  isNewUserLogin: boolean;
}

export const sessionSchema = z.object({
  user: z.object({
    email: z.email(),
    id: z.number(),
    isNewUserLogin: z.boolean(),
    role: userRoleSchema,
    roleId: z.number(),
    username: z.string(),
  }),
  token: z.string(),
});

export type Session = z.infer<typeof sessionSchema>;
