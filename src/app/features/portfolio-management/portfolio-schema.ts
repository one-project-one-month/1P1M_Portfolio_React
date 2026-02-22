import { z } from 'zod';

const dropdownItemSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
});

const technologySchema = z.object({
  id: z.number().optional(),
  projectType: z.string(),
  languages: z.string(),
});

const memberSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  email: z.string().optional(),
  avatarUrl: z.string().nullable().optional(),
  role: z.enum(['Team Leader', 'Member']).optional(),
});

const teamSchema = z.object({
  id: z.string(),
  name: z.string(),
  count: z.number(),
  members: z.array(memberSchema),
});

export const portfolioFormSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  startDate: z.string(),
  completedDate: z.string(),
  status: dropdownItemSchema.nullable(),
  technologies: z.array(technologySchema),
  teams: z.array(teamSchema),
  projectLink: z
    .string()
    .min(1, 'Project link is required')
    .url('Invalid URL format')
    .startsWith('https://www.', 'Project link must start with https://www.'),
  repoLink: z
    .string()
    .min(1, 'Repository link is required')
    .url('Invalid URL format')
    .startsWith('https://github.com', 'Repo link must be a GitHub HTTPS link'),
  projectImage: z.string(),
});

export type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;
