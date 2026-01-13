import type { Member } from '@/types/member';
import type { NavLink } from '@/types/nav-props';
import { ActivitySquare, ChartColumnIncreasing, ChartGanttIcon, FileText, HardDrive, SquareChartGantt, UserRoundCheck, Users } from 'lucide-react';

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



export const ADMIN_NAVS:NavLink[]=[
  {id:1,name:"Dashboard",path:"dashboard",icon:ChartGanttIcon},
   {id:2,name:"User Management",path:"user-management",icon:Users},
    {id:3,name:"Idea Management",path:"idea-management",icon:FileText},
     {id:4,name:"Portfolio Management",path:"portfolio-management",icon:HardDrive},
      {id:5,name:"User Report",path:"user-report",icon:SquareChartGantt}

]







export const MOCK_SELECTED_MEMBERS: Member[] = [
  {
    id: "1",
    name: "Alex Rivera",
    email: "alex.r@company.com",
    profilePictureUrl: "https://i.pravatar.cc/150?u=1",
  },
  {
    dev_id: 102,
    name: "Sarah Chen",
    email: "sarah.c@company.com",
    profilePictureUrl: "https://i.pravatar.cc/150?u=2",
  },
  {
    userId: "u-99",
    name: "Jordan Smith",
    email: "j.smith@tech.io",
    profilePictureUrl: "https://i.pravatar.cc/150?u=3",
  },
  {
    id: "4",
    name: "Dr. Elizabeth Montgomery-West", // Testing long name truncation
    email: "e.montgomery@university.edu",
    profilePictureUrl: "https://i.pravatar.cc/150?u=4",
  },
  {
    id: "5",
    name: "Marcus Aurelius",
    email: "marcus@rome.gov",
    // Testing fallback image logic (profilePictureUrl is missing)
  },
  {
    id: "6",
    name: "Luna Lovegood",
    email: "luna@hogwarts.edu",
    profilePictureUrl: "https://i.pravatar.cc/150?u=5",
  },
];

export const MOCK_AVAILABLE_DEVS: Member[] = [
  {
    id: "201",
    name: "James Wilson",
    email: "james.w@company.com",
    profilePictureUrl: "https://i.pravatar.cc/150?u=20",
  },
  {
    id: "202",
    name: "Elena Rodriguez",
    email: "elena.r@agency.com",
    profilePictureUrl: "https://i.pravatar.cc/150?u=21",
  },
];