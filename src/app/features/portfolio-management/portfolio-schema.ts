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

export const portfolioFormSchema = z.object({
  projectName: z.string().min(1, 'Project name is required'),
  description: z.string(),
  startDate: z.string().min(1, 'Start date is required'),
  completedDate: z.string(),
  status: dropdownItemSchema.nullable(),
  technologies: z.array(technologySchema),
  teams: z.array(teamSchema),
  projectLink: z.string(),
  projectImage: z.string(),
});

export type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;
