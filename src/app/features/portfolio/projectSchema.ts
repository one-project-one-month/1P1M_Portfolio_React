import { z } from 'zod';

export const projectSchema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(2, 'Project name is required'),
  description: z.string().min(5, 'Project details are required'),
  repoLink: z.url('Invalid GitHub URL').optional().or(z.literal('')),
  projectLink: z.url('Invalid project URL').optional().or(z.literal('')),
  languageAndTools: z.string().min(2, 'Language and tools are required'),
  developerEmails: z
    .array(z.string())
    .min(2, 'At least 2 members are required'),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
