import React from "react";
import { useLocation } from "react-router-dom";
import FormBackground from "@/components/ui/FormBackground";
import ProjectCreateForm from "@/features/user/components/ProjectCreateForm";

function ProjectCreateFormPage() {
  const location = useLocation();
  const { isEditMode = false, projectData = null } = location.state || {};

  return (
    <div className="flex justify-center items-center p-4">
      <FormBackground className="w-full max-w-4xl mx-auto p-9">
        <ProjectCreateForm
          isEditMode={isEditMode}
          existingProjectData={projectData}
        />
      </FormBackground>
    </div>
  );
}

export default ProjectCreateFormPage;
