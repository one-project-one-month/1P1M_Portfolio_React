import { DropdownMenu } from '@radix-ui/themes';
import { useState } from 'react';

type DropDownProps = {
  value?: boolean;
  onStatusChange: (val: boolean) => void;
};

const ConfigStatusDropdown = ({ value, onStatusChange }: DropDownProps) => {
  const [status, setStatus] = useState(value ?? true);

  const handleStatusChange = (value: boolean) => {
    setStatus(value);
    onStatusChange(value);
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <span
          className={`
            hover:cursor-pointer
            ${status ? 'text-green-400' : 'text-gray-400'}`}
        >
          ● {status ? 'Active' : 'Hidden'}
        </span>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        variant="soft"
        className="bg-[#0F172B] border border-[#FFFFFF26] rounded-md"
      >
        <DropdownMenu.Item onSelect={() => handleStatusChange(true)}>
          Active
        </DropdownMenu.Item>
        <DropdownMenu.Item onSelect={() => handleStatusChange(false)}>
          Hidden
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};

export default ConfigStatusDropdown;
