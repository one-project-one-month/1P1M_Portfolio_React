import type { Timeline } from '@/app/features/timeline-management/types.ts';
import ModalWrapper from '@/components/modal-wrapper';
import DatePicker from '@/components/ui/date-picker';
import FormTextField from '@/components/ui/form-text-field.tsx';
import { useToast } from '@/components/ui/toast-provider.tsx';
import { useEffect, useState } from 'react';

type TimelineProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data?: Timeline | null;
};

const TimelineForm = ({ isOpen, setIsOpen, data }: TimelineProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });
  const [nameError, setNameError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      setNameError('');
      setDescriptionError('');
      if (data) {
        setFormData({
          name: data.name || '',
          description: data.description || '',
          startDate: data.startDate || '',
          endDate: data.endDate || '',
        });
      } else {
        setFormData({ name: '', description: '', startDate: '', endDate: '' });
      }
    }
  }, [data, isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setNameError('');
    setDescriptionError('');

    const { name, description, startDate, endDate } = formData;

    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    }
    if (!description.trim()) {
      setDescriptionError('Description is required');
      hasError = true;
    }

    if (hasError) return;

    if (!startDate || !endDate) {
      addToast('Please enter both start and end dates', 'error');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      addToast('End date cannot be earlier than the start date.', 'error');
      return;
    }

    if (data?.id) {
      console.log('Updating existing item:', data.id);
      console.log('Submitting Data:', formData);
      // TODO: await updateTimeline(data.id, formData)
    } else {
      console.log('Creating new item');
      console.log('Submitting Data:', formData);
      // TODO: await createTimeline(formData)
    }

    handleClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col gap-y-6 p-2 text-white">
        <FormTextField
          label="Event Title"
          placeholder="Enter your title"
          className="text-xl font-semibold mb-2"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
            if (nameError) setNameError('');
          }}
          error={nameError}
        />

        <FormTextField
          label="Update Description"
          placeholder="Description"
          className="text-xl font-semibold mb-2"
          value={formData.description}
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
            if (descriptionError) setDescriptionError('');
          }}
          error={descriptionError}
        />

        <div className="flex flex-col gap-y-3">
          <h3 className="font-semibold text-xl text-white">Detail Date</h3>
          <div className="flex gap-x-4">
            <div className="flex-1">
              <DatePicker
                label="Start date"
                value={formData.startDate}
                onChange={(date: string) =>
                  setFormData({ ...formData, startDate: date })
                }
              />
            </div>
            <div className="flex-1">
              <DatePicker
                label="End date"
                value={formData.endDate}
                onChange={(date: string) =>
                  setFormData({ ...formData, endDate: date })
                }
              />
            </div>
          </div>
        </div>

        <div className="flex gap-x-4 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-3 px-6 rounded-xl border border-[#9C39FC] text-white font-semibold hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 px-6 rounded-xl bg-[#9C39FC] text-white font-semibold hover:bg-[#8A2BE2] transition-colors shadow-lg shadow-[#9C39FC]/20"
          >
            {data ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TimelineForm;
