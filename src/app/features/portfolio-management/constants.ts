import ProjectImage from '@/assets/ProjectImage.png';
import type { ProjectStatus } from '@/types/portfolio-management';

export const MOCK_PROJECTS = [
  {
    id: '1',
    image: ProjectImage,
    title: 'Customizable Workout & Progress Log',
    teamLeader: 'Ko Aung',
    members: [
      { id: '1', name: 'Member 1', avatarUrl: UserImage },
      { id: '2', name: 'Member 2', avatarUrl: UserImage },
      { id: '3', name: 'Member 3', avatarUrl: UserImage },
      { id: '4', name: 'Member 4', avatarUrl: UserImage },
      { id: '5', name: 'Member 5', avatarUrl: UserImage },
      { id: '6', name: 'Member 6', avatarUrl: UserImage },
    ],
    status: 'Completed' as ProjectStatus,
  },
  {
    id: '2',
    image: ProjectImage,
    title: 'Personalized Meditation & Mindfulness Tracker',
    teamLeader: 'Ko Aung',
    members: [
      { id: '1', name: 'Member 1', avatarUrl: UserImage },
      { id: '2', name: 'Member 2', avatarUrl: UserImage },
      { id: '3', name: 'Member 3', avatarUrl: UserImage },
      { id: '4', name: 'Member 4', avatarUrl: UserImage },
    ],
    status: 'In-Progress' as ProjectStatus,
  },
  {
    id: '3',
    image: ProjectImage,
    title: 'Dynamic Meal Planner & Grocery List Generator',
    teamLeader: 'Ko Aung',
    members: [
      { id: '1', name: 'Member 1' },
      { id: '2', name: 'Member 2' },
      { id: '3', name: 'Member 3' },
      { id: '4', name: 'Member 4' },
      { id: '5', name: 'Member 5' },
    ],
    status: 'Unqualified' as ProjectStatus,
  },
  {
    id: '4',
    image: ProjectImage,
    title: 'Gamified Habit',
    teamLeader: 'Ko Aung',
    members: [
      { id: '1', name: 'Member 1', avatarUrl: UserImage },
      { id: '2', name: 'Member 2', avatarUrl: UserImage },
      { id: '3', name: 'Member 3', avatarUrl: UserImage },
      { id: '4', name: 'Member 4', avatarUrl: UserImage },
      { id: '5', name: 'Member 5', avatarUrl: UserImage },
      { id: '6', name: 'Member 6', avatarUrl: UserImage },
    ],
    status: 'In-Progress' as ProjectStatus,
  },
  {
    id: '5',
    image: ProjectImage,
    title: 'Peer-to-Peer Learning & Skill Exchange',
    teamLeader: 'Ko Aung',
    members: [
      { id: '1', name: 'Member 1', avatarUrl: UserImage },
      { id: '2', name: 'Member 2', avatarUrl: UserImage },
      { id: '3', name: 'Member 3', avatarUrl: UserImage },
      { id: '4', name: 'Member 4', avatarUrl: UserImage },
      { id: '5', name: 'Member 5', avatarUrl: UserImage },
    ],
    status: 'In-Progress' as ProjectStatus,
  },
  {
    id: '6',
    image: ProjectImage,
    title: 'Customizable Workout & Progress Log',
    teamLeader: 'Ko Aung',
    members: [
      { id: '1', name: 'Member 1', avatarUrl: UserImage },
      { id: '2', name: 'Member 2', avatarUrl: UserImage },
      { id: '3', name: 'Member 3', avatarUrl: UserImage },
      { id: '4', name: 'Member 4', avatarUrl: UserImage },
      { id: '5', name: 'Member 5', avatarUrl: UserImage },
      { id: '6', name: 'Member 6', avatarUrl: UserImage },
    ],
    status: 'Completed' as ProjectStatus,
  },
  {
    id: '7',
    image: ProjectImage,
    title: 'Customizable Workout & Progress Log',
    teamLeader: 'Ko Aung',
    members: [
      { id: '1', name: 'Member 1', avatarUrl: UserImage },
      { id: '2', name: 'Member 2', avatarUrl: UserImage },
      { id: '3', name: 'Member 3', avatarUrl: UserImage },
      { id: '4', name: 'Member 4', avatarUrl: UserImage },
      { id: '5', name: 'Member 5', avatarUrl: UserImage },
      { id: '6', name: 'Member 6', avatarUrl: UserImage },
    ],
    status: 'Completed' as ProjectStatus,
  },
  {
    id: '8',
    image: ProjectImage,
    title: 'Customizable Workout & Progress Log',
    teamLeader: 'Ko Aung',
    members: [
      { id: '1', name: 'Member 1', avatarUrl: UserImage },
      { id: '2', name: 'Member 2', avatarUrl: UserImage },
      { id: '3', name: 'Member 3', avatarUrl: UserImage },
      { id: '4', name: 'Member 4', avatarUrl: UserImage },
      { id: '5', name: 'Member 5', avatarUrl: UserImage },
      { id: '6', name: 'Member 6', avatarUrl: UserImage },
    ],
    status: 'Completed' as ProjectStatus,
  },
];

export const statusOptions = [
  { id: 1, name: 'Completed' },
  { id: 2, name: 'In Progress' },
  { id: 3, name: 'Unqualified' },
];

export const teamTypes = [
  'Frontend Developers',
  'Backend Developers',
  'Fullstack Developers',
  'UI/UX Designers',
];

import UserImage from '@/assets/user.png';

export const MOCK_USERS = [
  { id: '1', name: 'Bora', email: 'Bora@gmail.com', avatarUrl: UserImage },
  { id: '2', name: 'Thura', email: 'Thura@gmail.com', avatarUrl: UserImage },
  { id: '3', name: 'Min', email: 'Min@gmail.com', avatarUrl: UserImage },
  { id: '4', name: 'Kyaw', email: 'Kyaw@gmail.com', avatarUrl: UserImage },
  { id: '5', name: 'Su', email: 'Su@gmail.com', avatarUrl: UserImage },
  { id: '6', name: 'Su', email: 'Su@gmail.com', avatarUrl: UserImage },
  { id: '7', name: 'Su', email: 'Su@gmail.com', avatarUrl: UserImage },
  { id: '8', name: 'Su', email: 'Su@gmail.com', avatarUrl: UserImage },
];
