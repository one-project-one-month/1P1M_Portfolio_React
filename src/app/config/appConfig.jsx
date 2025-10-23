const DEFAULT_API_URL = "http://localhost:8080/";
// const DEFAULT_API_URL = "https://onep1m-portfolio-backend.onrender.com";

// http://localhost:8080/swagger-ui/index.html#/

const AppConfig = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "OPOM Portfolio",
  BASE_URL: import.meta.env.VITE_BASE_URL || "http://localhost:5173",
  API_URL: import.meta.env.VITE_API_URL || DEFAULT_API_URL,

  // OAuth Configuration
  GITHUB_CLIENT_ID:
    import.meta.env.VITE_GITHUB_CLIENT_ID || "Ov23liwQG9sDezMQsqtO",
  GOOGLE_CLIENT_ID:
    import.meta.env.VITE_GOOGLE_CLIENT_ID ||
    "686561903051-a857ngoihbsfo2u5g1b3e9dh9uiljshb.apps.googleusercontent.com",

  // OAuth Redirect URIs
  GITHUB_REDIRECT_URI:
    import.meta.env.VITE_GITHUB_REDIRECT_URI ||
    "http://localhost:5173/login/oauth2/code/github",
  GOOGLE_REDIRECT_URI:
    import.meta.env.VITE_GOOGLE_REDIRECT_URI ||
    "http://localhost:5173/callback",
};

export default AppConfig;
