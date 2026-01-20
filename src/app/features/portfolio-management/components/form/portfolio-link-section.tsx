import InputField from '@/components/ui/input-field';
// React import removed as not used

interface PortfolioLinkSectionProps {
  projectLink: string;
  setProjectLink: (link: string) => void;
  isReadOnly: boolean;
}

export const PortfolioLinkSection = ({
  projectLink,
  setProjectLink,
  isReadOnly,
}: PortfolioLinkSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium text-white">Project Link</h2>

      <div className="space-y-6">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-medium text-[#F9FAFB]">
            Add Link of your project
          </label>
          {isReadOnly ? (
            <div className="px-3 py-2 bg-[#1e293b] rounded-md text-[#6A7282] min-h-[40px] text-sm flex items-center">
              {projectLink || 'No link provided'}
            </div>
          ) : (
            <InputField
              className="text-sm text-[#6A7282] w-full"
              placeholder="http://"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            />
          )}
        </div>
      </div>
    </div>
  );
};
