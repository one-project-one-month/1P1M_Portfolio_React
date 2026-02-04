import { useEffect, useState } from 'react';
import { Button } from '../../../../components/ui/button';

type ProjectStatus = 'In Progress' | 'Completed' | 'Unqualified';

interface ChangeStatusDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (status: ProjectStatus) => void;
  currentStatus?: ProjectStatus;
}

const ChangeStatusDialog = ({
  isOpen,
  onClose,
  onConfirm,
  currentStatus,
}: ChangeStatusDialogProps) => {
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus>(
    currentStatus || 'Completed',
  );

  useEffect(() => {
    if (isOpen && currentStatus) {
      setSelectedStatus(currentStatus);
    }
  }, [isOpen, currentStatus]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(selectedStatus);
    onClose();
  };

  const statusOptions: {
    value: ProjectStatus;
    color: string;
    description: string;
  }[] = [
    {
      value: 'In Progress',
      color: '#F59E0B',
      description: 'This project is currently active.',
    },
    {
      value: 'Completed',
      color: '#10B981',
      description: 'This project has been completed.',
    },
    {
      value: 'Unqualified',
      color: '#6A7282',
      description: 'This project was not approved.',
    },
  ];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/30 backdrop-blur-[1px]"
      onClick={onClose}
    >
      <div
        className="max-w-[498px] bg-[#030712] rounded-2xl border border-[#364153] px-16 py-11"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-8">
          <h2 className="text-white text-xl font-medium leading-8 mb-2">
            Change the Project Portfolio status!
          </h2>
          <p className="text-[#99A1AF] text-[18px] leading-7 font-normal tracking-normal">
            Choose a status to reflect the current progress and next step of
            this idea.
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {statusOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-start gap-4 cursor-pointer"
              onClick={() => setSelectedStatus(option.value)}
            >
              <div className="relative flex items-center justify-center w-5 h-5 shrink-0 mt-1">
                <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center">
                  {selectedStatus === option.value && (
                    <div className="w-3 h-3 rounded-full bg-white" />
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h3
                  className="text-[18px] leading-5 font-medium tracking-normal mb-1"
                  style={{ color: option.color }}
                >
                  {option.value}
                </h3>
                <p className="text-[#99A1AF] text-xs leading-7 font-normal tracking-normal">
                  {option.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <Button
            onClick={onClose}
            className="flex-1 rounded-sm border border-[#9C39FC] bg-transparent text-white text-sm leading-5 font-medium hover:bg-[rgba(156,57,252,0.1)] transition-colors"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="flex-1 text-sm leading-5 font-medium tracking-normal"
          >
            Change Status
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeStatusDialog;
