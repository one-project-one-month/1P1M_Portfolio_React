import ProjectImage from '@/assets/ProjectImage.png';
import UserImage from '@/assets/sample-user-img.jpg';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Unqualified';

export interface Member {
  id: string | number;
  name: string;
  avatarUrl?: string;
}

export interface ProjectData {
  id: number;
  image: string;
  leader: string;
  title: string;
  members: Member[];
  status: ProjectStatus;
  startDate: string;
  completedDate: string | null;
}

export const PORTFOLIO_MANAGEMENT_DATA: ProjectData[] = [
  {
    id: 1,
    image: ProjectImage,
    leader: 'Ko Aung Kyaw Thu Ya',
    title: 'AI-Powered Career Path Predictor',
    members: [
      { id: 1, name: 'Ko Aung', avatarUrl: UserImage },
      { id: 2, name: 'Ma Khin', avatarUrl: UserImage },
      { id: 3, name: 'Ko Zaw', avatarUrl: UserImage },
      { id: 4, name: 'Ma Phyo', avatarUrl: UserImage },
      { id: 5, name: 'Ko Htet', avatarUrl: UserImage },
    ],
    status: 'Completed',
    startDate: 'Nov 15, 2025',
    completedDate: 'Dec 15, 2025',
  },
  {
    id: 2,
    image: ProjectImage,
    leader: 'Ma Khin Khin Myint',
    title: 'Smart E-Learning System with Sentiment Analysis',
    members: [
      { id: 1, name: 'Ma Yati', avatarUrl: UserImage },
      { id: 2, name: 'Ko Min', avatarUrl: UserImage },
      { id: 3, name: 'Ma Cho', avatarUrl: UserImage },
    ],
    status: 'In Progress',
    startDate: 'Dec 10, 2025',
    completedDate: null,
  },
  {
    id: 3,
    image: ProjectImage,
    leader: 'Ko Aung Myint Myat',
    title: 'Automated Web-Based Resume Parser & Ranker',
    members: [
      { id: 1, name: 'Ko Kyaw', avatarUrl: UserImage },
      { id: 2, name: 'Ma Thin', avatarUrl: UserImage },
      { id: 3, name: 'Ko Naing', avatarUrl: UserImage },
      { id: 4, name: 'Ma Aye', avatarUrl: UserImage },
      { id: 5, name: 'Ko Myo', avatarUrl: UserImage },
      { id: 6, name: 'Ma Su', avatarUrl: UserImage },
      { id: 7, name: 'Ko Htun', avatarUrl: UserImage },
    ],
    status: 'Unqualified',
    startDate: 'Jan 4, 2025',
    completedDate: null,
  },
  {
    id: 4,
    image: ProjectImage,
    leader: 'Ma Ohmar Phyo',
    title: 'Real-time Fraud Detection in E-Commerce Transactions',
    members: [
      { id: 1, name: 'Ko Thant', avatarUrl: UserImage },
      { id: 2, name: 'Ma Ni', avatarUrl: UserImage },
      { id: 3, name: 'Ko Win', avatarUrl: UserImage },
      { id: 4, name: 'Ma Ei', avatarUrl: UserImage },
      { id: 5, name: 'Ko Zin', avatarUrl: UserImage },
    ],
    status: 'In Progress',
    startDate: 'Feb 9, 2025',
    completedDate: null,
  },
  {
    id: 5,
    image: ProjectImage,
    leader: 'Ma Yati Maung',
    title: 'Decentralized Academic Credential Verification System',
    members: [
      { id: 1, name: 'Ko Chan', avatarUrl: UserImage },
      { id: 2, name: 'Ma May', avatarUrl: UserImage },
      { id: 3, name: 'Ko Lwin', avatarUrl: UserImage },
      { id: 4, name: 'Ma Moe', avatarUrl: UserImage },
      { id: 5, name: 'Ko Tun', avatarUrl: UserImage },
      { id: 6, name: 'Ma Nwe', avatarUrl: UserImage },
    ],
    status: 'Unqualified',
    startDate: 'Mar 28, 2025',
    completedDate: null,
  },
  {
    id: 6,
    image: ProjectImage,
    leader: 'Ko Naing Htet Wai',
    title: 'Secure E-Voting System using Transparent Blockchain',
    members: [
      { id: 1, name: 'Ko Soe', avatarUrl: UserImage },
      { id: 2, name: 'Ma Hnin', avatarUrl: UserImage },
      { id: 3, name: 'Ko Aung', avatarUrl: UserImage },
      { id: 4, name: 'Ma Wai', avatarUrl: UserImage },
      { id: 5, name: 'Ko Ye', avatarUrl: UserImage },
      { id: 6, name: 'Ma Kyi', avatarUrl: UserImage },
    ],
    status: 'Completed',
    startDate: 'Apr 20, 2025',
    completedDate: 'May 20, 2025',
  },
  {
    id: 7,
    image: ProjectImage,
    leader: 'Ko Kyaw Maung Maung Thwin',
    title: 'Web-Based Personal Health Record (PHR) Management with Encryption',
    members: [
      { id: 1, name: 'Ko Hla', avatarUrl: UserImage },
      { id: 2, name: 'Ma Nu', avatarUrl: UserImage },
      { id: 3, name: 'Ko Lin', avatarUrl: UserImage },
      { id: 4, name: 'Ma Yi', avatarUrl: UserImage },
      { id: 5, name: 'Ko Myat', avatarUrl: UserImage },
    ],
    status: 'In Progress',
    startDate: 'May 3, 2025',
    completedDate: null,
  },
  {
    id: 8,
    image: ProjectImage,
    leader: 'Ma Cho Thazin Kyaw',
    title: 'Phishing Website Detection using URL Feature Analysis',
    members: [
      { id: 1, name: 'Ko Zaw', avatarUrl: UserImage },
      { id: 2, name: 'Ma Khin', avatarUrl: UserImage },
      { id: 3, name: 'Ko Min', avatarUrl: UserImage },
      { id: 4, name: 'Ma Phyo', avatarUrl: UserImage },
      { id: 5, name: 'Ko Htet', avatarUrl: UserImage },
      { id: 6, name: 'Ma Yati', avatarUrl: UserImage },
      { id: 7, name: 'Ko Naing', avatarUrl: UserImage },
    ],
    status: 'In Progress',
    startDate: 'Jun 5, 2025',
    completedDate: null,
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
