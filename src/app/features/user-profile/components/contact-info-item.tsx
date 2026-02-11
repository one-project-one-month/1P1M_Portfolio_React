import { IconButton } from '@radix-ui/themes';
import { Copy, type LucideIcon } from 'lucide-react';

interface ContactInfoItemProps {
  icon: LucideIcon;
  value?: string;
  onCopy?: (value: string) => void;
  placeholder?: string;
}

export const ContactInfoItem = ({
  icon: Icon,
  value,
  onCopy,
  placeholder = '-',
}: ContactInfoItemProps) => {
  return (
    <p className="flex items-center gap-3 text-gray-400">
      <Icon size={20} />
      {value || placeholder}
      {value && onCopy && (
        <IconButton
          variant="ghost"
          className="text-gray-600!"
          onClick={() => onCopy(value)}
        >
          <Copy size={18} />
        </IconButton>
      )}
    </p>
  );
};
