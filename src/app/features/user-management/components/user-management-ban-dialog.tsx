import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useState, type ReactNode } from 'react';
import type { UserBanResponseType } from '../types/user-management.types';

type UserManagementBanDialogProps = {
  trigger?: ReactNode;
  banOpen: boolean;
  setBanOpen: (open: boolean) => void;
  banMutate: UseMutateFunction<
    UserBanResponseType,
    AxiosError<{ message: string }>,
    { userId: number; desc: string },
    unknown
  >;
  userId: number;
};

const UserManagementBanDialog = ({
  trigger,
  banOpen,
  setBanOpen,
  banMutate,
  userId,
}: UserManagementBanDialogProps) => {
  const banData = [
    {
      name: 'Spamming or Self-Promotion',
      description:
        'User repeatedly posted promotional content without permission',
    },
    {
      name: 'Disruptive Team Behavior',
      description:
        'User ignored feedback or negatively affected team collaboration',
    },
    {
      name: 'Multiple Rule Warnings Ignored',
      description: 'User continued',
    },
    {
      name: 'Others',
      description: 'Reason not covered by the options above.',
    },
  ];
  const [selectReason, setSelectedReason] = useState<string[]>([]);

  const toggleReason = (reason: string) => {
    setSelectedReason((pre) =>
      pre.includes(reason) ? pre.filter((r) => r !== reason) : [...pre, reason],
    );
  };
  return (
    <Dialog.Root open={banOpen} onOpenChange={setBanOpen}>
      <Dialog.Trigger>{trigger || <>View Detail</>}</Dialog.Trigger>

      <Dialog.Content
        size="4"
        maxWidth="549px"
        style={{
          background: 'black',
          color: 'white',
          padding: '60px',
          height: '588px',
          border: '1px solid #9F0712',
        }}
      >
        <div className="w-full h-full flex flex-col gap-8 ">
          <div>
            <Dialog.Title className="text-[#F9FAFB] font-medium text-2xl leading-8">
              Are you sure to ban this user?
            </Dialog.Title>
            <Dialog.Description className="text-[#6A7282] text-lg leading-7">
              The user will no longer be able to participate in community
              activities
            </Dialog.Description>
          </div>

          <div className="flex flex-col gap-8">
            {banData.map((item) => (
              <div
                className="flex items-center   gap-5 "
                onClick={() => toggleReason(item.name)}
              >
                <div className="w-5  cursor-pointer flex  rounded-full border border-white  h-5 ">
                  {selectReason.includes(item.name) && (
                    <div className="bg-[#9F0712] w-full h-full rounded-full cursor-pointer"></div>
                  )}
                </div>
                <div className="h-full flex flex-col">
                  <p className="text-slate-400 text-lg font-medium leading-5">
                    {item.name}
                  </p>
                  <p className="text-[#6A7282] text-xs leading-7">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button
              onClick={() => setBanOpen(false)}
              className="w-[45%] bg-[#000000] hover:bg-[#000000] focus:bg-[#000000] border border-[#6A7282]"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                const reasonDescription = selectReason.join(', ');
                banMutate({ userId, desc: reasonDescription });
              }}
              className="w-[45%] bg-[#9F0712] hover:bg-[#9F0712] focus:bg-[#9F0712]"
            >
              Confirm
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserManagementBanDialog;
