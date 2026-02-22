import { portfolioStatusOptions } from '@/app/features/user-management/constant/portfolio-data-change';
import { statusColorList } from '@/app/features/user-management/constant/portfolio-statu-color';
import type { ProjectPortfolioStatus } from '@/app/features/user-management/types/project-portfolio-type';
import type { PortfolioStatusResponseType } from '@/app/features/user-management/types/user-management.types';
import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import type { UseMutateFunction } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';

type UserProjectPortfolioStatusChangeDialogProps = {
  trigger?: ReactNode;
  statusChangeOpen: boolean;
  setStatusChangeOpen: (open: boolean) => void;
  portfolioStatusChange: UseMutateFunction<
    PortfolioStatusResponseType,
    AxiosError<{ message: string }>,
    { projectPortfolioId: number; status: string },
    unknown
  >;
  projectPortfolioId: number;
  currentStatus: ProjectPortfolioStatus;
};

type FormValues = {
  status: ProjectPortfolioStatus | null;
};

export const UserProjectPortfolioStatusChangeDialog = ({
  trigger,
  statusChangeOpen,
  setStatusChangeOpen,
  projectPortfolioId,
  portfolioStatusChange,
  currentStatus,
}: UserProjectPortfolioStatusChangeDialogProps) => {
  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { status: currentStatus },
  });

  const onSubmit = (data: FormValues) => {
    if (data.status) {
      portfolioStatusChange({
        projectPortfolioId,
        status: data.status,
      });
      setStatusChangeOpen(false);
    }
  };
  const statusColor = (name: ProjectPortfolioStatus) => statusColorList[name];

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
              Change the portfolio status!
            </Dialog.Title>
            <Dialog.Description className="text-[#99A1AF] text-lg leading-7">
              Choose a status to reflect the current progress and next step of
              this idea.
            </Dialog.Description>
          </div>

          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <div className="flex flex-col gap-4">
                {portfolioStatusOptions.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center gap-5 cursor-pointer"
                    onClick={() => field.onChange(item.value)}
                  >
                    <div className="w-5 flex rounded-full border border-white h-5">
                      {watch('status') === item.value && (
                        <div className="bg-[#F3F4F6] w-full h-full rounded-full" />
                      )}
                    </div>

                    <div className="h-full flex flex-col">
                      <p
                        className={`text-lg font-medium leading-5 ${statusColor(
                          item.value,
                        )}`}
                      >
                        {item.label}
                      </p>
                      <p className="text-[#6A7282] text-xs leading-7">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          />

          <div className="flex justify-between">
            <Button
              onClick={() => setStatusChangeOpen(false)}
              className="w-[45%] bg-[#000000] hover:bg-[#000000] focus:bg-[#000000] border border-[#6A7282]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
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
