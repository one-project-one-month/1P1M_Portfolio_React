import Background from "@/components/ui/Background";
import FormBackground from "@/components/ui/FormBackground";
import FormDropdown from "@/components/ui/FormDropdown";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { authUtils } from "@/lib/utils";
import TechStack from "../../../constants/TechStack";
import Platform from "@/constants/Platform";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "@/components/ui/Button";
import { opomRegister } from "@/services/authService";
import FormField from "@/components/ui/FormFields";
import toast from "react-hot-toast";

const OpomRegisterPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { register, control, handleSubmit, reset, formState: { errors }, } = useForm({
    mode: "onSubmit",
  },
  );

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log("submitting data", data);

    const payLoad = {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      telegram_username: data.telegram_username || "",
      github_url: data.github_url || "",
      role: data.role?.name || data.role || "",
      status: "ACTIVE",
      platformLinks:
        data.platformLinks?.id && data.platformLinks?.value
          ? [{ platformId: data.platformLinks.id, link: data.platformLinks.value }]
          : [],
    };

    try {
      const result = await opomRegister(payLoad);
      console.log("Submitting OPOM registration Payload", result);
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      console.error("OPOM Registration Error:", error);
      toast.error(error.message || "Registration failed. Please check your input and try again.");
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    // If there's no token in storage, redirect to the register page
    try {
      const token = authUtils.getToken();
      if (!token) {
        navigate("/register");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Failed to get token", error);
      navigate("/register");
    }
  }, [navigate]);

  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="!w-[800px] flex items-center flex-col w-auto h-auto p-8">
        {/* Heading */}
        <div className="text-white">
          <h1 className="font-sans font-bold text-2xl leading-8 mb-6">
            OPOM Register Page
          </h1>
        </div>
        {!isLoading && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              {/* Column 1 */}
              <div className="flex flex-col gap-y-4">
                <FormField
                  type="text"
                  placeholder="Name"
                  showEditButton={false}
                  className="w-full text-white font-sans text-sm font-semibold leading-8"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}

                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    minLength: {
                      value: 11,
                      message: "Please enter a valid phone number.",
                    },
                  }}
                  render={({ field }) => (
                    <PhoneInput
                      {...field}
                      country={"mm"}
                      containerClass=""
                      inputClass="!bg-[#111] !w-full !h-12 !text-white !border-gray-700"
                      buttonClass="!bg-[#111] !border-gray-700 hover:!bg-gray-800"
                      dropdownClass="!bg-[#111] !text-white"
                      searchClass="!bg-gray-800 !text-white"
                      placeholder="Enter phone number"
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">{errors.phone.message}</p>
                )}

                <FormField
                  type="text"
                  placeholder="Telegram Username"
                  className="w-full text-white font-sans text-sm font-semibold leading-8"
                  {...register("telegram_username")}
                />
                <FormField
                  placeholder="Status"
                  className="w-full text-white font-sans text-sm font-semibold leading-8"
                  {...register("status")}
                />
              </div>

              {/* Column 2 */}
              <div className="flex flex-col gap-y-4">
                <FormField
                  placeholder="Email"
                  showEditButton={false}
                  className="w-full text-white font-sans text-sm font-semibold leading-8"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                <FormField
                  id="github_url"
                  name="github_url"
                  placeholder="GitHub URL"
                  className="w-full text-white font-sans text-sm font-semibold leading-8"
                  {...register("github_url")}
                />

                <Controller
                  name="role"
                  control={control}
                  render={({ field }) => (
                    <FormDropdown
                      {...field}
                      placeholder="Role"
                      menuList={TechStack}
                      className="w-full text-white font-sans text-sm font-semibold leading-8"
                    />
                  )}
                />
                {errors.role && (
                  <p className="text-red-500 text-sm">{errors.role.message}</p>
                )}
                <Controller
                  name="platformLinks"
                  control={control}
                  render={({ field }) => (
                    <FormDropdown
                      {...field}
                      placeholder="Platform link"
                      menuList={Platform}
                      className="w-full text-white font-sans text-sm font-semibold leading-8"
                    />
                  )}
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-4 w-full mt-6">
              <div>
                <Button
                  variant="black_small_button"
                  size="primary"
                  onClick={() => reset()}
                  type="button"
                  className="w-[50] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3"
                >
                  Cancel
                </Button>
              </div>
              <div>
                <Button
                  variant="primary"
                  size="primary"
                  type="submit"
                  className="w-[50] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3"
                >
                  Register
                </Button>
              </div>
            </div>
          </form>
        )}
      </FormBackground>
    </Background>
  );
};

export default OpomRegisterPage;