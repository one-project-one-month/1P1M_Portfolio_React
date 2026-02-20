'use client';
import { FormField } from '@/app/features/admin-profile/components/form-field.tsx';
import { InfoCard } from '@/app/features/admin-profile/components/info-card.tsx';
import { useProfile } from '@/app/features/admin-profile/hooks/user-profile.ts';
import { useUserInfoStore } from '@/store/user-info-store.ts';
import { MinusCircle, Plus } from 'lucide-react';
import React from 'react';
import { FormProvider } from 'react-hook-form';

export default function ProfilePage() {
  const user = useUserInfoStore((state) => state.userInfo);
  const userID = user?.userId ? parseInt(String(user.userId)) : null;

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
  } = useProfile(userID);

  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { setValue, watch } = form;

  const avatarUrl = watch('avatarUrl');
  const fullName = watch('name');
  const email = watch('email');
  const techStacks = watch('techStacks') || [];

  const displayAvatar = avatarUrl;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const localPreviewUrl = URL.createObjectURL(file);

      setValue('avatarUrl', localPreviewUrl);

      setValue('avatarFile', file, { shouldDirty: true });
    }
  };

  const addTechStack = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = e.currentTarget.value.trim();
      if (value && !techStacks.includes(value)) {
        setValue('techStacks', [...techStacks, value], {
          shouldDirty: true,
          shouldValidate: true,
        });
        e.currentTarget.value = '';
      }
    }
  };

  const removeTechStack = (stackToRemove: string) => {
    setValue(
      'techStacks',
      techStacks.filter((s) => s !== stackToRemove),
      { shouldDirty: true },
    );
  };

  return (
    <div className="relative min-h-screen font-sans text-white overflow-y-auto">
      <div className="relative z-10 p-4 md:p-8">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Profile</h2>
              <p className="text-gray-400 mt-1">Manage your settings.</p>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* --- LEFT COLUMN: Profile & Tech Stacks --- */}
              <div className="col-span-12 md:col-span-4 xl:col-span-3 space-y-6">
                {/* Avatar Card */}
                <div className="bg-[#15192b] border border-gray-800 rounded-xl p-6 text-center shadow-lg">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    className="hidden"
                  />
                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 overflow-hidden shadow-xl ring-4 ring-[#252841] relative group">
                    <img
                      src={displayAvatar}
                      alt="Avatar"
                      className="w-full h-full object-cover opacity-90 transition-opacity"
                    />
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Plus size={24} />
                      </button>
                    )}
                  </div>
                  <h3 className="text-white text-xl font-bold">{fullName}</h3>
                  <p className="text-gray-400 text-sm">{email}</p>
                </div>

                {/* Tech Stacks Card  */}
                <div className="bg-[#15192b] border border-gray-800 rounded-xl p-6 shadow-lg">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-4">
                    Expertise
                  </h4>
                  <div className="space-y-4">
                    {isEditing && (
                      <input
                        type="text"
                        placeholder="Add skill + Enter"
                        onKeyDown={addTechStack}
                        className="w-full bg-[#1e2235] border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#a855f7] transition-colors"
                      />
                    )}
                    <div className="flex flex-wrap gap-2">
                      {techStacks.length > 0 ? (
                        techStacks.map((stack) => (
                          <span
                            key={stack}
                            className="flex items-center gap-2 bg-[#a855f7]/10 text-[#a855f7] border border-[#a855f7]/20 px-3 py-1 rounded-md text-xs font-medium"
                          >
                            {stack}
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => removeTechStack(stack)}
                              >
                                <MinusCircle
                                  size={12}
                                  className="text-red-400 hover:text-red-500"
                                />
                              </button>
                            )}
                          </span>
                        ))
                      ) : (
                        <p className="text-xs text-gray-500 italic">
                          No skills listed
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Forms */}
              <div className="col-span-12 md:col-span-8 xl:col-span-9 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <InfoCard title="Personal Information">
                    <FormField
                      name="name"
                      label="Full Name"
                      disabled={!isEditing}
                    />
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

                  {/* Social Accounts */}
                  <InfoCard title="Social Media Account">
                    <div className="space-y-1">
                      {fields.map((field, index) => {
                        const isTelegram = field.platform === 'Telegram';

                        return (
                          <div
                            key={field.id}
                            className="relative flex items-end gap-2 group"
                          >
                            <div className="flex-1">
                              <FormField
                                name={`socialAccounts.${index}.url`}
                                // Dynamic label based on platform
                                label={
                                  isTelegram
                                    ? 'Telegram Username'
                                    : `${field.platform} URL`
                                }
                                disabled={!isEditing}
                                // Dynamic placeholder
                                placeholder={
                                  isTelegram ? '@username' : 'https://...'
                                }
                              />
                            </div>
                            {isEditing && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="mb-6 p-1 text-red-500 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors"
                              >
                                <MinusCircle size={20} />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {isEditing && (
                      <div className="relative mt-4">
                        <div className="group relative">
                          <button
                            type="button"
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#a855f7]/20 text-white hover:bg-[#a855f7]/30 transition-all font-medium text-sm border border-[#a855f7]/30 group-hover:border-[#a855f7]/60"
                          >
                            <Plus size={16} /> Add Social Media Account
                          </button>

                          {/* Improved Dropdown: Added transition and better positioning */}
                          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute top-full left-0 w-full mb-2 bg-[#1e2235] border border-gray-700 rounded-lg shadow-2xl overflow-hidden z-50 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                            <div className="py-1">
                              {[
                                'Telegram',
                                'GitHub',
                                'Behance',
                                'LinkedIn',
                              ].map((platform) => {
                                // Check if platform is already added to prevent duplicates (Optional but professional)
                                const isAdded = fields.some(
                                  (f) => f.platform === platform,
                                );

                                return (
                                  <button
                                    key={platform}
                                    type="button"
                                    disabled={isAdded}
                                    onClick={() =>
                                      append({ platform, url: '' })
                                    }
                                    className={`w-full text-left px-4 py-3 text-sm transition-colors border-b border-gray-700/50 last:border-0 flex justify-between items-center
                    ${
                      isAdded
                        ? 'text-gray-500 cursor-not-allowed bg-black/10'
                        : 'text-gray-200 hover:bg-[#a855f7] hover:text-white'
                    }`}
                                  >
                                    {platform}
                                    {isAdded && (
                                      <span className="text-[10px] uppercase font-bold opacity-50">
                                        Added
                                      </span>
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </InfoCard>
                </div>

                {/* Preferences & Other */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <InfoCard title="Preference">
                    <FormField
                      name="joinedDate"
                      label="Joined Date"
                      disabled={true}
                    />
                    <FormField
                      name="languagePreference"
                      label="Language Preference"
                      disabled={true}
                    />
                  </InfoCard>
                  <InfoCard title="Other">
                    <FormField
                      name="passwordLastUpdated"
                      label="Password Last Updated"
                      disabled={true}
                    />
                  </InfoCard>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end pt-4 gap-4">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="bg-[#8b5cf6] px-10 py-2.5 rounded-lg font-medium"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-[#1f2937] px-8 py-2.5 rounded-lg font-medium border border-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 py-2.5 rounded-lg font-medium disabled:opacity-50"
                      >
                        {isLoading ? 'Saving Changes...' : 'Update Profile'}
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
