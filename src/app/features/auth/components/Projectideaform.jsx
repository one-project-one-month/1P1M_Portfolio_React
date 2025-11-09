import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";
import FormBackground from "../../../components/ui/FormBackground";
import TextField from "@/components/ui/TextField";
import FormTextArea from "@/components/ui/FormTextArea";
import { useMutation } from "@tanstack/react-query";
import {
  createProjectIdea,
  updateProjectIdea,
} from "@/services/projectIdeaService";
import toast from "react-hot-toast";

const Projectideaform = ({
  isEditMode = false,
  existingProjectData = null,
}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    projectType: "",
  });

  useEffect(() => {
    if (isEditMode && existingProjectData) {
      setFormData({
        projectName: existingProjectData.projectIdeaName || "",
        description: existingProjectData.description || "",
        projectType:
          existingProjectData.projectType?.[0] ||
          existingProjectData.projectTypes?.[0] ||
          "",
      });
    }
  }, [isEditMode, existingProjectData]);

  const mutation = useMutation({
    mutationFn: (data) => {
      if (isEditMode) {
        let statusCode;
        if (existingProjectData.status === "PENDING") {
          statusCode = 2;
        } else if (existingProjectData.status === "APPROVED") {
          statusCode = 1;
        } else {
          statusCode = existingProjectData.status;
        }

        return updateProjectIdea(
          existingProjectData.projectIdeaId,
          data,
          statusCode
        );
      } else {
        return createProjectIdea(data);
      }
    },
    onSuccess: (data) => {
      toast.success(
        isEditMode
          ? "Project idea updated successfully!"
          : "Project idea submitted successfully!"
      );
      console.log("Response:", data);

      if (isEditMode) {
        navigate("/profile");
      } else {
        setFormData({ projectName: "", description: "", projectType: "" });
      }
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          (isEditMode ? "Update failed!" : "Submission failed!")
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.projectName ||
      !formData.description ||
      !formData.projectType
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    mutation.mutate({
      projectName: formData.projectName,
      description: formData.description,
      projectType: [formData.projectType],
    });
  };

  return (
    <FormBackground className="flex items-center justify-center w-full h-full bg-black">
      <form onSubmit={handleSubmit} className="w-[535px] flex flex-col gap-4">
        <h2 className="text-white text-2xl font-bold text-center mb-4">
          {isEditMode ? "Edit Project Idea" : "Submit Project Idea"}
        </h2>
        <TextField
          label="Project idea Name"
          id="projectName"
          name="projectName"
          placeholder="Enter your project name"
          value={formData.projectName}
          onChange={(value) => setFormData({ ...formData, projectName: value })}
          className="w-full text-white font-sans text-sm font-medium leading-8"
        />

        <FormTextArea
          name="description"
          placeholder="Provide details about your project"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full h-[150px] mt-[-25px] text-white"
        />

        <div className="mt-2">
          <h3 className="text-white text-sm font-medium mb-2">Project Type</h3>
          <div className="flex flex-wrap gap-4">
            {["Mobile", "Website", "Desktop", "Game"].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="projectType"
                  value={type}
                  checked={formData.projectType === type}
                  onChange={(e) =>
                    setFormData({ ...formData, projectType: e.target.value })
                  }
                  className="w-4 h-4 text-purple-500 border-gray-500 bg-gray-800 focus:ring-purple-500"
                />
                <span className="text-white text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="black_button"
            size="black_small_button"
            type="button"
            onClick={() => {
              if (isEditMode) {
                navigate("/profile");
              } else {
                setFormData({
                  projectName: "",
                  description: "",
                  projectType: "",
                });
              }
            }}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="black_small_button"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? isEditMode
                ? "Updating..."
                : "Submitting..."
              : isEditMode
              ? "Update"
              : "Submit"}
          </Button>
        </div>
      </form>
    </FormBackground>
  );
};

export default Projectideaform;
