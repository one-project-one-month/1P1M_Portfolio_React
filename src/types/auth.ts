import z from 'zod';

export const userRoleSchema = z.enum(['USER', 'ADMIN']);
export type UserRole = z.infer<typeof userRoleSchema>;

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
const opomRegisterSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Inavlid email address'),
  phone: z.string().regex(/^[\d\s]+$/, 'Phone must be numbers only'),
  phoneCode: z.string().min(1, 'Phone code is required'),
  teleUserName: z.string().min(1, 'Telegram username is required'),
  role: z.string().min(1, 'Role is required'),
  platformLinks: z.array(
    z.object({
      type: z.string().optional(),
      url: z.string().url('Invalid URL').optional(),
    }),
  ),
});

export default opomRegisterSchema;
