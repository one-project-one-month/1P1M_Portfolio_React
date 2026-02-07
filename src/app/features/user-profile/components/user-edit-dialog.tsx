import {
  editUserProfileSchema,
  type EditUserProfileType,
  type UserProfileEditResponseType,
} from '@/app/features/user-profile/types/user-profile.type';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import { TechStacks } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Camera, X } from 'lucide-react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import FormField from '../../../../components/ui/form-field';
import MultiSelectDropdown from '../../../../components/ui/multi-select-dropdown';
import { useToast } from '../../../../components/ui/toast-provider';
import { editUserProfileService } from '../services/user-profile.service';

export default function UserEditDialog({
  data,
  setEditDialogOpen,
}: {
  data: EditUserProfileType;
  setEditDialogOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const form = useForm<Partial<EditUserProfileType>>({
    resolver: zodResolver(editUserProfileSchema.partial()) as Resolver<
      Partial<EditUserProfileType>
    >,
    defaultValues: {
      name: data.name,
      phone: data.phone,
      profilePictureUrl: data.profilePictureUrl,
      telegramUsername: data.telegramUsername,
      github: data.github,
      linkedIn: data.linkedIn,
      aboutDev: data.aboutDev,
      techStacks: data.techStacks,
    },
    mode: 'onSubmit',
  });

  const { mutate, isPending } = useMutation<
    UserProfileEditResponseType,
    AxiosError<{ message: string }>,
    { id: number; formData: EditUserProfileType }
  >({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number;
      formData: EditUserProfileType;
    }) => editUserProfileService(id, formData),
    onSuccess: (success, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['user-profile', variables.id],
      });
      addToast(success.message, 'success');
      setEditDialogOpen(false);
      form.reset();
    },
    onError: (error) => {
      addToast(error.message, 'error');
    },
  });

  const handleEdit = (formData: Partial<EditUserProfileType>) => {
    if (!data.dev_id) {
      addToast('User profile ID is missing', 'error');
      return;
    }

    // Merge form data with original data to ensure required fields are present
    const mergedData: EditUserProfileType = {
      ...data,
      ...formData,
    } as EditUserProfileType;

    mutate({ id: data.dev_id, formData: mergedData });
  };

  return (
    <Dialog.Content
      size="4"
      maxWidth="1003px"
      style={{ background: 'black', color: 'white' }}
    >
      <div className="flex items-center justify-end">
        <Dialog.Close>
          <X size={30} />
        </Dialog.Close>
      </div>
      <div className="flex gap-2 flex-col">
        <div className="mb-6">
          <h1 className="text-[#F9FAFB] font-medium text-2xl leading-9">
            Update the user information!
          </h1>
          <p className="text-[#6A7282] text-lg leading-7">
            Modify existing user information and save the latest updates
          </p>
        </div>
        <div className="w-full flex ">
          <form onSubmit={form.handleSubmit(handleEdit)} className="w-full">
            <div className="space-y-4 w-full flex flex-row gap-6">
              <div className="flex flex-col items-center justify-start gap-4">
                <img src={sampleUserImgUrl} className="size-60 rounded-3xl" />
                <Camera />
              </div>

              <div className="w-3/4 flex flex-col gap-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormField placeholder="Bora" {...field} />
                  )}
                />

                <Controller
                  name="techStacks"
                  control={form.control}
                  render={({ field }) => (
                    <MultiSelectDropdown
                      placeholder="Select Tech Stacks"
                      menuList={TechStacks}
                      selectedValues={field.value || []}
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
                  name="github"
                  control={form.control}
                  render={({ field }) => (
                    <FormField placeholder="Enter your github url" {...field} />
                  )}
                />

                <Controller
                  name="linkedIn"
                  control={form.control}
                  render={({ field }) => (
                    <FormField
                      placeholder="Enter your linkedin url"
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="aboutDev"
                  control={form.control}
                  render={({ field }) => (
                    <FormField placeholder="Enter description" {...field} />
                  )}
                />
                <div className="flex items-center gap-6 mt-4 justify-between">
                  <Button
                    type="button"
                    onClick={() => form.reset()}
                    className="w-1/2 bg-transparent border border-[#9C39FC]"
                  >
                    Cancel
                  </Button>
                  <Button disabled={isPending} className="w-1/2">
                    {isPending ? 'Updating...' : 'Update'}
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Dialog.Content>
  );
}
