import FileUpload from "@/components/ui/FileUpload";
import FormTextArea from "@/components/ui/FormTextArea";
import TextField from "@/components/ui/TextField";
import Button from "@/components/ui/Button";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { plusIconUrl } from "@/assets/icons/iconUrls";
import apiClient from "@/api/axios";
import { API_ENDPOINTS, getAuthConfig } from "@/config/apiConfig";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { getDevProfiles } from "@/services/devProfileService";
import { updateProjectPortfolio } from "@/services/projectPortfolioService";
import { X } from "lucide-react";
import CustomBox from "@/components/ui/CustomBox";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SelectMemeber from "./selectMemeber";





function ProjectCreateForm({ isEditMode = false, existingProjectData = null }) {
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
  const [devProfiles, setDevProfiles] = useState([]);
  const [devLoading, setDevLoading] = useState(false);
  const [devError, setDevError] = useState(null);
  const [fileUploadKey, setFileUploadKey] = useState(0);

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
      setDevProfiles([]);
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
    setDevProfiles([]);
    setIsDialogOpen(false);
    setFileUploadKey((prev) => prev + 1);
  };

  const handleAddTeamMember = () => {
    setIsDialogOpen(true);
  };

  const filteredDevs = (() => {
    console.log("devProfiles before filtering:", devProfiles);
    console.log("selectedMembers:", selectedMembers);

    if (!devProfiles || !Array.isArray(devProfiles)) {
      console.log("devProfiles is not an array:", devProfiles);
      return [];
    }

    const filtered = devProfiles.filter((dev) => {
      const devId = dev.dev_id || dev.userId || dev.id || dev.email;
      const isAlreadySelected = selectedMembers.find((member) => {
        const memberId =
          member.dev_id || member.userId || member.id || member.email;
        const isMatch = memberId === devId;
        if (isMatch) {
          console.log(`Filtering out already selected member: ${memberId}`);
        }
        return isMatch;
      });
      return !isAlreadySelected;
    });

    console.log("filteredDevs result:", filtered);
    return filtered;
  })();
  const handleAddMember = (dev) => {
    const devId = dev.dev_id || dev.userId || dev.id;
    const isAlreadySelected = selectedMembers.find((member) => {
      const memberId = member.dev_id || member.userId || member.id;
      return memberId === devId;
    });

    if (!isAlreadySelected) {
      console.log("Adding member:", dev);
      setSelectedMembers([...selectedMembers, dev]);
    } else {
      console.log("Member already selected:", dev);
    }
  };

  const handleRemoveMember = (devToRemove) => {
    const devId = devToRemove.dev_id || devToRemove.userId || devToRemove.id;
    setSelectedMembers(
      selectedMembers.filter((member) => {
        const memberId = member.dev_id || member.userId || member.id;
        return memberId !== devId;
      })
    );
  };

  const handleSaveMembers = () => {
    const memberEmails = selectedMembers
      .map((member) => member.email)
      .filter(Boolean);
    setTeamMembers(memberEmails);
    setIsDialogOpen(false);
  };

  const handleDiscardMembers = () => {
    setSelectedMembers([]);
    setSearch("");
    setDevProfiles([]);
    setDevError(null);
    setIsDialogOpen(false);
  };

  const searchDevelopers = useCallback(async (searchTerm) => {
    if (!searchTerm.trim()) {
      setDevProfiles([]);
      setDevError(null);
      return;
    }

    setDevLoading(true);
    setDevError(null);

    try {
      const data = await getDevProfiles({ keyword: searchTerm });

      if (Array.isArray(data)) {
        setDevProfiles(data);
      } else if (data?.data && Array.isArray(data.data)) {
        setDevProfiles(data.data);
      } else if (data?.data?.data && Array.isArray(data.data.data)) {
        setDevProfiles(data.data.data);
      } else {
        setDevProfiles([]);
      }
    } catch (error) {
      console.error("Error searching developers:", error);
      setDevError("Error searching developers: " + error.message);
      setDevProfiles([]);
    } finally {
      setDevLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchDevelopers(search);
    }, 300); // 300ms delay

    return () => clearTimeout(timeoutId);
  }, [search, searchDevelopers]);

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
      <SelectMemeber selectedMembers={selectedMembers}/>
      
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
