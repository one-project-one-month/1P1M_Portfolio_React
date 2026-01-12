interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name?: string;
  placeholder?: string;
  className?: string;
  error?: string;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export default function FormTextArea({
  name,
  placeholder,
  className,
  error,
  ref,
  ...props
}: Props) {
  return (
    <div className="w-full relative">
      <textarea
        ref={ref}
        name={name}
        placeholder={placeholder}
        className={`h-24 rounded-lg px-4 py-3
            bg-[#FFFFFF17] border border-[#FFFFFF26]
            text-white placeholder-[#99A1AF]
            focus:outline-none focus:ring-2 focus:ring-purple-500
            resize-none ${className}`}
        {...props}
      />

      {error && (
        <span className="absolute left-0 -bottom-6 text-sm text-[#FB2C36] ms-2">
          {error}
        </span>
      )}
    </div>
  );
}
