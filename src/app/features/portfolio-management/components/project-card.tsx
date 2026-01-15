import { clsx } from 'clsx';
import { MoreVertical } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface ProjectMember {
  id: string;
  name: string;
  avatarUrl?: string;
}

export type ProjectStatus = 'Completed' | 'In-Progress' | 'Unqualified';

export interface ProjectCardProps {
  id: string;
  image: string;
  title: string;
  teamLeader: string;
  members: ProjectMember[];
  status: ProjectStatus;
  className?: string; // Add className prop for flexibility
}

const statusColors: Record<ProjectStatus, string> = {
  Completed: 'bg-[#00B634]',
  'In-Progress': 'bg-[#FF9900]',
  Unqualified: 'bg-[#7D7D7D]',
};

export const ProjectCard = ({
  image,
  title,
  teamLeader,
  members,
  status,
  className,
}: ProjectCardProps) => {
  const displayMembers = members.slice(0, 3);
  const remainingCount = members.length - 3;

  return (
    <div
      className={twMerge(
        'relative flex w-full flex-col rounded-[10px] bg-[#9C39FC] p-3 text-white hover:shadow-lg transition-shadow',
        className,
      )}
    >
      {/* Project Image */}
      <div className="relative mb-4 w-full overflow-hidden rounded-lg">
        <img src={image} alt={title} className="h-full w-full object-cover" />
      </div>

      {/* Title */}
      <h3 className="mb-4 text-sm font-bold leading-tight">{title}</h3>

      {/* Team Info */}
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/70">Team Leader</span>
          <span className="font-medium">{teamLeader}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/70">Team Members</span>
          <div className="flex items-center -space-x-2">
            {displayMembers.map((member, index) => (
              <div
                key={member.id}
                className="relative h-[21px] w-[21px] overflow-hidden rounded-full border-1 border-[#000000] bg-gray-300"
                style={{ zIndex: displayMembers.length - index }}
              >
                {member.avatarUrl ? (
                  <img
                    src={member.avatarUrl}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-400 text-[10px] font-bold">
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
            ))}
            {remainingCount > 0 && (
              <div className="relative z-0 flex h-[20px] w-[14px] items-center justify-center rounded-full text-[12px] ml-2 text-[#CAD5E2]">
                +{remainingCount}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Status & Action */}
      <div className="mt-auto flex items-center justify-between">
        <span
          className={clsx(
            'inline-flex items-center rounded-md px-4 py-0.5 text-sm font-medium text-white',
            statusColors[status],
          )}
        >
          {status}
        </span>
        <button className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
      </div>
    </div>
  );
};
