export type DashboardSummary = {
  data: {
    totalProjects: number;
    currentActiveUsers: number;
    currentTitle: string;
    currentTeams: number;
    currentProjects: number;
    nextRegister: Date;
  };
};

export type YearToDateGrowthResponse = {
  data: {
    projects: number[];
    register: number[];
  };
};

export type RegisterationsAndCompletedProjectsResponse = {
  data: {
    registers: number[];
    projects: number[];
  };
};

export type PopularPortfolioAndProjectIdeas = {
  data: {
    popularPortfolios: {
      projectName: string;
      projectLeader: string;
      member: number;
      status: string;
      progress: number;
    }[];
    popularProjects: {
      projectName: string;
      submitter: string;
      react: number;
      projectType: string;
    }[];
  };
};

export type ProjectDeadlineResponse = {
  data: {
    endingSoonProjects: { name: string; date: string }[];
    overdueProjects: { name: string; date: string }[];
  };
};

export type InactiveUsersResponse = {
  data: {
    date: Date;
    totalUsers: number;
    inactiveUsers: number;
  };
};

export type ProjectStatusResponse = {
  data: {
    totalProjects: number;
    active: number;
    completed: number;
    onHold: number;
  };
}; //current opom event

export type RoleDistributionAndTechStackResponse = {
  data: {
    roles: { label: string; rate: number }[];
    techStacks: { label: string; rate: number }[];
  };
};

export type DashboardSummaryData = {
  totalProjects: number;
  currentActiveUsers: number;
  currentTitle: string;
  currentTeams: number;
  currentProjects: number;
  nextRegister: string | null;
};
