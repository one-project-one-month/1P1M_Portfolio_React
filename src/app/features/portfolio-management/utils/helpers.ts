import type { ProjectData } from '../constants/data';

export const getMemberCount = (members: any[]): number => members.length;

export const getDisplayMembers = (members: any[], limit: number = 3) => {
  const displayMembers = members.slice(0, limit);
  const remainingCount = Math.max(0, members.length - limit);

  return {
    displayMembers,
    remainingCount,
  };
};

export const mapApiToProjectData = (item: any): ProjectData => {
  return {
    id: item.id,
    leader: item.teams?.[0]?.members?.[0]?.name || 'Unknown Leader',
    title: item.name,
    projectName: item.name,
    status: item.status || 'In Progress',
    members: item.teams ? item.teams.flatMap((t: any) => t.members) : [],
    image: item.projectPicUrl || '',
    startDate: '2024-01-01', // Fallback
    completedDate: null,
    technologies: item.languageAndTools || [],
    teams: item.teams || [],
    description: item.description || '',
    projectLink: item.projectLink || '',
  };
};
