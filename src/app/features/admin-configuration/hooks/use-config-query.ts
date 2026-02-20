import { useToast } from '@/components/ui/toast-provider';
import type { ConfigRequest } from '@/types/config.type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createConfigurations,
  deleteConfigOption,
  getConfigurations,
  updateConfigOption,
} from '../service/config-service';

export const useGetAllConfigs = (formTemplateName = '') => {
  return useQuery({
    queryKey: ['config', formTemplateName],
    queryFn: () => getConfigurations(formTemplateName),
    enabled: !!formTemplateName,
  });
};

export const useCreateConfig = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation({
    mutationFn: ({
      constantValue,
      data,
    }: {
      constantValue: string;
      data: ConfigRequest;
    }) => createConfigurations(constantValue, data),
    onSuccess: (res) => {
      if (res.code === 200 && res.success) {
        addToast('Created successfully', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['config'] });
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to create', 'error');
    },
  });
};

export const useUpdateOption = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ConfigRequest }) =>
      updateConfigOption(id, data),
    onSuccess: (res) => {
      if (res.code === 200 && res.success) {
        addToast('Updated successfully', 'success');
      }
      queryClient.invalidateQueries({ queryKey: ['config'] });
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to update', 'error');
    },
  });
};

export const useDeleteOption = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  return useMutation({
    mutationFn: (id: number) => deleteConfigOption(id),
    onSuccess: () => {
      addToast('Deleted successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['config'] });
    },
    onError: (error: Error) => {
      addToast(error.message || 'Failed to delete', 'error');
    },
  });
};
