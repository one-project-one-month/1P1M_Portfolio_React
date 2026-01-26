import InputField from '@/components/ui/input-field';
import { Controller, type UseFormReturn } from 'react-hook-form';
import type { PortfolioFormValues } from '../../portfolio-schema';

interface PortfolioLinkSectionProps {
  form: UseFormReturn<PortfolioFormValues>;
  isReadOnly: boolean;
}

export const PortfolioLinkSection = ({
  form,
  isReadOnly,
}: PortfolioLinkSectionProps) => {
  const projectLink = form.watch('projectLink');
  const repoLink = form.watch('repoLink');

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-white">Links</h2>

      <div className="space-y-6">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-[#F9FAFB]">
            GitHub link
          </label>
          {isReadOnly ? (
            <div className="px-3 py-2 bg-[#1e293b] rounded-md text-[#6A7282] min-h-[40px] text-sm flex items-center">
              {repoLink || 'No link provided'}
            </div>
          ) : (
            <Controller
              control={form.control}
              name="repoLink"
              render={({ field }) => (
                <InputField
                  className="text-sm text-[#6A7282] w-full"
                  placeholder="https://12345github.com"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          )}
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-[#F9FAFB]">
            Project link
          </label>
          {isReadOnly ? (
            <div className="px-3 py-2 bg-[#1e293b] rounded-md text-[#6A7282] min-h-[40px] text-sm flex items-center">
              {projectLink || 'No link provided'}
            </div>
          ) : (
            <Controller
              control={form.control}
              name="projectLink"
              render={({ field }) => (
                <InputField
                  className="text-sm text-[#6A7282] w-full"
                  placeholder="www.finkoff.com"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};
