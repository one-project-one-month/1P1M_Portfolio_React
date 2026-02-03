import Button from '@/app/features/auth/login/components/button';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import FormDropdown from '@/components/ui/form-dropdown';
import FormField from '@/components/ui/form-field';
import { useToast } from '@/components/ui/toast-provider';
import { TechStacks } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import { editUserManagementService } from '../services/user-management.service';
import {
  editUserSchema,
  type EditUserManagementType,
  type UserManagementEditFormPropsType,
  type UserManagementEditResponseType,
} from '../types/user-management.types';

const UserManagementEditDialog = ({
  trigger,
  data,
  editDialogOpen,
  setEditDialogOpen,
}: UserManagementEditFormPropsType & {
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const form = useForm<Partial<EditUserManagementType>>({
    resolver: zodResolver(editUserSchema.partial()) as Resolver<
      Partial<EditUserManagementType>
    >,
    defaultValues: {
      name: data.name,
      phone: data.phone,
      role: data.role,
      profilePictureUrl: data.profilePictureUrl,
      telegramUsername: data.telegramUsername,
      githubUrl: data.githubUrl,
      linkedInUrl: data.linkedInUrl,
      description: data.description,
      status: data.status || 'ACTIVE',
    },
    mode: 'onSubmit',
  });

  const { mutate, isPending } = useMutation<
    UserManagementEditResponseType,
    AxiosError<{ message: string }>,
    { id: number; formData: EditUserManagementType }
  >({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: EditUserManagementType;
    }) => editUserManagementService(id, formData),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      addToast(success.message, 'success');
      form.reset();
    },
    onError: (error) => {
      addToast(error.message, 'error');
    },
  });

  const handleEdit = (formData: Partial<EditUserManagementType>) => {
    if (!data.id) {
      addToast('Project idea ID is missing', 'error');
      return;
    }
    mutate({ id: data.id, formData: formData as EditUserManagementType });
  };

  return (
    <Dialog.Root
      open={editDialogOpen}
      onOpenChange={(isOpen) => setEditDialogOpen(isOpen)}
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
            Modify existing user information and save the latest updates
          </p>
          <div className="w-full flex ">
            <form onSubmit={form.handleSubmit(handleEdit)} className="w-full">
              <div className="space-y-4 w-full flex flex-row gap-6">
                <img
                  src={sampleUserImgUrl}
                  className="w-[232px] h-[232px]  rounded-3xl"
                />
                <div className="w-full flex flex-col gap-[24px]">
                  <Controller
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormField placeholder="Bora" {...field} />
                    )}
                  />

                  <Controller
                    name="role"
                    control={form.control}
                    render={({ field }) => (
                      <FormDropdown
                        placeholder="Role"
                        menuList={TechStacks}
                        selectedValue={
                          TechStacks.find(
                            (item) => item.name === field.value,
                          ) || null
                        }
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <Controller
                    name="phone"
                    control={form.control}
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
                    name="telegramUsername"
                    control={form.control}
                    render={({ field }) => (
                      <FormField
                        placeholder="Enter your telegram username"
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="githubUrl"
                    control={form.control}
                    render={({ field }) => (
                      <FormField
                        placeholder="Enter your github url"
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="linkedInUrl"
                    control={form.control}
                    render={({ field }) => (
                      <FormField
                        placeholder="Enter your linkedin url"
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormField placeholder="Enter description" {...field} />
                    )}
                  />
                  <div className="flex justify-between">
                    <Button className="w-[40%]">Cancel</Button>
                    <Button disabled={isPending} className="w-[40%]">
                      {isPending ? 'Updating...' : 'Update'}
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

export default UserManagementEditDialog;
