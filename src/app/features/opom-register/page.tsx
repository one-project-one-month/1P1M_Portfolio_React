import TrashIcon from '@/assets/icons/trash-icon';
import { Button } from '@/components/ui/button';
import FormBackground from '@/components/ui/form-bg';
import FormDropdown from '@/components/ui/form-dropdown';
import FormField from '@/components/ui/form-field';
import Title from '@/components/ui/title';
import { Platforms, TechStacks } from '@/constants';
import { useState } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useNavigate } from 'react-router-dom';
import { opomRegister } from './services/api';

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

  // useEffect(() => {
  //   try {
  //     const token = getToken();
  //     if (!token) {
  //       navigate('/auth/register');
  //     } else {
  //       setIsLoading(false);
  //     }
  //   } catch {
  //     navigate('/auth/register');
  //   }
  // }, [navigate]);

  return (
    <div className="h-screen flex items-center ">
      <div className="w-full h-full flex justify-center p-5 md:p-0 items-center">
        <FormBackground className="w-full md:w-[532px]  flex mx-auto items-center h-auto  flex-col  p-8">
          <Title
            showSearch={false}
            showFilter={false}
            title="OPOM Registered User List"
          />

          {true && (
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="space-y-4 max-w-2xl mx-auto">
                <FormField
                  placeholder="Name"
                  className="w-full "
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

                <FormField
                  placeholder="Telegram username"
                  className="w-full"
                  {...register('telegram_username', {
                    required: 'Telegram username is required',
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.telegram_username?.message}
                  </p>
                )}

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

                <FormField
                  placeholder="GitHub Link"
                  className="w-full"
                  {...register('github_url', {
                    required: 'GitHub is required',
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.github_url?.message}
                  </p>
                )}

                {platformLinks.map((_, index) => (
                  <div
                    key={index}
                    className={`w-full grid  gap-3 items-center ${platformLinks.length > 1 ? 'grid-cols-3' : 'grid-cols-3'}`}
                  >
                    <Controller
                      name={`platformLinks_${index}`}
                      control={control}
                      render={({ field }) => (
                        <FormDropdown
                          placeholder="Platform"
                          menuList={Platforms}
                          selectedValue={field.value}
                          onChange={field.onChange}
                          className="col-span-1"
                        />
                      )}
                    />

                    <div className="col-span-2">
                      <div className="flex justify-between gap-2">
                        {' '}
                        <FormField
                          placeholder="Platform URL"
                          {...register(`platformUrl_${index}`)}
                          className="w-full"
                        />
                        {platformLinks.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePlatformLink(index)}
                            className="w-5"
                          >
                            <TrashIcon className="w-5 h-5 text-[#99A1AF]" />
                          </button>
                        )}
                      </div>{' '}
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addPlatformLink}
                  className="text-sm underline text-[#6A7282]"
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
      </div>
    </div>
  );
}
