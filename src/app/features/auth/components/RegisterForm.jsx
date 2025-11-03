import React, { useEffect, useRef, useState } from "react";
import FormWrapper from "../../../components/ui/FormWrapper";
import TextField from "../../../components/ui/TextField";
import PasswordField from "../../../components/ui/PasswordField";
import { useLocation, useNavigate } from "react-router-dom";
import {
  checkEmailExists,
  loginWithEmailPassword,
  sendOtpCode,
  signupWithEmail,
} from "@/services/authService";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [cmfPasswordError, setCmfPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const cfmpasswordRef = useRef();

  const navigate = useNavigate();
  const location = useLocation();
  const emailFromAuth = location.state?.email || "";

  //  Email format validation
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Strong password validation (8+ chars, uppercase, lowercase, number, special char)
  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  const TEMP_DOMAINS = [
    "memeazon.com",
    "tempmail.com",
    "mailinator.com",
    "guerrillamail.com",
    "10minutemail.com",
    "yopmail.com",
    "getnada.com",
  ];
  const verifyTempEmail = async (email) => {
    const domain = email.split("@")[1]?.toLowerCase();

    if (TEMP_DOMAINS.includes(domain)) return true;

    try {
      const kickboxRes = await fetch(
        `https://open.kickbox.com/v1/disposable/${encodeURIComponent(
          email.toLowerCase()
        )}`
      );
      const kickboxData = await kickboxRes.json();
      if (kickboxData.disposable) return true;

      const debounceRes = await fetch(
        `https://disposable.debounce.io/?email=${encodeURIComponent(email)}`
      );
      const debounceData = await debounceRes.json();
      if (debounceData.disposable === "true") return true;
    } catch (err) {
      console.warn("Temp email check failed, proceeding cautiously.", err);
    }

    return false; // not disposable
  };

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
    const confirmPassword = cfmpasswordRef.current.value.trim();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setCmfPasswordError("");
    setServerError("");

    // Validation
    let valid = true;

    //  Email validation
    if (!email) {
      setEmailError("Enter your Email");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid Email address");
      valid = false;
    } else {
      toast.loading("Checking email validity...");
      const isTemp = await verifyTempEmail(email);
      toast.remove();
      if (isTemp) {
        setEmailError("Temporary email addresses are not allowed");
        valid = false;
      }
    }

    //  Password validation
    if (!password) {
      setPasswordError("Enter your Password");
      valid = false;
    } else if (!isStrongPassword(password)) {
      setPasswordError(
        "Password must be at least 8 characters, include upper/lowercase, number, and symbol."
      );
      valid = false;
    }

    // Confirm password validation
    if (!confirmPassword) {
      setCmfPasswordError("Confirm your Password");
      valid = false;
    } else if (confirmPassword !== password) {
      setCmfPasswordError("Passwords do not match");
      valid = false;
    }

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

      // after fill register form, called otp api to verify
      const res = await sendOtpCode(email);
      if (res.code === 200 && res.success === 1) {
        toast.success("OTP resent successfully! Check your email.", {
          id: "resend-otp",
        });
        navigate("/auth/otp-verify", { state: { email, password } });
      }
    } catch (error) {
      console.error("Register error:", error);
      toast.removeAll();
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormWrapper
      title="Register Your Account"
      subtitle="Please fill in the details below"
      onSubmit={handleSubmit}
      loading={loading}
      buttonText="Continue"
    >
      <TextField
        ref={emailRef}
        type="email"
        name="regemail"
        id="regemail"
        label="Email"
        value={emailFromAuth}
        placeholder="nora@gmail.com"
        error={emailError}
      />
      <PasswordField
        ref={passwordRef}
        name="password"
        id="password"
        label="Password"
        placeholder="Enter your password"
        error={passwordError}
      />
      <PasswordField
        ref={cfmpasswordRef}
        name="cfmpassword"
        id="cfmpassword"
        label="Confirm Password"
        placeholder="Confirm your password"
        error={cmfPasswordError}
      />
    </FormWrapper>
  );
};

export default RegisterForm;
