import { cn } from '@/lib/utils';
import { Checkbox, Text } from '@radix-ui/themes';
import type { ComponentPropsWithoutRef } from 'react';

type CheckBoxProps = ComponentPropsWithoutRef<typeof Checkbox>;

type CheckboxWithTextProps = {
  label: string;

  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;

  containerClassName?: string;
  checkboxClassName?: string;
  textClassName?: string;
} & CheckBoxProps;

function CheckboxWithText({
  label,
  checked,
  onCheckedChange,
  disabled = false,
  containerClassName,
  checkboxClassName,
  textClassName,
  ...props
}: CheckboxWithTextProps) {
  return (
    <label
      className={cn(
        'flex items-center gap-2 cursor-pointer',
        containerClassName,
      )}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={cn(checkboxClassName)}
        {...props}
      />
      <Text size="2" className={cn(textClassName)}>
        {label}
      </Text>
    </label>
  );
}

export default CheckboxWithText;
