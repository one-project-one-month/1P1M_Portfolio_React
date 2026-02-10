export type ProjectIdeaType = {
  status: 'PENDING' | 'APPROVED' | 'ARCHIVED';
  projectIdeaName: string;
  description: string;
  projectTypes: string[];
  reactionCount: number;
  viewCount: number;
  dev_id: number;
  leader_id: number;
  projectIdeaId: number;
  devName?: string | undefined;
  ownerProfilePicUrl?: string | undefined;
  leaderProfilePicUrl?: string | undefined;
};
