import { timelineService } from '@/app/features/timeline-management/services/timeline-service.ts';
import type { Timeline } from '@/app/features/timeline-management/services/types.ts';
import ModalWrapper from '@/components/modal-wrapper';
import DatePicker from '@/components/ui/date-picker';
import FormTextField from '@/components/ui/form-text-field.tsx';
import { useToast } from '@/components/ui/toast-provider.tsx';
import { useEffect, useState } from 'react';

type TimelineProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data?: Timeline | null;
  onSuccess: () => void;
};

const TimelineForm = ({
  isOpen,
  setIsOpen,
  data,
  onSuccess,
}: TimelineProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
  });

  const [nameError, setNameError] = useState<string>('');
  const [descriptionError, setDescriptionError] = useState<string>('');
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNameError('');
      setDescriptionError('');
      if (data) {
        setFormData({
          name: data.name || '',
          description: data.description || '',
          startDate: data.startDate?.split('T')[0] || '',
          endDate: data.endDate?.split('T')[0] || '',
        });
      } else {
        setFormData({ name: '', description: '', startDate: '', endDate: '' });
      }
    }
  }, [data, isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

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

    if (new Date(endDate) < new Date(startDate)) {
      addToast('End date cannot be earlier than the start date.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      // payload matches Omit<Timeline, 'id'> by including 'status'
      const payload = {
        name: formData.name,
        description: formData.description,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
        status: data?.status || 'Active',
      };

      if (data?.id) {
        await timelineService.updateTimeline(data.id, payload);
        addToast('Timeline updated!', 'success');
      } else {
        await timelineService.createTimeline(payload);
        addToast('Timeline created!', 'success');
      }

      onSuccess();
      handleClose();
    } catch (error: any) {
      addToast(
        error?.response?.data?.message || 'Something went wrong',
        'error',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onOpenChange={setIsOpen}>
      <div className="flex flex-col gap-y-6 p-2 text-white">
        <FormTextField
          label="Event Title"
          placeholder="Enter title"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={nameError}
        />

        <FormTextField
          label="Description"
          placeholder="Enter description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          error={descriptionError}
        />

        <div className="flex flex-col gap-y-3">
          <h3 className="font-semibold text-lg">Dates</h3>
          <div className="flex gap-x-4">
            <div className="flex-1">
              <DatePicker
                label="Start date"
                value={formData.startDate}
                onChange={(date) =>
                  setFormData((p) => ({ ...p, startDate: date }))
                }
              />
            </div>
            <div className="flex-1">
              <DatePicker
                label="End date"
                value={formData.endDate}
                onChange={(date) =>
                  setFormData((p) => ({ ...p, endDate: date }))
                }
              />
            </div>
          </div>
        </div>

        <div className="flex gap-x-4 mt-4">
          <button
            type="button"
            onClick={handleClose}
            className="flex-1 py-3 rounded-xl border border-[#9C39FC] text-white"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-[#9C39FC] text-white shadow-lg shadow-[#9C39FC]/20"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : data ? 'Update' : 'Save'}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default TimelineForm;
