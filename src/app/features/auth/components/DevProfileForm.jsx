import FormBackground from "../../../components/ui/FormBackground";
import { PiSwatchesLight } from "react-icons/pi";
import { useForm, Controller } from "react-hook-form";
import FormField from "../../../components/ui/FormFields";
import FormTextArea from "../../../components/ui/FormTextArea";
import Button from "../../../components/ui/Button";
import TechStack from "../../../constants/TechStack";
import FormDropdown from "../../../components/ui/FormDropdown";
import FileUpload from "@/components/ui/FileUpload";
import { setupDevProfile } from "@/services/devProfileService";
import { useNavigate } from "react-router-dom";

function DevProfileForm() {
  // ---- React Hook Form ----
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate();
  const onSubmit = async (data) => {



    console.log("Form Data:", data);

   
    try {

        console.log("Start creating dev profiles");
        
        const result=await setupDevProfile(data);
        console.log("Create Dev Profiles",result);

        if(result.status=201) navigate("/admin")
        
    } catch (error) {
        console.error("Create Dev Profile Error",error)
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
        {/* Profile Image */}
        <Controller
          name="profilePictureUrl"
          control={control}
          rules={{ required: "Profile image is required" }}
          render={({ field }) => (
            <FileUpload
              onFileSelect={(file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                  field.onChange(reader.result); // store Base64 in RHF
                };
                reader.readAsDataURL(file);
              }}
              className="w-[139px] h-[139px]"
            />
          )}
        />
        {errors.profilePictureUrl && (
          <p className="text-red-500 text-sm">{errors.profilePictureUrl.message}</p>
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
          {...register("about", {
            required: "Please write something about yourself",
          })}
        />
        {errors.about && (
          <p className="text-red-500 text-sm">{errors.about.message}</p>
        )}

        {/* Buttons */}
        <div className="flex w-full justify-between">
          <div className="text-sm font-bold flex items-center gap-x-1">
            <span className="text-[#F9FAFB]/50 size-5">
              <PiSwatchesLight />
            </span>
            <button className="text-[#F9FAFB]/50">Choose Theme</button>
          </div>

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
