import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { projectSchema, type ProjectFormValues } from '../projectSchema';
import { useCreatePortfolio } from './use-create-portfolio';

export const useProjectForm = () => {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      image: undefined,
      name: '',
      description: '',
      repoLink: '',
      projectLink: '',
      startDate: '',
      completedDate: '',
      technologies: [],
      teamIds: [],
    },
  });

  const { mutate, isPending } = useCreatePortfolio();

  const submit = async (values: ProjectFormValues) => {
    console.log(values);
    const languageAndTools = values.languageAndTools
      .split(',')
      .map((v) => v.trim())
      .filter(Boolean);

    const formData = new FormData();

    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('languageAndTools', JSON.stringify(languageAndTools));

    if (values.repoLink) formData.append('repoLink', values.repoLink);
    if (values.projectLink) formData.append('projectLink', values.projectLink);
    if (values.image) formData.append('image', values.image);

    //OR

    const payload = {
      ...values,
      languageAndTools,
    };
    mutate(payload);
    form.reset();
  };

  return { form, submit, isPending };
};
