import { z } from 'zod';

const dropdownItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
});

const technologySchema = z.object({
  projectType: dropdownItemSchema.nullable(),
  languages: z.string(),
});

const memberSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  email: z.string().optional(),
  avatarUrl: z.string().optional(),
  role: z.enum(['Team Leader', 'Member']).optional(),
});

const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  count: z.number(),
  members: z.array(memberSchema),
});

export const projectSchema = z.object({
  image: z.instanceof(File).optional(),
  name: z.string().min(2, 'Project name is required'),
  description: z.string().min(5, 'Project details are required'),
  startDate: z.string().min(1, 'Start date is required'),
  completedDate: z.string(),
  repoLink: z.url('Invalid GitHub URL').optional().or(z.literal('')),
  projectLink: z.url('Invalid project URL').optional().or(z.literal('')),
  // languageAndTools: z.string().min(2, 'Language and tools are required'),
  // developerEmails: z
  //   .array(z.string())
  //   .min(2, 'At least 2 members are required'),
  status: dropdownItemSchema.nullable(),
  technologies: z.array(technologySchema),
  teamIds: z.array(teamSchema),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;
