import FormBackground from "@/components/ui/FormBackground";
import ProjectCreateForm from "@/features/admin/components/ProjectCreateForm";

function ProjectCreateFormPage() {
  return (
    <div className="flex justify-center items-center p-4">
      <FormBackground className="w-full max-w-4xl mx-auto p-9">
        <ProjectCreateForm />
      </FormBackground>
    </div>
  );
}

export default ProjectCreateFormPage;
