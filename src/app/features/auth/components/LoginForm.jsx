import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import FormBackground from "../../../components/ui/FormBackground";
import TextField from "@/components/ui/TextField";
import PasswordField from "@/components/ui/PasswordField";
import { loginWithEmailPassword } from "@/services/authService";
import { NavLink, useNavigate } from "react-router-dom";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [passwordErrorMsg, setPasswordErrorMsg] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  console.log(emailErrorMsg);
  console.log(passwordErrorMsg);
  console.log(showEmailError);
  console.log(showPasswordError);
  console.log(email);
  console.log(password);

  //validation
  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!email.trim()) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleLogin = async () => {
    // Run validation only when login button is clicked
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);

    // Set error messages
    setEmailErrorMsg(emailErr);
    setPasswordErrorMsg(passwordErr);

    // Show/hide errors based on validation results
    setShowEmailError(!!emailErr);
    setShowPasswordError(!!passwordErr);

    // Stop if any validation fails
    if (emailErr || passwordErr) return;

    setLoading(true);
    setError("");

    try {
      const data = await loginWithEmailPassword(email, password);
      console.log("Login success:", data);

      if (data.success === 0 || data.code >= 400) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      if (data?.data.token) {
        localStorage.setItem("token", data?.data.token);

        // Store user information
        const userInfo = {
          id: data?.data.userId,
          username: data?.data.username,
          email: data?.data.email,
          role: data?.data.role,
          roleId: data?.data.roleId,
          isNewUserLogin: data?.data.isNewUserLogin,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
      }

      // alert("Login successful!");
      navigate("/setup-profile");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormBackground className="flex items-center justify-around flex-col w-full h-full">
        {/* Heading */}
        <div className="text-white">
          <h1 className="font-sans font-bold text-2xl leading-8 mb-2">
            Sign In To Your Account
          </h1>
          <p className="font-sans text-sm text-[#99A1AF] w-full text-center mb-4">
            Subtitle
          </p>
        </div>

        {/* Form Fields */}
        <div className="w-[404px] h-[260px] flex flex-col justify-around">
          {/* Email */}
          <div className="-mb-8 relative">
            <TextField
              label="Email"
              id="email"
              name="email"
              placeholder="Enter your email here"
              value={email}
              onChange={(value) => setEmail(value)}
              className="relative w-full text-white font-sans text-sm font-semibold leading-8"
            />
            {showEmailError && (
              <p className="text-red-500 text-xs absolute bottom-[15px]">
                {emailErrorMsg}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="-mb-8 relative">
            <PasswordField
              label="Password"
              id="password"
              name="password"
              placeholder="Enter your password here"
              value={password}
              onChange={(value) => setPassword(value)}
            />
            {showPasswordError && (
              <p className="text-red-500 text-xs absolute bottom-[15px]">
                {passwordErrorMsg}
              </p>
            )}
          </div>

          {/* Login Button */}
          <Button
            variant="primary"
            size="primary"
            className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3"
            onClick={handleLogin}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          {!showEmailError && !showPasswordError && error && (
            <p className="text-red-500 text-xs mt-3 absolute bottom-[60px] left-[30%]">
              {error}
            </p>
          )}
        </div>

        {/* Forgot password */}
        <NavLink
          to={"/forgot-password"}
          className="font-sans text-sm text-[#99A1AF] w-full text-center font-semibold mt-4"
        >
          Forget password?
        </NavLink>
      </FormBackground>
    </>
  );
}

export default LoginForm;
