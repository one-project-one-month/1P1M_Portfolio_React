import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import FormBackground from '@/components/ui/form-bg';
import FormDropdown from '@/components/ui/form-dropdown';
import FormField from '@/components/ui/form-field';
import FormTextArea from '@/components/ui/form-textarea';

import { TechStacks } from '@/constants';

import { useUserInfoStore } from '@/store/user-info-store';
import type { Profile } from '@/types/common';
import { useEffect, useState } from 'react';
import uploadDevImage, {
  getProfile,
  setupDevProfile,
  updateProfile,
} from '../services/api';

interface TechStackOption {
  id: string | number;
  name: string;
}

interface DevProfileFormProps {
  isEditMode?: boolean;
  existingProfileData?: Profile | null;
}

interface FormValues {
  name: string;
  techStacks: TechStackOption | null;
  github: string;
  linkedIn: string;
  aboutDev: string;
}

export default function ProfileSetupFrom(props: DevProfileFormProps) {
  const user = useUserInfoStore.getState().userInfo;

  console.log(user);

  var isEditMode = props.isEditMode ?? false;
  var existingProfileData = props.existingProfileData ?? null;

  var navigate = useNavigate();

  var [img, setImg] = useState<File | null>(null);
  var [profileData, setProfileData] = useState<Profile | null>(
    existingProfileData,
  );
  var [loading, setLoading] = useState<boolean>(
    isEditMode && !existingProfileData,
  );

  var {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    mode: 'onSubmit',
  });

  useEffect(
    function () {
      if (!isEditMode) {
        setLoading(false);
        return;
      }

      if (existingProfileData) {
        setProfileData(existingProfileData);
        setLoading(false);
        return;
      }

      async function loadProfileData(): Promise<void> {
        var timeoutId = setTimeout(function () {
          setLoading(false);
        }, 10000);

        var user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user?.id) {
          setLoading(false);
          return;
        }

        var response = await getProfile(user.id);
        if (response.success) {
          const data = response.data as Profile;
          setProfileData(data);
        }

        clearTimeout(timeoutId);
        setLoading(false);
      }

      loadProfileData();
    },
    [isEditMode, existingProfileData],
  );

  useEffect(
    function () {
      if (!profileData || !isEditMode) return;

      var techStackOption: TechStackOption | null = null;

      if (profileData.techStacks?.length) {
        var value = profileData.techStacks[0];
        techStackOption =
          TechStacks.find(function (s) {
            return s.name === value;
          }) ||
          TechStacks.find(function (s) {
            return s.id + '' === value;
          }) ||
          null;
      }

      reset({
        name: profileData.name || '',
        techStacks: techStackOption,
        github: profileData.github || '',
        linkedIn: profileData.linkedIn || '',
        aboutDev: profileData.aboutDev || '',
      });
    },
    [profileData, isEditMode, reset],
  );

  function handleImageSelect(file: File | null): void {
    if (file) {
      setImg(file);
    }
  }

  var onSubmit: SubmitHandler<FormValues> = async function (data) {
    if (!user?.userId) {
      console.log('NO user id');

      return;
    }

    if (!data.techStacks) {
      toast.error('Please select a tech stack');
      return;
    }

    var payload = {
      name: data.name,
      techStacks: [data.techStacks.name],
      github: data.github,
      linkedIn: data.linkedIn,
      aboutDev: data.aboutDev,
    };

    var loadingToast = toast.loading(
      isEditMode ? 'Updating profile...' : 'Creating profile...',
    );

    try {
      if (isEditMode && profileData) {
        var updateRes = await updateProfile(profileData.dev_id, payload);

        if (updateRes.success) {
          if (img) {
            await uploadDevImage(profileData.dev_id, img);
          }

          toast.success('Profile updated successfully!');
          navigate('/profile');
        } else {
          toast.error('Failed to update profile');
        }
      } else {
        var createRes = await setupDevProfile(payload, user?.userId);

        if (!createRes.success) {
          throw new Error('Failed to create profile');
        }

        if (img) {
          await uploadDevImage(createRes.data.dev_id, img);
        }

        toast.success('Profile created successfully!');
        navigate(user?.role === 'ADMIN' ? '/admin' : '/');
      }
    } catch (error: any) {
      toast.error(error?.message || 'Something went wrong');
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  if (loading) {
    return (
      <FormBackground className="w-[532px]">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4" />
          <p className="text-white">Loading profile data...</p>
        </div>
      </FormBackground>
    );
  }

  return (
    <FormBackground className="w-[532px]">
      <h2 className="text-2xl text-white text-center">
        {isEditMode ? 'Edit Profile' : 'Set up Profile'}
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-2 gap-y-6"
      >
        <FileUpload
          onFileSelect={handleImageSelect}
          accept="image/*"
          maxSize={1 * 1024 * 1024}
          existingImageUrl={isEditMode ? profileData?.profilePictureUrl : null}
        />

        <FormField
          placeholder="Enter your name"
          className="w-full"
          {...register('name', { required: 'Name is required' })}
        />

        <Controller
          name="techStacks"
          control={control}
          rules={{ required: 'Tech stack is required' }}
          render={function ({ field }) {
            return (
              <FormDropdown
                placeholder="Tech Stack"
                menuList={TechStacks}
                className="w-full"
                selectedValue={field.value}
                onChange={field.onChange}
              />
            );
          }}
        />

        <FormField
          placeholder="Github"
          className="w-full"
          {...register('github', {
            required: 'GitHub link is required',
            pattern: {
              value: /^https:\/\/github\.com\/.+$/,
              message: 'Must be a valid GitHub URL',
            },
          })}
        />

        <FormField
          placeholder="LinkedIn"
          className="w-full"
          {...register('linkedIn', {
            required: 'LinkedIn link is required',
            pattern: {
              value: /^https:\/\/(www\.)?linkedin\.com\/.+$/,
              message: 'Must be a valid LinkedIn URL',
            },
          })}
        />

        <FormTextArea
          placeholder="About yourself"
          className="h-28 w-full"
          {...register('aboutDev', {
            required: 'Please write something about yourself',
          })}
        />

        <div className="flex w-full justify-end gap-2">
          <Button
            type="button"
            className="text-white"
            variant="black_small_button"
            size="black_small_button"
            disabled={isSubmitting}
            onClick={function () {
              if (isEditMode) {
                navigate('/profile');
              } else {
                reset();
              }
            }}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            variant="secondary"
            size="secondary"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update'
                : 'Create'}
          </Button>
        </div>
      </form>
    </FormBackground>
  );
}
