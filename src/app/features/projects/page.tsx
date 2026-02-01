import Title from '@/components/ui/title';
import { useToast } from '@/components/ui/toast-provider';
import { getSortDirection } from '@/lib/get-sort-direction';

import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';

import IdeaCreateForm from '../idea-management/components/idea-create-form';
import { createProjectIdea } from '../idea-management/services/project-idea.service';
import {
  createProjectIdeaSchema,
  type CreateProjectIdeaType,
  type ProjectIdeaCreateResponseType,
} from '../idea-management/types/project-idea.types';
import IdeaSectionContainer from './components/idea-section-container';

const page = () => {
  const [open, setOpen] = useState({
    order: false,
    filter: false,
    create: false,
  });

  const queryClient = useQueryClient();

  const { addToast } = useToast();

  const form = useForm<CreateProjectIdeaType>({
    resolver: zodResolver(createProjectIdeaSchema),
    defaultValues: {
      projectIdeaName: '',
      description: '',
      projectTypes: [],
    },
    mode: 'onSubmit',
  });

  // Create
  const { mutate, isPending } = useMutation<
    ProjectIdeaCreateResponseType,
    AxiosError<{ message: string }>,
    { formData: CreateProjectIdeaType }
  >({
    mutationFn: ({ formData }: { formData: CreateProjectIdeaType }) =>
      createProjectIdea(formData),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast(success.message, 'success');
      setOpen({ ...open, create: false });

      form.reset();
    },
    onError: (error) => {
      addToast(error.message, 'error');
    },
  });

  const handleCreate: SubmitHandler<CreateProjectIdeaType> = (formData) =>
    mutate({ formData });

  const filterOptions = ['Popular', 'Newest', 'Oldest'];
  const [query, setQuery] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(
    null,
  );
  const [selectedFilter, setSelectedFilter] = useState('Newest');

  const handleFilter = (filter: string) => {
    setSelectedFilter(filter);
    const sortDir = getSortDirection(filter);

    if (sortDir) setSortDirection(sortDir);
  };

  const handleSearch = (value: string) => {
    setQuery(value);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <Title
        onCreate={() => setOpen({ ...open, create: !open.create })}
        showSearch
        initSelectedFilter={selectedFilter}
        title="Project Portfolio"
        searchPlaceholder="Search By Projects"
        onSearchChange={(e) => handleSearch(e.target.value)}
        filterOptions={filterOptions}
        onFilterChange={handleFilter}
      />

      {/* Create button */}
      <Dialog.Root
        open={open.create}
        onOpenChange={(value) => setOpen({ ...open, create: value })}
      >
        {/* <Dialog.Trigger>
          <Button
            type="button"
            className={buttonVariants({ variant: 'primary' })}
            onClick={() => setOpen({ ...open, create: !open.create })}
          >
            Create Idea
          </Button>
        </Dialog.Trigger> */}

        <IdeaCreateForm
          form={form}
          handleCreate={handleCreate}
          isPending={isPending}
        />
      </Dialog.Root>

      <IdeaSectionContainer
        direction={sortDirection ?? 'desc'}
        query={query ?? ''}
      />
    </div>
  );
};

export default page;
