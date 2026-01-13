import React, {
forwardRef,
useEffect,
useState,
type ChangeEvent,
} from 'react';
import InputField from './input-field';

export interface TextFieldProps {
label?: string;
name?: string;
id?: string;
placeholder?: string;
type?: React.HTMLInputTypeAttribute;
value?: string;
error?: string;
className?: string;
onChange?: (value: string) => void;
}

function TextField(
props: TextFieldProps,
ref: React.ForwardedRef<HTMLInputElement>,
) {
const {
    label,
    onChange,
    placeholder,
    type = 'text',
    name,
    id,
    value: propValue,
    error,
    className = '',
} = props;

const [value, setValue] = useState<string>(propValue ?? '');

useEffect(
    function () {
    setValue(propValue ?? '');
    },
    [propValue],
);

function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
    onChange(newValue);
    }
}

return (
    <div className="relative w-full text-white font-sans text-sm font-semibold leading-8 mb-8">
    {label && (
        <label className="inline-block mb-1" htmlFor={id}>
        {label}
        </label>
    )}

    <InputField
        ref={ref}
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={`w-full px-3 py-2 rounded bg-[#222] text-white outline-none ${className}`}
    />

    {error && (
        <span className="absolute left-0 -bottom-6 text-sm text-[#FB2C36] ms-2">
        {error}
        </span>
    )}
    </div>
);
}

const ForwardedTextField = forwardRef(TextField);
ForwardedTextField.displayName = 'TextField';

export default ForwardedTextField;
