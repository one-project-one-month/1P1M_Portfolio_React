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
import TrashIcon from "@/assets/icons/TrashIcon";

const OpomRegisterPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [platformLinks, setPlatformLinks] = useState([{ id: 0 }]); // Start with one platform link

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });

  const addPlatformLink = () => {
    setPlatformLinks((prev) => [...prev, { id: prev.length }]);
  };

  const removePlatformLink = (indexToRemove) => {
    if (platformLinks.length > 1) {
      setPlatformLinks((prev) =>
        prev.filter((_, index) => index !== indexToRemove)
      );
    }
  };

  const onSubmit = async (data, event) => {
    event.preventDefault();
    console.log("submitting data", data);

    setIsLoading(true);

    const processedPlatformLinks = [];
    platformLinks.forEach((_, index) => {
      const platformData = data[`platformLinks_${index}`];
      const platformUrl = data[`platformUrl_${index}`];

      if (platformData?.id && platformUrl) {
        processedPlatformLinks.push({
          platformId: platformData.id,
          link: platformUrl,
        });
      }
    });

    const payLoad = {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      telegram_username: data.telegram_username || "",
      github_url: data.github_url || "",
      role: data.role?.name || data.role || "",
      status: "ACTIVE",
      platformLinks: processedPlatformLinks,
    };

    try {
      const result = await opomRegister(payLoad);
      console.log("Submitting OPOM registration Payload", result);

      if (
        result &&
        (result.success === 1 || result.status === 200 || result.status === 201)
      ) {
        toast.success("Registration successful!");
        reset();
        navigate("/");
      } else {
        const errorMessage =
          result?.message || result?.data || "Registration failed";
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("OPOM Registration Error:", error);

      let errorMessage =
        "Registration failed. Please check your input and try again.";

      if (error.response?.data) {
        const apiError = error.response.data;
        errorMessage = apiError.message || apiError.data || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    // If there's no token in storage, redirect to the register page
    try {
      const token = authUtils.getToken();
      console.log(token);
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
        <div className="text-white text-center mb-8">
          <h1 className="font-sans font-bold text-2xl leading-8">
            OPOM Register Form
          </h1>
        </div>
        {!isLoading && (
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            {/* form fields */}
            <div className="space-y-4 max-w-2xl mx-auto">
              <FormField
                type="text"
                placeholder="Name"
                showEditButton={false}
                className="w-full text-white font-sans text-sm font-semibold leading-8"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm -mt-2">
                  {errors.name.message}
                </p>
              )}

              <FormField
                placeholder="Email"
                showEditButton={false}
                className="w-full text-white font-sans text-sm font-semibold leading-8"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm -mt-2">
                  {errors.email.message}
                </p>
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
                    inputClass="!bg-[#374151] !w-full !h-12 !text-white !border-gray-600 !rounded-lg"
                    buttonClass="!bg-[#374151] !border-gray-600 hover:!bg-gray-700 !rounded-l-lg"
                    dropdownClass="!bg-[#374151] !text-white !border-gray-600"
                    searchClass="!bg-gray-800 !text-white"
                    placeholder="000 000 000"
                  />
                )}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm -mt-2">
                  {errors.phone.message}
                </p>
              )}

              <FormField
                type="text"
                placeholder="Telegram Username"
                className="w-full text-white font-sans text-sm font-semibold leading-8"
                {...register("telegram_username")}
              />

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
                <p className="text-red-500 text-sm -mt-2">
                  {errors.role.message}
                </p>
              )}

              {/* Platform Links Section */}
              {platformLinks.map((_, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex gap-4 items-center">
                    <div>
                      <Controller
                        name={`platformLinks_${index}`}
                        control={control}
                        render={({ field }) => (
                          <FormDropdown
                            {...field}
                            placeholder="Platform"
                            menuList={Platform}
                            className="w-48! text-white font-sans text-sm font-semibold leading-8"
                          />
                        )}
                      />
                    </div>

                    <FormField
                      placeholder="Platform URL"
                      className="flex-1 text-white font-sans text-sm font-semibold leading-8"
                      {...register(`platformUrl_${index}`)}
                    />
                    {platformLinks.length > 1 && (
                      <button
                        type="button"
                        className="text-[#6A7282] hover:text-red-400 transition-colors px-2"
                        onClick={() => removePlatformLink(index)}
                        title="Remove platform link"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <div className="text-left ml-15">
                <button
                  type="button"
                  className="text-[#6A7282] underline text-sm hover:text-gray-300 transition-colors"
                  onClick={addPlatformLink}
                >
                  Add
                </button>
              </div>
            </div>
            {/* Buttons */}
            <div className="flex justify-end gap-4 w-full mt-8 max-w-2xl mx-auto">
              <Button
                variant="black_small_button"
                size="primary"
                onClick={() => reset()}
                type="button"
                className="px-8 py-3 text-white border border-gray-600 rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="primary"
                type="submit"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
            </div>
          </form>
        )}
      </FormBackground>
    </Background>
  );
};

export default OpomRegisterPage;
