import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronLeft,
  MoveUpRight,
  RotateCcw,
  Search,
  SquareCheck,
  SquarePen,
  Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DatePickerDialog from '../components/form/date-picker-dialog';
import { type TeamActivity, useEditActivity } from '../hooks/use-edit-activity';

const EditActivityPage = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [editingDateInfo, setEditingDateInfo] = useState<{
    teamId: string;
    activityId: string;
    currentDate: Date | null;
  } | null>(null);
  const [linkPopover, setLinkPopover] = useState<{
    teamId: string;
    activityId: string;
  } | null>(null);

  const {
    teams,
    setTeams,
    expandedTeams,
    toggleTeam,
    addNewActivity,
    updateActivityName,
    updateActivityDate,
    updateActivityLink,
    startEditActivity,
    saveEditActivity,
    deleteActivity,
    restoreActivity,
  } = useEditActivity();

  useEffect(() => {
    const dummyTeams: TeamActivity[] = [
      {
        id: '1',
        name: 'Design Team',
        leaderName: 'John Doe',
        leaderImage:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        activities: [
          {
            id: '1',
            name: 'Profile View',
            date: '29 Jan 2026',
            uploader: {
              name: 'John Doe',
              imageUrl:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            },
            isEditing: false,
            isDeleted: false,
          },
          {
            id: '2',
            name: 'Portfolio Page',
            date: '25 Jan 2026',
            uploader: {
              name: 'John Doe',
              imageUrl:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            },
            isEditing: false,
            isDeleted: false,
          },
          {
            id: '3',
            name: 'Idea Management Page',
            date: '20 Jan 2026',
            uploader: {
              name: 'John Doe',
              imageUrl:
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
            },
            isEditing: false,
            isDeleted: false,
          },
        ],
      },
      {
        id: '2',
        name: 'Front-end Team',
        leaderName: 'Jane Smith',
        leaderImage:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        activities: [],
      },
      {
        id: '3',
        name: 'Back-end Team',
        leaderName: 'Mike Johnson',
        leaderImage:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        activities: [],
      },
    ];

    setTeams(dummyTeams);
    setIsLoading(false);
  }, [setTeams]);

  const handleBack = () => {
    navigate(`/admin/portfolio-management/view-project-portfolio/${projectId}`);
  };

  const handleCancel = () => {
    handleBack();
  };

  const handleSave = () => {
    // Skip for now
    console.log('Save functionality to be implemented');
    handleBack();
  };

  const handleDateClick = (
    teamId: string,
    activityId: string,
    currentDate: string,
  ) => {
    const parsedDate = currentDate ? new Date(currentDate) : new Date();
    setEditingDateInfo({
      teamId,
      activityId,
      currentDate: isNaN(parsedDate.getTime()) ? new Date() : parsedDate,
    });
    setDatePickerOpen(true);
  };

  const handleDateSelect = (formattedDate: string) => {
    if (editingDateInfo) {
      updateActivityDate(
        editingDateInfo.teamId,
        editingDateInfo.activityId,
        formattedDate,
      );
    }
    setDatePickerOpen(false);
    setEditingDateInfo(null);
  };

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.activities.some((a) =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  if (isLoading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  return (
    <div className="flex flex-col w-full h-full px-6 py-8">
      {/* Header */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1 mb-6 w-fit hover:opacity-80 transition-opacity"
      >
        <ChevronLeft className="w-8 h-8 text-[#F3F4F6]" strokeWidth={3} />
        <span className="text-white text-2xl font-semibold">Back</span>
      </button>

      <div className="mb-6">
        <h1 className="text-white text-2xl font-semibold mb-2">
          Update the idea information!
        </h1>
        <p className="text-[#99A1AF] text-base">
          Modify existing idea information and save the latest updates.
        </p>
      </div>

      <div className="w-full max-w-[400px] h-10 px-3 rounded-lg border border-[rgba(255,255,255,0.15)] bg-[rgba(255,255,255,0.09)] flex items-center gap-2 mb-6">
        <Search className="w-4 h-4 text-[#6A7282]" />
        <input
          type="text"
          placeholder="Search by keywords"
          className="flex-1 bg-transparent text-[#6A7282] text-sm outline-none placeholder:text-[#6A7282]"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="flex-1 flex flex-col w-full rounded-xl border border-[#99A1AF] overflow-hidden bg-[rgba(255,255,255,0.09)]">
        <div className="flex items-center w-full bg-[rgba(255,255,255,0.05)] px-4 py-3 border-b border-[#99A1AF]">
          <div className="w-[180px] text-white font-semibold text-sm">
            Team Name
          </div>
          <div className="flex-1 text-white font-semibold text-sm">Task</div>
          <div className="w-[120px] text-white font-semibold text-sm text-center">
            Date
          </div>
          <div className="w-[100px] text-white font-semibold text-sm text-center">
            Uploader
          </div>
          <div className="w-[60px] text-white font-semibold text-sm text-center">
            Link
          </div>
          <div className="w-[100px] text-white font-semibold text-sm text-center">
            Action
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredTeams.map((team) => (
            <div key={team.id} className="flex flex-col w-full">
              <div className="flex items-center w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border-b border-white/10">
                <div
                  className="w-[180px] text-white text-sm font-medium cursor-pointer flex items-center gap-2"
                  onClick={() => toggleTeam(team.id)}
                >
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform duration-200 ${
                      expandedTeams[team.id] ? 'rotate-180' : ''
                    }`}
                  />
                  {team.name}
                </div>
                <div className="flex-1" />
                <div className="w-[120px]" />
                <div className="w-[100px]" />
                <div className="w-[60px]" />
                <div className="w-[100px] flex justify-center">
                  <button
                    onClick={() => {
                      if (!expandedTeams[team.id]) {
                        toggleTeam(team.id);
                      }
                      addNewActivity(team.id);
                    }}
                    className="flex items-center gap-1 text-[#9C39FC] text-xs font-medium hover:opacity-80"
                  >
                    <span className="w-3 h-3 rounded-full border border-[#9C39FC] flex items-center justify-center text-[10px]">
                      +
                    </span>
                    New Option
                  </button>
                </div>
              </div>

              {expandedTeams[team.id] &&
                team.activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center w-full px-4 py-3 border-b border-white/5"
                  >
                    <div className="w-[180px]" />

                    <div
                      className={`flex-1 pr-4 ${activity.isDeleted ? 'opacity-50' : ''}`}
                    >
                      {activity.isEditing ? (
                        <input
                          type="text"
                          value={activity.name}
                          onChange={(e) =>
                            updateActivityName(
                              team.id,
                              activity.id,
                              e.target.value,
                            )
                          }
                          placeholder="Add activity"
                          className="w-full bg-[rgba(255,255,255,0.1)] border border-[#9C39FC] rounded px-3 py-1.5 text-white text-sm outline-none"
                          autoFocus
                        />
                      ) : (
                        <span
                          className={`text-white text-sm ${
                            activity.isDeleted ? 'line-through' : ''
                          }`}
                        >
                          {activity.name}
                        </span>
                      )}
                    </div>

                    <div
                      className={`w-[120px] text-center ${activity.isDeleted ? 'opacity-50' : ''}`}
                    >
                      <button
                        onClick={() =>
                          !activity.isDeleted &&
                          handleDateClick(team.id, activity.id, activity.date)
                        }
                        className={`text-white text-sm hover:text-[#9C39FC] transition-colors ${
                          activity.isDeleted ? ' cursor-not-allowed' : ''
                        }`}
                        disabled={activity.isDeleted}
                      >
                        {activity.date}
                      </button>
                    </div>

                    <div
                      className={`w-[100px] flex justify-center ${activity.isDeleted ? 'opacity-50' : ''}`}
                    >
                      <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#9C39FC]">
                        {activity.uploader.imageUrl ? (
                          <img
                            src={activity.uploader.imageUrl}
                            alt={activity.uploader.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-400 flex items-center justify-center text-xs font-bold text-white">
                            {activity.uploader.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="w-[60px] flex justify-center relative">
                      {linkPopover?.teamId === team.id &&
                        linkPopover?.activityId === activity.id && (
                          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50">
                            <div className="bg-[#1F2937] border border-[#374151] rounded-lg shadow-xl p-1">
                              <input
                                type="text"
                                value={activity.link || ''}
                                onChange={(e) =>
                                  updateActivityLink(
                                    team.id,
                                    activity.id,
                                    e.target.value,
                                  )
                                }
                                placeholder="Type or paste URL"
                                className="w-[180px] bg-transparent text-white text-sm outline-none px-2 py-1.5 placeholder:text-[#6B7280]"
                                autoFocus
                                onBlur={() => setLinkPopover(null)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === 'Escape') {
                                    setLinkPopover(null);
                                  }
                                }}
                              />
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-[#1F2937] border-r border-b border-[#374151] transform rotate-45" />
                          </div>
                        )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (activity.link && !activity.isDeleted) {
                            window.open(activity.link, '_blank');
                          } else if (!activity.isDeleted) {
                            setLinkPopover({
                              teamId: team.id,
                              activityId: activity.id,
                            });
                          }
                        }}
                        className={`p-1 rounded transition-colors group relative ${
                          activity.link && !activity.isDeleted
                            ? 'hover:bg-white/10 cursor-pointer'
                            : activity.isDeleted
                              ? 'cursor-not-allowed opacity-30'
                              : 'hover:bg-white/10 cursor-pointer'
                        }`}
                        disabled={activity.isDeleted}
                      >
                        <MoveUpRight
                          className={`w-4 h-4 ${
                            activity.link
                              ? 'text-[#F9FAFB]'
                              : 'text-[#F9FAFB]/30'
                          }`}
                        />

                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-40 pointer-events-none">
                          <div className="bg-[#374151] text-white text-[10px] rounded px-2 py-1 whitespace-nowrap max-w-[200px] truncate">
                            {activity.link || 'Click to add link'}
                          </div>
                        </div>
                      </button>
                    </div>
                    <div className="w-[100px] flex justify-center gap-2">
                      {activity.isDeleted ? (
                        <>
                          <button
                            onClick={() => {}}
                            className="p-1.5 rounded hover:bg-white/10 transition-colors opacity-50"
                            title="Edit"
                            disabled
                          >
                            <SquarePen className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() =>
                              restoreActivity(team.id, activity.id)
                            }
                            className="p-1.5 rounded hover:bg-white/10 transition-colors opacity-100"
                            title="Restore"
                          >
                            <RotateCcw className="w-4 h-4 text-[#22C55E]" />
                          </button>
                        </>
                      ) : (
                        <>
                          {activity.isEditing ? (
                            <button
                              onClick={() =>
                                saveEditActivity(team.id, activity.id)
                              }
                              className="p-1.5 rounded hover:bg-white/10 transition-colors"
                              title="Save"
                            >
                              <SquareCheck className="w-4 h-4 text-[#22C55E]" />
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                startEditActivity(team.id, activity.id)
                              }
                              className="p-1.5 rounded hover:bg-white/10 transition-colors"
                              title="Edit"
                            >
                              <SquarePen className="w-4 h-4 text-white" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteActivity(team.id, activity.id)}
                            className="p-1.5 rounded hover:bg-white/10 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-white" />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button
          onClick={handleCancel}
          className="px-6 py-2 border border-white/20 bg-transparent text-white hover:bg-white/10"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="px-6 py-2 bg-[#9C39FC] hover:bg-[#9333ea] text-white"
        >
          Save
        </Button>
      </div>

      <DatePickerDialog
        isOpen={datePickerOpen}
        onClose={() => {
          setDatePickerOpen(false);
          setEditingDateInfo(null);
        }}
        selectedDate={editingDateInfo?.currentDate || null}
        onSelect={handleDateSelect}
      />
    </div>
  );
};

export default EditActivityPage;
