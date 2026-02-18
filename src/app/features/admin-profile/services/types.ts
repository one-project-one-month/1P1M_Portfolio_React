import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ProfileSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  role: z.string(),
  avatarUrl: z.string().optional(),
  avatarFile: z
    .any()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `Max image size is 2MB.`,
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    )
    .optional(),
  techStacks: z.array(z.string()).default([]),
  socialAccounts: z.array(
    z
      .object({
        platform: z.string(),
        url: z.string().min(1, 'Required'),
      })
      .refine(
        (data) => {
          if (data.platform === 'Telegram') {
            const telegramRegex = /^@?[\w\d_]{5,32}$/;
            return telegramRegex.test(data.url);
          }
          try {
            new URL(data.url);
            return true;
          } catch {
            return false;
          }
        },
        {
          message: 'Must be a valid URL (or @username for Telegram)',
          path: ['url'],
        },
      ),
  ),
  joinedDate: z.string().optional(),
  languagePreference: z.string().optional(),
  passwordLastUpdated: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;
