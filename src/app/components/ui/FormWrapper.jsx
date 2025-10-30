import React from 'react';
import Button from './Button';

const FormWrapper = ({ title, subtitle, children, onSubmit, className, loading, buttonText = "Continue" }) => (
        <form className={`text-white font-sans text-sm font-semibold leading-8 ${className}`}>
            <div className="text-2xl text-center space-y-2">
            <h2 className='text-2xl'>{title}</h2>
            {subtitle && <p className='text-sm text-[#99A1AF]'>{subtitle}</p>}
            </div>
            {children}
            <Button type="submit" className='w-full cursor-pointer' variant="primary" size="primary" disabled={loading}
                onClick={async (e) => { 
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("=== BUTTON CLICKED - CALLING API ===");
                    await onSubmit(e);
                }}
            >
                <div className="flex items-center justify-center">
                    {loading && (
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    )}
                    {buttonText}
                </div>
            </Button>
        </form>
);

export default FormWrapper;
