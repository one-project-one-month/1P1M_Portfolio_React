import { useState } from "react";
import { githubIconUrl } from "@/assets/icons/iconUrls";
import AppConfig from "@/config/appConfig";

function GitHubSignIn() {
  const [githubLoading, setGithubLoading] = useState(false);

  const githubOAuthUrl = `https://github.com/login/oauth/authorize?client_id=${AppConfig.GITHUB_CLIENT_ID}&redirect_uri=${AppConfig.GITHUB_REDIRECT_URI}&scope=user:email`;

  const handleGithubLogin = () => {
    setGithubLoading(true);
    window.location.href = githubOAuthUrl;
  };

  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 bg-[#121827] text-white w-full rounded-lg py-3 border border-[#2D3748] cursor-pointer"
      onClick={handleGithubLogin}
      disabled={githubLoading}
    >
      {githubLoading ? (
        <svg
          className="animate-spin h-5 w-5 text-white mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <img src={githubIconUrl} alt="GitHub" className="w-5 h-5" />
      )}
      <span className="font-sans font-medium text-sm leading-5 tracking-normal text-center align-middle">
        <span className="text-[#6A7282]">Sign in with </span>
        <span>GitHub</span>
      </span>
    </button>
  );
}

export default GitHubSignIn;
