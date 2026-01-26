'use client';
import { FormField } from '@/app/features/admin-profile/components/form-field.tsx';
import { InfoCard } from '@/app/features/admin-profile/components/info-card.tsx';
import { useProfile } from '@/app/features/admin-profile/hooks/user-profile.ts';
import { MinusCircle, Plus } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

export default function ProfilePage() {
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
  } = useProfile();

  return (
    <div className="relative min-h-screen font-sans text-white overflow-y-auto">
      <div className="relative z-10 p-4 md:p-8">
        <FormProvider {...form}>
          <form onSubmit={handleSubmit} className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold">Profile</h2>
              <p className="text-gray-400 mt-1">
                Manage your personal information and account settings.
              </p>
            </div>

            <div className="grid grid-cols-12 gap-6">
              {/* Left Column: Avatar & Basic Info */}
              <div className="col-span-12 md:col-span-4 xl:col-span-3">
                <div className="bg-[#15192b] border border-gray-800 rounded-lg p-6 text-center sticky top-8">
                  <div className="w-28 h-28 mx-auto bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl mb-4 overflow-hidden shadow-xl ring-4 ring-[#252841]">
                    <img
                      src="https://i.pravatar.cc/300"
                      alt="Avatar"
                      className="w-full h-full object-cover opacity-90"
                    />
                  </div>
                  <p className="text-green-400 text-sm font-medium mb-1 uppercase tracking-wide">
                    Admin
                  </p>
                  <h3 className="text-white text-xl font-bold">Thura Aung</h3>
                  <p className="text-gray-400 text-sm mt-1">
                    aungthurapm@email.com
                  </p>

                  {isEditing && (
                    <button
                      type="button"
                      className="mt-4 text-xs bg-[#252841] hover:bg-[#2b2f4a] text-white px-3 py-1.5 rounded border border-gray-700 transition-colors"
                    >
                      Change Avatar
                    </button>
                  )}
                </div>
              </div>

              {/* Right Column: Forms */}
              <div className="col-span-12 md:col-span-8 xl:col-span-9 space-y-6">
                {/* Row 1: Personal & Social */}
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
                              label={field.platform || 'Platform URL'}
                              disabled={!isEditing}
                              placeholder="https://..."
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
                      ))}
                    </div>
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() =>
                          append({ platform: 'New Platform', url: '' })
                        }
                        className="mt-2 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#a855f7] bg-opacity-20 text-[#a855f7] hover:bg-opacity-30 transition-all font-medium text-sm"
                      >
                        <Plus size={16} /> Add Social Media Account
                      </button>
                    )}
                  </InfoCard>
                </div>

                {/* Row 2: Preferences & Other */}
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
                      disabled={!isEditing}
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
                      className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-10 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-purple-900/20"
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-[#1f2937] hover:bg-[#374151] text-white px-8 py-2.5 rounded-lg font-medium transition-colors border border-gray-700"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 py-2.5 rounded-lg font-medium transition-colors shadow-lg shadow-purple-900/20 disabled:opacity-50"
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
