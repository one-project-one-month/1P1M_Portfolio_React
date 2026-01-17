import sampleUserImg from '@/assets/sample-user-img.jpg';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Unqualified';

export interface ProjectData {
  id: number;
  image: string;
  leader: string;
  title: string;
  members: number;
  status: ProjectStatus;
  startDate: string;
  completedDate: string | null;
}

export const PORTFOLIO_MANAGEMENT_DATA: ProjectData[] = [
  {
    id: 1,
    image: sampleUserImg,
    leader: 'Ko Aung Kyaw Thu Ya',
    title: 'AI-Powered Career Path Predictor',
    members: 5,
    status: 'Completed',
    startDate: 'Nov 15, 2025',
    completedDate: 'Dec 15, 2025',
  },
  {
    id: 2,
    image: sampleUserImg,
    leader: 'Ma Khin Khin Myint',
    title: 'Smart E-Learning System with Sentiment Analysis',
    members: 3,
    status: 'In Progress',
    startDate: 'Dec 10, 2025',
    completedDate: null,
  },
  {
    id: 3,
    image: sampleUserImg,
    leader: 'Ko Aung Myint Myat',
    title: 'Automated Web-Based Resume Parser & Ranker',
    members: 7,
    status: 'Unqualified',
    startDate: 'Jan 4, 2025',
    completedDate: null,
  },
  {
    id: 4,
    image: sampleUserImg,
    leader: 'Ma Ohmar Phyo',
    title: 'Real-time Fraud Detection in E-Commerce Transactions',
    members: 5,
    status: 'In Progress',
    startDate: 'Feb 9, 2025',
    completedDate: null,
  },
  {
    id: 5,
    image: sampleUserImg,
    leader: 'Ma Yati Maung',
    title: 'Decentralized Academic Credential Verification System',
    members: 6,
    status: 'Unqualified',
    startDate: 'Mar 28, 2025',
    completedDate: null,
  },
  {
    id: 6,
    image: sampleUserImg,
    leader: 'Ko Naing Htet Wai',
    title: 'Secure E-Voting System using Transparent Blockchain',
    members: 6,
    status: 'Completed',
    startDate: 'Apr 20, 2025',
    completedDate: 'May 20, 2025',
  },
  {
    id: 7,
    image: sampleUserImg,
    leader: 'Ko Kyaw Maung Maung Thwin',
    title: 'Web-Based Personal Health Record (PHR) Management with Encryption',
    members: 5,
    status: 'In Progress',
    startDate: 'May 3, 2025',
    completedDate: null,
  },
  {
    id: 8,
    image: sampleUserImg,
    leader: 'Ma Cho Thazin Kyaw',
    title: 'Phishing Website Detection using URL Feature Analysis',
    members: 7,
    status: 'In Progress',
    startDate: 'Jun 5, 2025',
    completedDate: null,
  },
];
