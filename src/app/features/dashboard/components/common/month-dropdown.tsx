import { DropdownMenu } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';

type MonthDropdownProps = {
  value?: string;
  onChange: (month: string) => void;
  months?: string[];
  placeholder?: string;
};

const DEFAULT_MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function MonthDropdown({
  value,
  onChange,
  months = DEFAULT_MONTHS,
  placeholder = 'Select month',
}: MonthDropdownProps) {
  const label = value ?? placeholder;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className=" focus:outline-0">
        <button className="flex items-center text-white gap-2 px-3 py-1.5 text-sm">
          <span>{label}</span>
          <ChevronDown size={16} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        side="bottom"
        className=" bg-transparent! border-0! outline-0! shadow-none!"
      >
        <div className="grid grid-cols-3 text-white custom-card gap-1">
          {months.map((month) => (
            <DropdownMenu.Item
              key={month}
              onSelect={() => onChange(month)}
              className="cursor-pointer rounded px-2 py-1 text-sm hover:bg-slate-700! focus:outline-none"
            >
              {month}
            </DropdownMenu.Item>
          ))}
        </div>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default MonthDropdown;
