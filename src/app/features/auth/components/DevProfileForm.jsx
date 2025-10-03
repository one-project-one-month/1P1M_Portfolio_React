import FormBackground from "../../../components/ui/FormBackground";
import { PiSwatchesLight } from "react-icons/pi";
import { useRef,useState } from "react";
import FormField from "../../../components/ui/FormFields";
import FormTextArea from "../../../components/ui/FormTextArea";
import Button from "../../../components/ui/Button";
import TechStack from "../../../constants/TechStack";
import FormDropdown from "../../../components/ui/FormDropdown";
function DevProfileForm(){


// handle profile image upload start  
const fileRef=useRef(null);
const [preview,setPreview]=useState(null)

const handleButtonClick=(e)=>{
    e.preventDefault();
    fileRef.current.click()
}

const handleFileChange=(e)=>{
    const file =e.target.files[0]
    if(file){
        console.log("Selected File:",file); 
        const imgURL =URL.createObjectURL(file)
        setPreview(imgURL)
    }
}

// handle profile image upload end

const submit=(e)=>{
    e.preventDefault();
    console.log("Form Submit");
    

}

    return(
        
            <FormBackground className="w-[532px]">
                {/* heading */}
             <div className="text-3xl text-center space-y-2">
            <h2 className='text-2xl text-white space-y-3'>Set up Profile</h2>
            </div>

            <form className="flex flex-col items-center mt-2 gap-y-6"  >

                  {/* profile image */}
               <button className={`size-32 relative rounded-2xl ${!preview && "px-11 py-12" } bg-[#D9D9D9]`} onClick={handleButtonClick} >
                 {preview ? (
                    <img src={preview} className="w-full h-full object-cover rounded-2xl " />
                 ):( <svg  viewBox="0 0 36 37" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.75 12.5C9.75 14.1569 11.0931 15.5 12.75 15.5C14.4069 15.5 15.75 14.1569 15.75 12.5C15.75 10.8431 14.4069 9.5 12.75 9.5C11.0931 9.5 9.75 10.8431 9.75 12.5Z" stroke="#020618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M31.3911 15.4847C21.4744 14.1234 12.9243 21.4854 13.5002 31.2501" stroke="#020618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 20.0984C8.66904 19.5212 12.4123 21.5367 14.4353 24.7489" stroke="#020618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.5 18.5C4.5 12.136 4.5 8.95406 6.47703 6.97703C8.45406 5 11.636 5 18 5C24.364 5 27.5459 5 29.523 6.97703C31.5 8.95406 31.5 12.136 31.5 18.5C31.5 24.864 31.5 28.0459 29.523 30.023C27.5459 32 24.364 32 18 32C11.636 32 8.45406 32 6.47703 30.023C4.5 28.0459 4.5 24.864 4.5 18.5Z" stroke="#020618" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>)}
               </button>

                  {/* hidden file input */}
                 <input onChange={handleFileChange} type="file" className="w-10 h-14 bg-amber-50" ref={fileRef} hidden />

               {/* form field start */}
               <FormField type="text" placeholder={`Enter your name`} className="w-full"/>
               <FormDropdown  name={`TechStack`} placeholder={`TechStack`} menuList={TechStack} className={`w-full`}/>
               <FormField type="text" placeholder={`Github`} className="w-full"/>
               <FormField type="text" placeholder={`Linkedin`} className="w-full"/>
               <FormTextArea name={`about yourself`} placeholder={`About yourself`} className={`w-full h-28`}/>
               <div  className="flex w-full justify-between">

                <div className="text-sm font-bold flex items-center  gap-x-1  ">
                  <span className="text-[#F9FAFB]/50 size-5">  <PiSwatchesLight/></span>
                    
                    <button className="text-[#F9FAFB]/50" >Choose Theme</button>
                    
                    </div>


                <div className="flex gap-2">
                       <Button variant="black_small_button" size="black_small_button" className=' text-[#F9FAFB] font-bold text-center cursor-pointer'>Cancel</Button>
                      <Button onClick={submit} variant="secondary" size="secondary" className='font-bold text-center text-[#F9FAFB] cursor-pointer'  >Create</Button>
                  
                </div>
               </div>
               {/* form fields end */}
               
            </form>
              
            </FormBackground> 
       
    )
}

export default DevProfileForm;