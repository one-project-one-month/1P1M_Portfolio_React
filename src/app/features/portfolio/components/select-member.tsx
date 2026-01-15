import { plusIconUrl, sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import type { Member, SelectMemberProps } from '@/types/member';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import React from 'react';
import CustomBox from './custom-box';

const getMemberId = (m: Member, index: number): string =>
  String(m.dev_id || m.userId || m.id || index);

const SelectMember: React.FC<SelectMemberProps> = ({
  onSearch,
  handleSaveMembers,
  handleDiscardMembers,
  filteredDevs = [],

  devLoading,
  search,
  selectedMembers = [],

  handleRemoveMember,
  handleAddMember,
}) => {
  const MAX_VISIBLE_AVATARS = 4;

  return (
    <div className="z-0 mb-2 -mt-4 flex flex-col">
      <div className="flex items-center gap-2">
        <div className="flex -space-x-2">
          {selectedMembers
            .slice(0, MAX_VISIBLE_AVATARS)
            .map((member, index) => (
              <img
                key={`avatar-${getMemberId(member, index)}`}
                src={member.profilePictureUrl || sampleUserImgUrl}
                alt={member.name}
                className="h-12 w-12 rounded-full border-2 border-[#111827] object-cover"
              />
            ))}
          {selectedMembers.length > MAX_VISIBLE_AVATARS && (
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#111827] bg-gray-800 text-xs font-bold text-white">
              +{selectedMembers.length - MAX_VISIBLE_AVATARS}
            </div>
          )}
        </div>

        <DialogPrimitive.Root>
          <DialogPrimitive.Trigger asChild>
            <button
              type="button"
              className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-gray-600 bg-gray-700 hover:bg-gray-600 transition-all active:scale-95"
            >
              <img src={plusIconUrl} alt="Add" className="w-5 h-5" />
            </button>
          </DialogPrimitive.Trigger>

          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-[100] bg-black/10 backdrop-blur-sm animate-in fade-in duration-300" />

            <DialogPrimitive.Content className="fixed h-fit left-[50%] top-[50%] z-[101] w-[95vw] max-w-2xl translate-x-[-50%] translate-y-[-50%] rounded-[2rem] border border-white/10 bg-[#0B0F1A] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-6">
                <DialogPrimitive.Title className="text-2xl font-bold text-white">
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
                  value={search}
                  onChange={onSearch}
                  className="h-14 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                />

                {selectedMembers.length > 0 && (
                  <CustomBox className="h-auto max-h-[160px]  overflow-y-auto bg-white/[0.03]">
                    <div className="flex flex-wrap gap-2">
                      {selectedMembers.map((member, index) => (
                        <div
                          key={`chip-${getMemberId(member, index)}`}
                          className="flex items-center gap-2 rounded-full border border-white/10 bg-gray-900 py-1.5 pl-1.5 pr-3"
                        >
                          <img
                            src={member.profilePictureUrl || sampleUserImgUrl}
                            className="h-6 w-6 rounded-full object-cover"
                            alt=""
                          />
                          <span className="text-xs font-medium text-white">
                            {member.name}
                          </span>
                          <button
                            onClick={() => handleRemoveMember(member)}
                            className="text-gray-500 hover:text-white transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </CustomBox>
                )}

                <div className="max-h-52 space-y-2 overflow-y-auto pr-2">
                  {devLoading ? (
                    <div className="py-10 text-center text-gray-500 animate-pulse">
                      Searching...
                    </div>
                  ) : filteredDevs.length === 0 ? (
                    <div className="py-10 text-center text-gray-500">
                      {search
                        ? `No results for "${search}"`
                        : 'Search for team members'}
                    </div>
                  ) : (
                    filteredDevs.map((dev, index) => (
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
                        <button
                          onClick={() => handleAddMember(dev)}
                          className="rounded-lg bg-purple-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-purple-500 transition-colors shadow-lg shadow-purple-900/20"
                        >
                          Add
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
                  <button
                    onClick={handleDiscardMembers}
                    className="rounded-full px-6 py-2.5 text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    Discard
                  </button>
                  <Button variant={'purple_button'} className="rounded-full">
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
