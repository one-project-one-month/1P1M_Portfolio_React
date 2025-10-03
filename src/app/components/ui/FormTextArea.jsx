function FormTextArea({name,placeholder,className,...props}){
    return(
        <textarea name={name} placeholder={placeholder} className={`h-12 rounded-lg px-4 py-3
        bg-[#FFFFFF17] border border-[#FFFFFF26] 
        text-white placeholder-[#99A1AF]
        focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none ${className}`} {...props}>

        </textarea>
    )
}


export default FormTextArea;