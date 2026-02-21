import type { ProjectData } from '../constants/data';
import {
  getTeamLeaderFromMembers,
  mapBackendToFrontendStatus,
} from './status-mapping';

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
  const allMembers = item.teams
    ? item.teams.flatMap((t: any) => t.members)
    : [];

  return {
    id: item.id,
    leader: getTeamLeaderFromMembers(allMembers),
    title: item.name,
    projectName: item.name,
    status: mapBackendToFrontendStatus(
      item.projectPortfolioStatus || item.status,
    ),
    members: allMembers.map((m: any) => ({
      ...m,
      avatarUrl: m.profilePictureUrl || m.avatarUrl || null,
      role:
        m.roleInTeam?.toUpperCase() === 'TEAM_LEADER' ||
        m.roleInTeam?.toUpperCase() === 'TEAM LEADER' ||
        m.roleInTeam?.toUpperCase() === 'TEAM_LEAD' ||
        m.roleInTeam?.toUpperCase() === 'LEADER'
          ? 'Team Leader'
          : 'Member',
    })),
    image: item.projectPicUrl || '',
    startDate: item.startDate || '2024-01-01',
    completedDate: item.completedDate || null,
    technologies:
      item.languageAndTools?.map((t: any) => ({
        projectType: { id: t.id || 0, name: t.type },
        languages: t.name,
      })) || [],
    teams:
      item.teams?.map((t: any) => ({
        id: t.id?.toString() || '',
        name: t.teamName || t.name || 'Unnamed Team',
        count: t.members?.length || 0,
        members:
          t.members?.map((m: any) => ({
            ...m,
            role:
              m.roleInTeam?.toUpperCase() === 'TEAM_LEADER' ||
              m.roleInTeam?.toUpperCase() === 'TEAM LEADER' ||
              m.roleInTeam?.toUpperCase() === 'TEAM_LEAD' ||
              m.roleInTeam?.toUpperCase() === 'LEADER'
                ? 'Team Leader'
                : 'Member',
          })) || [],
      })) || [],
    description: item.description || '',
    projectLink: item.projectLink || '',
    repoLink: item.repoLink || '',
    reactCount: item.reactedCount || item.reactCount || 0,
    viewCount: item.viewCount || 0,
    isReacted: item.isAlreadyReacted ?? item.isReacted ?? false,
  };
};
