import {
  editUserProfileSchema,
  type EditUserProfileType,
  type UserProfileEditResponseType,
} from '@/app/features/user-profile/types/user-profile.type';
import { Button } from '@/components/ui/button';
import { TechStacks } from '@/constants';
import { cn } from '@/lib/utils';
import { useUserInfoStore } from '@/store/user-info-store';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Avatar, Dialog } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Camera, Check, ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FormField from '../../../../components/ui/form-field';
import { useToast } from '../../../../components/ui/toast-provider';
import {
  editUserProfileService,
  uploadDevImageService,
} from '../services/user-profile.service';
import { getTechStackLabel, normalizeTechStack } from '../utils/string.utils';

export default function UserEditDialog({
  data,
  setEditDialogOpen,
}: {
  data: EditUserProfileType;
  setEditDialogOpen: (open: boolean) => void;
}) {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    data.profilePictureUrl ?? null,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { userInfo, setUserInfo } = useUserInfoStore();

  const form = useForm<Partial<EditUserProfileType>>({
    resolver: zodResolver(editUserProfileSchema.partial()),
    mode: 'onChange',
    defaultValues: {
      name: data.name,
      phone: data.phone ?? '',
      profilePictureUrl: data.profilePictureUrl ?? '',
      telegramUsername: data.telegramUsername ?? '',
      github: data.github ?? '',
      linkedIn: data.linkedIn ?? '',
      aboutDev: data.aboutDev ?? '',
      techStacks: (data.techStacks ?? []).map(normalizeTechStack),
    },
  });

  const { mutate, isPending } = useMutation<
    UserProfileEditResponseType,
    AxiosError<{ message: string }>,
    { id: number; formData: EditUserProfileType }
  >({
    mutationFn: ({ id, formData }) => editUserProfileService(id, formData),

    onSuccess: (success, data) => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
      addToast(success.message, 'success');
      form.reset();
      setEditDialogOpen(false);
      setUserInfo({
        username: data.formData.name ?? '',
        role: userInfo?.role ?? 'USER',
        userId: userInfo?.userId ?? 0,
        profile: data.formData.profilePictureUrl ?? null,
        email: userInfo?.email ?? '',
      });
    },

    onError: (error) => {
      addToast(error.message, 'error');
    },
  });

  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useMutation<
    { success: boolean; message: string },
    AxiosError<{ message: string }>,
    { devProfileId: number; file: File }
  >({
    mutationFn: ({ devProfileId, file }) =>
      uploadDevImageService(devProfileId, file),

    onSuccess: (success) => {
      queryClient.invalidateQueries({
        queryKey: ['user-profile'],
        exact: false,
      });

      addToast(success.message, 'success');
    },

    onError: (error) => {
      addToast(error.message, 'error');
    },
  });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        setPreviewUrl(e.target.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleEdit = async (formData: Partial<EditUserProfileType>) => {
    if (!data.dev_id) {
      addToast('User profile ID is missing', 'error');
      return;
    }

    try {
      if (selectedImage) {
        await uploadImage({
          devProfileId: data.dev_id,
          file: selectedImage,
        });
      }

      const mergedData: EditUserProfileType = {
        ...data,
        ...formData,
      } as EditUserProfileType;

      mutate({
        id: data.dev_id,
        formData: mergedData,
      });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Dialog.Content
      size="4"
      maxWidth="1003px"
      style={{ background: 'black', color: 'white' }}
    >
      <div className="flex items-center justify-end">
        <Dialog.Close
          className="cursor-pointer"
          disabled={isPending || isUploadingImage}
        >
          <X size={30} />
        </Dialog.Close>
      </div>

      <div className="flex flex-col gap-2">
        <div className="mb-6">
          <DialogTitle className="text-[#F9FAFB] font-medium text-2xl">
            Update the user information!
          </DialogTitle>
          <p className="text-[#6A7282] text-lg">
            Modify existing user information and save the latest updates
          </p>
        </div>

        <form onSubmit={form.handleSubmit(handleEdit)}>
          <div className="flex gap-6">
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4">
              <Avatar
                size="9"
                src={previewUrl ?? undefined}
                fallback={data.name.charAt(0)}
              />

              <button
                type="button"
                onClick={handleImageClick}
                className="cursor-pointer hover:opacity-70"
              >
                <Camera />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>

            {/* Form Fields */}
            <div className="w-3/4 flex flex-col gap-4">
              <Controller
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormField
                    placeholder="Enter your name"
                    errorMessage={form.formState.errors.name?.message}
                    {...field}
                  />
                )}
              />

              <Controller
                name="techStacks"
                control={form.control}
                render={({ field, fieldState }) => {
                  const selectedValues = Array.isArray(field.value)
                    ? Array.from(new Set(field.value.map(normalizeTechStack)))
                    : [];

                  const toggleItem = (value: string) => {
                    const normalized = normalizeTechStack(value);

                    const newSelection = selectedValues.includes(normalized)
                      ? selectedValues.filter((v) => v !== normalized)
                      : [...selectedValues, normalized];

                    field.onChange(newSelection);
                  };

                  return (
                    <div ref={dropdownRef} className="relative w-full">
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                        className={cn(
                          'min-h-12 rounded-lg px-4 py-2 bg-[#FFFFFF17] border flex justify-between items-center',
                          fieldState.error
                            ? 'border-red-500'
                            : 'border-[#FFFFFF26]',
                        )}
                      >
                        <div className="flex flex-wrap gap-1.5">
                          {selectedValues.length === 0 ? (
                            <span className="text-gray-400">
                              Select Tech Stacks
                            </span>
                          ) : (
                            selectedValues.map((name) => (
                              <span
                                key={name}
                                className="px-2 py-1 rounded bg-purple-600/20 border border-purple-500/30 text-sm"
                              >
                                {getTechStackLabel(name)}
                              </span>
                            ))
                          )}
                        </div>

                        <ChevronDown size={18} />
                      </div>
                      {isDropdownOpen && (
                        <ul className="absolute z-10 mt-1 w-full bg-[#1f2937] border border-[#374151] rounded-lg max-h-60 overflow-y-auto">
                          {TechStacks.map((item) => {
                            const selected = selectedValues.includes(
                              item.value,
                            );

                            return (
                              <li
                                key={item.id}
                                onClick={() => toggleItem(item.value)}
                                className="px-4 py-2 cursor-pointer hover:bg-[#374151] flex justify-between"
                              >
                                <span>{item.name}</span>
                                {selected && <Check size={16} />}
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {/* ✅ ERROR MESSAGE */}
                      {fieldState.error && (
                        <p className="text-sm text-red-400 mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </div>
                  );
                }}
              />

              {/* PHONE */}
              <Controller
                name="phone"
                control={form.control}
                render={({ field }) => {
                  const phoneValue =
                    typeof field.value === 'string'
                      ? field.value.replace(/\D/g, '')
                      : '';

                  return (
                    <PhoneInput
                      country="mm"
                      value={phoneValue}
                      onChange={(value) =>
                        field.onChange(value ? `+${value}` : '')
                      }
                      containerClass="!w-full"
                      inputClass="!w-full !h-12 !pl-14 !rounded-lg !bg-[#FFFFFF17] !border !border-[#FFFFFF26]"
                    />
                  );
                }}
              />

              <Controller
                name="telegramUsername"
                control={form.control}
                render={({ field }) => (
                  <FormField placeholder="Telegram username" {...field} />
                )}
              />

              <Controller
                name="github"
                control={form.control}
                render={({ field }) => (
                  <FormField placeholder="Github URL" {...field} />
                )}
              />

              <Controller
                name="linkedIn"
                control={form.control}
                render={({ field }) => (
                  <FormField placeholder="LinkedIn URL" {...field} />
                )}
              />

              <Controller
                name="aboutDev"
                control={form.control}
                render={({ field }) => (
                  <FormField placeholder="Description" {...field} />
                )}
              />

              {/* ACTIONS */}
              <div className="flex gap-6 mt-4">
                <Dialog.Close>
                  <Button
                    type="button"
                    className="w-1/2 bg-transparent border border-[#9C39FC]"
                    disabled={isPending || isUploadingImage}
                  >
                    Cancel
                  </Button>
                </Dialog.Close>

                <Button
                  type="submit"
                  disabled={
                    isPending || isUploadingImage || !form.formState.isValid
                  }
                  className={cn(
                    'w-1/2',
                    (isPending ||
                      isUploadingImage ||
                      !form.formState.isValid) &&
                      'opacity-50 cursor-not-allowed',
                  )}
                >
                  {isPending || isUploadingImage ? 'Updating...' : 'Update'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dialog.Content>
  );
}
