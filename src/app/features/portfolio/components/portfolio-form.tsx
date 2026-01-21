import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import FormBackground from '@/components/ui/form-background';
import TextField from '@/components/ui/text-field';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import type { Member } from '@/types/member';
import { Flex } from '@radix-ui/themes';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { useProjectForm } from '../hooks/use-project-form';
import SelectMember from './select-member';

const MOCK_AVAILABLE_DEVS: Member[] = [
  {
    id: 1,
    dev_id: 'DEV-001',
    userId: 101,
    name: 'Aung Min Oo',
    email: 'aung.min@example.com',
    profilePictureUrl: 'https://i.pravatar.cc/150?img=11',
  },
  {
    id: 2,
    dev_id: 'DEV-002',
    userId: 102,
    name: 'May Thazin',
    email: 'may.thazin@example.com',
    profilePictureUrl: 'https://i.pravatar.cc/150?img=32',
  },
  {
    id: 3,
    dev_id: 'DEV-003',
    userId: 103,
    name: 'Htet Naing',
    email: 'htet.naing@example.com',
    profilePictureUrl: 'https://i.pravatar.cc/150?img=45',
  },
  {
    id: 4,
    dev_id: 'DEV-004',
    userId: 104,
    name: 'Su Myat Noe',
    email: 'su.myat@example.com',
    profilePictureUrl: 'https://i.pravatar.cc/150?img=16',
  },
  {
    id: 5,
    dev_id: 'DEV-005',
    userId: 105,
    name: 'Kyaw Zin Tun',
    email: 'kyaw.zin@example.com',
    profilePictureUrl: 'https://i.pravatar.cc/150?img=58',
  },
];

const PortfolioForm = () => {
  const { goTo } = useAppNavigation();
  const { form, submit, isPending } = useProjectForm();
  const [resetMembers, setResetMembers] = useState<(() => void) | null>(null);

  const devEmails = form.watch('developerEmails');

  useEffect(() => {
    if (devEmails.length === 0) {
      resetMembers?.();
    }
  }, [devEmails, resetMembers]);

  const projectData: {
    key:
      | 'name'
      | 'description'
      | 'repoLink'
      | 'projectLink'
      | 'languageAndTools';
    label: string;
    placeholder: string;
  }[] = [
    {
      key: 'name',
      label: 'Project Name',
      placeholder: 'Enter your project name',
    },
    {
      key: 'description',
      label: 'Project Details',
      placeholder: 'Provide details about your project',
    },
    {
      key: 'repoLink',
      label: 'Github Link',
      placeholder: 'Enter your project Github link',
    },
    {
      key: 'projectLink',
      label: 'Project Link',
      placeholder: 'Enter your project hosting link',
    },
    {
      key: 'languageAndTools',
      label: 'Tools Used',
      placeholder: 'eg.,HTML,CSS,JavaScript,React',
    },
  ];

  return (
    <FormBackground className="w-4xl">
      <form
        className="flex w-full flex-col md:flex-row gap-x-8"
        onSubmit={form.handleSubmit(submit)}
      >
        <Flex className="md:w-3/4 text-center mt-3">
          <Flex direction="column" gap="6">
            <Controller
              control={form.control}
              name="image"
              render={({ field }) => (
                <FileUpload
                  onFileSelect={(file) => field.onChange(file)}
                  className="md:size-56"
                />
              )}
            />
            <Flex direction="column" gap="2">
              <span className="text-xl text-white">Upload Image</span>
              <span className="text-xs text-[#6A7282]">
                maximum image size is 1 MB.
              </span>
            </Flex>
          </Flex>
        </Flex>
        <div className="w-full">
          {projectData.map((project, index) => (
            <Controller
              key={index}
              control={form.control}
              name={project.key}
              render={({ field, fieldState }) => (
                <TextField
                  label={project.label}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                  className="w-full"
                  placeholder={project.placeholder}
                />
              )}
            />
          ))}

          <Controller
            control={form.control}
            name="developerEmails"
            render={({ field }) => (
              <SelectMember
                allMembers={MOCK_AVAILABLE_DEVS}
                handleSaveMembers={(emailList: string[]) => {
                  field.onChange(emailList);
                  form.trigger('developerEmails');
                }}
                handleResetMembers={setResetMembers}
              />
            )}
          />
          {form.formState.errors.developerEmails && (
            <p className="text-red-500 text-sm font-bold">
              {form.formState.errors.developerEmails.message}
            </p>
          )}
          <div className="justify-self-end flex gap-6">
            <Button
              onClick={() => goTo('/portfolio')}
              variant={'black_small_button'}
              className="text-white"
            >
              Cancel
            </Button>
            <Button>{isPending ? <Loader2 /> : 'Create'}</Button>
          </div>
        </div>
      </form>
    </FormBackground>
  );
};

export default PortfolioForm;
