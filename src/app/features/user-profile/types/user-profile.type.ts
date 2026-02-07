import type { ApiResponseType } from '@/types/api-response.type';
import z from 'zod';
import { projectIdeaSchema } from '../../idea-management/types/project-idea.types';

// export const Role = {
//   ADMIN: 'ADMIN',
//   USER: 'USER',
// } as const;

export const devProfileSchema = z.object({
  userId: z.number(),
  email: z.string(),
  name: z.string(),
  profilePictureUrl: z.string(),
  github: z.string(),
  linkedIn: z.string(),
  aboutDev: z.string(),
  techStacks: z.array(z.string()),
  dev_id: z.number(),
  phone: z.string().optional(),
  telegramUsername: z.string().optional(),
});

const memberSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  profilePictureUrl: z.string(),
  github: z.string().optional(),
  linkedIn: z.string().optional(),
  telegramUsername: z.string().optional(),
  phone: z.string().optional(),
  aboutDev: z.string().optional(),
});

const teamSchema = z.object({
  id: z.number(),
  teamName: z.string(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  members: z.array(memberSchema),
});

export const projectPortfolioSchema = z.object({
  id: z.number(),
  name: z.string(),
  projectPicUrl: z.string().optional(),
  description: z.string().optional(),
  projectLink: z.string().optional(),
  repoLink: z.string().optional(),
  viewCount: z.number(),
  reactedCount: z.number(),

  teams: z.array(teamSchema),
  projectTypes: z.array(z.string()),
});

const projectIdeaInProfileSchema = projectIdeaSchema
  .omit({ id: true })
  .extend({ projectIdeaId: z.number() });

export const userProfileSchema = z.object({
  devProfile: devProfileSchema,
  projectIdeas: z.array(projectIdeaInProfileSchema),
  projectPortfolios: z.array(projectPortfolioSchema),
});

export const editUserProfileSchema = devProfileSchema.omit({
  userId: true,
  email: true,
});

export type DevProfileType = z.infer<typeof devProfileSchema>;
export type ProjectIdeaType = z.infer<typeof projectIdeaInProfileSchema>;
export type UserProfileType = z.infer<typeof userProfileSchema>;
export type UserProfileResponseType = ApiResponseType<UserProfileType>;

export type EditUserProfileType = z.infer<typeof editUserProfileSchema>;
export type UserProfileEditResponseType = ApiResponseType<EditUserProfileType>;
