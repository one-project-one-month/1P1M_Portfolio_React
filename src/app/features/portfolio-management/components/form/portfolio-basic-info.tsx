import type { DropdownItem } from '@/types/portfolio-management';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { ProjectData } from '../../constants/data';
import { statusOptions } from '../../constants/data';
import type { PortfolioFormValues } from '../../portfolio-schema';
import StatusDropdown from '../status-dropdown';

interface PortfolioBasicInfoProps {
  initialData?: ProjectData | null;
  importData?: Partial<ProjectData> | null;
  form: UseFormReturn<PortfolioFormValues>;
  isReadOnly: boolean;
  accessFrom?: string;
}

export const PortfolioBasicInfo = ({
  form,
  isReadOnly,
  accessFrom,
}: PortfolioBasicInfoProps) => {
  const projectName = form.watch('projectName');
  const description = form.watch('description');
  const status = form.watch('status');

  return (
    <>
      {/* Project Name */}
      <div className="flex flex-col gap-1">
        <label className="text-[#F9FAFB] text-sm font-medium">
          Project Name
        </label>
        {isReadOnly ? (
          <div className="h-10 px-3 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal flex items-center">
            {projectName || '-'}
          </div>
        ) : (
          <Controller
            control={form.control}
            name="projectName"
            render={({ field, fieldState }) => (
              <div>
                <input
                  type="text"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter your project name"
                  className={`h-10 px-3 w-full bg-white/[0.09] border rounded-md text-[#F3F4F6] text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#9C39FC] ${fieldState.error ? 'border-red-500' : 'border-white/15'
                    }`}
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </div>
            )}
          />
        )}
      </div>

      {/* Status */}
      {accessFrom !== 'user-portfolio' && (
        <div className="flex flex-col gap-1">
          <label className="text-[#F9FAFB] text-sm font-medium">Status</label>
          {isReadOnly ? (
            <div className="h-10 px-3 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal flex items-center">
              {status?.name || '-'}
            </div>
          ) : (
            <Controller
              control={form.control}
              name="status"
              render={({ field }) => (
                <div className="relative">
                  <StatusDropdown
                    placeholder="Select current status"
                    menuList={statusOptions}
                    selectedValue={field.value}
                    onChange={(value: DropdownItem | null) =>
                      field.onChange(value)
                    }
                    className="h-10 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm"
                  />
                </div>
              )}
            />
          )}
        </div>
      )}

      {/* Project Description */}
      <div className="flex flex-col gap-1">
        <label className="text-[#F9FAFB] text-sm font-medium">
          Project Descriptions
        </label>
        {isReadOnly ? (
          <div className="px-3 py-2 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal min-h-[120px] whitespace-pre-wrap">
            {description || '-'}
          </div>
        ) : (
          <Controller
            control={form.control}
            name="description"
            render={({ field, fieldState }) => (
              <>
                <textarea
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Provide details about your project"
                  rows={5}
                  className="px-3 py-2 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal resize-none focus:outline-none focus:ring-2 focus:ring-[#9C39FC]"
                />
                {fieldState.error && (
                  <p className="text-red-500 text-sm mt-1">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            )}
          />
        )}
      </div>
    </>
  );
};
