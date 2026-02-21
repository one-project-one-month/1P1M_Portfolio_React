import { statusChageData } from '@/app/features/user-management/constant/status-change-data';
import { statusColorList } from '@/app/features/user-management/constant/status.color';
import {
  statusMap,
  type IdeaStatusUpdateResponseType,
  type Status,
} from '@/app/features/user-management/types/project-idea-type';
import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
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
  currentStatus: Status;
};

type FormValues = {
  status: Status | null;
};
export const UserProjectIdeaStatusChangeDialog = ({
  trigger,
  statusChangeOpen,
  setStatusChangeOpen,
  statusChageMutate,
  projectIdeaId,
  currentStatus,
}: UserProjectIdeaStatusChageDialogProps) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { status: currentStatus },
  });

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
        <div className="w-full h-full flex flex-col gap-6">
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
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <>
                  {statusChageData.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-5 cursor-pointer"
                      onClick={() => field.onChange(item.name)}
                    >
                      <div className="w-5 h-5 flex rounded-full border border-white">
                        {field.value === item.name && (
                          <div className="bg-[#F3F4F6] w-full h-full rounded-full"></div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <p
                          className={`text-lg font-medium leading-5 ${statusColor(item.name as Status)}`}
                        >
                          {item.label}
                        </p>
                        <p className="text-[#6A7282] text-xs leading-7">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </>
              )}
            />
          </div>

          <div className="flex justify-between">
            <Button className="w-[45%] bg-[#000000] hover:bg-[#000000] focus:bg-[#000000] border border-[#6A7282]">
              Cancel
            </Button>
            <Button
              onClick={handleSubmit((data) => {
                if (data.status) {
                  statusChageMutate(
                    {
                      projectIdeaId,
                      status: statusMap[data.status as Status],
                    },
                    {
                      onSuccess: () => {
                        setStatusChangeOpen(false);
                      },
                    },
                  );
                }
              })}
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
