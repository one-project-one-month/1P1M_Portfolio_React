import * as DialogPrimitive from '@radix-ui/react-dialog';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
  overlayClassName?: string;
}

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const DeleteDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Are you sure to delete?',
  description = 'The project portfolio will be deleted. Are you really want to delete it?',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  overlayClassName,
}: DeleteDialogProps) => {
  return (
    <DialogPrimitive.Root
      open={isOpen}
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            'fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm animate-in fade-in duration-300',
            overlayClassName,
          )}
        />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-[101] w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-3xl border border-white/10 bg-black p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
          <DialogPrimitive.Title className="text-2xl font-bold text-white mb-4">
            {title}
          </DialogPrimitive.Title>

          <DialogPrimitive.Description className="text-gray-400 mb-8 px-4 leading-relaxed">
            {description}
          </DialogPrimitive.Description>

          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-8 py-3 rounded-xl border border-white/20 text-white hover:bg-white/5 transition-colors font-medium min-w-[100px]"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-8 py-3 rounded-xl bg-[#D90000] text-white hover:bg-[#B30000] transition-colors font-medium min-w-[100px]"
            >
              {confirmText}
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default DeleteDialog;
