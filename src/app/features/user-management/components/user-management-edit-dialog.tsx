import Button from '@/app/features/auth/login/components/button';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import FormDropdown from '@/components/ui/form-dropdown';
import FormField from '@/components/ui/form-field';
import { TechStacks } from '@/constants';
import { Dialog } from '@radix-ui/themes';
import { type ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
type UserManagementEditDialogProps = {
  trigger?: ReactNode;
};

const UserManagementEdit = ({ trigger }: UserManagementEditDialogProps) => {
  const { control, handleSubmit } = useForm({});

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Dialog.Root>
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
                    name="name"
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
                    name="phone"
                    control={control}
                    rules={{ required: 'Phone number is required' }}
                    render={({ field }) => (
                      <PhoneInput
                        {...field}
                        country="mm"
                        inputClass="!bg-[#374151] !w-full !h-12 !text-white"
                      />
                    )}
                  />

                  <Controller
                    name="telegram"
                    control={control}
                    render={({ field }) => (
                      <FormField placeholder="@bora" {...field} />
                    )}
                  />

                  <Controller
                    name="github"
                    control={control}
                    render={({ field }) => (
                      <FormField placeholder="www.github.com/bora" {...field} />
                    )}
                  />

                  <Controller
                    name="linkedin"
                    control={control}
                    render={({ field }) => (
                      <FormField
                        placeholder="www.linkedin/in/bora"
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="linkedin"
                    control={control}
                    render={({ field }) => (
                      <FormField placeholder="something" {...field} />
                    )}
                  />
                  <div className="flex justify-between">
                    <Button className="w-[40%]">Cancel</Button>
                    <Button className="w-[40%]">Update</Button>
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
