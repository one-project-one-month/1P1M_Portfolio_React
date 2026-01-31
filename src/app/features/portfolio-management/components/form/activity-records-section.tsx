import { Button } from '@/components/ui/button';
import { ChevronDown, Pencil } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ActivityItem {
  name: string;
  date: string;
  uploader: {
    imageUrl: string;
    alt: string;
  };
}

interface TeamSection {
  id: string;
  name: string;
  activities: ActivityItem[];
}

interface ActivityRecordsSectionProps {
  projectId?: number;
}

export const ActivityRecordsSection = ({
  projectId,
}: ActivityRecordsSectionProps) => {
  const navigate = useNavigate();
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>({
    design: true,
  });

  const toggleTeam = (teamId: string) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  };

  const handleEditActivity = () => {
    if (projectId) {
      navigate(`/admin/portfolio-management/edit-activity/${projectId}`);
    }
  };

  const teams: TeamSection[] = [
    {
      id: 'design',
      name: 'Design Team',
      activities: [
        {
          name: 'Profile View',
          date: '29 Jan 2026',
          uploader: {
            imageUrl:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            alt: 'Team member 1',
          },
        },
        {
          name: 'Portfolio Page',
          date: '25 Jan 2026',
          uploader: {
            imageUrl:
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
            alt: 'Team member 2',
          },
        },
        {
          name: 'Idea Management Page',
          date: '20 Jan 2026',
          uploader: {
            imageUrl:
              'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop',
            alt: 'Team member 3',
          },
        },
      ],
    },
    {
      id: 'frontend',
      name: 'Front-end Team',
      activities: [],
    },
    {
      id: 'backend',
      name: 'Back-end Team',
      activities: [],
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-[#F9FAFB] font-medium text-2xl leading-7">
            Update the Activity information!
          </h2>
          <p className="text-[#F9FAFB] text-lg font-normal leading-7 opacity-60">
            Modify existing activities information and save the latest updates.
          </p>
        </div>
        <Button
          className="bg-[#9C39FC] hover:bg-[#9333ea] text-sm font-medium rounded-lg px-3 py-1.5 text-[#F9FAFB] gap-1"
          onClick={handleEditActivity}
        >
          <Pencil size={16} />
          Edit Activity
        </Button>
      </div>

      <div className="flex flex-col w-full rounded-lg border border-white/15 overflow-hidden">
        <div className="flex items-center w-full bg-[rgba(255,255,255,0.09)] px-4 py-3">
          <div className="flex-2 text-[#F9FAFB] font-medium text-xs">
            Team Name
          </div>
          <div className="flex-2 text-[#F9FAFB] font-medium text-xs">Task</div>
          <div className="flex-[1.5] text-[#F9FAFB] font-medium text-xs text-center">
            Date
          </div>
          <div className="flex-1 text-[#F9FAFB] font-medium text-xs text-center">
            Uploader
          </div>
          <div className="w-12 text-[#F9FAFB] font-medium text-xs text-center">
            Link
          </div>
        </div>

        {teams.map((team) => (
          <div key={team.id} className="flex flex-col w-full">
            <div
              className="flex items-center w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] cursor-pointer hover:bg-[rgba(255,255,255,0.08)] transition-colors border-t border-white/10"
              onClick={() => toggleTeam(team.id)}
            >
              <div className="flex-2 text-[#F9FAFB] text-sm font-medium">
                {team.name}
              </div>
              <div className="flex-2" />
              <div className="flex-[1.5]" />
              <div className="flex-1" />
              <div className="w-12 flex justify-center">
                <ChevronDown
                  className={`w-4 h-4 text-[#F9FAFB] transition-transform duration-200 ${
                    expandedTeams[team.id] ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                />
              </div>
            </div>

            {expandedTeams[team.id] && team.activities.length > 0 && (
              <div className="flex flex-col w-full">
                {team.activities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center w-full px-4 py-3 border-t border-white/5"
                  >
                    <div className="flex-2" />
                    <div className="flex-2 text-[#F9FAFB] text-sm">
                      {activity.name}
                    </div>
                    <div className="flex-[1.5] text-[#F9FAFB] text-sm text-center">
                      {activity.date}
                    </div>
                    <div className="flex-1 flex justify-center">
                      <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img
                          src={activity.uploader.imageUrl}
                          alt={activity.uploader.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="w-12 flex justify-center">
                      <svg
                        className="w-4 h-4"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.58623 2.53125H9.62601M9.62601 2.53125V5.57102M9.62601 2.53125L2.5332 9.62405"
                          stroke="#F9FAFB"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
