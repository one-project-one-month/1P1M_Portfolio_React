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
  socialAccounts: z.array(
    z.object({
      platform: z.string(),
      url: z.string().url('Must be a valid URL'),
    }),
  ),
  joinedDate: z.string().optional(),
  languagePreference: z.string().optional(),
  passwordLastUpdated: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileSchema>;

export const MOCK_USER_DATA: ProfileFormValues = {
  firstName: 'Thura',
  lastName: 'Aung',
  email: 'aungthurapm@email.com',
  phoneNumber: '+95-998475225',
  role: 'Admin',
  avatarUrl: 'https://i.pravatar.cc/300',
  socialAccounts: [
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/thura' },
    { platform: 'GitHub', url: 'https://github.com/thura' },
    { platform: 'Telegram', url: 'https://t.me/thura77' },
  ],
  joinedDate: 'October 19, 2025',
  languagePreference: 'English',
  passwordLastUpdated: 'December 23, 2025',
};
