import FormWrapper from "@/components/ui/FormWrapper";
import PasswordField from "@/components/ui/PasswordField";
import { resetPassword } from "@/services/authService";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPasswordForm = () => {
  const [passwordError, setPasswordError] = useState("");
  const [cmfPasswordError, setCmfPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordRestted, setPasswordRestted] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const passwordRef = useRef();
  const cfmpasswordRef = useRef();

  // Strong password validation (8+ chars, uppercase, lowercase, number, special char)
  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );

  // Handle form submit
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    const password = passwordRef.current.value.trim();
    const confirmPassword = cfmpasswordRef.current.value.trim();

    setPasswordError("");
    setCmfPasswordError("");

    // Validation
    let valid = true;

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

    if (!email) {
      toast.error("Session expired or email not found. Please start over.");
      navigate("/auth/forgot-password");
      return;
    }

    if (!valid) return;

    setLoading(true);

    try {
      await resetPassword(email, password);
      toast.success("Password updated successfully! Please log in.", {
        id: "reset-password",
      });
      setPasswordRestted(true);
    } catch (error) {
      toast.error(
        error.message || "Failed to reset password. Please try again.",
        { id: "reset-password" }
      );
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    navigate("/auth/login");
  };
  return (
    <>
      {!passwordRestted ? (
        <FormWrapper
          title="Reset password"
          onSubmit={handlePasswordReset}
          loading={loading}
          buttonText="Update password"
        >
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
      ) : (
        <FormWrapper
          title="Successful"
          subtitle="Congratulations! Your password has been changer. Click continue to login."
          onSubmit={handleContinue}
          loading={loading}
          buttonText="Continue"
        >
          <div className="my-8"></div>
        </FormWrapper>
      )}
    </>
  );
};

export default ResetPasswordForm;
