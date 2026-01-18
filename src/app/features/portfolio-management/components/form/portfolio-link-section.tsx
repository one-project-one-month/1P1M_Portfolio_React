interface PortfolioLinkSectionProps {
  projectLink: string;
  setProjectLink: (link: string) => void;
  projectLinkName: string;
  setProjectLinkName: (name: string) => void;
  isReadOnly: boolean;
}

export const PortfolioLinkSection = ({
  projectLink,
  setProjectLink,
  projectLinkName,
  setProjectLinkName,
  isReadOnly,
}: PortfolioLinkSectionProps) => {
  return (
    <div className="space-y-6 text-white">
      <h2 className="text-lg font-medium">Project Link</h2>

      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm font-medium">Link Name (Optional)</label>
          {isReadOnly ? (
            <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
              {projectLinkName || '-'}
            </p>
          ) : (
            <input
              type="text"
              value={projectLinkName}
              onChange={(e) => setProjectLinkName(e.target.value)}
              placeholder="e.g., GitHub Repository, Live Demo"
              className="w-full px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white placeholder:text-[#6A7282] focus:outline-none focus:border-[#9C39FC]"
            />
          )}
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium">Project URL*</label>
          {isReadOnly ? (
            projectLink ? (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-2 bg-[#1e293b] rounded-md text-[#9C39FC] hover:text-[#a855f7] min-h-[40px] transition-colors"
              >
                {projectLink}
              </a>
            ) : (
              <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white/50 min-h-[40px]">
                No link added
              </p>
            )
          ) : (
            <input
              type="url"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              placeholder="https://github.com/your-project"
              className="w-full px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white placeholder:text-[#6A7282] focus:outline-none focus:border-[#9C39FC]"
            />
          )}
        </div>
      </div>
    </div>
  );
};
