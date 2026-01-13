export type Idea = {
  id: number;
  name: string;
  description: string;
  devName: string;
  dev_id: number;
  reactionCount: number;
  status: string;
  profilePictureUrl: string;
  projectTypes: string[];
  reactedProjects: number[];
};

export type GetApprovedIdeas = {
  success: number;
  code: number;
  message: string;
  meta: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    method: string;
    endpoint: string;
  };
  data: Idea[];
};
