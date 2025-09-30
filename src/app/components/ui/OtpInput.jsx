import React, { useRef, useEffect } from 'react';

function OtpInput({ value, onChange, onComplete, length = 6, disabled = false, hasError = false }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, inputValue) => {
    if (disabled) return;

    // Only allow digits
    const digit = inputValue.replace(/\D/g, '');
    
    if (digit.length > 1) return; // Prevent multiple characters

    const newValue = value.split('');
    newValue[index] = digit;
    const updatedValue = newValue.join('');
    
    onChange(updatedValue);

    // Auto-focus next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Call onComplete when all fields are filled
    if (updatedValue.length === length && !updatedValue.includes('')) {
      onComplete?.(updatedValue);
    }
  };

  const handleKeyDown = (index, e) => {
    if (disabled) return;

    // Handle backspace
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        // Move to previous input if current is empty
        inputRefs.current[index - 1]?.focus();
      } else {
        // Clear current input
        const newValue = value.split('');
        newValue[index] = '';
        onChange(newValue.join(''));
      }
    }
    // Handle paste
    else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    else if (e.key === 'ArrowRight' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    if (disabled) return;
    
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    const newValue = pastedData.slice(0, length).padEnd(length, '').split('').join('');
    onChange(newValue);
    
    // Focus the next empty input or the last input
    const nextIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="flex gap-3 justify-center">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`
            w-12 h-12 md:w-16 md:h-16
            bg-[#FFFFFF17] border rounded-lg
            text-white text-center text-lg font-semibold
            focus:outline-none focus:ring-2 focus:ring-purple-500
            ${hasError 
              ? 'border-red-500 border-2' 
              : 'border-[#FFFFFF26] hover:border-[#FFFFFF40]'
            }
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            transition-all duration-200
          `}
        />
      ))}
    </div>
  );
}

export default OtpInput;