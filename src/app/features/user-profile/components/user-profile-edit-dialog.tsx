import {
  editUserProfileSchema,
  type EditUserProfileType,
  type UserProfileEditResponseType,
} from '@/app/features/user-profile/types/user-profile.type';
import { Button } from '@/components/ui/button';
import { TechStacks } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogTitle } from '@radix-ui/react-dialog';
import { Avatar, Dialog } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Camera, Check, ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Controller, useForm, type Resolver } from 'react-hook-form';
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
    data.profilePictureUrl || null,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const form = useForm<Partial<EditUserProfileType>>({
    resolver: zodResolver(editUserProfileSchema.partial()) as Resolver<
      Partial<EditUserProfileType>
    >,
    defaultValues: {
      name: data.name,
      phone: data.phone || '',
      profilePictureUrl: data.profilePictureUrl || '',
      telegramUsername: data.telegramUsername || '',
      github: data.github || '',
      linkedIn: data.linkedIn || '',
      aboutDev: data.aboutDev || '',
      techStacks: (data.techStacks || []).map(normalizeTechStack),
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

  const { mutateAsync: uploadImage, isPending: isUploadingImage } = useMutation<
    { success: boolean; message: string },
    AxiosError<{ message: string }>,
    { devProfileId: number; file: File }
  >({
    mutationFn: ({
      devProfileId,
      file,
    }: {
      devProfileId: number;
      file: File;
    }) => uploadDevImageService(devProfileId, file),
    onSuccess: (success, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['user-profile', variables.devProfileId],
      });
      addToast(
        success.message || 'Profile picture uploaded successfully',
        'success',
      );
      form.reset();
    },
    onError: (error) => {
      addToast(error.message || 'Failed to upload picture', 'error');
    },
  });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);

    // Create preview URL
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
      // Upload image first if a new image was selected
      if (selectedImage) {
        await uploadImage({ devProfileId: data.dev_id, file: selectedImage });
      }

      // Merge form data with original data to ensure required fields are present
      const mergedData: EditUserProfileType = {
        ...data,
        ...formData,
      } as EditUserProfileType;

      // Update profile data
      mutate({ id: data.dev_id, formData: mergedData });
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
        <Dialog.Close disabled={isPending || isUploadingImage}>
          <X size={30} />
        </Dialog.Close>
      </div>
      <div className="flex gap-2 flex-col">
        <div className="mb-6">
          <DialogTitle className="text-[#F9FAFB] font-medium text-2xl leading-9">
            Update the user information!
          </DialogTitle>
          <p className="text-[#6A7282] text-lg leading-7">
            Modify existing user information and save the latest updates
          </p>
        </div>
        <div className="w-full flex ">
          <form onSubmit={form.handleSubmit(handleEdit)} className="w-full">
            <div className="space-y-4 w-full flex flex-row gap-6">
              <div className="flex flex-col items-center justify-start gap-4">
                <Avatar
                  size="9"
                  src={previewUrl || data?.profilePictureUrl}
                  fallback={data.name.charAt(0)}
                />
                <button
                  type="button"
                  onClick={handleImageClick}
                  className="cursor-pointer hover:opacity-70 transition-opacity"
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

              <div className="w-3/4 flex flex-col gap-4">
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormField placeholder="Enter your name" {...field} />
                  )}
                />

                <Controller
                  name="techStacks"
                  control={form.control}
                  render={({ field }) => {
                    const selectedValues = Array.isArray(field.value)
                      ? Array.from(new Set(field.value.map(normalizeTechStack)))
                      : [];
                    const handleToggleItem = (itemValue: string) => {
                      const normalizedValue = normalizeTechStack(itemValue);
                      const isSelected =
                        selectedValues.includes(normalizedValue);
                      const newSelection = isSelected
                        ? selectedValues.filter(
                            (value) => value !== normalizedValue,
                          )
                        : [...selectedValues, normalizedValue];
                      field.onChange(newSelection);
                    };

                    const handleRemoveItem = (
                      itemValue: string,
                      event: React.MouseEvent,
                    ) => {
                      event.stopPropagation();
                      const newSelection = selectedValues.filter(
                        (value) => value !== itemValue,
                      );
                      field.onChange(newSelection);
                    };

                    return (
                      <div className="relative w-full" ref={dropdownRef}>
                        <div
                          role="button"
                          tabIndex={0}
                          className="min-h-12 w-full appearance-none rounded-lg px-4 py-2
                            bg-[#FFFFFF17] border border-[#FFFFFF26]
                            text-white flex items-center justify-between gap-2
                            focus:outline-none focus:ring-2 focus:ring-purple-500"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault();
                              setIsDropdownOpen(!isDropdownOpen);
                            }
                          }}
                        >
                          <div className="flex-1 flex flex-wrap gap-1.5 items-center">
                            {selectedValues.length === 0 ? (
                              <span className="text-gray-400">
                                Select Tech Stacks
                              </span>
                            ) : (
                              selectedValues.map((name) => (
                                <span
                                  key={name}
                                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-purple-600/20 border border-purple-500/30 text-sm"
                                >
                                  {getTechStackLabel(name)}
                                  <button
                                    type="button"
                                    onClick={(e) => handleRemoveItem(name, e)}
                                    className="hover:text-red-400 transition-colors"
                                  >
                                    <X size={14} />
                                  </button>
                                </span>
                              ))
                            )}
                          </div>
                          <ChevronDown
                            size={18}
                            className="text-[#F3F4F6] shrink-0"
                          />
                        </div>

                        {isDropdownOpen && (
                          <ul className="absolute z-10 mt-1 w-full bg-[#1f2937] border border-[#374151] rounded-lg shadow-lg max-h-60 overflow-y-auto">
                            {TechStacks.map((item) => {
                              const isSelected = selectedValues.includes(
                                item.value,
                              );
                              return (
                                <li
                                  key={item.id}
                                  className="px-4 py-2 cursor-pointer text-white hover:bg-[#374151] flex items-center justify-between"
                                  onClick={() => handleToggleItem(item.value)}
                                >
                                  <span>{item.name}</span>
                                  {isSelected && (
                                    <Check
                                      size={16}
                                      className="text-purple-500"
                                    />
                                  )}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    );
                  }}
                />

                <Controller
                  name="phone"
                  control={form.control}
                  rules={{ required: 'Phone number is required' }}
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
                        onBlur={() => field.onBlur()}
                        inputProps={{
                          name: field.name,
                          id: field.name,
                          placeholder: 'Enter your phone number',
                        }}
                        containerClass="!w-full"
                        inputClass="!w-full !h-12 !pl-14 !rounded-lg !bg-[#FFFFFF17] !border !border-[#FFFFFF26] !text-[#F9FAFB] placeholder:!text-[#9CA3AF] focus:!ring-2 focus:!ring-[#9C39FC] focus:!border-[#9C39FC]"
                        buttonClass="!absolute !left-0 !top-0 !h-12 !w-12 !rounded-l-lg !border-r !border-[#FFFFFF26] !border-y-0 !border-l-0 !bg-transparent hover:!bg-[#FFFFFF10]"
                        dropdownClass="!bg-[#111827] !border !border-[#374151] !text-[#F9FAFB] !rounded-lg !shadow-xl"
                        searchClass="!bg-[#1F2937] !border !border-[#374151] !text-[#F9FAFB] !rounded-md"
                      />
                    );
                  }}
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
                    disabled={isPending || isUploadingImage}
                    onClick={() => form.reset()}
                    className="w-1/2 bg-transparent border border-[#9C39FC]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isPending || isUploadingImage}
                    className="w-1/2"
                  >
                    {isPending || isUploadingImage ? 'Updating...' : 'Update'}
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
