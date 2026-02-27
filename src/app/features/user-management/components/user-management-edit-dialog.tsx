import Button from '@/app/features/auth/login/components/button';
import {
  useEditUserManagement,
  useUploadImage,
} from '@/app/features/user-management/hook/use-user-management';
import {
  getTechStackLabel,
  normalizeTechStack,
} from '@/app/features/user-profile/utils/string.utils';
import FormField from '@/components/ui/form-field';
import { TechStacks } from '@/constants';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/themes';
import { Camera, Check, ChevronDown, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

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
  const { mutate, isPending } = useEditUserManagement();
  const { mutate: uploadImage } = useUploadImage();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    data.profilePictureUrl ?? null,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const form = useForm<Partial<EditUserManagementType>>({
    resolver: zodResolver(editUserSchema.partial()),
    defaultValues: {
      username: data.name || '',
      phone: data.phone || '',
      profilePictureUrl: data.profilePictureUrl || '',
      telegramUsername: data.telegramUsername || '',
      github_url: data.githubUrl || '',
      linkedIn_url: data.linkedUrl || '',
      description: data.description || '',
      status: data.status || 'ACTIVE',
      techStack: (data.techStack ?? []).map(normalizeTechStack),
    },
    mode: 'onSubmit',
  });

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !data.devId) return;

    setSelectedImage(file);
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    uploadImage({
      devProfileId: data.devId,
      file,
    });
  };
  const handleEdit = async (formData: Partial<EditUserManagementType>) => {
    if (!data.userId) return;

    if (selectedImage) {
      await uploadImage({
        devProfileId: data.devId,
        file: selectedImage,
      });
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
      </Dialog.Trigger>
      <Dialog.Content
        size="4"
        maxWidth="1003px"
        style={{ background: 'black', color: 'white', padding: '60px' }}
      >
        <div className="flex gap-7 flex-col">
          <div className="flex justify-between ">
            <div className="flex flex-col gap-1">
              <Dialog.Title className="text-[#F9FAFB] font-medium text-2xl leading-8">
                Update the user information!
              </Dialog.Title>

              <Dialog.Description className="text-[#6A7282] text-lg leading-7">
                Modify existing user information and save the latest updates
              </Dialog.Description>
            </div>
            <X
              size={30}
              onClick={() => setEditDialogOpen(false)}
              className="cursor-pointer"
            />
          </div>

          <div className="w-full flex ">
            <form onSubmit={form.handleSubmit(handleEdit)} className="w-full">
              <div className=" w-full flex flex-row gap-6">
                <div className="flex w-[250px] flex-col items-center">
                  <img
                    src={previewUrl ?? '/placeholder.png'}
                    className="w-[200px] h-[200px] rounded-2xl object-cover cursor-pointer"
                  />

                  <div className="mt-6 items-center cursor-pointer">
                    <Camera onClick={handleImageClick} />
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>

                <div className="w-full flex flex-col gap-[24px]">
                  <Controller
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormField placeholder="Bora" {...field} />
                    )}
                  />

                  <Controller
                    name="techStack"
                    control={form.control}
                    render={({ field, fieldState }) => {
                      const selectedValues = Array.isArray(field.value)
                        ? Array.from(
                            new Set(field.value.map(normalizeTechStack)),
                          )
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
                          containerClass="!w-full user-management-phone-input"
                          inputClass="!w-full !h-12 !pl-16 !rounded-lg !bg-[#FFFFFF17] !border !border-[#FFFFFF26] !text-white"
                          buttonClass="!bg-[#FFFFFF17] hover:!bg-[#FFFFFF17] focus:!bg-[#FFFFFF17] active:!bg-[#FFFFFF17] !border !border-[#FFFFFF26] !rounded-l-lg !p-2"
                          dropdownClass="!bg-[#111827] !text-white !border !border-[#374151]"
                          searchClass="!bg-[#1F2937] !text-white !border !border-[#374151]"
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

                  <div className="flex gap-6 mt-4">
                    <Dialog.Close>
                      <Button
                        type="button"
                        className="w-1/2 bg-transparent border border-[#9C39FC]"
                        disabled={isPending}
                      >
                        Cancel
                      </Button>
                    </Dialog.Close>

                    <Button
                      type="submit"
                      disabled={isPending || !form.formState.isValid}
                      className={cn(
                        'w-1/2',
                        (isPending || !form.formState.isValid) &&
                          'opacity-50 cursor-not-allowed',
                      )}
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
