'use client';
import { FormField } from '@/app/features/admin-profile/components/form-field.tsx';
import { InfoCard } from '@/app/features/admin-profile/components/info-card.tsx';
import { useProfile } from '@/app/features/admin-profile/hooks/user-profile.ts';
import { useUserInfoStore } from '@/store/user-info-store.ts';
import { MinusCircle, Plus } from 'lucide-react';
import React, { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';

export default function ProfilePage() {
  const userId: number = useUserInfoStore((state) => state.userInfo?.userId);

  const {
    form,
    fields,
    append,
    remove,
    isEditing,
    isLoading,
    handleEdit,
    handleCancel,
    handleSubmit,
  } = useProfile(userId);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { setValue, watch } = form;

  const firstName = watch('firstName');
  const lastName = watch('lastName');
  const email = watch('email');
  const avatarPreview = watch('avatarUrl') || 'https://i.pravatar.cc/300';
  const fullName =
    firstName || lastName ? `${firstName} ${lastName}` : 'User Profile';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue('avatarFile', file, { shouldValidate: true });
      const localUrl = URL.createObjectURL(file);
      setValue('avatarUrl', localUrl);
    }
  };

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);
  return (
    <div className="relative min-h-screen font-sans text-white overflow-y-auto">
      <div className="relative z-10 p-4 md:p-8">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Profile</h2>
              <p className="text-gray-400 mt-1">
                Manage your account settings.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Sidebar Info */}
              <div className="col-span-12 md:col-span-4 xl:col-span-3">
                <div className="bg-[#15192b] border border-gray-800 rounded-lg p-6 text-center sticky top-8">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />

                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl mb-4 overflow-hidden shadow-xl ring-4 ring-[#252841] relative group">
                    <img
                      src={avatarPreview}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="text-green-400 text-sm font-medium mb-1 uppercase tracking-wide">
                    Admin
                  </p>
                  {/* Dynamic Name and Email */}
                  <h3 className="text-white text-xl font-bold">{fullName}</h3>
                  <p className="text-gray-400 text-sm mt-1">{email}</p>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 text-xs bg-[#252841] hover:bg-[#a855f7]/20 text-white px-3 py-1.5 rounded border border-gray-700"
                    >
                      Change Avatar
                    </button>
                  )}
                </div>
              </div>

              {/* Form Content */}
              <div className="col-span-12 md:col-span-8 xl:col-span-9 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InfoCard title="Personal Information">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        name="firstName"
                        label="First Name"
                        disabled={!isEditing}
                      />
                      <FormField
                        name="lastName"
                        label="Last Name"
                        disabled={!isEditing}
                      />
                    </div>
                    <FormField
                      name="email"
                      label="Email Address"
                      disabled={!isEditing}
                    />
                    <FormField
                      name="phoneNumber"
                      label="Phone Number"
                      disabled={!isEditing}
                    />
                    <FormField name="role" label="Role" disabled={true} />
                  </InfoCard>

                  <InfoCard title="Social Media Account">
                    <div className="space-y-1">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="relative flex items-end gap-2 group"
                        >
                          <div className="flex-1">
                            <FormField
                              name={`socialAccounts.${index}.url`}
                              label={field.platform || 'URL'}
                              disabled={!isEditing}
                            />
                          </div>
                          {isEditing && (
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="mb-6 p-1 text-red-500"
                            >
                              <MinusCircle size={20} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                    {isEditing && (
                      <div className="relative mt-4 group">
                        <button
                          type="button"
                          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#a855f7]/20 text-white border border-[#a855f7]/30"
                        >
                          <Plus size={16} /> Add Account
                        </button>
                        <div className="invisible group-hover:visible absolute top-full left-0 w-full bg-[#252841] border border-gray-700 rounded-lg shadow-xl z-50">
                          {['Telegram', 'GitHub', 'LinkedIn'].map((p) => (
                            <button
                              key={p}
                              type="button"
                              onClick={() => append({ platform: p, url: '' })}
                              className="w-full text-left px-4 py-3 text-sm hover:bg-[#a855f7]"
                            >
                              {p}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </InfoCard>
                </div>

                <div className="flex justify-end pt-4 gap-4">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="bg-[#8b5cf6] px-10 py-2.5 rounded-lg"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-[#1f2937] px-8 py-2.5 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#8b5cf6] px-8 py-2.5 rounded-lg disabled:opacity-50"
                      >
                        {isLoading ? 'Updating...' : 'Update Profile'}
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
