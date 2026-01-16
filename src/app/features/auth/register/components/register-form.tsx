import FormWrapper from '@/components/ui/form-wrapper';
import PasswordField from '@/components/ui/password-field';
import TextField from '@/components/ui/text-field';
import { type FormEvent, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { checkEmailExists, sendOtpCode } from '../services/api';

interface LocationState {
  email?: string;
}

export default function RegisterForm() {
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [cmfPasswordError, setCmfPasswordError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [, setServerError] = useState<string>('');

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const cfmpasswordRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as LocationState | null;
  const emailFromAuth = state?.email ?? '';

  function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isStrongPassword(password: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );
  }

  const TEMP_DOMAINS: string[] = [
    'memeazon.com',
    'tempmail.com',
    'mailinator.com',
    'guerrillamail.com',
    '10minutemail.com',
    'yopmail.com',
    'getnada.com',
  ];

  async function verifyTempEmail(email: string): Promise<boolean> {
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && TEMP_DOMAINS.includes(domain)) {
      return true;
    }

    try {
      const kickboxRes = await fetch(
        `https://open.kickbox.com/v1/disposable/${encodeURIComponent(
          email.toLowerCase(),
        )}`,
      );
      const kickboxData = await kickboxRes.json();
      if (kickboxData.disposable) {
        return true;
      }

      const debounceRes = await fetch(
        `https://disposable.debounce.io/?email=${encodeURIComponent(email)}`,
      );
      const debounceData = await debounceRes.json();
      if (debounceData.disposable === 'true') {
        return true;
      }
    } catch (err) {
      console.warn('Temp email check failed, proceeding cautiously.', err);
    }

    return false;
  }

  async function checkEmailExistsInSystem(email: string): Promise<boolean> {
    const response = await checkEmailExists(email);
    return response.data == null ? false : true;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const email = emailRef.current?.value.trim() ?? '';
    const password = passwordRef.current?.value.trim() ?? '';
    const confirmPassword = cfmpasswordRef.current?.value.trim() ?? '';

    setEmailError('');
    setPasswordError('');
    setCmfPasswordError('');
    setServerError('');

    let valid = true;

    if (!email) {
      setEmailError('Enter your Email');
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError('Enter a valid Email address');
      valid = false;
    } else {
      toast.loading('Checking email validity...');
      const isTemp = await verifyTempEmail(email);
      toast.remove();
      if (isTemp) {
        setEmailError('Temporary email addresses are not allowed');
        valid = false;
      }
    }

    if (!password) {
      setPasswordError('Enter your Password');
      valid = false;
    } else if (!isStrongPassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters, include upper/lowercase, number, and symbol.',
      );
      valid = false;
    }

    if (!confirmPassword) {
      setCmfPasswordError('Confirm your Password');
      valid = false;
    } else if (confirmPassword !== password) {
      setCmfPasswordError('Passwords do not match');
      valid = false;
    }

    if (!valid) {
      return;
    }

    setLoading(true);

    try {
      const emailExists = await checkEmailExistsInSystem(email);
      if (emailExists) {
        toast.error('Email already exists');
        setLoading(false);
        return;
      }

      const res = await sendOtpCode(email);
      if (res.code === 200 && res.success) {
        toast.success('OTP resent successfully! Check your email.');
        navigate('/auth/otp-verify', { state: { email, password } });
      }
    } catch (error) {
      console.error('Register error:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

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
        value={emailFromAuth ?? emailFromAuth}
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
}
