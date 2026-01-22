import { Button } from '@/components/ui/button';
import type { Member } from '@/types/portfolio-management';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { MOCK_USERS } from '../constants/data';

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  teamName: string;
  initialMembers?: Member[];
  onSave: (selectedUsers: Member[], teamName: string) => void;
}

const AddMemberModal = ({
  isOpen,
  onClose,
  teamName,
  initialMembers = [],
  onSave,
}: AddMemberModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<Member[]>([]);
  const [currentTeamName, setCurrentTeamName] = useState(teamName);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTeamName(teamName);
    setSelectedUsers(initialMembers);
    setSearchQuery('');
    setOpenDropdownId(null);
  }, [teamName, isOpen, initialMembers]);

  if (!isOpen) return null;

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const hasLeader = selectedUsers.some((u) => u.role === 'Team Leader');

  const handleAddUser = (
    user: (typeof MOCK_USERS)[0],
    role: 'Team Leader' | 'Member',
  ) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers([...selectedUsers, { ...user, role }]);
    }
    setOpenDropdownId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-[650px] bg-[#101928] border border-[#FFFFFF]/15 rounded-xl shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 space-y-2">
          <div className="flex items-center gap-4 border-b border-white/15 pb-4">
            <label className="text-xl font-semibold text-white whitespace-nowrap">
              Team Name
            </label>
            <input
              type="text"
              value={currentTeamName}
              onChange={(e) => setCurrentTeamName(e.target.value)}
              className="bg-[#1E293B] border border-[#334155] rounded-lg py-2 px-4 focus:outline-none focus:border-[#9C39FC] w-full font-medium text-white"
            />
          </div>

          <div className=" space-y-2">
            <label className="text-sm font-medium text-[#F9FAFB]">
              Search by name or email
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B] w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1E293B] border border-[#334155] rounded-lg py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-[#9C39FC] placeholder-[#64748B]"
              />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 space-y-2">
          <label className="text-sm font-medium text-[#F9FAFB] mb-1 block">
            Search by name or email
          </label>
          {filteredUsers.map((user) => {
            const isAdded = selectedUsers.some((u) => u.id === user.id);
            return (
              <div
                key={user.id}
                className="flex items-center border border-[#334155] bg-[#1E293B] justify-between px-2 py-1 rounded-lg group transition-colors"
                onClick={() => !isAdded && setOpenDropdownId(null)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.avatarUrl}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-white font-medium text-sm">
                      {user.name}
                    </h3>
                    <p className="text-[#64748B] text-xs">{user.email}</p>
                  </div>
                </div>

                <div className="relative">
                  {isAdded ? (
                    <span className="text-[#64748B] text-sm pr-4">
                      Already Added
                    </span>
                  ) : (
                    <>
                      {hasLeader ? (
                        <Button
                          onClick={() => handleAddUser(user, 'Member')}
                          className="bg-[#9C39FC] hover:bg-[#8B31E0] rounded-sm text-white text-xs px-4 py-1.5 h-8"
                        >
                          Add
                        </Button>
                      ) : (
                        <div>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(
                                openDropdownId === user.id ? null : user.id,
                              );
                            }}
                            className="bg-[#9C39FC] hover:bg-[#8B31E0] rounded-sm text-white text-xs px-4 py-1.5 h-8"
                          >
                            Add
                          </Button>

                          {openDropdownId === user.id && (
                            <div className="absolute right-0 top-full mt-1 w-32 bg-[#1E293B] border border-[#334155] rounded-md shadow-lg z-10 overflow-hidden">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddUser(user, 'Team Leader');
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#334155] transition-colors"
                              >
                                Team Leader
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddUser(user, 'Member');
                                }}
                                className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#334155] transition-colors"
                              >
                                Member
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#FFFFFF]/10 flex justify-end gap-3">
          <Button
            onClick={onClose}
            className="text-[#94A3B8] hover:text-white hover:bg-[#1E293B] border border-[#334155] bg-transparent"
          >
            Discard
          </Button>
          <Button
            onClick={() => {
              onSave(selectedUsers, currentTeamName);
              onClose();
            }}
            className="bg-[#9C39FC] hover:bg-[#8B31E0] text-white px-8"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;
