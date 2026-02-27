import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useState, type ReactNode } from 'react';
import type { UserBanResponseType } from '../types/user-management.types';
import FormTextArea from '@/components/ui/form-textarea';

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
  // 1. Add state for the custom remark
  const [otherRemark, setOtherRemark] = useState('');

  const toggleReason = (reason: string) => {
    setSelectedReason((pre) =>
      pre.includes(reason) ? pre.filter((r) => r !== reason) : [...pre, reason],
    );
  };

  const handleConfirm = () => {
    // 2. Map the reasons and replace "Others" with the specific remark
    const finalReasons = selectReason.map((r) => {
      if (r === 'Others') return `${otherRemark || 'No specific reason provided'}`;
      return r;
    });

    const reasonDescription = finalReasons.join(', ');
    banMutate({ userId, desc: reasonDescription });
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
          padding: '40px 60px',
          minHeight: '508px',
          border: '1px solid #9F0712',
        }}
      >
        <div className="w-full h-full flex flex-col gap-6">
          <div>
            <Dialog.Title className="text-[#F9FAFB] font-medium text-2xl leading-8">
              Are you sure to ban this user?
            </Dialog.Title>
            <Dialog.Description className="text-[#6A7282] text-lg leading-7">
              The user will no longer be able to participate in community activities
            </Dialog.Description>
          </div>

          <div className="flex flex-col gap-6">
            {banData.map((item) => (
              <div key={item.name} className="flex flex-col gap-2">
                <div
                  className="flex items-start gap-5 cursor-pointer"
                  onClick={() => toggleReason(item.name)}
                >
                  <div className="w-5 mt-1 flex shrink-0 rounded-full border border-white h-5">
                    {selectReason.includes(item.name) && (
                      <div className="bg-[#9F0712] w-full h-full rounded-full"></div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-slate-400 text-lg font-medium leading-5">
                      {item.name}
                    </p>
                    <p className="text-[#6A7282] text-xs leading-5">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* 3. Conditional Input for "Others" */}
                {item.name === 'Others' && selectReason.includes('Others') && (
                  <div className="m mt-2" aria-disabled={item.name != 'Others'}>
                    <FormTextArea

                      className="w-full bg-zinc-900 border 
                      border-[#9F0712]-700 rounded-md p-2 text-sm 
                      text-white focus:outline-none focus:border-[#9F0712]-700 transition-colors"
                      placeholder="Please specify the reason..."
                      rows={3}
                      value={otherRemark}
                      onChange={(e) => setOtherRemark(e.target.value)}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between  pt-4">
            <Button
              onClick={() => setBanOpen(false)}
              className="w-[45%] bg-transparent hover:bg-zinc-900 border border-[#6A7282]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              // Optional: Disable button if "Others" is selected but input is empty
              disabled={selectReason.includes('Others') && !otherRemark.trim()}
              className="w-[45%] bg-[#9F0712] hover:bg-[#80060e]"
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
