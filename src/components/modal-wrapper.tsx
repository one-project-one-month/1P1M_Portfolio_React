import * as Dialog from '@radix-ui/react-dialog';

type ModalWrapperProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
};

const ModalWrapper = ({
  isOpen,
  onOpenChange,
  children,
}: ModalWrapperProps) => {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[14px] bg-black p-6 text-white shadow-lg">
          <Dialog.DialogClose className="absolute top-4 right-4">
            X
          </Dialog.DialogClose>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ModalWrapper;
