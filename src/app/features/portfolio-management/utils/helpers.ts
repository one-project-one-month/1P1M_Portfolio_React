import { getUser } from '../../opom-register/services/ulits';
import type { ProjectData } from '../constants/data';
import {
  getTeamLeaderFromMembers,
  mapBackendToFrontendStatus,
} from './status-mapping';

const isLeaderRole = (roleInTeam?: string): boolean => {
  const upper = roleInTeam?.toUpperCase();
  return (
    upper === 'TEAM_LEADER' ||
    upper === 'TEAM LEADER' ||
    upper === 'TEAM_LEAD' ||
    upper === 'LEADER'
  );
};

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

  const user = getUser();
  const userEmail = user?.email?.toLowerCase();
  const isCurrentUserLeader = userEmail
    ? allMembers.some(
        (m: any) =>
          m.email?.toLowerCase() === userEmail && isLeaderRole(m.roleInTeam),
      )
    : false;

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
      role: isLeaderRole(m.roleInTeam) ? 'Team Leader' : 'Member',
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
            avatarUrl: m.profilePictureUrl || m.avatarUrl || null,
            role: isLeaderRole(m.roleInTeam) ? 'Team Leader' : 'Member',
          })) || [],
      })) || [],
    description: item.description || '',
    projectLink: item.projectLink || '',
    repoLink: item.repoLink || '',
    reactCount: item.reactedCount || item.reactCount || 0,
    viewCount: item.viewCount || 0,
    isReacted: item.isAlreadyReacted ?? item.isReacted ?? false,
    isCurrentUserLeader,
  };
};
