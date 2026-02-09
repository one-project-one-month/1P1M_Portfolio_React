import apiClient from '@/api/axios';
import { API_ENDPOINTS } from '@/config/api';
import type { TeamType } from '@/types/portfolio-management';

export interface CreateTeamRequest {
  team: {
    teamName: string;
    description: string;
    imageUrl: string;
    contactLink: string;
    members: {
      memberId: number | string;
      roleInTeam: string;
    }[];
  };
}

export interface CreateTeamResponse {
  success: number;
  code: number;
  meta: {
    endpoint: string;
    method: string;
  };
  data: {
    id: number;
    teamName: string;
    description: string;
    imageUrl: string;
    members: any[];
  };
  message: string;
}

export const createTeam = async (
  team: TeamType,
): Promise<CreateTeamResponse> => {
  const requestBody: CreateTeamRequest = {
    team: {
      teamName: team.name,
      description: 'Default description',
      imageUrl: 'https://example.com/team-image.jpg',
      contactLink: '',
      members: team.members.map((member) => ({
        memberId: member.id ?? '',
        roleInTeam: member.role || 'Member',
      })),
    },
  };

  const response = await apiClient.post<CreateTeamResponse>(
    API_ENDPOINTS.CREATE_TEAM_V2,
    requestBody,
  );
  return response.data;
};

// Project Portfolio Creation
export interface CreateProjectPortfolioRequest {
  name: string;
  projectPicUrl: string;
  description: string;
  projectLink: string;
  repoLink: string;
  startDate: string;
  endDate?: string;
  teamIds: number[];
  languageAndTools: {
    name: string;
    type: string;
  }[];
}

export const createProjectPortfolio = async (
  data: CreateProjectPortfolioRequest,
) => {
  const response = await apiClient.post(API_ENDPOINTS.CREATE_PROJECT_V2, data);
  return response.data;
};

export const updateProjectPortfolio = async (
  projectPortfolioId: number | string,
  data: Partial<CreateProjectPortfolioRequest>,
) => {
  const response = await apiClient.patch(
    API_ENDPOINTS.UPDATE_PROJECT_PATCH,
    data,
    {
      params: { projectPortfolioId },
    },
  );
  return response.data;
};

// Team Member Management
export const addTeamMember = async (
  teamId: number | string,
  memberId: number | string,
  roleInTeam: string,
) => {
  const response = await apiClient.post(API_ENDPOINTS.TEAM_MEMBERS_V2, {
    teamId,
    memberId,
    roleInTeam,
  });
  return response.data;
};

export const removeTeamMember = async (
  teamId: number | string,
  memberId: number | string,
) => {
  const response = await apiClient.delete(API_ENDPOINTS.TEAM_MEMBERS_V2, {
    data: { teamId, memberId },
  });
  return response.data;
};

// Team Management
export const deleteTeam = async (teamId: number | string) => {
  const response = await apiClient.delete(API_ENDPOINTS.REMOVE_TEAM_V2, {
    data: { teamId },
  });
  return response.data;
};

// Project Portfolio Management
export const updateProjectStatus = async (
  projectPortfolioId: number | string,
  status: string,
) => {
  const response = await apiClient.patch(
    API_ENDPOINTS.UPDATE_PROJECT_STATUS_V2,
    {
      projectPortfolioId,
      status,
    },
  );
  return response.data;
};

export const removeLanguageAndTool = async (
  projectPortfolioId: number | string,
  languageAndToolId: number | string,
) => {
  const response = await apiClient.delete(API_ENDPOINTS.LANGUAGE_AND_TOOL_V2, {
    data: { projectPortfolioId, languageAndToolId },
  });
  return response.data;
};

export const getProjectPortfolioDetailsV2 = async (
  projectPortfolioId: string,
) => {
  const url = `${API_ENDPOINTS.GET_PROJECT_V2}/${projectPortfolioId}`;
  const response = await apiClient.get(url);
  return response.data;
};

export const getAllProjectPortfolios = async (
  page = 0,
  size = 10,
  sortDirection = 'desc',
  keyword = '',
  orderFilter?: string,
) => {
  const params: Record<string, any> = {
    page,
    size,
    sortDirection,
    keyword,
  };

  if (orderFilter && orderFilter !== 'All') {
    params.orderFilter = orderFilter.toLowerCase();
  }

  const response = await apiClient.get(API_ENDPOINTS.GET_PROJECT_V2, {
    params,
  });
  return response.data;
};

export const reactProject = async (projectPortfolioId: number | string) => {
  const response = await apiClient.post(API_ENDPOINTS.REACT_PROJECT, {
    projectPortfolioId,
  });
  return response.data;
};

export const unreactProject = async (projectPortfolioId: number | string) => {
  const response = await apiClient.delete(API_ENDPOINTS.REACT_PROJECT, {
    data: { projectPortfolioId },
  });
  return response.data;
};

export const getAllProfiles = async (
  page = 0,
  size = 20,
  sortField = 'name',
  sortDirection = 'desc',
  keyword = '',
) => {
  const response = await apiClient.get(API_ENDPOINTS.GET_PROFILE, {
    params: {
      page,
      size,
      sortField,
      sortDirection,
      keyword,
    },
  });
  return response.data;
};
