import ModalWrapper from '@/components/modal-wrapper';
import TextField from '@/components/ui/text-field';

type timelineProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const TimelineForm = ({ isOpen, setIsOpen }: timelineProps) => {
  return (
    <ModalWrapper isOpen={isOpen} onOpenChange={setIsOpen}>
      <div>
        <TextField
          className="text-xl font-medium"
          label="Event Title"
          placeholder="Enter your title..."
        />
        <TextField
          className="text-xl font-medium"
          label="Update Description"
          placeholder="Description"
        />
        <TextField
          className="text-xl font-medium"
          label="Event Title"
          placeholder="Enter your title..."
        />
      </div>
    </ModalWrapper>
  );
};

export default TimelineForm;
