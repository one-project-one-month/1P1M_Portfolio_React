import { z } from 'zod';

const MAX_FILE_SIZE = 2 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const ProfileSchema = z.object({
  name: z.string().min(2, 'Name is too short'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(5, 'Phone number is required'),
  role: z.string(),
  techStacks: z.array(z.string()).default([]),
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
  socialAccounts: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().min(1, 'Required'),
      }),
    )
    .superRefine((data, ctx) => {
      data.forEach((item, idx) => {
        if (item.platform === 'Telegram') {
          const telegramRegex = /^@?[\w\d_]{5,32}$/;
          if (!telegramRegex.test(item.url)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Invalid Telegram username',
              path: [idx, 'url'],
            });
          }
        } else {
          try {
            new URL(item.url);
          } catch {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Must be a valid URL',
              path: [idx, 'url'],
            });
          }
        }
      });
    }),
  joinedDate: z.string().optional(),
  languagePreference: z.string().optional(),
  passwordLastUpdated: z.string().optional(),
});

export type ProfileFormValues = z.input<typeof ProfileSchema>;
