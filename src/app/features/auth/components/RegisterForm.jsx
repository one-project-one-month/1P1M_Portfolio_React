import React, { useRef, useState } from 'react'
import FormBackground from '../../../components/ui/FormBackground'
import FormField from '../../../components/ui/FormFields'
import Button from '../../../components/ui/Button'
import FormWrapper from '../../../components/ui/FormWrapper'
import TextField from '../../../components/ui/TextField'
import PasswordField from '../../../components/ui/PasswordField'

const RegisterForm = ({className =""}) => {

    const [openPassword, setOpenPassword] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const cfmpasswordRef = useRef();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        // to check valid data here 

        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirmPassword: cfmpasswordRef.current.value
        };

        console.log("Form Data:", data);
    };

  return (

    <FormWrapper title="Register Your Account" subtitle="subtitle" onSubmit={handleSubmit}>
        <TextField ref={emailRef} type='email' name='regemail' id="regemail" label="Email" placeholder="nora@gmail.com"  error=""/>
        <PasswordField ref={passwordRef} name='password' id="password" label="Password" placeholder="Enter your password" />
        <PasswordField ref={cfmpasswordRef} name='cfmpassword' id="cfmpassword" label="Confirm Password" placeholder="Confirm your password" error="" />
    </FormWrapper>
  )
}

export default RegisterForm
