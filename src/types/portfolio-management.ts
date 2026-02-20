export type TeamType = {
  id: string;
  name: string;
  count: number;
  members: Member[];
};

export type TeamDropdownProps = {
  onAddTeam: (teamName: string) => void;
};

export type ProjectStatus =
  | 'Planning'
  | 'In Progress'
  | 'Completed'
  | 'Unqualified';

export interface Member {
  id?: string | number;
  dev_id?: string | number;
  userId?: string | number;
  name: string;
  email?: string;
  profilePictureUrl?: string;
  avatarUrl?: string; // Added avatarUrl for compatibility with ProjectCard
  role?: 'Team Leader' | 'Member';
}

export interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  teamLeader: string;
  members: Member[];
  status: ProjectStatus;
  className?: string; // Add className prop for flexibility
}

export interface DropdownItem {
  id: string | number;
  name: string;
}

export interface StatusDropdownProps {
  placeholder: string;
  menuList: DropdownItem[];
  className?: string;
  onChange?: (item: DropdownItem) => void;
  selectedValue?: DropdownItem | null;
}
