import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PasswordField from "@/components/ui/PasswordField";
import Background from "@/components/ui/Background";
import FormBackground from "@/components/ui/FormBackground";
import Button from "@/components/ui/Button";
import { resetPassword } from "@/services/authService";

function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Strong password validation (8+ chars, uppercase, lowercase, number, special char)
  const isStrongPassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const handleUpdatePassword = async () => {
    const newErrors = {};
    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (!isStrongPassword(newPassword)) {
      newErrors.newPassword = "Password must be at least 8 characters, include upper/lowercase, number, and symbol.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (!email) {
      toast.error("Session expired or email not found. Please start over.");
      navigate("/forgot-password");
      return;
    }

    setLoading(true);
    toast.loading("Updating your password...", { id: "reset-password" });
    try {
      await resetPassword(email, newPassword);
      toast.success("Password updated successfully! Please log in.", { id: "reset-password" });
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Failed to reset password. Please try again.", { id: "reset-password" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="flex items-center justify-around flex-col">
        {/* Heading */}
        <div className="text-white text-center">
          <h1 className="font-sans font-bold text-2xl leading-8 mb-2">
            Reset Password
          </h1>
          <p className="text-gray-400 text-sm">
            Enter a new password for <span className="font-semibold text-white">{email}</span>
          </p>
        </div>

        {/* Form Fields */}
        <div className="w-[404px] h-[260px] flex flex-col justify-around">
          {/* Password */}
          <div className="-mb-8">
            <PasswordField
              label="Password"
              id="password"
              name="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={setNewPassword}
              error={errors.newPassword}
            />
          </div>

          <div className="-mb-8">
            <PasswordField
              label="Confirm New Password"
              id="confirmNewPassword"
              name="confirmNewPassword"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
            />
          </div>

          <div className="w-full">
            <Button
              onClick={handleUpdatePassword}
              variant="primary"
              size="primary"
              disabled={loading}
              className="w-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3"
            >
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </div>
        </div>
      </FormBackground>
    </Background>
  )
}

export default ResetPasswordPage;