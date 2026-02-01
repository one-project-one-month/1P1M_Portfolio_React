import Button from '@/app/features/auth/login/components/button';
import {
  useEditUserManagement,
  useGetUserManagementDetail,
} from '@/app/features/user-management/hook/use-user-management';
import { type EditUserManagementType } from '@/app/features/user-management/types/user-management.types';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import FormDropdown from '@/components/ui/form-dropdown';
import FormField from '@/components/ui/form-field';
import { TechStacks } from '@/constants';
import { Dialog } from '@radix-ui/themes';
import { useEffect, type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
type UserManagementEditDialogProps = {
  trigger?: ReactNode;
  userId: number;
};

const UserManagementEdit = ({
  trigger,
  userId,
}: UserManagementEditDialogProps) => {
  const { mutate: editUser, isPending } = useEditUserManagement();
  const { data: userDetail } = useGetUserManagementDetail(userId);
  const { control, handleSubmit, reset } = useForm<EditUserManagementType>({
    defaultValues: {
      username: '',
      email: '',
      role: '',
      phone: '',
      telegramUsername: '',
      gitHub_url: '',
      linkedIn_url: '',
    },
  });

  useEffect(() => {
    if (userDetail?.data) {
      reset({
        username: userDetail.data.username,
        email: userDetail.data.email,
        role: userDetail.data.role,
        phone: userDetail.data.phone ?? '',
        telegramUsername: userDetail.data.telegramUsername ?? '',
        gitHub_url: userDetail.data.gitHub_url ?? '',
        linkedIn_url: userDetail.data.linkedIn_url ?? '',
      });
    }
  }, [userDetail, reset]);

  const onSubmit = (data: EditUserManagementType) => {
    editUser({
      id: userId,
      data,
    });
  };
  return (
    <Dialog.Root
      onOpenChange={(open) => {
        if (open && userDetail?.data) {
          reset({
            username: userDetail.data.username,
            email: userDetail.data.email,
            role: userDetail.data.role,
            phone: userDetail.data.phone,
            telegramUsername: userDetail.data.telegramUsername,
            gitHub_url: userDetail.data.gitHub_url,
            linkedIn_url: userDetail.data.linkedIn_url,
          });
        }
      }}
    >
      <Dialog.Trigger>{trigger || <>View Detail</>}</Dialog.Trigger>

      <Dialog.Content
        size="4"
        maxWidth="1003px"
        style={{ background: 'black', color: 'white', padding: '60px' }}
      >
        <div className="flex gap-2 flex-col">
          <h1 className="text-[#F9FAFB] font-medium text-2xl leading-9">
            Update the user information!
          </h1>
          <p className="text-[#6A7282] text-lg leading-7">
            Modiy existing user information and save the latest updates
          </p>
          <div className="w-full flex ">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-4 w-full flex flex-row gap-6">
                <img
                  src={sampleUserImgUrl}
                  className="w-[232px] h-[232px]  rounded-3xl"
                />
                <div className="w-full flex flex-col gap-[24px]">
                  <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                      <FormField placeholder="Bora" {...field} />
                    )}
                  />

                  <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                      <FormDropdown
                        placeholder="Role"
                        menuList={TechStacks}
                        selectedValue={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <FormField placeholder="Email" {...field} />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        country="mm"
                        inputClass="!bg-[#374151] !w-full !h-12 !text-white"
                      />
                    )}
                  />

                  <Controller
                    name="telegramUsername"
                    control={control}
                    render={({ field }) => (
                      <FormField placeholder="@bora" {...field} />
                    )}
                  />

                  <Controller
                    name="gitHub_url"
                    control={control}
                    render={({ field }) => (
                      <FormField placeholder="www.github.com/bora" {...field} />
                    )}
                  />

                  <Controller
                    name="linkedIn_url"
                    control={control}
                    render={({ field }) => (
                      <FormField
                        placeholder="www.linkedin.com/in/bora"
                        {...field}
                      />
                    )}
                  />

                  <div className="flex justify-between">
                    <Button className="w-[40%]">Cancel</Button>
                    <Button className="w-[40%]">
                      {isPending ? 'Updating....' : 'Update'}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default UserManagementEdit;
