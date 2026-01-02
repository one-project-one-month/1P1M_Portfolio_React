import FormBackground from "../../../components/ui/FormBackground";
import { PiSwatchesLight } from "react-icons/pi";
import { useForm, Controller } from "react-hook-form";
import FormField from "../../../components/ui/FormFields";
import FormTextArea from "../../../components/ui/FormTextArea";
import Button from "../../../components/ui/Button";

import FormDropdown from "../../../components/ui/FormDropdown";
import FileUpload from "@/components/ui/FileUpload";
import { setupDevProfile, uploadDevImage } from "@/services/devProfileService";
import profileService from "@/services/profileService";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { TechStack } from "@/constants";

function DevProfileForm({ isEditMode = false, existingProfileData = null }) {
  // ---- React Hook Form ----

  const [img, setImg] = useState("");
  const [profileData, setProfileData] = useState(existingProfileData);
  const [loading, setLoading] = useState(isEditMode && !existingProfileData);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
  });
  const navigate = useNavigate();

  useEffect(() => {
    console.log(
      "useEffect triggered with isEditMode:",
      isEditMode,
      "existingProfileData:",
      existingProfileData
    );

    if (!isEditMode) {
      console.log("Not in edit mode, setting loading to false");
      setLoading(false);
      return;
    }

    if (existingProfileData) {
      console.log("Using existing profile data, skipping fetch");
      setProfileData(existingProfileData);
      setLoading(false);
      return;
    }

    const loadProfileData = async () => {
      console.log("Starting to load profile data...");

      const timeoutId = setTimeout(() => {
        console.log("Loading timeout reached, setting loading to false");
        setLoading(false);
      }, 10000);

      try {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        console.log("User from localStorage:", user);

        if (!user.id) {
          console.error("No user ID found in localStorage");
          setLoading(false);
          return;
        }

        console.log("Loading profile data for user:", user.id);
        const response = await profileService.getProfileData(user.id);
        console.log("Profile data response:", response);

        if (response && response.success) {
          const { devProfile } = response.data;
          console.log("Setting profile data:", devProfile);
          setProfileData(devProfile);
        } else {
          console.error("Failed to load profile data:", response);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        clearTimeout(timeoutId);
        console.log("Setting loading to false");
        setLoading(false);
      }
    };

    loadProfileData();
  }, [isEditMode, existingProfileData]);

  useEffect(() => {
    if (profileData && isEditMode) {
      let techStackOption = null;

      if (profileData.techStacks && profileData.techStacks.length > 0) {
        const techStackValue = profileData.techStacks[0];
        techStackOption = TechStack.find(
          (stack) => stack.name === techStackValue
        );
        if (!techStackOption) {
          techStackOption = TechStack.find(
            (stack) => stack.id === techStackValue
          );
        }
      }

      console.log("Pre-populating form with:", {
        name: profileData.name || "",
        techStacks: techStackOption,
        github: profileData.github || "",
        linkedIn: profileData.linkedIn || "",
        aboutDev: profileData.aboutDev || "",
      });

      reset({
        name: profileData.name || "",
        techStacks: techStackOption || null,
        github: profileData.github || "",
        linkedIn: profileData.linkedIn || "",
        aboutDev: profileData.aboutDev || "",
      });
    }
  }, [profileData, isEditMode, reset]);

  const handleImageSelect = (file) => {
    console.log("Selected file:", file);
    if (file) {
      setImg(file);
    }
  };

  const onSubmit = async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      toast.error("You must log in first");
      return;
    }
    let techStackValue;
    if (data.techStacks) {
      techStackValue = [data.techStacks.name];
    } else {
      console.error("No tech stack selected");
      toast.error("Please select a tech stack");
      return;
    }

    const payLoad = {
      name: data.name,
      techStacks: techStackValue,
      github: data.github,
      linkedIn: data.linkedIn,
      aboutDev: data.aboutDev,
    };

    console.log("Payload being sent:", payLoad);

    const loadingToast = toast.loading(
      isEditMode ? "Updating profile..." : "Creating profile...",
      {
        position: "top-right",
      }
    );

    try {
      if (isEditMode) {
        console.log("Updating dev profile", payLoad);

        const result = await profileService.updateProfile(
          profileData.dev_id,
          payLoad
        );
        console.log("Update Dev Profile", result);

        if (result.success) {
          if (img) {
            const formData = new FormData();
            formData.append("file", img);

            console.log("Uploading new image for Dev ID:", profileData.dev_id);

            const uploadRes = await uploadDevImage(
              formData,
              profileData.dev_id
            );
            console.log("Upload Response:", uploadRes);
          }

          toast.dismiss(loadingToast);
          toast.success("Profile updated successfully!", {
            position: "top-right",
          });

          navigate("/profile");
        } else {
          toast.dismiss(loadingToast);
          toast.error("Failed to update profile. Please try again.", {
            position: "top-right",
          });
        }
      } else {
        console.log("Start creating dev profiles", payLoad);

try {
  const result = await setupDevProfile(payLoad);
  console.log("Create Dev Profiles", result);

  if (result.success !== 1 || !result.data?.dev_id) {
    throw new Error("Failed to create dev profile");
  }

  const devProfileId = result.data.dev_id;

  if (img) {
    await uploadImageForDev(devProfileId, img);
  }

  toast.success("Profile created successfully!", {
    position: "top-right",
  });
 toast.dismiss(loadingToast);
  navigate(user?.role === "ADMIN" ? "/admin" : "/");
} catch (error) {
  console.error("Error creating dev profile:", error);
  toast.dismiss(loadingToast);
  toast.error(error.message || "Something went wrong!", {
    position: "top-right",
  });
}


async function uploadImageForDev(devProfileId, imgFile) {
  const formData = new FormData();
  formData.append("file", imgFile);

  console.log("Uploading image for Dev ID:", devProfileId);

  const uploadRes = await uploadDevImage(formData, devProfileId);
  console.log("Upload Response:", uploadRes);
}

      }
    } catch (error) {
      console.error(
        isEditMode ? "Update Dev Profile Error" : "Create Dev Profile Error",
        error
      );

      toast.dismiss(loadingToast);
      toast.error(
        isEditMode
          ? "Failed to update profile. Please try again."
          : "Failed to create profile. Please try again.",
        {
          position: "top-right",
        }
      );
    }
  };

  console.log(
    "DevProfileForm - loading state:",
    loading,
    "profileData:",
    profileData
  );

  if (loading) {
    return (
      <FormBackground className="w-[532px]">
        <div className="flex flex-col items-center justify-center h-96">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mb-4"></div>
          <p className="text-white">Loading profile data...</p>
        </div>
      </FormBackground>
    );
  }

  return (
    <FormBackground className="w-[532px]">
      <div className="text-3xl text-center space-y-2">
        <h2 className="text-2xl text-white space-y-3">
          {isEditMode ? "Edit Profile" : "Set up Profile"}
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-2 gap-y-6"
      >
        <div className="w-full flex justify-center">
          <FileUpload
            onFileSelect={handleImageSelect}
            accept="image/*"
            maxSize={1 * 1024 * 1024}
            existingImageUrl={
              isEditMode ? profileData?.profilePictureUrl : null
            }
          />
        </div>

        {errors.profilePictureUrl && (
          <p className="text-red-500 text-sm">
            {errors.profilePictureUrl.message}
          </p>
        )}

        {/* Name */}
        <FormField
          type="text"
          placeholder="Enter your name"
          className="w-full"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        {/* Tech Stack Dropdown */}
        <Controller
          name="techStacks"
          control={control}
          rules={{ required: "Tech stack is required" }}
          render={({ field }) => (
            <FormDropdown
              placeholder="Tech Stack"
              menuList={TechStack}
              onChange={field.onChange}
              className="w-full"
              selectedValue={field.value} // Pass the selected value
            />
          )}
        />
        {errors.techStacks && (
          <p className="text-red-500 text-sm">{errors.techStacks.message}</p>
        )}

        {/* GitHub */}
        <FormField
          type="text"
          placeholder="Github"
          className="w-full"
          {...register("github", {
            required: "GitHub link is required",
            pattern: {
              value: /^https:\/\/github\.com\/.+$/,
              message: "Must be a valid GitHub URL",
            },
          })}
        />
        {errors.github && (
          <p className="text-red-500 text-sm">{errors.github.message}</p>
        )}

        {/* LinkedIn */}
        <FormField
          type="text"
          placeholder="LinkedIn"
          className="w-full"
          {...register("linkedIn", {
            required: "LinkedIn link is required",
            pattern: {
              value: /^https:\/\/(www\.)?linkedin\.com\/.+$/,
              message: "Must be a valid LinkedIn URL",
            },
          })}
        />
        {errors.linkedIn && (
          <p className="text-red-500 text-sm">{errors.linkedIn.message}</p>
        )}

        {/* About */}
        <FormTextArea
          name="about"
          placeholder="About yourself"
          className="h-28 w-full"
          {...register("aboutDev", {
            required: "Please write something about yourself",
          })}
        />
        {errors.about && (
          <p className="text-red-500 text-sm">{errors.about.message}</p>
        )}

        {/* Buttons */}
        <div className="flex w-full justify-between">
          <div className="text-sm font-bold flex items-center gap-x-1"></div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="black_small_button"
              size="black_small_button"
              className="text-[#F9FAFB] font-bold text-center cursor-pointer"
              disabled={isSubmitting}
              onClick={() => {
                if (isEditMode) {
                  navigate("/profile");
                } else {
                  reset();
                }
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              size="secondary"
              className="font-bold text-center text-[#F9FAFB] cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? isEditMode
                  ? "Updating..."
                  : "Creating..."
                : isEditMode
                ? "Update"
                : "Create"}
            </Button>
          </div>
        </div>
      </form>
    </FormBackground>
  );
}

export default DevProfileForm;
