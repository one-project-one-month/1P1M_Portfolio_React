import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormFields";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { googleIconUrl, githubIconUrl } from "@/assets/icons/iconUrls";
import {
  exchangeGithubCode,
  exchangeGoogleCode,
  loginWithEmailPassword,
  checkEmailExists,
} from "@/services/authService";

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [touched, setTouched] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Google OAuth URL
  const googleOAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth" +
    "?client_id=686561903051-a857ngoihbsfo2u5g1b3e9dh9uiljshb.apps.googleusercontent.com" +
    "&redirect_uri=http://localhost:5173/callback" +
    "&response_type=code" +
    "&scope=openid%20email%20profile" +
    "&access_type=offline" +
    "&prompt=consent";

  // GitHub OAuth URL
  const githubOAuthUrl =
    "https://github.com/login/oauth/authorize?client_id=Ov23liwQG9sDezMQsqtO&redirect_uri=http://localhost:5173/login/oauth2/code/github&scope=user:email";

  // Handle Google authentication
  const handleGoogleLogin = () => {
    console.log("=== GOOGLE LOGIN INITIATED ===");
    setGoogleLoading(true);
    window.location.href = googleOAuthUrl;
  };

  // Handle GitHub authentication
  const handleGithubLogin = () => {
    console.log("=== GITHUB LOGIN INITIATED ===");
    setGithubLoading(true);
    window.location.href = githubOAuthUrl;
  };

  // Check for OAuth codes in URL - for both Google and GitHub
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      console.log("=== OAuth code received ===", code);
      console.log("Current pathname:", location.pathname);

      // Handle Google OAuth callback
      if (location.pathname === "/callback") {
        console.log("=== GOOGLE OAuth callback detected ===");
        setGoogleLoading(true);

        // Exchange the code for access token and user data
        exchangeGoogleCode(code)
          .then((data) => {
            console.log("Google authentication successful!", data);

            // Store user data and token in localStorage
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
            }
            if (data.token) {
              localStorage.setItem("token", data.token);
            }

            // Show success message
            alert("Google authentication successful!");

            // Redirect to dashboard or home page
            navigate("/dashboard");
          })
          .catch((error) => {
            console.error("Google authentication failed:", error);
            // Show error message
            alert(
              "Google authentication failed: " +
                (error.message || "Unknown error")
            );

            // Navigate back to login on error
            navigate("/login");
          })
          .finally(() => {
            setGoogleLoading(false);
          });
      }

      // Handle GitHub OAuth callback
      else if (
        location.pathname === "/auth/callback" ||
        location.pathname === "/login/oauth2/code/github"
      ) {
        console.log("=== GITHUB OAuth callback detected ===");
        setGithubLoading(true);

        // Exchange the code for access token and user data using the specified endpoint
        exchangeGithubCode(code)
          .then((data) => {
            console.log("GitHub authentication successful!", data);

            // Store user data and token in localStorage
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
            }
            if (data.token) {
              localStorage.setItem("token", data.token);
            }

            // Show success message
            alert("GitHub authentication successful!");

            // Redirect to dashboard or home page
            navigate("/dashboard");
          })
          .catch((error) => {
            console.error("GitHub authentication failed:", error);
            // Show error message
            alert(
              "GitHub authentication failed: " +
                (error.message || "Unknown error")
            );
          })
          .finally(() => {
            setGithubLoading(false);
          });
      }
    }
  }, [location.pathname, location.search, navigate]);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (!email.trim()) {
      return "Email is required";
    } else if (!emailRegex.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (touched) {
      setEmailError(validateEmail(value));
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailBlur = () => {
    setTouched(true);
    setEmailError(validateEmail(email));
  };

  // Function to check if email exists using the real API
  const checkEmailExistsInSystem = async (email) => {
    console.log("=== STARTING EMAIL CHECK API CALL ===");
    console.log("Email to check:", email);

    try {
      console.log("About to call checkEmailExists API...");
      const response = await checkEmailExists(email);
      console.log("API response received:", response);

      // API returns { exists: true/false } or similar
      const exists = response.exists || response.emailExists || false;
      console.log("Email exists result:", exists);

      return exists;
    } catch (error) {
      console.error("=== API CALL ERROR ===");
      console.error("Error:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("Error message:", error.message);

      // Don't throw error - handle gracefully to prevent page reload
      console.log("Handling error gracefully to prevent reload");
      return false; // Assume email doesn't exist if API fails
    }
  };

  const handleEditEmail = () => {
    setShowPasswordField(false);
  };

  const handleSubmit = async (e) => {
    console.log("=== HANDLE SUBMIT CALLED ===");
    console.log("Event:", e);

    if (e) {
      e.preventDefault();
      e.stopPropagation();
      console.log("Event prevented and stopped");
    }

    try {
      console.log("Current state:", {
        showPasswordField,
        email,
        password: password ? "[HAS PASSWORD]" : "[NO PASSWORD]",
        isLoading,
      });

      if (showPasswordField) {
        console.log("=== PASSWORD LOGIN FLOW ===");
        setIsLoading(true);
        try {
          console.log("Calling loginWithEmailPassword...");
          const data = await loginWithEmailPassword(email, password);
          console.log("Login successful:", data);

          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          console.log("Data stored in localStorage");

          console.log(
            "Login completed successfully - NO NAVIGATION FOR TESTING"
          );
          //navigate("/dashboard");
        } catch (error) {
          console.error("Login failed:", error);
          console.error("Login error details:", {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
        } finally {
          setIsLoading(false);
          console.log("Login loading set to false");
        }
        console.log("=== PASSWORD LOGIN FLOW COMPLETED ===");
        return;
      }

      console.log("=== EMAIL CHECK FLOW ===");
      const validationError = validateEmail(email);
      console.log("Email validation result:", validationError);
      setEmailError(validationError);

      if (!validationError) {
        console.log("Email validation passed, starting API call...");
        setIsLoading(true);

        try {
          console.log("About to call checkEmailExistsInSystem...");
          const emailExists = await checkEmailExistsInSystem(email);
          console.log("Email check completed, result:", emailExists);

          if (emailExists) {
            console.log("Email exists - showing password field");
            setShowPasswordField(true);
          } else {
            console.log("Email not registered - navigating to register page");

            // Navigate to register page
            navigate("/register");
          }
        } catch (error) {
          console.error("Error in email check flow:", error);
          setEmailError("Unable to check email. Please try again.");
        } finally {
          setIsLoading(false);
          console.log("Email check loading set to false");
        }
      } else {
        console.log("Email validation failed:", validationError);
      }

      console.log("=== EMAIL CHECK FLOW COMPLETED ===");
    } catch (error) {
      console.error("=== CRITICAL ERROR IN HANDLE SUBMIT ===");
      console.error("Error:", error);
      console.error("Stack:", error.stack);
      setIsLoading(false);
    }

    console.log("=== HANDLE SUBMIT FUNCTION ENDING ===");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <div className="text-center mb-4">
        <h1 className="font-sans font-bold text-2xl leading-8 tracking-normal text-[#F9FAFB] mb-1">
          {showPasswordField ? "Sign in to Your Account" : "Welcome To OPOM"}
        </h1>
        <p className="text-white/60 text-base">Subtitle</p>
      </div>

      <div className="flex flex-col gap-6 w-full items-center">
        {!showPasswordField ? (
          <div className="w-full">
            <label className="block text-white mb-2 text-left">Email</label>
            <FormField
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
              className={`bg-[#121827] border-[#2D3748] text-white w-full ${
                emailError ? "border-red-500 focus:ring-red-500" : ""
              }`}
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>
        ) : (
          <>
            <div className="w-full">
              <label className="block text-white mb-2 text-left">Email</label>
              <div className="flex items-center justify-between bg-[#121827] border border-[#2D3748] rounded-lg py-2 px-3 w-full">
                <span className="block text-white ">{email}</span>
                <button
                  type="button"
                  onClick={handleEditEmail}
                  className="ml-2 text-purple-500 hover:text-purple-400 transition-colors"
                >
                  Edit
                </button>
              </div>
            </div>
            <div className="w-full">
              <label className="block text-white mb-2 text-left">
                Password
              </label>
              <div className="relative">
                <FormField
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSubmit();
                    }
                  }}
                  className="bg-[#121827] border-[#2D3748] text-white w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-white/60 hover:text-white"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </>
        )}

        <Button
          type="button"
          variant="primary"
          size="primary"
          className="mt-2 w-full relative"
          disabled={isLoading}
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log("=== BUTTON CLICKED - CALLING API ===");

            // Call handleSubmit without the event parameter since we're not using a form
            await handleSubmit();
          }}
        >
          <div className="flex items-center justify-center">
            {isLoading && (
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
            )}
            {showPasswordField ? "Sign in" : "Continue"}
          </div>
        </Button>

        {showPasswordField && (
          <div className="text-center w-full">
            <Link
              to="/forgot-password"
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        )}

        {!showPasswordField && (
          <>
            <div className="flex items-center justify-center w-full my-2">
              <div className="bg-white/20 h-px flex-1"></div>
              <span className="px-4 text-white/60">OR</span>
              <div className="bg-white/20 h-px flex-1"></div>
            </div>

            <button
              type="button"
              className="flex items-center justify-center gap-2 bg-[#121827] text-white w-full rounded-lg py-3 border border-[#2D3748] cursor-pointer hover:bg-[#1A202C] transition-colors"
              onClick={handleGoogleLogin}
              disabled={googleLoading}
            >
              {googleLoading ? (
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
                <img src={googleIconUrl} alt="Google" className="w-5 h-5" />
              )}
              <span className="font-sans font-medium text-sm leading-5 tracking-normal text-center align-middle">
                <span className="text-[#6A7282]">Sign in with </span>
                <span>Google</span>
              </span>
            </button>

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
          </>
        )}
      </div>

      {!showPasswordField && (
        <div className="flex justify-center gap-8 text-white/60 mt-6">
          <Link to="/terms" className="hover:text-white transition-colors ">
            Terms of Use
          </Link>
          <span className="text-white/20">|</span>
          <Link to="/privacy" className="hover:text-white transition-colors ">
            Privacy Policy
          </Link>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
