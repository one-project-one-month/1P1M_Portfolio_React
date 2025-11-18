import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const useProjectForm = ({
  isEditMode = false,
  existingProjectData = null,
}) => {
  const { register, handleSubmit, watch,reset,formState:{errors,isSubmitting}} = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      detail: "",
      github: "",
      link: "",
      tools: "",
    },
  });

const createProjectFormSchema=watch();

//pre load data
useEffect(()=>{
    if(isEditMode && existingProjectData){
    reset({
        name:existingProjectData.name || "",
        detail:existingProjectData.description || "",
        github:existingProjectData.repoLink || "",
        link:existingProjectData.projectLink || "",
        tools:existingProjectData.languageAndTools?.join(", ") || "",
    })
    }
})



const onSubmit=async (data)=>{



}







};
