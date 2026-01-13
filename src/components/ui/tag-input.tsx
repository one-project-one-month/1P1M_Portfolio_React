import React, { useState, type KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  label?: string;
}

const TagInput: React.FC<TagInputProps> = ({
  value = [],
  onChange,
  placeholder = 'Type and press Enter',
  className = '',
  error,
  label,
}) => {
  const [inputValue, setInputValue] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
     
      removeTag(value.length - 1);
    }
  };

  const addTag = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue('');
    }
  };

  const removeTag = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const tags = pastedText
      .split(/[,;]/)
      .map((tag) => tag.trim())
      .filter((tag) => tag && !value.includes(tag));
    
    if (tags.length > 0) {
      onChange([...value, ...tags]);
    }
  };

  return (
    <div className={`relative w-full text-white font-sans text-sm font-semibold leading-8 mb-8 ${className}`}>
      {label && (
        <label className="inline-block mb-1">
          {label}
        </label>
      )}
      
      <div className="h-auto min-h-[48px] rounded-lg px-3 py-2 bg-[#FFFFFF17] border border-[#FFFFFF26] text-white transition-all duration-200 focus-within:outline-none focus-within:ring-2 focus-within:ring-purple-500">
        <div className="flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-600/20 border border-purple-500/30 text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="hover:text-red-400 transition-colors"
              >
                <X size={14} />
              </button>
            </span>
          ))}
          
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            onBlur={addTag}
            placeholder={value.length === 0 ? placeholder : ''}
            className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-white placeholder:text-[#6A7282]"
          />
        </div>
      </div>

      {error && (
        <span
          className="absolute left-0 -bottom-6 text-sm text-[#FB2C36] ms-2"
          role="alert"
        >
          {error}
        </span>
      )}
      
      <p className="text-xs text-gray-400 mt-1">
        Press Enter or comma to add tags. Paste comma-separated values.
      </p>
    </div>
  );
};

export default TagInput;