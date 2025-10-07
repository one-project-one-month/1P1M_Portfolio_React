import FileUpload from "@/components/ui/FileUpload";
import FormTextArea from "@/components/ui/FormTextArea";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { plusIconUrl } from "@/assets/icons/iconUrls";

function ProjectCreateForm() {
  // React Hook Form setup with validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      projectName: "",
      projectDetail: "",
      githubLink: "",
      toolsUsed: "",
    },
  });

  // Additional state for non-form elements
  const [projectImage, setProjectImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  // Helper function to create TextField-compatible handlers
  const createFieldHandler = (fieldName, validationRules = {}) => {
    const registration = register(fieldName, validationRules);
    return {
      name: registration.name,
      ref: registration.ref,
      onChange: (value) => {
        // Convert value to event-like object for react-hook-form
        registration.onChange({ target: { name: fieldName, value } });
      },
      onBlur: registration.onBlur,
    };
  };

  const handleImageSelect = (file) => {
    setProjectImage(file);
    console.log("Selected file:", file.name, file.size);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    // Prepare data for backend
    const projectData = {
      projectName: data.projectName,
      projectDetail: data.projectDetail,
      githubLink: data.githubLink,
      toolsUsed: data.toolsUsed,
      projectImage: projectImage,
      teamMembers: teamMembers,
      createdAt: new Date().toISOString(),
    };

    console.log("=== PROJECT SUBMISSION DATA ===");
    console.log("Form Data:", projectData);
    console.log(
      "Project Image:",
      projectImage
        ? `${projectImage.name} (${projectImage.size} bytes)`
        : "No image selected"
    );
    console.log("Team Members:", teamMembers);
    console.log("================");

    // TODO: Replace with actual API call
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("✅ Project created successfully!");

      // Reset form after successful submission
      reset();
      setProjectImage(null);
      setTeamMembers([]);
    } catch (error) {
      console.error("❌ Error creating project:", error);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset form
    reset();
    setProjectImage(null);
    setTeamMembers([]);
    console.log("Form cancelled and reset");
  };

  // Handle team member addition (placeholder)
  const handleAddTeamMember = () => {
    // TODO: Implement team member selection logic
    console.log("Add team member clicked - implement member selection modal");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-6 lg:gap-50 w-full"
    >
      {/* Left side - File Upload */}
      <div className="flex flex-col gap-2 items-center">
        <FileUpload
          onFileSelect={handleImageSelect}
          accept="image/*"
          maxSize={1 * 1024 * 1024}
        />
        <div className="text-white text-center w-full">Upload Image</div>
        <div className="text-gray-400 text-sm text-center w-full">
          maximum image size is 1MB.
        </div>
      </div>

      {/* Right side - Form Fields */}
      <div className="flex flex-col flex-1">
        <TextField
          label="Project Name"
          id="project-name"
          placeholder="Enter your project name"
          showEditButton={false}
          isEditMode={false}
          className="relative w-full text-white font-sans text-sm font-semibold leading-8"
          error={errors.projectName?.message}
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

        <div className="flex flex-col gap-2">
          <label htmlFor="project-detail" className="text-white">
            Project detail
          </label>
          <FormTextArea
            id="project-detail"
            placeholder="Provide details about your project"
            className="w-full h-28"
            {...register("projectDetail", {
              required: "Project detail is required",
              minLength: {
                value: 10,
                message: "Too short (min 10 characters)",
              },
              maxLength: {
                value: 500,
                message: "Too long (max 500 characters)",
              },
            })}
          />
          {errors.projectDetail && (
            <span className="text-xs text-[#FB2C36] mt-1 ml-2 block">
              {errors.projectDetail.message}
            </span>
          )}
        </div>

        <TextField
          label="Github link"
          id="github-link"
          placeholder="Enter your project GitHub link"
          showEditButton={false}
          isEditMode={false}
          className="relative w-full text-white font-sans text-sm font-semibold leading-8"
          error={errors.githubLink?.message}
          {...createFieldHandler("githubLink", {
            required: "GitHub link is required",
            pattern: {
              value: /^https:\/\/github\.com\/.+/,
              message: "Invalid GitHub URL",
            },
          })}
        />

        <TextField
          label="Tools Used"
          id="tools-used"
          placeholder="e.g., HTML, CSS, JavaScript, React"
          showEditButton={false}
          isEditMode={false}
          className="relative w-full text-white font-sans text-sm font-semibold leading-8"
          error={errors.toolsUsed?.message}
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

        {/* User Images Section */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            {/* Sample User Images */}
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="relative">
                <img
                  src="/src/app/assets/sample-user-img.jpg"
                  alt={`Team member ${index + 1}`}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 hover:border-gray-400 transition-colors cursor-pointer"
                />
              </div>
            ))}

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
        <div className="flex justify-end gap-4 mt-6">
          <Button
            variant="black_button"
            size="primary"
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
