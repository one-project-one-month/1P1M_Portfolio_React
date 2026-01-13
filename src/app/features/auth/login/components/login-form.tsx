import { Button } from '@/components/ui/button';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginWithEmailPassword } from '../services/api';
import type { LoginData } from '../services/types';
import FormBackground from './form-bg';
import PasswordField from './password-field';
import TextField from './text-field';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const [passwordErrorMsg, setPasswordErrorMsg] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  //validation
  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!email.trim()) {
      return 'Email is required';
    } else if (!emailRegex.test(email)) {
      return 'Invalid email address';
    }
    return '';
  };

  const validatePassword = (password: string) => {
    if (!password.trim()) {
      return 'Password is required';
    } else if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return '';
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
    setError('');

    try {
      const response = await loginWithEmailPassword(email, password);

      if (!response.success || response.code >= 400) {
        setError(response.message || 'Login failed');
      }

      toast.success('Login successfully!');
      console.log('Login successful:', response.data);

      const data = response.data as LoginData;
      if (data.isNewUserLogin) {
        navigate('/auth/setup-profile');
      } else if (data.role == 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (e: unknown) {
      const err = e as Error;
      console.error('Login failed:', err);
      setError(err.message || 'Login failed');
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
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          {!showEmailError && !showPasswordError && error && (
            <p className="text-red-500 text-xs mt-3 absolute bottom-[60px] left-[30%]">
              {error}
            </p>
          )}
        </div>

        {/* Forgot password */}
        <NavLink
          to={'/auth/forgot-password'}
          className="font-sans text-sm text-[#99A1AF] w-full text-center font-semibold mt-4"
        >
          Forget password?
        </NavLink>
      </FormBackground>
    </>
  );
}
