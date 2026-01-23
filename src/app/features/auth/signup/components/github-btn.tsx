import { githubIconUrl } from '@/assets/icons/iconUrls';
import { API_CONFIG } from '@/config/api';
import { useState } from 'react';

const GithubBtn = () => {
  const [githubLoading, setGithubLoading] = useState(false);

  const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${API_CONFIG.GITHUB_CLIENT_ID}&redirect_uri=${API_CONFIG.GITHUB_REDIRECT_URI}&scope=user:email`;

  const handleGithubLogin = () => {
    setGithubLoading(true);
    window.location.href = githubOAuthUrl;
  };

  return (
    <button
      onClick={handleGithubLogin}
      disabled={githubLoading}
      className="bg-white/9 flex items-center outline-none border border-gray-100/10 text-white p-3 rounded-md justify-center gap-6"
    >
      <img src={githubIconUrl} />
      Sign in with Github
    </button>
  );
};

export default GithubBtn;
