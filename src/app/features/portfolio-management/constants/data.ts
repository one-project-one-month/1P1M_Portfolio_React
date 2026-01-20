import ProjectImage from '@/assets/ProjectImage.png';
import UserImage from '@/assets/sample-user-img.jpg';

export type ProjectStatus = 'Completed' | 'In Progress' | 'Unqualified';

export interface Member {
  id: string | number;
  name: string;
  email?: string;
  avatarUrl?: string;
  role?: 'Team Leader' | 'Member';
}

export interface TeamData {
  id: string;
  name: string;
  count: number;
  members: Member[];
}

// Attachment interface removed as it's no longer used

export interface ProjectType {
  id: number;
  name: string;
}

export interface ProjectData {
  id: number;
  image: string;
  projectName: string;
  leader: string;
  title: string;
  description: string;
  members: Member[];
  status: ProjectStatus;
  startDate: string;
  completedDate: string | null;
  technologies: {
    projectType: ProjectType;
    languages: string;
  }[];
  teams: TeamData[];
  projectLink?: string; // Simplified to just a URL string
}

// Project Types available in the form
export const PROJECT_TYPES: ProjectType[] = [
  { id: 1, name: 'Frontend Developers' },
  { id: 2, name: 'Backend Developers' },
  { id: 3, name: 'Fullstack Developers' },
  { id: 4, name: 'UI/UX Designers' },
  { id: 5, name: 'Mobile Developers' },
  { id: 6, name: 'Machine Learning' },
  { id: 7, name: 'DevOps' },
  { id: 8, name: 'Game Developer' },
  { id: 9, name: 'Others' },
];

export const PORTFOLIO_MANAGEMENT_DATA: ProjectData[] = [
  {
    id: 1,
    image: ProjectImage,
    projectName: 'AI-Powered Career Path Predictor',
    leader: 'Ko Aung Kyaw Thu Ya',
    title: 'AI-Powered Career Path Predictor',
    description:
      'An intelligent system that leverages machine learning algorithms to analyze user skills, interests, and market trends to predict and recommend suitable career paths. The platform provides personalized recommendations and skill gap analysis.',
    members: [
      {
        id: 1,
        name: 'Ko Aung',
        email: 'koaung@gmail.com',
        avatarUrl: UserImage,
        role: 'Team Leader',
      },
      {
        id: 2,
        name: 'Ma Khin',
        email: 'makhin@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 3,
        name: 'Ko Zaw',
        email: 'kozaw@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 4,
        name: 'Ma Phyo',
        email: 'maphyo@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 5,
        name: 'Ko Htet',
        email: 'kohtet@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
    ],
    status: 'Completed',
    startDate: 'Nov 15, 2025',
    completedDate: 'Dec 15, 2025',
    technologies: [
      {
        projectType: { id: 6, name: 'Machine Learning' },
        languages: 'Python, TensorFlow, React, FastAPI, PostgreSQL',
      },
    ],
    teams: [
      {
        id: 'team-1-1',
        name: 'ML Engineers',
        count: 3,
        members: [
          {
            id: 1,
            name: 'Ko Aung',
            email: 'koaung@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 2,
            name: 'Ma Khin',
            email: 'makhin@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 3,
            name: 'Ko Zaw',
            email: 'kozaw@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
      {
        id: 'team-1-2',
        name: 'Frontend Developers',
        count: 2,
        members: [
          {
            id: 4,
            name: 'Ma Phyo',
            email: 'maphyo@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 5,
            name: 'Ko Htet',
            email: 'kohtet@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
    ],
    projectLink: 'https://github.com/example/career-predictor',
  },
  {
    id: 2,
    image: ProjectImage,
    projectName: 'Smart E-Learning System with Sentiment Analysis',
    leader: 'Ma Khin Khin Myint',
    title: 'Smart E-Learning System with Sentiment Analysis',
    description:
      'A comprehensive e-learning platform that uses sentiment analysis to gauge student engagement and understanding during online courses. Features include real-time feedback, adaptive learning paths, and emotion detection.',
    members: [
      {
        id: 1,
        name: 'Ma Yati',
        email: 'mayati@gmail.com',
        avatarUrl: UserImage,
        role: 'Team Leader',
      },
      {
        id: 2,
        name: 'Ko Min',
        email: 'komin@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 3,
        name: 'Ma Cho',
        email: 'macho@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
    ],
    status: 'In Progress',
    startDate: 'Dec 10, 2025',
    completedDate: null,
    technologies: [
      {
        projectType: { id: 3, name: 'Fullstack Developers' },
        languages: 'React, Node.js, Python, MongoDB, AWS',
      },
    ],
    teams: [
      {
        id: 'team-2-1',
        name: 'Fullstack Team',
        count: 3,
        members: [
          {
            id: 1,
            name: 'Ma Yati',
            email: 'mayati@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 2,
            name: 'Ko Min',
            email: 'komin@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 3,
            name: 'Ma Cho',
            email: 'macho@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
    ],
    projectLink: 'https://elearning-demo.example.com',
  },
  {
    id: 3,
    image: ProjectImage,
    projectName: 'Automated Web-Based Resume Parser & Ranker',
    leader: 'Ko Aung Myint Myat',
    title: 'Automated Web-Based Resume Parser & Ranker',
    description:
      'An automated system for HR departments that parses resumes, extracts key information using NLP techniques, and ranks candidates based on job requirements. Integrates with popular ATS systems.',
    members: [
      {
        id: 1,
        name: 'Ko Kyaw',
        email: 'kokyaw@gmail.com',
        avatarUrl: UserImage,
        role: 'Team Leader',
      },
      {
        id: 2,
        name: 'Ma Thin',
        email: 'mathin@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 3,
        name: 'Ko Naing',
        email: 'konaing@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 4,
        name: 'Ma Aye',
        email: 'maaye@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 5,
        name: 'Ko Myo',
        email: 'komyo@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 6,
        name: 'Ma Su',
        email: 'masu@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 7,
        name: 'Ko Htun',
        email: 'kohtun@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
    ],
    status: 'Unqualified',
    startDate: 'Jan 4, 2025',
    completedDate: null,
    technologies: [
      {
        projectType: { id: 2, name: 'Backend Developers' },
        languages: 'Python, spaCy, Flask, MySQL, Docker',
      },
    ],
    teams: [
      {
        id: 'team-3-1',
        name: 'Backend Team',
        count: 4,
        members: [
          {
            id: 1,
            name: 'Ko Kyaw',
            email: 'kokyaw@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 2,
            name: 'Ma Thin',
            email: 'mathin@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 3,
            name: 'Ko Naing',
            email: 'konaing@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 4,
            name: 'Ma Aye',
            email: 'maaye@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
      {
        id: 'team-3-2',
        name: 'NLP Specialists',
        count: 3,
        members: [
          {
            id: 5,
            name: 'Ko Myo',
            email: 'komyo@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 6,
            name: 'Ma Su',
            email: 'masu@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 7,
            name: 'Ko Htun',
            email: 'kohtun@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
    ],
    projectLink: 'https://api-docs.example.com',
  },
  {
    id: 4,
    image: ProjectImage,
    projectName: 'Real-time Fraud Detection in E-Commerce Transactions',
    leader: 'Ma Ohmar Phyo',
    title: 'Real-time Fraud Detection in E-Commerce Transactions',
    description:
      'A machine learning-powered fraud detection system that analyzes e-commerce transactions in real-time to identify and prevent fraudulent activities. Uses ensemble methods and anomaly detection techniques.',
    members: [
      {
        id: 1,
        name: 'Ko Thant',
        email: 'kothant@gmail.com',
        avatarUrl: UserImage,
        role: 'Team Leader',
      },
      {
        id: 2,
        name: 'Ma Ni',
        email: 'mani@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 3,
        name: 'Ko Win',
        email: 'kowin@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 4,
        name: 'Ma Ei',
        email: 'maei@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 5,
        name: 'Ko Zin',
        email: 'kozin@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
    ],
    status: 'In Progress',
    startDate: 'Feb 9, 2025',
    completedDate: null,
    technologies: [
      {
        projectType: { id: 6, name: 'Machine Learning' },
        languages: 'Python, Scikit-learn, Apache Kafka, Spark, Redis',
      },
    ],
    teams: [
      {
        id: 'team-4-1',
        name: 'Data Scientists',
        count: 3,
        members: [
          {
            id: 1,
            name: 'Ko Thant',
            email: 'kothant@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 2,
            name: 'Ma Ni',
            email: 'mani@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 3,
            name: 'Ko Win',
            email: 'kowin@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
      {
        id: 'team-4-2',
        name: 'Data Engineers',
        count: 2,
        members: [
          {
            id: 4,
            name: 'Ma Ei',
            email: 'maei@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 5,
            name: 'Ko Zin',
            email: 'kozin@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
    ],
    projectLink: 'https://metrics.example.com',
  },
  {
    id: 5,
    image: ProjectImage,
    projectName: 'Decentralized Academic Credential Verification System',
    leader: 'Ma Yati Maung',
    title: 'Decentralized Academic Credential Verification System',
    description:
      'A blockchain-based platform for verifying academic credentials securely and transparently. Universities can issue digital certificates that employers can verify instantly without intermediaries.',
    members: [
      {
        id: 1,
        name: 'Ko Chan',
        email: 'kochan@gmail.com',
        avatarUrl: UserImage,
        role: 'Team Leader',
      },
      {
        id: 2,
        name: 'Ma May',
        email: 'mamay@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 3,
        name: 'Ko Lwin',
        email: 'kolwin@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 4,
        name: 'Ma Moe',
        email: 'mamoe@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 5,
        name: 'Ko Tun',
        email: 'kotun@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 6,
        name: 'Ma Nwe',
        email: 'manwe@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
    ],
    status: 'Unqualified',
    startDate: 'Mar 28, 2025',
    completedDate: null,
    technologies: [
      {
        projectType: { id: 2, name: 'Backend Developers' },
        languages: 'Solidity, Web3.js, React, Node.js, IPFS',
      },
    ],
    teams: [
      {
        id: 'team-5-1',
        name: 'Blockchain Developers',
        count: 3,
        members: [
          {
            id: 1,
            name: 'Ko Chan',
            email: 'kochan@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 2,
            name: 'Ma May',
            email: 'mamay@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 3,
            name: 'Ko Lwin',
            email: 'kolwin@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
      {
        id: 'team-5-2',
        name: 'Frontend Team',
        count: 3,
        members: [
          {
            id: 4,
            name: 'Ma Moe',
            email: 'mamoe@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 5,
            name: 'Ko Tun',
            email: 'kotun@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 6,
            name: 'Ma Nwe',
            email: 'manwe@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
    ],
    projectLink: 'https://github.com/example/credential-verify',
  },
  {
    id: 6,
    image: ProjectImage,
    projectName: 'Secure E-Voting System using Transparent Blockchain',
    leader: 'Ko Naing Htet Wai',
    title: 'Secure E-Voting System using Transparent Blockchain',
    description:
      'An electronic voting system built on blockchain technology ensuring transparency, immutability, and voter privacy. Features include zero-knowledge proofs for anonymous voting while maintaining verifiability.',
    members: [
      {
        id: 1,
        name: 'Ko Soe',
        email: 'kosoe@gmail.com',
        avatarUrl: UserImage,
        role: 'Team Leader',
      },
      {
        id: 2,
        name: 'Ma Hnin',
        email: 'mahnin@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 3,
        name: 'Ko Aung',
        email: 'koaung2@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 4,
        name: 'Ma Wai',
        email: 'mawai@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 5,
        name: 'Ko Ye',
        email: 'koye@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 6,
        name: 'Ma Kyi',
        email: 'makyi@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
    ],
    status: 'Completed',
    startDate: 'Apr 20, 2025',
    completedDate: 'May 20, 2025',
    technologies: [
      {
        projectType: { id: 3, name: 'Fullstack Developers' },
        languages: 'Ethereum, Solidity, React, TypeScript, PostgreSQL',
      },
    ],
    teams: [
      {
        id: 'team-6-1',
        name: 'Smart Contract Team',
        count: 3,
        members: [
          {
            id: 1,
            name: 'Ko Soe',
            email: 'kosoe@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 2,
            name: 'Ma Hnin',
            email: 'mahnin@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 3,
            name: 'Ko Aung',
            email: 'koaung2@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
      {
        id: 'team-6-2',
        name: 'UI/UX & Frontend',
        count: 3,
        members: [
          {
            id: 4,
            name: 'Ma Wai',
            email: 'mawai@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 5,
            name: 'Ko Ye',
            email: 'koye@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 6,
            name: 'Ma Kyi',
            email: 'makyi@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
    ],
    projectLink: 'https://youtube.com/example-evoting',
  },
  {
    id: 7,
    image: ProjectImage,
    projectName:
      'Web-Based Personal Health Record (PHR) Management with Encryption',
    leader: 'Ko Kyaw Maung Maung Thwin',
    title: 'Web-Based Personal Health Record (PHR) Management with Encryption',
    description:
      'A secure web application for managing personal health records with end-to-end encryption. Patients can store, share, and manage their medical history while maintaining complete data privacy.',
    members: [
      {
        id: 1,
        name: 'Ko Hla',
        email: 'kohla@gmail.com',
        avatarUrl: UserImage,
        role: 'Team Leader',
      },
      {
        id: 2,
        name: 'Ma Nu',
        email: 'manu@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 3,
        name: 'Ko Lin',
        email: 'kolin@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 4,
        name: 'Ma Yi',
        email: 'mayi@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 5,
        name: 'Ko Myat',
        email: 'komyat@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
    ],
    status: 'In Progress',
    startDate: 'May 3, 2025',
    completedDate: null,
    technologies: [
      {
        projectType: { id: 3, name: 'Fullstack Developers' },
        languages: 'Vue.js, Node.js, Express, MongoDB, AES-256',
      },
    ],
    teams: [
      {
        id: 'team-7-1',
        name: 'Security Team',
        count: 2,
        members: [
          {
            id: 1,
            name: 'Ko Hla',
            email: 'kohla@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 2,
            name: 'Ma Nu',
            email: 'manu@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
      {
        id: 'team-7-2',
        name: 'Application Team',
        count: 3,
        members: [
          {
            id: 3,
            name: 'Ko Lin',
            email: 'kolin@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 4,
            name: 'Ma Yi',
            email: 'mayi@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 5,
            name: 'Ko Myat',
            email: 'komyat@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
    ],
    projectLink: 'https://figma.com/example-phr',
  },
  {
    id: 8,
    image: ProjectImage,
    projectName: 'Phishing Website Detection using URL Feature Analysis',
    leader: 'Ma Cho Thazin Kyaw',
    title: 'Phishing Website Detection using URL Feature Analysis',
    description:
      'A browser extension and API service that detects phishing websites by analyzing URL features and patterns. Uses machine learning to identify suspicious domains and protect users from cyber threats.',
    members: [
      {
        id: 1,
        name: 'Ko Zaw',
        email: 'kozaw2@gmail.com',
        avatarUrl: UserImage,
        role: 'Team Leader',
      },
      {
        id: 2,
        name: 'Ma Khin',
        email: 'makhin2@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 3,
        name: 'Ko Min',
        email: 'komin2@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 4,
        name: 'Ma Phyo',
        email: 'maphyo2@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 5,
        name: 'Ko Htet',
        email: 'kohtet2@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 6,
        name: 'Ma Yati',
        email: 'mayati2@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
      {
        id: 7,
        name: 'Ko Naing',
        email: 'konaing2@gmail.com',
        avatarUrl: UserImage,
        role: 'Member',
      },
    ],
    status: 'In Progress',
    startDate: 'Jun 5, 2025',
    completedDate: null,
    technologies: [
      {
        projectType: { id: 6, name: 'Machine Learning' },
        languages: 'Python, JavaScript, Chrome Extension API, FastAPI, XGBoost',
      },
    ],
    teams: [
      {
        id: 'team-8-1',
        name: 'ML Research Team',
        count: 3,
        members: [
          {
            id: 1,
            name: 'Ko Zaw',
            email: 'kozaw2@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 2,
            name: 'Ma Khin',
            email: 'makhin2@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
          {
            id: 3,
            name: 'Ko Min',
            email: 'komin2@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
      {
        id: 'team-8-2',
        name: 'Extension Developers',
        count: 2,
        members: [
          {
            id: 4,
            name: 'Ma Phyo',
            email: 'maphyo2@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 5,
            name: 'Ko Htet',
            email: 'kohtet2@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
      {
        id: 'team-8-3',
        name: 'Backend API Team',
        count: 2,
        members: [
          {
            id: 6,
            name: 'Ma Yati',
            email: 'mayati2@gmail.com',
            avatarUrl: UserImage,
            role: 'Team Leader',
          },
          {
            id: 7,
            name: 'Ko Naing',
            email: 'konaing2@gmail.com',
            avatarUrl: UserImage,
            role: 'Member',
          },
        ],
      },
    ],
    projectLink: 'https://chrome.google.com/example-phishing',
  },
];

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
