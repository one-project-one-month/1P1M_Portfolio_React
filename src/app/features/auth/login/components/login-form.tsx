import { Button } from '@/components/ui/button';
import FormBackground from '@/components/ui/form-bg';
import { useToast } from '@/components/ui/toast-provider';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { useUserInfoStore, type UserInfo } from '@/store/user-info-store';
import type { LoginResponse } from '@/types/auth';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthFormHeading from '../../auth-form-heading';
import { loginWithEmailPassword } from '../services/api';
import PasswordField from './password-field';
import TextField from './text-field';

export default function LoginForm() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUserInfo } = useUserInfoStore();

  const { handleRoute } = useAppNavigation();

  const [emailErrorMsg, setEmailErrorMsg] = useState('');
  const { addToast } = useToast();
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

    setShowEmailError(!!emailErr);
    setShowPasswordError(!!passwordErr);

    // Stop if any validation fails
    if (emailErr || passwordErr) return;

    setLoading(true);

    try {
      const response = await loginWithEmailPassword(email, password);
      if (!response.success || response.code >= 400) {
        addToast(response.message, 'error', 3000);
      } else {
        const userInfo: UserInfo = {
          username: response.data?.username ?? '',
          userId: response.data?.userId ?? 0,
          role: response.data?.role ?? 'USER',
          profile: response.data?.profilePictureUrl ?? null,
          email: response.data?.email ?? '',
        };

        setUserInfo(userInfo);

        const data = response.data as LoginResponse;

        handleRoute(data?.role ?? 'USER', data?.isNewUserLogin);
        addToast(response?.message, 'success', 3000);
      }
    } catch (e: unknown) {
      const err = e as Error;
      console.error('Login failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormBackground className="flex items-center justify-around flex-col w-fit h-fit ">
      <AuthFormHeading
        title="Sign In To Your Account"
        desc="Join thousands of others building the future together"
      />

      {/* Form Fields */}
      <div className="w-[404px] h-[260px] flex flex-col gap-6 justify-around">
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
      </div>

      {/* Forgot password */}
      <div className="flex w-full items-center justify-between mt-6">
        <NavLink
          to={'/auth/sign-up'}
          className="font-sans text-sm text-[#99A1AF] font-semibold hover:text-white"
        >
          Register here
        </NavLink>
        <NavLink
          to={'/auth/forgot-password'}
          className="font-sans text-sm text-[#99A1AF] font-semibold hover:text-white"
        >
          Forgot password?
        </NavLink>
      </div>
    </FormBackground>
  );
}
