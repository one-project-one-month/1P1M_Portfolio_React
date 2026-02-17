import type { ConfigRequest } from '@/types/config.type';
import { useState } from 'react';
import {
  useCreateConfig,
  useDeleteOption,
  useGetAllConfigs,
  useUpdateOption,
} from './use-config-query';

const useConfig = () => {
  const [searchScreenPage, setSearchScreenPage] = useState<string | undefined>(
    undefined,
  );

  const { data, isLoading } = useGetAllConfigs(searchScreenPage);

  const configData = data?.success === 1 ? data.data.configurations : [];

  const handleSearch = (selectedScreen: string) => {
    if (!selectedScreen) return;
    setSearchScreenPage(selectedScreen);
  };

  const createOptionMutation = useCreateConfig();
  const updateOptionMutation = useUpdateOption();
  const deleteOptionMutation = useDeleteOption();

  const createConfigOption = async (
    constantValue: string,
    data: ConfigRequest,
  ) => {
    try {
      await createOptionMutation.mutateAsync({ constantValue, data });
    } catch (error) {
      console.error('Failed to create option', error);
    }
  };

  const updateConfigOption = async (id: number, data: ConfigRequest) => {
    try {
      await updateOptionMutation.mutateAsync({ id, data });
    } catch (error) {
      console.error('Failed to update option', error);
    }
  };

  const deleteConfigOption = async (id: number) => {
    try {
      await deleteOptionMutation.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete option', error);
    }
  };

  return {
    searchScreenPage,
    configData,
    handleSearch,
    createConfigOption,
    updateConfigOption,
    deleteConfigOption,
    isLoading,
  };
};

export default useConfig;
