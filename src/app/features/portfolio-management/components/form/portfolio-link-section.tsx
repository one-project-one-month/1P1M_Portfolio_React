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
    <>
      {/* GitHub Link */}
      <div className="flex flex-col gap-1">
        <label className="text-[#F9FAFB] text-sm font-medium">
          GitHub link
        </label>
        {isReadOnly ? (
          <div className="h-10 px-3 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal flex items-center">
            {repoLink || 'No link provided'}
          </div>
        ) : (
          <Controller
            control={form.control}
            name="repoLink"
            render={({ field, fieldState }) => (
              <>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="https://github.com/123hello"
                  className="h-10 px-3 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#9C39FC]"
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

      {/* Project Link */}
      <div className="flex flex-col gap-1">
        <label className="text-[#F9FAFB] text-sm font-medium">
          Project link
        </label>
        {isReadOnly ? (
          <div className="h-10 px-3 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal flex items-center">
            {projectLink || 'No link provided'}
          </div>
        ) : (
          <Controller
            control={form.control}
            name="projectLink"
            render={({ field, fieldState }) => (
              <>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="https://www.finkoff.com"
                  className="h-10 px-3 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#9C39FC]"
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
