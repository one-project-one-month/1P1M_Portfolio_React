import { Button as PrimaryButton } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import FormTextArea from '@/components/ui/form-textarea';
import InputField from '@/components/ui/input-field';
import { buttonVariants } from '@/styles/button-variants';
import { Button, Select, TextField } from '@radix-ui/themes';
import TeamManagement from '../components/team-management';
import { useUpdateProjectIdea } from '../hooks/use-project-ideas';

const IdeaManagementEdit = () => {
  const { mutate, isPending } = useUpdateProjectIdea();

  return (
    <div className="rounded-xl bg-[#0F172B] p-6 text-white">
      <h2 className="text-xl font-semibold mb-6">Edit Portfolio</h2>

      {/* Basic information */}
      <form action="" method="">
        <div className="flex flex-col border-y border-[#FFFFFF17]! py-6 gap-y-6 pe-8 h-[620px] overflow-y-scroll">
          <h3 className="text-lg font-semibold">Project Basic Information</h3>

          {/* Img & name */}
          <div className="flex items-center gap-6">
            <FileUpload className="w-[200px] h-[180px]" />
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="project-name">Project Name*</label>
                <InputField />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="project-status">Status</label>
                <Select.Root size="3" defaultValue="PENDING">
                  <Select.Trigger
                    id="status"
                    radius="large"
                    className="text-white! py-6! bg-[#FFFFFF17]!"
                  />
                  <Select.Content position="popper">
                    <Select.Item value="PENDING">Pending</Select.Item>
                    <Select.Item value="APPROVED">Approved</Select.Item>
                    <Select.Item value="ARCHIVED">Archived</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>
          </div>

          {/* Desc */}
          <div className="flex flex-col gap-1">
            <label htmlFor="project-desc">Project Description</label>
            <FormTextArea className="w-full h-40" />
          </div>

          {/* Date */}
          <div className="flex items-center justify-between gap-6">
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="start-date">Start Date*</label>
              <TextField.Root
                type="date"
                size="3"
                variant="soft"
                id="start-date"
                className="text-white! bg-[#FFFFFF17]!"
              />
            </div>
            <div className="flex flex-col gap-1 w-1/2">
              <label htmlFor="completed-date">Completed Date (Optional)</label>
              <TextField.Root
                type="date"
                size="3"
                variant="soft"
                id="completed-date"
                className="text-white! bg-[#FFFFFF17]!"
              />
            </div>
          </div>

          {/* Team-management */}
          <TeamManagement />
        </div>
        {/* Buttons */}
        <div className="flex justify-end items-center pt-6 gap-6">
          <Button
            variant="outline"
            className="border! border-[gray]! text-white! cursor-pointer!"
            size="4"
          >
            Cancel
          </Button>
          <PrimaryButton
            type="submit"
            className={buttonVariants({ variant: 'primary' })}
          >
            Update
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default IdeaManagementEdit;
