import React, { forwardRef } from 'react';
import FormField from './FormFields';

const TextField = forwardRef(({ label, placeholder, type = 'text', name, id, error }, ref) => (
  <div className='relative text-sm mb-8'>
    <label className='inline-block mb-1' htmlFor={id}>{label}</label>
    <FormField
      ref={ref}
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      className='w-full px-3 py-2 rounded bg-[#222] text-white outline-none'
    />
    <span className='absolute top-10 right-4 cursor-pointer font-md text-sm text-[#9C39FC]'>Edit</span>
    {error && <span className='absolute left-0 -bottom-6 text-sm text-[#FB2C36] ms-2'>{error}</span>}
  </div>
));
export default TextField;
