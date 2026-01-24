import FileUpload from '@/components/ui/file-upload';
import FormTextArea from '@/components/ui/form-textarea';
import InputField from '@/components/ui/input-field';
import type { DropdownItem } from '@/types/portfolio-management';
import { Flex } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import DatePickerDialog from '../../portfolio-management/components/form/date-picker-dialog';
import StatusDropdown from '../../portfolio-management/components/status-dropdown';
import { statusOptions } from '../../portfolio-management/constants/data';
import type { PortfolioFormValues } from '../../portfolio-management/portfolio-schema';

const Links: {
  key: 'repoLink' | 'projectLink';
  label: string;
  placeholder: string;
}[] = [
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
];

interface PortfolioInfoProps {
  // initialData?: ProjectData | null;
  form: UseFormReturn<PortfolioFormValues>;
  // isReadOnly: boolean;
}

const UserPortfolioInfo = ({
  // initialData,
  form,
  // isReadOnly,
}: PortfolioInfoProps) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState<'start' | 'complete'>(
    'start',
  );

  const isReadOnly = false;

  // const devEmails = form.watch('developerEmails');
  // const projectName = form.watch('projectName');
  // const description = form.watch('description');
  const startDate = form.watch('startDate');
  const completedDate = form.watch('completedDate');
  // const status = form.watch('status');
  // const projectImage = form.watch('projectImage');

  const openDatePicker = (field: 'start' | 'complete') => {
    setActiveDateField(field);
    setDatePickerOpen(true);
  };

  return (
    <Flex>
      <Flex className="md:w-[400px] text-center mt-3">
        <Flex direction="column" gap="6">
          <Controller
            control={form.control}
            name="projectImage"
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
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="project-desc" className="text-[#F9FAFB]">
            Project Name
          </label>
          <Controller
            control={form.control}
            name="projectName"
            render={({ field, fieldState }) => (
              <>
                <InputField
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full"
                  placeholder="Enter your project name"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="project-desc" className="text-[#F9FAFB]">
            Status
          </label>
          <Controller
            control={form.control}
            name="status"
            render={({ field }) => (
              <StatusDropdown
                placeholder="Select current status"
                menuList={statusOptions}
                selectedValue={field.value}
                onChange={(value: DropdownItem | null) => field.onChange(value)}
                className="text-sm text-[#6A7282]"
              />
            )}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="project-desc" className="text-[#F9FAFB]">
            Project Descriptions
          </label>
          <Controller
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormTextArea
                value={field.value}
                onChange={field.onChange}
                placeholder="Provide details about your project"
                className="w-full h-40"
              />
            )}
          />
        </div>

        <div className="flex items-center justify-between gap-6">
          <div className="flex flex-col gap-1 w-1/2">
            <label htmlFor="start-date" className="text-[#F9FAFB]">
              Start Date*
            </label>
            <div>
              <div
                onClick={() => !isReadOnly && openDatePicker('start')}
                className={`w-full px-3 py-2 bg-[#0F172B] border rounded-md text-white min-h-[42px] flex items-center justify-between ${
                  !isReadOnly
                    ? 'cursor-pointer hover:border-[#9C39FC] transition-colors'
                    : ''
                } ${form.formState.errors.startDate ? 'border-red-500' : 'border-[#FFFFFF]/15'}`}
              >
                <span className={startDate ? 'text-white' : 'text-[#6A7282]'}>
                  {startDate || 'e.g., Nov 15, 2025'}
                </span>
                {!startDate && !isReadOnly && (
                  <ChevronDown className="h-4 w-4 text-[#6A7282]" />
                )}
              </div>
              {form.formState.errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {form.formState.errors.startDate.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1 w-1/2">
            <label htmlFor="completed-date" className="text-[#F9FAFB]">
              Completed Date (Optional)
            </label>
            {isReadOnly ? (
              <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-10">
                {completedDate || '-'}
              </p>
            ) : (
              <div
                onClick={() => !isReadOnly && openDatePicker('complete')}
                className={`w-full px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white min-h-10.5 flex items-center justify-between ${
                  !isReadOnly
                    ? 'cursor-pointer hover:border-[#9C39FC] transition-colors'
                    : ''
                }`}
              >
                <span
                  className={completedDate ? 'text-white' : 'text-[#6A7282]'}
                >
                  {completedDate || 'e.g., Dec 15, 2025'}
                </span>
                {!completedDate && !isReadOnly && (
                  <ChevronDown className="h-4 w-4 text-[#6A7282]" />
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {Links.map((link) => (
            <div key={link.key} className="flex flex-col gap-2">
              {' '}
              {/* Wrapper div instead of Fragment */}
              <label htmlFor={link.key} className="text-[#F9FAFB]">
                {link.label}
              </label>
              <Controller
                control={form.control}
                name="projectName"
                render={({ field, fieldState }) => (
                  <InputField
                    {...field}
                    // Ensure value is never null or an object for this specific input
                    value={typeof field.value === 'string' ? field.value : ''}
                    className="w-full"
                    placeholder="Enter your project name"
                  />
                )}
              />
            </div>
          ))}
        </div>
        {/* <Controller
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
          )} */}
      </div>
      <DatePickerDialog
        isOpen={datePickerOpen}
        onClose={() => setDatePickerOpen(false)}
        selectedDate={
          activeDateField === 'start'
            ? startDate
              ? new Date(startDate)
              : null
            : completedDate
              ? new Date(completedDate)
              : null
        }
        onSelect={(date) => {
          if (activeDateField === 'start') {
            form.setValue('startDate', date);
          } else {
            form.setValue('completedDate', date);
          }
        }}
      />
    </Flex>
  );
};

export default UserPortfolioInfo;
