import Button from "@/components/ui/Button";
import React from "react";

function ApprovedIdeasTable({
  projects,
  loading,
  error,
  isEmpty,
  hasFilters,
  onClearFilters,
}) {
  return (
    <div className="bg-primary rounded-xl border border-gray-400 overflow-hidden flex-1 flex flex-col min-h-0">
      <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr] gap-4 px-4 md:px-6 py-4 border-b border-gray-400 flex-shrink-0">
        <div className="text-white font-semibold text-lg md:text-xl text-center">
          Project Name
        </div>
        <div className="text-white font-semibold text-lg md:text-xl text-center">
          Project Details
        </div>
        <div className="text-white font-semibold text-lg md:text-xl text-center">
          Developer
        </div>
        <div className="text-white font-semibold text-lg md:text-xl text-center">
          Reactions
        </div>
      </div>

      <div className="divide-y divide-gray-400 flex-1 overflow-y-auto">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="flex items-center gap-3">
              <svg
                className="animate-spin h-6 w-6 text-purple-500"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="text-gray-400">Loading projects...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-red-400 mb-2">Error loading projects</div>
              <div className="text-gray-400 text-sm">{error}</div>
              <Button
                onClick={() => window.location.reload()}
                variant="primary"
                size="primary"
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          </div>
        ) : isEmpty ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-gray-400 mb-2">No projects found</div>
              {hasFilters && (
                <Button
                  onClick={onClearFilters}
                  variant="primary"
                  size="primary"
                  className="mt-2 text-sm"
                >
                  Clear filters
                </Button>
              )}
            </div>
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="grid grid-cols-[1.5fr_2fr_1fr_1fr] gap-4 px-4 md:px-6 py-4 hover:bg-[#1A1F2E] transition-colors border-b border-gray-400 last:border-b-0"
            >
              <div className="font-medium text-sm md:text-base text-center flex items-center justify-center">
                {project.projectName}
              </div>
              <div
                className="font-medium text-sm md:text-base text-center flex items-center justify-center"
                title={project.projectDetails}
              >
                <span className="line-clamp-2">{project.projectDetails || 'No description available'}</span>
              </div>
              <div className="font-medium text-sm md:text-base text-center flex items-center justify-center">
                {project.devName || 'N/A'}
              </div>
              <div className="font-medium text-sm md:text-base text-center flex items-center justify-center">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4 text-purple-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  {project.reactionCount || 0}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ApprovedIdeasTable;
