import type { AdminNavLink, NavLink } from '@/types/nav-props';
import {
  CalendarClock,
  ChartGanttIcon,
  FileText,
  FileUser,
  HardDrive,
  SquareChartGantt,
  User,
  Users,
} from 'lucide-react';

export const Platforms = [
  { id: 1, name: 'GitHub', value: 'github' },
  { id: 2, name: 'LinkedIn', value: 'linkedin' },
  { id: 3, name: 'Behance', value: 'behance' },
  { id: 4, name: 'Google', value: 'google' },
  { id: 5, name: 'Facebook', value: 'facebook' },
];

export const TechStacks = [
  { id: 1, name: 'Backend' },
  { id: 2, name: 'Frontend' },
  { id: 3, name: 'UXUI' },
  { id: 4, name: 'QAQC' },
  { id: 5, name: 'Full Stack' },
  { id: 6, name: 'DevOps' },
];

export const socials: NavLink[] = [
  { name: 'Facebook', path: 'javascript:void(0)', id: 1 },
  { name: 'LinkedIn', path: 'javascript:void(0)', id: 2 },
  { name: 'Github', path: 'https://github.com/one-project-one-month', id: 3 },
  { name: 'Instagram', path: 'javascript:void(0)', id: 4 },
];

export const ADMIN_NAVS: AdminNavLink[] = [
  { id: 1, name: 'Dashboard', path: 'dashboard', icon: ChartGanttIcon },
  { id: 2, name: 'User Management', path: 'user-management', icon: Users },
  {
    id: 3,
    name: 'OPOM Registered Users',
    path: 'opom-registered-people-list',
    icon: FileUser,
  },
  { id: 4, name: 'Idea Management', path: 'idea-management', icon: FileText },
  {
    id: 5,
    name: 'Portfolio Management',
    path: 'portfolio-management',
    icon: HardDrive,
  },
  {
    id: 6,
    name: 'Timeline Management',
    path: 'timeline-management',
    icon: CalendarClock,
  },
  { id: 7, name: 'User Report', path: 'user-report', icon: SquareChartGantt },
  { id: 8, name: 'Profile', path: 'admin-profile', icon: User },
];

export const PROJECT_TYPE_OPTIONS = ['mobile', 'website', 'desktop', 'game'];

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
