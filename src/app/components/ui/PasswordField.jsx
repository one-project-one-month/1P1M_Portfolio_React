import React, { useState, forwardRef } from 'react';
import FormField from './FormFields';

const EyeIcon = ({ open }) => (
  open ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12c2.25-4.5 6-7.5 9.75-7.5S19.5 7.5 21.75 12c-2.25 4.5-6 7.5-9.75 7.5S4.5 16.5 2.25 12z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.774 3.162 10.066 7.5a10.522 10.522 0 0 1-4.293 5.143M6.228 6.228 3 3m3.228 3.228 12.544 12.544" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
    </svg>
  )
);

const PasswordField = forwardRef(({ label, placeholder, name, id, error, className }, ref) => {
  const [show, setShow] = useState(false);

  return (
    <div className='relative w-full text-white font-sans text-sm font-semibold leading-8 mb-8'>
      <label className='inline-block'>{label}</label>
      <FormField
        ref={ref}
        type={show ? 'text' : 'password'}
        name={name}
        id={id}
        placeholder={placeholder}
        className={`w-full px-3 py-2 rounded bg-[#222] text-white outline-none ${className}`}
      />
      <span className='absolute top-12 right-4 cursor-pointer text-white' onClick={() => setShow(!show)}>
        <EyeIcon open={show} />
      </span>
      {error && <span className='absolute left-0 -bottom-6 text-sm text-[#FB2C36] mt-1 block'>{error}</span>}
    </div>
  );
});

export default PasswordField;
