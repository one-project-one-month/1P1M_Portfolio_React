import Button from '@/app/features/auth/login/components/button';
import { useEditUserManagement } from '@/app/features/user-management/hook/use-user-management';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import FormDropdown from '@/components/ui/form-dropdown';
import FormField from '@/components/ui/form-field';
import { TechStacks } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/themes';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import {
  editUserSchema,
  type EditUserManagementType,
  type UserManagementEditFormPropsType,
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
  // const queryClient = useQueryClient();
  // const { addToast } = useToast();

  const { mutate, isPending } = useEditUserManagement();

  // const form = useForm<Partial<EditUserManagementType>>({
  //   resolver: zodResolver(editUserSchema.partial()) as Resolver<
  //     Partial<EditUserManagementType>
  //   >,
  //   defaultValues: {
  //     name: data.name,
  //     phone: data.phone,
  //     role: data.role,
  //     profilePictureUrl: data.profilePictureUrl,
  //     telegramUsername: data.telegramUsername,
  //     githubUrl: data.githubUrl,
  //     linkedUrl: data.linkedUrl,
  //     description: data.description,
  //     status: data.status || 'ACTIVE',
  //   },
  //   mode: 'onSubmit',
  // });

  const form = useForm<Partial<EditUserManagementType>>({
    resolver: zodResolver(editUserSchema.partial()),
    defaultValues: {
      username: data.name || '',
      phone: data.phone || '',
      role: data.role || '',
      // profilePictureUrl: data.profilePictureUrl || '',
      telegramUsername: data.telegramUsername || '',
      github_url: data.githubUrl || '',
      linkedIn_url: data.linkedUrl || '',
      description: data.description || '',
      status: data.status || 'ACTIVE',
    },
    mode: 'onSubmit',
  });

  // const { mutate, isPending } = useMutation<
  //   UserManagementEditResponseType,
  //   AxiosError<{ message: string }>,
  //   { id: number; formData: EditUserManagementType }
  // >({
  //   mutationFn: ({
  //     id,
  //     formData,
  //   }: {
  //     id: number;
  //     formData: EditUserManagementType;
  //   }) => editUserManagementService(id, formData),
  //   onSuccess: (success) => {
  //     queryClient.invalidateQueries({ queryKey: ['user-management'] });
  //     addToast(success.message, 'success');
  //     form.reset();
  //   },
  //   onError: (error) => {
  //     addToast(error.message, 'error');
  //   },
  // });

  const handleEdit = (formData: Partial<EditUserManagementType>) => {
    if (!data.userId) {
      // addToast('Project idea ID is missing', 'error');
      return;
    }
    mutate(
      {
        userId: data.userId,
        formData: formData as EditUserManagementType,
      },
      {
        onSuccess: () => setEditDialogOpen(false),
      },
    );
  };

  return (
    <Dialog.Root
      open={editDialogOpen}
      onOpenChange={(isOpen) => setEditDialogOpen(isOpen)}
    >
      <Dialog.Trigger>
        <button type="button" className="text-white">
          {trigger}
        </button>
        {/* {trigger || <div>View Detail</div>} */}
      </Dialog.Trigger>

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
                    name="username"
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
                    name="github_url"
                    control={form.control}
                    render={({ field }) => (
                      <FormField
                        placeholder="Enter your github url"
                        {...field}
                      />
                    )}
                  />

                  <Controller
                    name="linkedIn_url"
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
                    <Button
                      className="w-[40%]"
                      onClick={() => setEditDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isPending}
                      className="w-[40%]"
                    >
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
