import { googleIconUrl } from '@/assets/icons/iconUrls';
import { API_CONFIG } from '@/config/api';
import { useState } from 'react';

const GoogleBtn = () => {
  const [googleLoading, setGoogleLoading] = useState(false);

  const REDIRECT_URI = `${window.location.origin}/auth/sign-up`;

  const params = new URLSearchParams({
    client_id: API_CONFIG.GITHUB_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'code',
    scope: 'email profile',
    access_type: 'offline',
    prompt: 'consent',
  });

  const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    window.location.href = googleOAuthUrl;
  };

  return (
    <button
      disabled={googleLoading}
      onClick={handleGoogleLogin}
      className="bg-white/10 hover:bg-white/20 transition-colors flex items-center outline-none border border-gray-100/10 text-white p-3 rounded-md justify-center gap-6 w-full disabled:opacity-50"
    >
      <img src={googleIconUrl} alt="Google Icon" className="w-5 h-5" />
      {googleLoading ? 'Redirecting...' : 'Sign in with Google'}
    </button>
  );
};

export default GoogleBtn;
