import { useEffect, useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';

import Background from '@/components/background';
import { Button } from '@/components/ui/button';
import FormBackground from '@/components/ui/form-bg';
import FormDropdown from '@/components/ui/form-dropdown';
import FormField from '@/components/ui/form-field';

import TrashIcon from '@/assets/icons/trash-icon';
import { Platforms, TechStacks } from '@/constants';
import { opomRegister } from './services/api';
import { getToken } from './services/ulits';

interface PlatformLinkState {
  id: number;
}

interface DropdownOption {
  id: number | string;
  name: string;
}

interface OpomFormValues {
  name: string;
  email: string;
  phone: string;
  telegram_username?: string;
  github_url?: string;
  role?: DropdownOption;
  [key: string]: any;
}

export default function OpomRegisterPage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [platformLinks, setPlatformLinks] = useState<PlatformLinkState[]>([
    { id: 0 },
  ]);

  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OpomFormValues>({
    mode: 'onSubmit',
  });

  function addPlatformLink(): void {
    setPlatformLinks((prev) => [...prev, { id: prev.length }]);
  }

  function removePlatformLink(indexToRemove: number): void {
    if (platformLinks.length > 1) {
      setPlatformLinks((prev) =>
        prev.filter((_, index) => index !== indexToRemove),
      );
    }
  }

  const onSubmit: SubmitHandler<OpomFormValues> = async (data, event) => {
    event?.preventDefault();

    setIsLoading(true);

    const processedPlatformLinks: {
      platformId: string | number;
      link: string;
    }[] = [];

    platformLinks.forEach((_, index) => {
      const platformData = data[`platformLinks_${index}`] as DropdownOption;
      const platformUrl = data[`platformUrl_${index}`] as string;

      if (platformData?.id && platformUrl) {
        processedPlatformLinks.push({
          platformId: platformData.id,
          link: platformUrl,
        });
      }
    });

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      telegram_username: data.telegram_username || '',
      github_url: data.github_url || '',
      role: data.role?.name || '',
      status: 'ACTIVE',
      platformLinks: processedPlatformLinks,
    };

    try {
      const result = await opomRegister(payload);

      if (
        result &&
        (result.success === 1 || result.status === 200 || result.status === 201)
      ) {
        toast.success('Registration successful!');
        reset();
        navigate('/');
      } else {
        throw new Error(
          result?.message || result?.data || 'Registration failed',
        );
      }
    } catch (error: any) {
      let errorMessage =
        'Registration failed. Please check your input and try again.';

      if (error?.response?.data) {
        errorMessage =
          error.response.data.message ||
          error.response.data.data ||
          errorMessage;
      } else if (error?.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    try {
      const token = getToken();
      if (!token) {
        navigate('/auth/register');
      } else {
        setIsLoading(false);
      }
    } catch {
      navigate('/auth/register');
    }
  }, [navigate]);

  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="!w-[800px] flex items-center flex-col h-auto p-8">
        <div className="text-white text-center mb-8">
          <h1 className="font-sans font-bold text-2xl leading-8">
            OPOM Register Form
          </h1>
        </div>

        {!isLoading && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-4 max-w-2xl mx-auto">
              <FormField
                placeholder="Name"
                className="w-full"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <FormField
                placeholder="Email"
                className="w-full"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <Controller
                name="phone"
                control={control}
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
                name="role"
                control={control}
                render={({ field }) => (
                  <FormDropdown
                    placeholder="Role"
                    menuList={TechStacks}
                    selectedValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              {platformLinks.map((_, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <Controller
                    name={`platformLinks_${index}`}
                    control={control}
                    render={({ field }) => (
                      <FormDropdown
                        placeholder="Platform"
                        menuList={Platforms}
                        selectedValue={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />

                  <FormField
                    placeholder="Platform URL"
                    {...register(`platformUrl_${index}`)}
                  />

                  {platformLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePlatformLink(index)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addPlatformLink}
                className="text-sm underline"
              >
                Add
              </button>
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button type="button" onClick={() => reset()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </form>
        )}
      </FormBackground>
    </Background>
  );
}
