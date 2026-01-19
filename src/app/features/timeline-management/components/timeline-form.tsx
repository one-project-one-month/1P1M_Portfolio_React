import ModalWrapper from '@/components/modal-wrapper';
import DatePicker from '@/components/ui/date-picker';
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
        <div className="">
          <h3 className=" font-semibold text-xl">Detail Date</h3>
          <div className="flex  gap-x-6 justify-around">
            <DatePicker label="Start Date" />
            <DatePicker label="End Date" />
          </div>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TimelineForm;
