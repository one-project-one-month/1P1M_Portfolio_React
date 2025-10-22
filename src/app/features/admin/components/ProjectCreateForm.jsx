import FileUpload from "@/components/ui/FileUpload";
import FormTextArea from "@/components/ui/FormTextArea";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { plusIconUrl } from "@/assets/icons/iconUrls";
import apiClient from "@/api/axios";
import { API_ENDPOINTS, getAuthConfig } from "@/config/apiConfig";

function ProjectCreateForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      projectName: "",
      projectDetail: "",
      githubLink: "",
      projectLink: "",
      toolsUsed: "",
    },
  });

  // Watch form values to pass to TextField components for proper reset
  const formValues = watch();

  const [projectImage, setProjectImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const createFieldHandler = (fieldName, validationRules = {}) => {
    const registration = register(fieldName, validationRules);
    return {
      name: registration.name,
      ref: registration.ref,
      onChange: (value) => {
        registration.onChange({ target: { name: fieldName, value } });
      },
      onBlur: registration.onBlur,
    };
  };

  const handleImageSelect = (file) => {
    setProjectImage(file);
    console.log("Selected file:", file.name, file.size);
  };

  const onSubmit = async (data) => {
    try {
      const toolsArray = data.toolsUsed
        .split(",")
        .map((tool) => tool.trim())
        .filter((tool) => tool.length > 0);

      const projectPayload = {
        name: data.projectName,
        description: data.projectDetail,
        projectLink: data.projectLink,
        repoLink: data.githubLink,
        languageAndTools: toolsArray,
      };

      console.log("=== PROJECT SUBMISSION ===");
      console.log("Payload:", projectPayload);
      console.log("Additional data:");
      console.log(
        "Project Image:",
        projectImage
          ? `${projectImage.name} (${projectImage.size} bytes)`
          : "No image selected"
      );
      console.log("Team Members:", teamMembers);
      console.log("================");

      // Step 1: Create the project first
      console.log("📝 Creating project...");
      const projectResponse = await apiClient.post(
        API_ENDPOINTS.CREATE_PROJECT,
        projectPayload,
        getAuthConfig()
      );

      console.log("✅ Project created successfully!", projectResponse.data);

      // Get the project ID from response
      const projectPortfolioId =
        projectResponse.data?.id || projectResponse.data?.projectPortfolioId;

      if (!projectPortfolioId) {
        throw new Error("Project ID not found in response");
      }

      // Step 2: Upload image if one is selected
      if (projectImage) {
        console.log("📤 Uploading project image...");

        // Validate image size (1MB max)
        const maxSize = 1 * 1024 * 1024; // 1MB in bytes
        if (projectImage.size > maxSize) {
          throw new Error("Image size exceeds 1MB limit");
        }

        // Create FormData for file upload
        const formData = new FormData();
        formData.append("file", projectImage);
        formData.append("projectPortfolioId", projectPortfolioId);

        const uploadResponse = await apiClient.post(
          API_ENDPOINTS.UPLOAD_PROJECT_IMAGE,
          formData,
          getAuthConfig({
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        );

        console.log("✅ Image uploaded successfully!", uploadResponse.data);
      }

      console.log("🎉 Project creation completed successfully!");

      // Reset form after successful submission
      reset();
      setProjectImage(null);
      setTeamMembers([]);

      // TODO: Show success message to user
      // TODO: Redirect to project list or project detail page
    } catch (error) {
      console.error("❌ Error creating project:", error);

      // Handle different error cases
      if (error.response) {
        console.error("Server error:", error.response.data);
        // TODO: Show error message based on server response
      } else if (error.request) {
        console.error("Network error: No response received");
        // TODO: Show network error message
      } else {
        console.error("Error:", error.message);
        // TODO: Show generic error message
      }
    }
  };

  const handleCancel = () => {
    reset();
    setProjectImage(null);
    setTeamMembers([]);
    console.log("Form cancelled and reset");
  };

  const handleAddTeamMember = () => {
    console.log("Add team member clicked - implement member selection modal");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-2 lg:gap-3 w-full h-full"
    >
      {/* Left side - File Upload */}
      <div className="flex flex-col gap-0 items-center lg:w-2/5">
        <FileUpload
          onFileSelect={handleImageSelect}
          accept="image/*"
          maxSize={1 * 1024 * 1024}
        />
        <div className="text-white text-center text-xs font-medium mt-1">
          Upload Image
        </div>
        <div className="text-gray-400 text-xs text-center">
          maximum image size is 1MB
        </div>
      </div>

      {/* Right side - Form Fields */}
      <div className="flex flex-col flex-1 lg:w-3/5">
        <div>
          <TextField
            label="Project Name"
            id="project-name"
            placeholder="Enter your project name"
            showEditButton={false}
            isEditMode={false}
            value={formValues.projectName}
            className="relative w-full text-white font-sans text-xs font-semibold leading-4"
            {...createFieldHandler("projectName", {
              required: "Project name is required",
              minLength: {
                value: 3,
                message: "Too short (min 3 characters)",
              },
              maxLength: {
                value: 50,
                message: "Too long (max 50 characters)",
              },
            })}
          />
          {errors.projectName?.message && (
            <div className="text-xs text-[#FB2C36] text-end -mt-6">
              {errors.projectName?.message}
            </div>
          )}
        </div>
        <div className="-mt-5">
          <div className="flex flex-col gap-0">
            <label
              htmlFor="project-detail"
              className="text-white font-sans text-sm font-semibold leading-8 mb-1"
            >
              Project detail
            </label>
            <FormTextArea
              id="project-detail"
              placeholder="Provide details about your project"
              className="w-full"
              {...register("projectDetail", {
                required: "Project detail is required",
                minLength: {
                  value: 10,
                  message: "Too short (min 10 characters)",
                },
              })}
            />
            {errors.projectDetail?.message && (
              <div className="text-xs text-[#FB2C36] text-end -mt-1">
                {errors.projectDetail.message}
              </div>
            )}
          </div>
        </div>
        <div>
          <TextField
            label="Github link"
            id="github-link"
            placeholder="Enter your project GitHub link"
            showEditButton={false}
            isEditMode={false}
            value={formValues.githubLink}
            className="relative w-full text-white font-sans text-xs font-semibold leading-4"
            {...createFieldHandler("githubLink", {
              required: "GitHub link is required",
              pattern: {
                value: /^https:\/\/github\.com\/.+/,
                message: "Invalid GitHub URL",
              },
            })}
          />
          {errors.githubLink?.message && (
            <div className="text-xs text-[#FB2C36] text-end -mt-6">
              {errors.githubLink.message}
            </div>
          )}
        </div>
        <div className="-mt-6">
          <TextField
            label="Project link"
            id="project-link"
            placeholder="Enter your project hosting link"
            showEditButton={false}
            isEditMode={false}
            value={formValues.projectLink}
            className="relative w-full text-white font-sans text-xs font-semibold leading-4"
            {...createFieldHandler("projectLink", {
              required: "Project link is required",
              pattern: {
                value: /^https?:\/\/.+/,
                message: "Invalid URL format",
              },
            })}
          />
          {errors.projectLink?.message && (
            <div className="text-xs text-[#FB2C36] text-end -mt-6">
              {errors.projectLink.message}
            </div>
          )}
        </div>
        <div className="-mt-6 z-10">
          <TextField
            label="Tools Used"
            id="tools-used"
            placeholder="e.g., HTML, CSS, JavaScript, React"
            showEditButton={false}
            isEditMode={false}
            value={formValues.toolsUsed}
            className="relative w-full text-white font-sans text-xs font-semibold leading-4"
            {...createFieldHandler("toolsUsed", {
              required: "Tools used is required",
              minLength: {
                value: 2,
                message: "Too short (min 2 characters)",
              },
              maxLength: {
                value: 100,
                message: "Too long (max 100 characters)",
              },
            })}
          />
          {errors.toolsUsed?.message && (
            <div className="text-xs text-[#FB2C36] text-end -mt-6">
              {errors.toolsUsed.message}
            </div>
          )}
        </div>
        {/* User Images Section */}
        <div className="flex flex-col mb-2 -mt-4 z-0">
          <div className="flex items-center gap-2">
            {/* Sample User Images - Show max 5 */}
            {Array.from(
              { length: Math.min(teamMembers.length || 6, 5) },
              (_, index) => (
                <div key={index} className="relative">
                  <img
                    src={
                      teamMembers[index]?.avatar ||
                      "/src/app/assets/sample-user-img.jpg"
                    }
                    alt={`Team member ${index + 1}`}
                    className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 hover:border-gray-400 transition-colors cursor-pointer"
                  />
                </div>
              )
            )}

            {/* Show "+more" indicator if there are more than 5 members */}
            {(teamMembers.length || 6) > 5 && (
              <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-gray-600 flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
                <span className="text-white text-xs font-semibold">
                  +{(teamMembers.length || 6) - 5}
                </span>
              </div>
            )}

            {/* Add Member Button */}
            <button
              type="button"
              className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-600 hover:border-gray-400 hover:bg-gray-600 transition-colors flex items-center justify-center cursor-pointer text-white font-bold text-4xl"
              onClick={handleAddTeamMember}
            >
              <img src={plusIconUrl} alt="" />
            </button>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-1">
          <Button
            variant="black_button"
            size="primary"
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="primary"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default ProjectCreateForm;
