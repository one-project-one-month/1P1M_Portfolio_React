import { Dialog, DialogTrigger } from '@radix-ui/react-dialog';

type ModalWrapperProps = {
  trigger?: React.ReactNode;
};

const ModalWrapper = ({ trigger }: ModalWrapperProps) => {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
    </Dialog>
  );
};

export default ModalWrapper;
