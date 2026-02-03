import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useUserInfoStore } from '@/store/user-info-store';
import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { opomRegister } from '../services/api';

export interface PlatformLinkState {
  id: number;
}

export interface DropdownOption {
  id: number | string;
  name: string;
}

export interface OpomFormValues {
  name: string;
  email: string;
  phone: string;
  telegram_username?: string;
  github_url?: string;
  role?: DropdownOption;
  [key: string]: any;
}

export function useOpomRegister() {
  const user = useUserInfoStore.getState().userInfo;
  const { goTo } = useAppNavigation();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [platformLinks, setPlatformLinks] = useState<PlatformLinkState[]>([
    { id: 1 },
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

  useEffect(() => {
    if (!user) {
      goTo('/auth/log-in');
    } else {
      setIsLoading(false);
    }
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

  const handleRegister: SubmitHandler<OpomFormValues> = async (data, event) => {
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

  return {
    // State
    isLoading,
    platformLinks,
    errors,

    // Form Methods
    register,
    control,
    handleSubmit,
    reset,

    // Actions
    addPlatformLink,
    removePlatformLink,
    handleRegister,
  };
}
