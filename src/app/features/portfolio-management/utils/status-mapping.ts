import type { ProjectStatus } from '../constants/data';

export type BackendStatus =
  | 'REJECTED'
  | 'APPROVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'UNQUALIFIED'
  | 'PENDING';

export type FrontendStatus = ProjectStatus;

const backendToFrontendMap: Record<BackendStatus, FrontendStatus> = {
  REJECTED: 'Unqualified',
  APPROVED: 'Completed',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  UNQUALIFIED: 'Unqualified',
  PENDING: 'Planning',
};

const frontendToBackendMap: Record<FrontendStatus, BackendStatus> = {
  Planning: 'PENDING',
  Completed: 'COMPLETED',
  'In Progress': 'IN_PROGRESS',
  Unqualified: 'UNQUALIFIED',
};

export const mapBackendToFrontendStatus = (
  backendStatus: string,
): FrontendStatus => {
  const upperStatus = backendStatus?.toUpperCase() as BackendStatus;
  return backendToFrontendMap[upperStatus] || 'Planning';
};

export const mapFrontendToBackendStatus = (
  frontendStatus: FrontendStatus,
): BackendStatus => {
  return frontendToBackendMap[frontendStatus] || 'PENDING';
};

export const getTeamLeaderFromMembers = (
  members: { name: string; roleInTeam?: string; role?: string }[],
): string => {
  const leader = members.find(
    (m) =>
      m.roleInTeam?.toUpperCase() === 'TEAM_LEADER' ||
      m.roleInTeam?.toUpperCase() === 'TEAM LEADER' ||
      m.roleInTeam?.toUpperCase() === 'TEAM_LEAD' ||
      m.roleInTeam?.toUpperCase() === 'LEADER' ||
      m.role === 'Team Leader',
  );
  return leader?.name || members[0]?.name || 'Unknown Leader';
};
