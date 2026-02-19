import type { IdeaStatusUpdateResponseType } from '@/app/features/user-management/types/project-idea-type';
import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useState, type ReactNode } from 'react';

type UserProjectIdeaStatusChageDialogProps = {
  trigger?: ReactNode;
  statusChangeOpen: boolean;
  setStatusChangeOpen: (open: boolean) => void;
  statusChageMutate: UseMutateFunction<
    IdeaStatusUpdateResponseType,
    AxiosError<{ message: string }>,
    { projectIdeaId: number; status: number },
    unknown
  >;
  projectIdeaId: number;
};

type Status =
  | 'Pending'
  | 'Approved'
  | 'In Progress'
  | 'Completed'
  | 'Rejected'
  | 'Deleted';
type statusChangeDataProps = { name: Status; description: string };

const UserProjectIdeaStatusChangeDialog = ({
  trigger,
  statusChangeOpen,
  setStatusChangeOpen,
  statusChageMutate,
  projectIdeaId,
}: UserProjectIdeaStatusChageDialogProps) => {
  const statusChageData: statusChangeDataProps[] = [
    {
      name: 'Pending',
      description: 'This idea remains under consideration.',
    },
    {
      name: 'Approved',
      description: 'This idea is confirmed to proceed.',
    },
    {
      name: 'In Progress',
      description: 'This idea is no longer active .',
    },

    {
      name: 'Completed',
      description: 'This idea has been fully implemented and completed.',
    },

    {
      name: 'Rejected',
      description: 'This idea has been reviewed and rejected.',
    },
    {
      name: 'Deleted',
      description: 'This idea is marked for deletion or archived.',
    },
  ];
  const [selectReason, setSelectedReason] = useState<string | null>(null);

  const toggleReason = (reason: string) => {
    setSelectedReason((pre) => (pre === reason ? null : reason));
  };

  const statusMap: Record<Status, number> = {
    Pending: 5,
    Approved: 1,
    'In Progress': 2,
    Completed: 3,
    Rejected: 0,
    Deleted: 4,
  };

  const statusColorList: Record<Status, string> = {
    Pending: 'text-[#FD9A00]',
    Approved: 'text-[#7CCF00]',
    // Archived: 'text-[#00B8DB]',
    'In Progress': 'text-[#00B8DB]',
    Completed: 'text-[#03fcdb]',
    Rejected: 'text-[#9F0712]',
    Deleted: 'text-[#6A7282]',
  };

  const statusColor = (name: Status) => statusColorList[name];
  return (
    <Dialog.Root open={statusChangeOpen} onOpenChange={setStatusChangeOpen}>
      <Dialog.Trigger>
        <button type="button" className="text-white">
          {trigger}
        </button>
      </Dialog.Trigger>

      <Dialog.Content
        size="4"
        maxWidth="580px"
        style={{
          background: 'black',
          color: 'white',
          padding: '60px',
          height: '630px',
          border: '1px solid #364153',
        }}
      >
        <div className="w-full h-full flex flex-col gap-6 ">
          <div>
            <Dialog.Title className="text-[#F9FAFB] font-medium text-xl leading-8">
              Change the idea status!
            </Dialog.Title>
            <Dialog.Description className="text-[#99A1AF] text-lg leading-7">
              Choose a status to reflect the current progress and next step of
              this idea.
            </Dialog.Description>
          </div>

          <div className="flex flex-col gap-4">
            {statusChageData.map((item) => (
              <div
                className="flex items-center   gap-5 "
                onClick={() => toggleReason(item.name)}
              >
                <div className="w-5  cursor-pointer flex  rounded-full border border-white  h-5 ">
                  {selectReason === item.name && (
                    <div className="bg-[#F3F4F6] w-full h-full rounded-full cursor-pointer"></div>
                  )}
                </div>
                <div className="h-full flex flex-col">
                  <p
                    className={` text-lg font-medium leading-5 ${statusColor(item.name)}`}
                  >
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
            <Button className="w-[45%] bg-[#000000] hover:bg-[#000000] focus:bg-[#000000] border border-[#6A7282]">
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectReason) {
                  statusChageMutate({
                    projectIdeaId,
                    status: statusMap[selectReason as Status],
                  });
                }
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

export default UserProjectIdeaStatusChangeDialog;
