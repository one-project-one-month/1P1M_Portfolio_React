import FormBackground from "../../../components/ui/FormBackground";
import { PiSwatchesLight } from "react-icons/pi";
import { useForm, Controller } from "react-hook-form";
import FormField from "../../../components/ui/FormFields";
import FormTextArea from "../../../components/ui/FormTextArea";
import Button from "../../../components/ui/Button";
import TechStack from "../../../constants/TechStack";
import FormDropdown from "../../../components/ui/FormDropdown";
import FileUpload from "@/components/ui/FileUpload";
import { setupDevProfile, uploadDevImage } from "@/services/devProfileService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DevProfileForm() {
  // ---- React Hook Form ----

  const [img, setImg] = useState("");
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
  });
  const navigate = useNavigate();

  const handleImageSelect = (file) => {
    console.log("Selected file:", file);
    console.log();

    if (file) {
      setImg(file);
      console.log(img);
    }
  };

  const formData = new FormData();
  formData.append("DEV image", img);
  console.log("FROM DATA", formData);

  const onSubmit = async (data) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      alert("You must log in first");
      return;
    }

    const payLoad = {
      name: data.name,
      techStacks: [data.techStacks.name],
      github: data.github,
      linkedIn: data.linkedIn,
      aboutDev: data.aboutDev,
    };

    try {
      console.log("Start creating dev profiles", payLoad);

      const result = await setupDevProfile(payLoad);
      console.log("Create Dev Profiles", result);

      if (result.success === 1 && result.data && result.data.dev_id) {
        const devProfileId = result.data.dev_id;

        const formData = new FormData();
        formData.append("file", img);

        console.log("Uploading image for Dev ID:", devProfileId);

        const uploadRes = await uploadDevImage(formData,devProfileId);
        console.log("Upload Response:", uploadRes);

        navigate("/admin");
      }
    } catch (error) {
      console.error("Create Dev Profile Error", error);
    }
  };

  return (
    <FormBackground className="w-[532px]">
      <div className="text-3xl text-center space-y-2">
        <h2 className="text-2xl text-white space-y-3">Set up Profile</h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center mt-2 gap-y-6"
      >
        <FileUpload
          onFileSelect={handleImageSelect}
          accept="image/*"
          maxSize={1 * 1024 * 1024}
        />

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
              value={field.value}
              onChange={field.onChange}
              className="w-full"
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
              onClick={() => reset()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              size="secondary"
              className="font-bold text-center text-[#F9FAFB] cursor-pointer"
            >
              Create
            </Button>
          </div>
        </div>
      </form>
    </FormBackground>
  );
}

export default DevProfileForm;
