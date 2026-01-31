import { useFormContext } from 'react-hook-form';

interface FormFieldProps {
  name: string;
  label: string;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
}

export const FormField = ({
  name,
  label,
  disabled,
  type = 'text',
  placeholder,
}: FormFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const getNestedError = (path: string, errorObj: any) => {
    return path.split('.').reduce((obj, key) => obj && obj[key], errorObj);
  };
  const specificError = getNestedError(name, errors);

  return (
    <div className="flex flex-col gap-2 w-full mb-4">
      <label className="text-gray-400 text-sm">{label}</label>
      <input
        {...register(name)}
        type={type}
        disabled={disabled}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5 rounded-lg bg-[#252841] text-white transition-all outline-none
          ${disabled ? 'border border-transparent cursor-default opacity-90' : 'border border-gray-600 focus:border-purple-500 bg-[#2b2f4a]'}
          ${specificError ? 'border-red-500' : ''}
        `}
      />
      {specificError && (
        <span className="text-red-500 text-xs">{specificError.message}</span>
      )}
    </div>
  );
};
