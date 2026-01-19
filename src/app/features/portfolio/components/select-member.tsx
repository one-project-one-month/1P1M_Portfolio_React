import { plusIconUrl, sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import type { Member } from '@/types/member';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Badge, Flex } from '@radix-ui/themes';
import { X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTeamForm } from '../hooks/use-team-form';
import CustomBox from './custom-box';

const getMemberId = (m: Member, index: number): string =>
  String(m.dev_id || m.userId || m.id || index);

interface AddMemberProps {
  handleSaveMembers: (emails: string[]) => void;
  handleResetMembers: (resetFn: () => void) => void;
  allMembers: Member[];
}

const SelectMember: React.FC<AddMemberProps> = ({
  handleSaveMembers,
  allMembers = [],
  handleResetMembers,
}) => {
  const MAX_VISIBLE_AVATARS = 4;
  const [isOpen, setIsOpen] = useState(false);
  const [existingMembers, setExistingMembers] = useState<Member[] | []>([]);
  const {
    members,
    addedMembers,
    addMember,
    removeMember,
    onSearch,
    discardChanges,
    saveChanges,
    resetMembers,
  } = useTeamForm({
    allMembers: allMembers,
    existingMembers: existingMembers,
    onSave: (emailList) => handleSaveMembers(emailList),
  });

  useEffect(() => {
    if (!handleResetMembers) return;

    handleResetMembers(() => resetMembers);
  }, [handleResetMembers]);

  const handleSave = () => {
    saveChanges();
    setExistingMembers(addedMembers);
    setIsOpen(false);
  };

  return (
    <div className="z-0 mb-2 mt-4 flex flex-col">
      <div className="flex items-center gap-2">
        <div className="flex space-x-2">
          {addedMembers.slice(0, MAX_VISIBLE_AVATARS).map((member, index) => (
            <img
              key={`avatar-${getMemberId(member, index)}`}
              src={member.profilePictureUrl || sampleUserImgUrl}
              alt={member.name}
              className="h-12 w-12 rounded-full border-2 border-[#111827] object-cover"
            />
          ))}
          {addedMembers.length > MAX_VISIBLE_AVATARS && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#111827] bg-gray-800 text-xs font-bold text-white">
              +{addedMembers.length - MAX_VISIBLE_AVATARS}
            </div>
          )}
        </div>

        <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
          <DialogPrimitive.Trigger asChild>
            <button
              type="button"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-600 bg-gray-700 hover:bg-gray-600 transition-all active:scale-95"
            >
              <img src={plusIconUrl} alt="Add" className="w-5 h-5" />
            </button>
          </DialogPrimitive.Trigger>

          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-100 bg-black/10 backdrop-blur-sm animate-in fade-in duration-300" />

            <DialogPrimitive.Content className="fixed h-fit left-[50%] top-[50%] z-101 w-[95vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-[2rem] border border-white/10 bg-[#0B0F1A] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-6">
                <DialogPrimitive.Title className="text-xl font-bold text-white">
                  Add Member
                </DialogPrimitive.Title>
                <DialogPrimitive.Close className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors">
                  <X size={20} />
                </DialogPrimitive.Close>
              </div>

              <div className="space-y-5">
                {/* Search Bar */}
                <input
                  type="text"
                  placeholder="Search member by name..."
                  // value={search}
                  onChange={(event) => onSearch(event.target.value)}
                  className="h-12 w-full rounded-md border border-white/10 bg-white/5 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />

                {members.length > 0 && (
                  <CustomBox className="h-auto max-h-40 overflow-y-auto bg-white/3">
                    <Flex wrap="wrap" gap="15px">
                      {members.map((member, index) => (
                        <Flex
                          align="center"
                          gap="20px"
                          key={`chip-${getMemberId(member, index)}`}
                          onClick={
                            !member.isSelected
                              ? () => addMember(member.userId)
                              : undefined
                          }
                          className={`rounded-lg border py-3 pl-1.5 pr-3 transition border-white/15 bg-white/9 ${
                            member.isSelected
                              ? 'opacity-60 cursor-default'
                              : 'cursor-pointer hover:bg-white/15'
                          }`}
                        >
                          <Flex align="center" gap="10px">
                            <img
                              src={member.profilePictureUrl || sampleUserImgUrl}
                              className="h-9 w-9 rounded-full object-cover"
                              alt=""
                            />
                            <span className="text-xs font-medium text-white">
                              {member.name}
                            </span>
                          </Flex>
                          {member.isSelected && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeMember(member.userId);
                              }}
                              className="flex justify-center items-center text-gray-500 hover:text-white transition-colors w-6 h-6 rounded-full bg-secondary"
                            >
                              <X size={17} className="text-black" />
                            </button>
                          )}
                        </Flex>
                      ))}
                    </Flex>
                  </CustomBox>
                )}

                <div className="max-h-52 space-y-2 overflow-y-auto pr-2">
                  {/* {devLoading ? (
                    <div className="py-10 text-center text-gray-500 animate-pulse">
                      Searching...
                    </div>
                  ) : filteredDevs.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                      {search
                        ? `No results for "${search}"`
                        : 'Search for team members'}
                    </div>
                  ) : ( */}
                  {addedMembers.map((dev, index) => (
                    <div
                      key={`res-${getMemberId(dev, index)}`}
                      className="flex items-center justify-between rounded-xl bg-white/5 p-3 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={dev.profilePictureUrl || sampleUserImgUrl}
                          className="h-10 w-10 rounded-full object-cover border border-white/10"
                          alt=""
                        />
                        <div>
                          <p className="text-sm font-semibold text-white">
                            {dev.name}
                          </p>
                          <p className="text-xs text-gray-400">{dev.email}</p>
                        </div>
                      </div>
                      {/* <button
                          onClick={() => handleSaveMembers()}
                          className="rounded-lg bg-purple-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/20"
                        >
                          Add
                        </button> */}
                      <Badge
                        variant="outline"
                        size="2"
                        color="green"
                        style={{
                          fontSize: 14,
                          fontWeight: 'bold',
                          paddingInline: 12,
                          paddingBlock: 2,
                          borderRadius: 3,
                        }}
                      >
                        Added
                      </Badge>
                    </div>
                  ))}
                  {/* )} */}
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    onClick={discardChanges}
                    className="rounded-full px-6 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Discard
                  </button>
                  <Button
                    variant={'purple_button'}
                    className="rounded-full"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
      </div>
    </div>
  );
};

export default SelectMember;
