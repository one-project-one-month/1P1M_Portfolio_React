import React, { useEffect, useRef, useState } from 'react'
import FormWrapper from '../../../components/ui/FormWrapper'
import TextField from '../../../components/ui/TextField'
import PasswordField from '../../../components/ui/PasswordField'
import { useLocation, useNavigate } from 'react-router-dom'
import { checkEmailExists, signupWithEmail } from '@/services/authService'
import toast from 'react-hot-toast'

const RegisterForm = () => {

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const [cmfPasswordError, setCmfPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  // const cfmpasswordRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const emailFromAuth = location.state?.email || "";

  // Email check function
  const checkEmailExistsInSystem = async (email) => {
    try {
      const response = await checkEmailExists(email);
      return response?.data || false;
    } catch (error) {
      console.error("Email check error:", error);
      return false;
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    // const confirmPassword = cfmpasswordRef.current.value.trim();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    // setCmfPasswordError("");
    setServerError("");
  

    // Validation
    let valid = true;

    if (!email) {
      setEmailError("Enter your Email");
      valid = false;
    }
    if (!password) {
      setPasswordError("Enter your Password");
      valid = false;
    }

    // if (!confirmPassword) {
    //   setCmfPasswordError("Confirm your Password");
    //   valid = false;
    // } else if (confirmPassword !== password) {
    //   setCmfPasswordError("Passwords do not match");
    //   valid = false;
    // }

    if (!valid) return;

    setLoading(true);

    try {
      // Check if email exists
      const emailExists = await checkEmailExistsInSystem(email);
      if (emailExists) {
        toast.removeAll();
        toast.error("Email already exists");
        setLoading(false);
        return;
      }

       toast.success("OTP has been sent to your email.");
        navigate("/otp-verify", { state: { email, password } });
      
    } catch (error) {
      console.error("Register error:", error);
      toast.removeAll();
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (

    <FormWrapper className="" title="Register Your Account" subtitle="subtitle" onSubmit={handleSubmit} loading={loading}>
        <TextField ref={emailRef} type='email' name='regemail' id="regemail" label="Email" value={emailFromAuth}  placeholder="nora@gmail.com"  error={`${emailError ? emailError :""}`}/>
        <PasswordField ref={passwordRef} name='password' id="password" label="Password" placeholder="Enter your password" error={`${passwordError ? passwordError :""}`} />
        {/* <PasswordField ref={cfmpasswordRef} name='cfmpassword' id="cfmpassword" label="Confirm Password" placeholder="Confirm your password" error={`${ cmfPasswordError ? cmfPasswordError  :""}`} /> */}
    </FormWrapper>
  )
}

export default RegisterForm
