import React, { forwardRef, useState } from 'react';
import FormField from './FormFields';


const TextField = forwardRef(({ label, placeholder, type = 'text', name, id, value: propValue, error, className = "", editable = false }, ref) => {

  const [value, setValue] = useState(propValue || "");
    const [isEditable, setIsEditable] = useState(editable);

    const handleChange = (e) => {
      setValue(e.target.value);
    };

    const toggleEdit = () => {
      setIsEditable((prev) => !prev);
    };

 return (<div className='relative w-full text-white font-sans text-sm font-semibold leading-8 mb-8'>
          <label className='inline-block mb-1' htmlFor={id}>{label}</label>
          <FormField
            ref={ref}
            type={type}
            name={name}
            id={id}
            value = {value}
            placeholder={placeholder}
            onChange = {handleChange}
            disabled={!isEditable}
            className={`w-full px-3 py-2 rounded bg-[#222] text-white outline-none ${!isEditable ? "opacity-60 cursor-not-allowed" : ""} ${className}`}
          />
          <span className='absolute top-13 right-4 cursor-pointer font-md text-sm text-[#9C39FC]' onClick={toggleEdit}>{isEditable ? "Lock" : "Edit"}</span>
          {error && <span className='absolute left-0 -bottom-6 text-sm text-[#FB2C36] ms-2'>{error}</span>}
        </div>
  );
});
export default TextField;
