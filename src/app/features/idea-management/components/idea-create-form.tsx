import { Button } from '@/components/ui/button';
import FormTextArea from '@/components/ui/form-textarea';
import InputField from '@/components/ui/input-field';
import { PROJECT_TYPE_OPTIONS } from '@/constants';
import { useEffect, useState } from 'react';

interface IdeaCreateFormValues {
  name: string;
  description: string;
  projectTypes: string[];
}

interface IdeaCreateFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (values: IdeaCreateFormValues) => void;
}

export default function IdeaCreateForm({
  isOpen,
  onClose,
  onSubmit,
}: IdeaCreateFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [projectTypes, setProjectTypes] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setDescription('');
      setProjectTypes([]);
    }
  }, [isOpen]);

  function toggleProjectType(type: string) {
    setProjectTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  }

  function handleOverlayClick() {
    onClose();
  }

  function handleContentClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
  }

  function handleCancel() {
    onClose();
  }

  function handleSave() {
    const values: IdeaCreateFormValues = {
      name,
      description,
      projectTypes,
    };

    if (onSubmit) {
      onSubmit(values);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/10"
      onClick={handleOverlayClick}
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-black px-10 py-10 text-white shadow-2xl"
        onClick={handleContentClick}
      >
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold">
            Create the idea information!
          </h2>
          <p className="text-sm text-[#9CA3AF]">
            Choose a status to reflect the current progress and next step of
            this idea.
          </p>
        </div>

        <div className="space-y-12">
          {/* <TextField
              label="Project idea Name"
              placeholder="Enter your project name"
              value={name}
              onChange={setName}
            /> */}
          <div>
            <label className="mb-1 block text-sm font-semibold">
              Project Idea Name
            </label>
            <InputField
              type="text"
              placeholder="Enter your project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">
              Description
            </label>
            <FormTextArea
              placeholder="Provide details about your project"
              className="h-32 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <p className="mb-2 text-sm font-semibold">Project Type</p>
            <div className="flex flex-wrap gap-6 text-sm">
              {PROJECT_TYPE_OPTIONS.map((type) => {
                const checked = projectTypes.includes(type);

                return (
                  <button
                    key={type}
                    type="button"
                    className="flex items-center gap-2 text-sm"
                    onClick={() => toggleProjectType(type)}
                  >
                    <span
                      className={`flex h-4 w-4 items-center justify-center rounded-sm border ${
                        checked
                          ? 'border-[#A855F7] bg-[#A855F7]'
                          : 'border-[#4B5563] bg-transparent'
                      }`}
                    >
                      {checked && (
                        <span className="h-2 w-2 rounded-sm bg-white" />
                      )}
                    </span>
                    <span
                      className={
                        checked ? 'text-white' : 'text-[#D1D5DB] font-normal'
                      }
                    >
                      {type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="primary"
            size="primary"
            className="flex-1 border border-[#6B7280] bg-transparent text-white hover:border-[#A855F7]"
            onClick={handleCancel}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="primary"
            size="primary"
            className="flex-1 bg-[#A855F7] text-white hover:bg-[#9333EA]"
            onClick={handleSave}
          >
            Save Idea
          </Button>
        </div>
      </div>
    </div>
  );
}
