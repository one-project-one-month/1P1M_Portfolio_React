import type { Member } from '@/types/member';
import { useMemo, useState } from 'react';

interface UseTeamFormProps {
  allMembers: Member[];
  existingMembers: Member[];
  onSave: (emails: string[]) => void;
}

export const useTeamForm = ({
  allMembers,
  existingMembers,
  onSave,
}: UseTeamFormProps) => {
  const [selectedIds, setSelectedIds] = useState<Set<Member['userId']>>(
    new Set(existingMembers.map((dev) => dev.userId)),
  );
  const [search, setSearch] = useState('');

  const members = useMemo(() => {
    return allMembers
      .filter((m) => m.name?.toLowerCase().includes(search.toLowerCase()))
      .map((member) => {
        return {
          ...member,
          isSelected: selectedIds.has(member.userId),
        };
      });
  }, [allMembers, selectedIds, search]);

  const addedMembers = useMemo(() => {
    return allMembers.filter((m) => selectedIds.has(m.userId));
  }, [allMembers, selectedIds]);

  const addMember = (id: Member['userId']) => {
    setSelectedIds((prev) => new Set(prev).add(id));
  };

  const removeMember = (id: Member['userId']) => {
    setSelectedIds((prev) => {
      const dev = new Set(prev);
      dev.delete(id);
      return dev;
    });
  };

  const discardChanges = () => {
    setSelectedIds(new Set(existingMembers.map((dev) => dev.userId)));
  };

  const saveChanges = () => {
    const emailList = allMembers
      .filter((m) => selectedIds.has(m.userId) && m.email !== undefined)
      .map((updated) => updated.email as string);
    onSave(emailList);
    setSearch('');
  };

  const onSearch = (value: string) => {
    setSearch(value);
  };

  const resetMembers = () => {
    setSelectedIds(new Set());
  };

  return {
    members,
    addedMembers,
    addMember,
    removeMember,
    resetMembers,
    discardChanges,
    saveChanges,
    onSearch,
  };
};
