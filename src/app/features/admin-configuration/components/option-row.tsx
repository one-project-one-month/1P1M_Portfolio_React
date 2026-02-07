import { Edit, SquareCheck, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { ConfigOption } from './config-table';
import ConfigStatusDropdown from './status-dropdown';

type OptionProps = {
  optionData?: ConfigOption;
  onSave: (updated: ConfigOption) => void;
  onDelete: (id: string) => void;
};

const OptionRow = ({ optionData, onSave, onDelete }: OptionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState<ConfigOption>(() => ({
    id: optionData?.id ?? '',
    label: optionData?.label ?? '',
    order: optionData?.order ?? 0,
    status: optionData?.status ?? false,
    isNew: optionData?.isNew ?? false,
  }));

  const handleSave = () => {
    onSave({
      ...updatedData,
      isNew: false,
    });
    setIsEditing(false);
  };

  const handleInputChange = (
    field: keyof ConfigOption,
    value: string | boolean,
  ) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));
  };

  const isNewRow = updatedData?.isNew;
  let actionIcon;

  if (isNewRow) {
    actionIcon = (
      <SquareCheck
        size={20}
        className="cursor-pointer text-[#00C951]"
        onClick={handleSave}
      />
    );
  } else if (!isEditing) {
    actionIcon = (
      <Edit
        size={20}
        className="cursor-pointer"
        onClick={() => setIsEditing(true)}
      />
    );
  } else {
    actionIcon = (
      <SquareCheck
        size={20}
        className="cursor-pointer text-[#00C951]"
        onClick={handleSave}
      />
    );
  }

  const onStatusChange = (value: boolean) => {
    handleInputChange('status', value);
  };

  return (
    <div className="grid grid-cols-[2fr_3fr_1.9fr_2fr_1fr] gap-5 items-center text-sm text-white p-3">
      <span>Option {updatedData?.order}</span>
      {isEditing || isNewRow ? (
        <input
          value={isNewRow ? undefined : updatedData?.label}
          onChange={(e) => handleInputChange('label', e.target.value)}
          placeholder="Enter Status"
          className=" bg-[#FFFFFF17] rounded-sm border border-[#FFFFFF26] px-2 py-2"
        />
      ) : (
        <p>{updatedData?.label}</p>
      )}

      <div className="flex justify-center">
        {isEditing || isNewRow ? (
          <input
            value={isNewRow ? undefined : updatedData?.order}
            onChange={(e) => handleInputChange('order', e.target.value)}
            placeholder="-"
            className="w-10 text-center rounded-sm bg-[#FFFFFF17] border border-[#FFFFFF26] px-2 py-2"
          />
        ) : (
          <p>{updatedData?.order}</p>
        )}
      </div>
      <ConfigStatusDropdown
        value={updatedData?.status}
        onStatusChange={onStatusChange}
      />
      <div className="flex gap-3 justify-center">
        {actionIcon}
        <Trash2
          size="20"
          className="cursor-pointer"
          onClick={() => onDelete(updatedData?.id || '')}
        />
      </div>
    </div>
  );
};

export default OptionRow;
