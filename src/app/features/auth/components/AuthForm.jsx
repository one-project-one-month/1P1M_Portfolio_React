import React, { useState, useEffect } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormFields";
import { Link, useNavigate, useLocation } from "react-router-dom";
import GitHubSignIn from "./GitHubSignIn";
import GoogleSignIn from "./GoogleSignIn";
import toast from "react-hot-toast";
import {
  exchangeGithubCode,
  exchangeGoogleCode,
  checkEmailExists,
} from "@/services/authService";

function AuthForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [touched, setTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");

    if (code) {
      console.log("=== OAuth code received ===", code);
      console.log("Current pathname:", location.pathname);

      if (location.pathname === "/callback") {
        console.log("=== GOOGLE OAuth callback detected ===");
        exchangeGoogleCode(code)
          .then((data) => {
            console.log("Google authentication successful!", data);
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
            }
            if (data.token) {
              localStorage.setItem("token", data.token);
            }
            toast.success("Google authentication successful!");
            if (data.newUser) {
              navigate("/setup-profile");
            } else {
              navigate("/dashboard");
            }
          })
          .catch((error) => {
            console.error("Google authentication failed:", error);
            toast.error(
              "Google authentication failed: " +
                (error.message || "Unknown error")
            );

            navigate("/callback");
          })
          .finally(() => {});
      } else if (
        location.pathname === "/auth/callback" ||
        location.pathname === "/login/oauth2/code/github"
      ) {
        console.log("=== GITHUB OAuth callback detected ===");
        exchangeGithubCode(code)
          .then((data) => {
            console.log("GitHub authentication successful!", data);
            if (data.user) {
              localStorage.setItem("user", JSON.stringify(data.user));
            }
            if (data.token) {
              localStorage.setItem("token", data.token);
            }

            toast.success("GitHub authentication successful!");
            if (data.newUser) {
              navigate("/setup-profile");
            } else {
              navigate("/dashboard");
            }
          })
          .catch((error) => {
            console.error("GitHub authentication failed:", error);
            toast.error(
              "GitHub authentication failed: " +
                (error.message || "Unknown error")
            );
          })
          .finally(() => {});
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

  const handleEmailBlur = () => {
    setTouched(true);
    setEmailError(validateEmail(email));
  };

  const checkEmailExistsInSystem = async (email) => {
    console.log("=== STARTING EMAIL CHECK API CALL ===");
    console.log("Email to check:", email);

    try {
      console.log("About to call checkEmailExists API...");
      const response = await checkEmailExists(email);
      console.log("API response received:", response);

      const exists = response.data || false;
      console.log("Email exists result:", exists);

      return exists;
    } catch (error) {
      console.error("=== API CALL ERROR ===");
      console.error("Error:", error);
      console.error("Error status:", error.response?.status);
      console.error("Error data:", error.response?.data);
      console.error("Error message:", error.message);

      console.log("Handling error gracefully to prevent reload");
      return false;
    }
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
        email,
        isLoading,
      });

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
            console.log("Email exists - navigating to login page");
            navigate("/login");
          } else {
            console.log("Email not registered - navigating to register page");
            navigate("/register");
          }
        } catch (error) {
          console.error("Error in email check flow:", error);
          setEmailError("Unable to check email. Please try again.");
          toast.error("Unable to check email. Please try again.");
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
          Welcome To OPOM
        </h1>
        <p className="text-white/60 text-base">Enter your email to continue</p>
      </div>

      <div className="flex flex-col gap-6 w-full items-center">
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
            Continue
          </div>
        </Button>

        <div className="flex items-center justify-center w-full my-2">
          <div className="bg-white/20 h-px flex-1"></div>
          <span className="px-4 text-white/60">OR</span>
          <div className="bg-white/20 h-px flex-1"></div>
        </div>

        <GoogleSignIn />

        <GitHubSignIn />
      </div>

      <div className="flex justify-center gap-8 text-white/60 mt-6">
        <Link to="/terms" className="hover:text-white transition-colors ">
          Terms of Use
        </Link>
        <span className="text-white/20">|</span>
        <Link to="/privacy" className="hover:text-white transition-colors ">
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}

export default AuthForm;
