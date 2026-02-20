import DeleteDialog from '@/components/ui/delete-dialog';
import type { ConfigOption } from '@/types/config.type';
import { Edit, SquareCheck, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ConfigStatusDropdown from './status-dropdown';

type OptionProps = {
  optionIndex: number;
  optionData?: Partial<ConfigOption>;
  onSave: (updated: ConfigOption) => void;
  onDelete: (id: number) => void;
};

const OptionRow = ({
  optionIndex,
  optionData,
  onSave,
  onDelete,
}: OptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isStatusChange, setIsStatusChange] = useState(false);
  const [updatedData, setUpdatedData] = useState<ConfigOption>(() => ({
    headerConstantVaue: optionData?.headerConstantVaue ?? '',
    id: optionData?.id ?? 0,
    name: optionData?.name ?? '',
    orderNo: optionData?.orderNo ?? 0,
    active: optionData?.active ?? false,
    isNew: optionData?.isNew ?? false,
  }));
  const [confirmModal, setConfirmModal] = useState(false);

  const handleSave = () => {
    onSave(updatedData);
    setIsEditing(false);
    setIsStatusChange(false);
  };

  const handleInputChange = (
    field: keyof ConfigOption,
    value: string | boolean | number | null,
  ) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));
  };

  const isNewRow = updatedData?.isNew;

  const shouldShowSave = isNewRow || isEditing || isStatusChange;

  const actionIcon = shouldShowSave ? (
    <SquareCheck
      size={20}
      className="cursor-pointer text-[#00C951]"
      onClick={handleSave}
    />
  ) : (
    <Edit
      size={20}
      className="cursor-pointer"
      onClick={() => setIsEditing(true)}
    />
  );

  const onStatusChange = (value: boolean) => {
    handleInputChange('active', value);
    setIsStatusChange(true);
  };

  return (
    <>
      <div className="grid grid-cols-[2fr_3fr_1.9fr_2fr_1fr] gap-5 items-center text-sm text-white p-3">
        <span>Option {optionIndex}</span>
        {isEditing || isNewRow ? (
          <input
            value={isNewRow ? undefined : updatedData?.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="Enter Status"
            className=" bg-[#FFFFFF17] rounded-sm border border-[#FFFFFF26] px-2 py-2"
          />
        ) : (
          <p>{updatedData?.name}</p>
        )}

        <div className="flex justify-center">
          {isEditing || isNewRow ? (
            <input
              type="number"
              value={updatedData?.orderNo ?? ''}
              min={1}
              onChange={(e) =>
                handleInputChange(
                  'orderNo',
                  e.target.value === '' ? null : Number(e.target.value),
                )
              }
              placeholder="-"
              className="w-15 text-center rounded-sm bg-[#FFFFFF17] border border-[#FFFFFF26] px-2 py-2"
            />
          ) : (
            <p>{updatedData?.orderNo}</p>
          )}
        </div>
        <ConfigStatusDropdown
          value={updatedData?.active}
          onStatusChange={onStatusChange}
        />
        <div className="flex gap-3 justify-center">
          {actionIcon}
          <Trash2
            size="20"
            className="cursor-pointer"
            onClick={() => setConfirmModal(true)}
          />
        </div>
      </div>
      <DeleteDialog
        isOpen={confirmModal}
        onClose={() => setConfirmModal(false)}
        onConfirm={() => onDelete(updatedData?.id || 0)}
        overlayClassName="bg-black/30 backdrop-blur-[1px] p-10"
        title="Delete this Option?"
        description={
          <>
            Are you sure you want to delete this{' '}
            <span className="font-semibold">(Option)</span>? This action cannot
            be undone.
          </>
        }
      />
    </>
  );
};

export default OptionRow;
