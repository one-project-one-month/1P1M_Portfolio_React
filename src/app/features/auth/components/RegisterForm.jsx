import React, { useRef, useState } from 'react'
import FormBackground from '../../../components/ui/FormBackground'
import FormField from '../../../components/ui/FormFields'
import Button from '../../../components/ui/Button'
import FormWrapper from '../../../components/ui/FormWrapper'
import TextField from '../../../components/ui/TextField'
import PasswordField from '../../../components/ui/PasswordField'

const RegisterForm = ({className=""}) => {

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cmfPasswordError, setcmfPasswordError] = useState("");

    const emailRef = useRef();
    const passwordRef = useRef();
    const cfmpasswordRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = emailRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const confirmPassword = cfmpasswordRef.current.value.trim();


        // to check valid data here 

        if(!email){
          setEmailError("Enter your Email");
        }else{
          setEmailError("");
        }

        if(!password){
          setPasswordError("Enter your Password");
        }else{
          setPasswordError("")
        }

        if( !confirmPassword ){
          setcmfPasswordError("Confirm your Password");
        }else if(confirmPassword !== password && password){
          setcmfPasswordError("Passwords do not match ");
        }else{
          setcmfPasswordError("")
        }

        if(!emailError && !passwordError &&  !cmfPasswordError ){
            const data = {
              email,
              password,
              confirmPassword
          };
          setEmailError("");
          setPasswordError("");
          setcmfPasswordError("");

          console.log("Form Data:", data);
        }

    };

  return (

    <FormWrapper className="" title="Register Your Account" subtitle="subtitle" onSubmit={handleSubmit}>
        <TextField ref={emailRef} type='email' name='regemail' id="regemail" label="Email" placeholder="nora@gmail.com"  error={`${emailError ? emailError :""}`}/>
        <PasswordField ref={passwordRef} name='password' id="password" label="Password" placeholder="Enter your password" error={`${passwordError ? passwordError :""}`} />
        <PasswordField ref={cfmpasswordRef} name='cfmpassword' id="cfmpassword" label="Confirm Password" placeholder="Confirm your password" error={`${ cmfPasswordError ? cmfPasswordError  :""}`} />
    </FormWrapper>
  )
}

export default RegisterForm
