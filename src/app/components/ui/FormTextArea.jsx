import React, { forwardRef } from "react";

const FormTextArea = forwardRef(({name,placeholder,className,error,...props}, ref) => (
    <div className="relative w-full">
        <textarea 
            ref={ref}
            name={name} 
            placeholder={placeholder} 
            className={`h-12 rounded-lg px-4 py-3
            bg-[#FFFFFF17] border border-[#FFFFFF26] 
            text-white placeholder-[#99A1AF]
            focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${className}`} 
            {...props}
        />
        {error && (
            <span className="absolute left-0 -bottom-6 text-sm text-[#FB2C36] ms-2">
                {error}
            </span>
        )}
    </div>
));


export default FormTextArea;