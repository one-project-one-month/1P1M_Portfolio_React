import React from 'react';
import FormBackground from './FormBackground';
import Button from './Button';

const FormWrapper = ({ title, subtitle, children, onSubmit }) => (
        <form onSubmit={onSubmit}>
            <div className="text-white text-2xl text-center space-y-2">
            <h2 className='text-2xl'>{title}</h2>
            {subtitle && <p className='text-sm text-[#99A1AF]'>{subtitle}</p>}
            </div>
            {children}
            <Button type="submit" className='w-full' variant="primary" size="primary">Continue</Button>
        </form>
);

export default FormWrapper;
