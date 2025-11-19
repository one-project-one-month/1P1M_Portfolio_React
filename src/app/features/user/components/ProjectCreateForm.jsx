import FileUpload from "@/components/ui/FileUpload";
import FormTextArea from "@/components/ui/FormTextArea";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import apiClient from "@/api/axios";
import { API_ENDPOINTS, getAuthConfig } from "@/config/apiConfig";
import { updateProjectPortfolio } from "@/services/projectPortfolioService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SelectMemeber from "./selectMemeber";
import { useDevProfile } from "@/queries/useDevProfile";
import { useSearchMember } from "../hooks/useSearchMember";

function ProjectCreateForm({ isEditMode = false, existingProjectData = null }) {
  const [page, setPage] = useState("");
  const [keyword, setKeyword] = useState("");
  const size = "";
  const [sortDirection, setSortDirection] = useState("desc");

  const { data,isError,isLoading } = useDevProfile(keyword, page, sortDirection, size);

  const navigate = useNavigate();

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

  const formValues = watch();

  const [projectImage, setProjectImage] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [search, setSearch] = useState("");

  const [fileUploadKey, setFileUploadKey] = useState(0);

  const DevData = useSearchMember(data?.data, search);

  const handleAddMember = (dev) => {
    setSelectedMembers((prev) => {
      const exist = prev.some((mem) => mem.dev_id === dev.dev_id);

      if (exist) {
        return prev;
      } else {
        return [...prev, dev];
      }
    });
  };

  const handleRemoveMember = (dev) => {
    setSelectedMembers((prev) =>
      prev.filter((mem) => mem.dev_id !== dev.dev_id)
    );
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  //save selected members
  const handleSaveMembers = () => {
    const teamMembers = selectedMembers.map((mem) => mem.email).filter(Boolean);
    setTeamMembers(teamMembers);
    setIsDialogOpen(false);
  };

  const handleDiscardMembers = () => {
    setSelectedMembers([]);
    setTeamMembers([]);
  };

  const handleDialog = () => {
    setIsDialogOpen((prev) => !prev);
  };

  // Pre-populate form when editing
  useEffect(() => {
    if (isEditMode && existingProjectData) {
      reset({
        projectName: existingProjectData.name || "",
        projectDetail: existingProjectData.description || "",
        githubLink: existingProjectData.repoLink || "",
        projectLink: existingProjectData.projectLink || "",
        toolsUsed: existingProjectData.languageAndTools?.join(", ") || "",
      });

      // Handle team members from assignedDevs.developers
      if (existingProjectData.assignedDevs?.developers) {
        const developers = existingProjectData.assignedDevs.developers;
        const developerEmails = developers
          .map(
            (dev) =>
              dev.email ||
              `${dev.name?.toLowerCase().replace(/\s+/g, "")}@temp.com`
          )
          .filter(Boolean);
        setTeamMembers(developerEmails);

        // Also set selectedMembers for display
        setSelectedMembers(developers);
      } else if (existingProjectData.developerEmails) {
        setTeamMembers(existingProjectData.developerEmails);
      }
    }
  }, [isEditMode, existingProjectData, reset]);

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
  };

  const onSubmit = async (data) => {
    const loadingToast = toast.loading(
      isEditMode ? "Updating project..." : "Creating project...",
      {
        position: "top-right",
      }
    );

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
        developerEmails: teamMembers.length > 0 ? teamMembers : [],
      };

      let projectPortfolioId;

      if (isEditMode) {
        // Update existing project
        const updateResponse = await updateProjectPortfolio(
          existingProjectData.id,
          projectPayload
        );

        projectPortfolioId = existingProjectData.id;

        if (!updateResponse.success) {
          throw new Error("Failed to update project");
        }
      } else {
        const projectResponse = await apiClient.post(
          API_ENDPOINTS.CREATE_PROJECT,
          projectPayload,
          getAuthConfig()
        );

        projectPortfolioId = projectResponse.data?.data.projectId;
        if (!projectPortfolioId) {
          throw new Error("Project ID not found in response");
        }
      }

      if (projectImage) {
        const maxSize = 1 * 1024 * 1024;
        if (projectImage.size > maxSize) {
          throw new Error("Image size exceeds 1MB limit");
        }

        const formData = new FormData();
        formData.append("file", projectImage);
        await apiClient.patch(
          API_ENDPOINTS.UPLOAD_PROJECT_IMAGE +
            `?projectPortfolioId=${projectPortfolioId}`,
          formData,
          getAuthConfig({
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
        );
      }

      toast.dismiss(loadingToast);
      toast.success(
        isEditMode
          ? "🎉 Project updated successfully!"
          : "🎉 Project created successfully!",
        {
          duration: 4000,
          position: "top-right",
        }
      );

      if (isEditMode) {
        navigate("/profile");
      } else {
        reset();
        setProjectImage(null);
        setTeamMembers([]);
        setSelectedMembers([]);
        navigate("/project-portfolio");
      }
      setSearch("");
      setIsDialogOpen(false);
      setFileUploadKey((prev) => prev + 1);
    } catch (error) {
      console.error("❌ Error creating project:", error);

      toast.dismiss(loadingToast);

      if (error.response) {
        console.error("Server error:", error.response.data);
        const errorMessage =
          error.response.data?.message || "Server error occurred";
        toast.error(`❌ ${errorMessage}`, {
          duration: 5000,
          position: "top-right",
        });
      } else if (error.request) {
        console.error("Network error: No response received");
        toast.error("❌ Network error: Please check your connection", {
          duration: 5000,
          position: "top-right",
        });
      } else {
        console.error("Error:", error.message);
        toast.error(`❌ Error: ${error.message}`, {
          duration: 5000,
          position: "top-right",
        });
      }
    }
  };

  const handleCancel = () => {
    reset();
    setProjectImage(null);
    setTeamMembers([]);
    setSelectedMembers([]);
    setSearch("");
    setIsDialogOpen(false);
    setFileUploadKey((prev) => prev + 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col lg:flex-row gap-2 lg:gap-3 w-full h-full"
    >
      <div className="flex flex-col gap-0 items-center lg:w-2/5">
        <FileUpload
          key={fileUploadKey}
          onFileSelect={handleImageSelect}
          accept="image/*"
          maxSize={1 * 1024 * 1024}
          existingImageUrl={
            isEditMode ? existingProjectData?.projectPicUrl : null
          }
        />
        <div className="text-white text-center text-xs font-medium mt-1">
          Upload Image
        </div>
        <div className="text-gray-400 text-xs text-center">
          maximum image size is 1MB
        </div>
      </div>

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

        {/* Team Members Section */}
        <SelectMemeber
          handleDiscardMembers={handleDiscardMembers}
          handleSaveMembers={handleSaveMembers}
          handleAddMember={handleAddMember}
          handleRemoveMember={handleRemoveMember}
          selectedMembers={selectedMembers}
          isDialogOpen={isDialogOpen}
          handleDialog={handleDialog}
          filteredDevs={DevData}
          devProfiles={DevData}
          devError={isError}
          devLoading={isLoading}
          search={search}
          onSearch={onSearch}
        />

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
  );
}

export default ProjectCreateForm;
