import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import FormBackground from "../../../components/ui/FormBackground";
import TextField from "@/components/ui/TextField";
import FormTextArea from "@/components/ui/FormTextArea";
import { useMutation } from "@tanstack/react-query";
import { createProjectIdea } from "@/services/projectIdeaService";
import toast from "react-hot-toast";

const Projectideaform = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    projectType: "",
  });

  const mutation = useMutation({
    mutationFn: createProjectIdea,
    onSuccess: (data) => {
      toast.success("Project idea submitted successfully!");
      console.log("Response:", data);
      setFormData({ projectName: "", description: "", projectType: "" });
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.message || "Submission failed!");
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
            onClick={() =>
              setFormData({ projectName: "", description: "", projectType: "" })
            }
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="black_small_button"
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </FormBackground>
  );
};

export default Projectideaform;
