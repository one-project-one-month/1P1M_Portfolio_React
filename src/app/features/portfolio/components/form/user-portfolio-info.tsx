import type { PortfolioFormValues } from '@/app/features/portfolio-management/portfolio-schema';
import FormTextArea from '@/components/ui/form-textarea';
import InputField from '@/components/ui/input-field';
import type { DropdownItem } from '@/types/portfolio-management';
import { Flex } from '@radix-ui/themes';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Controller, type UseFormReturn } from 'react-hook-form';
import DatePickerDialog from '../../../portfolio-management/components/form/date-picker-dialog';
import StatusDropdown from '../../../portfolio-management/components/status-dropdown';
import {
  statusOptions,
  type ProjectData,
} from '../../../portfolio-management/constants/data';

interface PortfolioInfoProps {
  initialData?: ProjectData | null;
  form: UseFormReturn<PortfolioFormValues>;
  repoLink: string;
  setRepoLink: (v: string) => void;
}

const UserPortfolioInfo = ({
  form,
  repoLink,
  setRepoLink,
}: PortfolioInfoProps) => {
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [activeDateField, setActiveDateField] = useState<'start' | 'complete'>(
    'start',
  );

  const startDate = form.watch('startDate');
  const completedDate = form.watch('completedDate');

  const openDatePicker = (field: 'start' | 'complete') => {
    setActiveDateField(field);
    setDatePickerOpen(true);
  };

  return (
    <Flex>
      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-[#F9FAFB]">
            Project Name*
          </label>
          <Controller
            control={form.control}
            name="projectName"
            render={({ field, fieldState }) => (
              <>
                <InputField
                  value={field.value}
                  onChange={field.onChange}
                  className="w-full sm:placeholder:text-base"
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
          <label htmlFor="status" className="text-[#F9FAFB]">
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
                className="w-full h-40 text-md"
              />
            )}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 flex-wrap md:flex-nowrap md:flex">
          <div className="flex flex-col gap-1 md:w-1/2">
            <label htmlFor="start-date" className="text-[#F9FAFB]">
              Start Date*
            </label>
            <div>
              <div
                onClick={() => openDatePicker('start')}
                className={`w-full px-3 py-2 bg-[#FFFFFF17] border rounded-md text-white min-h-[42px] flex items-center justify-between ${form.formState.errors.startDate ? 'border-red-500' : 'border-[#FFFFFF]/15'}`}
              >
                <span className={startDate ? 'text-white' : 'text-[#6A7282]'}>
                  {startDate || 'e.g., Nov 15, 2025'}
                </span>
                {!startDate && (
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
          <div className="flex flex-col gap-1 md:w-1/2">
            <label htmlFor="completed-date" className="text-[#F9FAFB]">
              Completed Date (Optional)
            </label>
            <div
              onClick={() => openDatePicker('complete')}
              className={`w-full px-3 py-2 bg-[#FFFFFF17] border border-[#FFFFFF]/15 rounded-md text-white min-h-10.5 flex items-center justify-between`}
            >
              <span className={completedDate ? 'text-white' : 'text-[#6A7282]'}>
                {completedDate || 'e.g., Dec 15, 2025'}
              </span>
              {!completedDate && (
                <ChevronDown className="h-4 w-4 text-[#6A7282]" />
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[#F9FAFB]">Github Link</label>
            <InputField
              value={repoLink}
              onChange={(e) => setRepoLink(e.target.value)}
              placeholder="Enter your project Github link"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="project-desc" className="text-[#F9FAFB]">
              Project Link
            </label>
            <Controller
              control={form.control}
              name="projectLink"
              render={({ field, fieldState }) => (
                <div>
                  <InputField
                    {...field}
                    value={field.value ?? ''}
                    className="w-full sm:placeholder:text-base"
                    placeholder="Enter your project hosting link"
                  />
                  {fieldState.error && (
                    <p className="text-red-500 text-sm mt-1">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>
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
