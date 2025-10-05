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
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [serverError, setServerError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const cfmpasswordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = cfmpasswordRef.current.value.trim();

    // Validate inputs
    let valid = true;
    if (!email) {
      setEmailError("Enter your Email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Enter your Password");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setcmfPasswordError("Confirm your Password");
      valid = false;
    } else if (confirmPassword !== password) {
      setcmfPasswordError("Passwords do not match");
      valid = false;
    } else {
      setcmfPasswordError("");
    }

    if (!valid) return;

    // Reset states
    setServerError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg("Registration successful! You can now log in.");
        console.log("Success:", data);
      } else {
        if (data.errors) {
          setServerError(Object.values(data.errors).flat().join(" "));
        } else {
          setServerError(data.message || "Registration failed. Try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setServerError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
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
