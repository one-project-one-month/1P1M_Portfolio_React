import type { ApiResponseType } from '@/types/api-response.type';
import z from 'zod';
import { IdeaSchema } from '../../ideas/shared/types/project-idea.types';

export const devProfileSchema = z.object({
  userId: z.number(),
  email: z.email(),
  name: z.string(),
  profilePictureUrl: z.string(),
  phone: z.string().optional(),
  github: z.string(),
  linkedIn: z.string(),
  aboutDev: z.string(),
  techStacks: z.array(z.string()),
  dev_id: z.number(),
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

export const projectIdeaSchema = IdeaSchema;

export const userProfileSchema = z.object({
  devProfile: devProfileSchema,
  projectIdeas: z.array(IdeaSchema),
  projectPortfolios: z.array(projectPortfolioSchema),
});

export const editUserProfileSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  profilePictureUrl: z.string().optional(),
  phone: z.string().optional().optional(),
  github: z.string().optional(),
  linkedIn: z.string().optional(),
  aboutDev: z.string().optional(),
  techStacks: z.array(z.string()).optional(),
  dev_id: z.number(),
  telegramUsername: z.string().optional(),
});

export type DevProfileType = z.infer<typeof devProfileSchema>;
export type ProjectIdeaType = z.infer<typeof projectIdeaSchema>;
export type UserProfileType = z.infer<typeof userProfileSchema>;
export type UserProfileResponseType = ApiResponseType<UserProfileType>;
export type EditUserProfileType = z.infer<typeof editUserProfileSchema>;
export type UserProfileEditResponseType = ApiResponseType<EditUserProfileType>;
