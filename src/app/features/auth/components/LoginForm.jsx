import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Background from '../../../components/ui/Background';
import FormBackground from '../../../components/ui/FormBackground';
import FormField from '../../../components/ui/FormFields';

function LoginForm() {
  const [passVisibility, setPassVisibility] = useState(false);
  const [password, setPassword] = useState(""); // add password state
  const [email, setEmail] = useState(""); // optional: track email

  return (
    <Background className='h-screen flex items-center justify-center'>
      <div className='w-[468px] h-[448px] border border-[#1E2939] rounded-3xl'>
        <FormBackground className="flex items-center justify-around flex-col">
          
          {/* Heading */}
          <div className='text-white'>
            <h1 className='font-sans font-bold text-2xl leading-8 mb-2'>Sign In To Your Account</h1>
            <p className='font-sans text-sm text-[#99A1AF] w-full text-center'>Subtitle</p>
          </div>

          {/* Form Fields */}
          <div className='w-[404px] h-[250px] flex items-center justify-between flex-col'>
            
            {/* Email */}
            <div className='w-full relative'>
              <label className='text-white font-sans text-sm font-semibold leading-8'>Email</label>
              <FormField
                placeholder="Enter your email here"
                className='w-full placeholder:text-[#6A7282] placeholder:font-sans placeholder:text-sm'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <a
                href='#'
                className='absolute text-white no-underline right-5 top-[55%] font-sans text-sm font-medium leading-5'
              >
                Edit
              </a>
            </div>

            {/* Password */}
            <div className='w-full relative'>
              <label className='text-white font-sans text-sm font-semibold leading-8'>Password</label>
              <FormField
                placeholder="Enter your password here"
                type={passVisibility ? "text" : "password"}
                className='w-full placeholder:text-[#6A7282] placeholder:font-sans placeholder:text-sm'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className='absolute text-white no-underline right-5 top-[55%] font-sans text-sm font-medium leading-5'
                onClick={() => setPassVisibility(prev => !prev)}
              >
                {passVisibility ? "Hide" : "Show"}
              </button>
            </div>

            {/* Login Button */}
            <Button
              variant="primary"
              size="primary"
              className='mt-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl'
            >
              Login
            </Button>
          </div>

          {/* Forgot password */}
          <a
            href='#'
            className='font-sans text-sm text-[#99A1AF] w-full text-center font-semibold'
          >
            Forget password?
          </a>
        </FormBackground>
      </div>
    </Background>
  );
}

export default LoginForm;
