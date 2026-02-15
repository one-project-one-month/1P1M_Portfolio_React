import { useToast } from '@/components/ui/toast-provider';
import { useCallback } from 'react';

export const useClipboard = () => {
  const { addToast } = useToast();

  const copyToClipboard = useCallback(
    (text: string) => {
      navigator.clipboard.writeText(text).then(() => {
        addToast('Copied to clipboard!', 'success');
      });
    },
    [addToast],
  );

  return { copyToClipboard };
};
