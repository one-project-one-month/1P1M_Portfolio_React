import type { ChangeEvent } from 'react';

export interface Member {
  id?: string | number;
  dev_id?: string | number;
  userId?: string | number;
  name?: string;
  email?: string;
  profilePictureUrl?: string;
}

export interface SelectMemberProps {
  devProfiles: Member[];
  filteredDevs: Member[];
  selectedMembers: Member[];
  search: string;
  isDialogOpen: boolean;
  devLoading?: boolean;
  devError?: string | null;
  onSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSaveMembers: () => void;
  handleDiscardMembers: () => void;
  handleDialog: (open: boolean) => void;
  handleRemoveMember: (member: Member) => void;
  handleAddMember: (member: Member) => void;
}
