import { timelineService } from '@/app/features/timeline-management/services/timeline-service.ts';
import type { TimelineFormProps } from '@/app/features/timeline-management/services/types.ts';
import ModalWrapper from '@/components/modal-wrapper';
import DatePicker from '@/components/ui/date-picker';
import FormTextField from '@/components/ui/form-text-field.tsx';
import { useToast } from '@/components/ui/toast-provider.tsx';
import { useEffect, useState } from 'react';

const statusOptions = [
  { id: '1', name: 'Active', slug: 'ACTIVE' },
  { id: '2', name: 'Upcoming', slug: 'UPCOMING' },
  { id: '3', name: 'Finished', slug: 'FINISHED' },
];

const TimelineForm = ({
  isOpen,
  setIsOpen,
  data,
  onSuccess,
}: TimelineFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
    timeLineStatus: 'Active',
  });

  const [nameError, setNameError] = useState<string>('');
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setNameError('');
      if (data) {
        setFormData({
          name: data.name || '',
          startDate: data.startDate?.split('T')[0] || '',
          endDate: data.endDate?.split('T')[0] || '',
          timeLineStatus: (data.timeLineStatus || 'ACTIVE').toUpperCase(),
        });
      } else {
        setFormData({
          name: '',
          startDate: '',
          endDate: '',
          timeLineStatus: 'ACTIVE',
        });
      }
    }
  }, [data, isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setNameError('');

    const { name, startDate, endDate } = formData;
    let hasError = false;

    if (!name.trim()) {
      setNameError('Name is required');
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
      const payload = {
        ...formData,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: new Date(formData.endDate).toISOString(),
      };

      if (data?.id) {
        await timelineService.updateTimeline(data.id, payload);
        addToast('Timeline updated!', 'success');
      } else {
        await timelineService.createTimeline(payload);
        addToast('Timeline created!', 'success');
      }

      setIsOpen(false);
      if (typeof onSuccess === 'function') onSuccess();
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

        <div className="flex flex-col gap-y-2 relative">
          <label className="text-sm font-medium text-gray-300">Status</label>

          {/* Trigger Button */}
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center justify-between w-full p-4 rounded-xl bg-[#1A1A1A] border border-white/10 text-white hover:border-[#9C39FC]/50 transition-all duration-200"
          >
            <span className="flex items-center gap-x-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  formData.timeLineStatus === 'ACTIVE'
                    ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]'
                    : formData.timeLineStatus === 'UPCOMING'
                      ? 'bg-blue-500'
                      : 'bg-gray-500'
                }`}
              />
              {statusOptions.find((opt) => opt.slug === formData.timeLineStatus)
                ?.name || formData.timeLineStatus}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsDropdownOpen(false)}
              />

              <div className="absolute top-[85px] left-0 w-full bg-[#252525] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                {statusOptions.map((option) => {
                  const isSelected = formData.timeLineStatus === option.slug;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => {
                        // We set the SLUG (UPPERCASE) to the state
                        setFormData({
                          ...formData,
                          timeLineStatus: option.slug,
                        });
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between p-4 text-left hover:bg-[#9C39FC]/10 transition-colors ${
                        isSelected
                          ? 'bg-[#9C39FC]/20 text-[#B76EFA]'
                          : 'text-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            option.slug === 'ACTIVE'
                              ? 'bg-green-500'
                              : option.slug === 'UPCOMING'
                                ? 'bg-blue-500'
                                : 'bg-gray-500'
                          }`}
                        />
                        {/* Show the friendly Name in the list */}
                        {option.name}
                      </div>

                      {isSelected && (
                        <svg
                          className="w-4 h-4 text-[#B76EFA]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

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
