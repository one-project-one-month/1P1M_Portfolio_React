import { useCallback, useState } from 'react';

export interface ActivityItem {
  id: string;
  name: string;
  date: string;
  uploader: {
    name: string;
    imageUrl: string;
  };
  link?: string;
  isEditing?: boolean;
  isDeleted?: boolean;
  isNew?: boolean;
}

export interface TeamActivity {
  id: string;
  name: string;
  leaderId?: string;
  leaderName?: string;
  leaderImage?: string;
  activities: ActivityItem[];
}

interface UseEditActivityProps {
  initialTeams?: TeamActivity[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

export const useEditActivity = ({
  initialTeams = [],
}: UseEditActivityProps = {}) => {
  const [teams, setTeams] = useState<TeamActivity[]>(initialTeams);
  const [expandedTeams, setExpandedTeams] = useState<Record<string, boolean>>(
    {},
  );
  const [hasChanges, setHasChanges] = useState(false);

  const toggleTeam = useCallback((teamId: string) => {
    setExpandedTeams((prev) => ({
      ...prev,
      [teamId]: !prev[teamId],
    }));
  }, []);

  const addNewActivity = useCallback(
    (teamId: string) => {
      const team = teams.find((t) => t.id === teamId);
      if (!team) return;

      const newActivity: ActivityItem = {
        id: generateId(),
        name: '',
        date: formatDate(new Date()),
        uploader: {
          name: team.leaderName || 'Team Leader',
          imageUrl: team.leaderImage || '',
        },
        isEditing: true,
        isNew: true,
      };

      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId
            ? { ...t, activities: [newActivity, ...t.activities] }
            : t,
        ),
      );
      setHasChanges(true);
    },
    [teams],
  );

  const updateActivityName = useCallback(
    (teamId: string, activityId: string, name: string) => {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId
            ? {
                ...t,
                activities: t.activities.map((a) =>
                  a.id === activityId ? { ...a, name } : a,
                ),
              }
            : t,
        ),
      );
      setHasChanges(true);
    },
    [],
  );

  const updateActivityDate = useCallback(
    (teamId: string, activityId: string, date: string) => {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId
            ? {
                ...t,
                activities: t.activities.map((a) =>
                  a.id === activityId ? { ...a, date } : a,
                ),
              }
            : t,
        ),
      );
      setHasChanges(true);
    },
    [],
  );

  const updateActivityLink = useCallback(
    (teamId: string, activityId: string, link: string) => {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId
            ? {
                ...t,
                activities: t.activities.map((a) =>
                  a.id === activityId ? { ...a, link } : a,
                ),
              }
            : t,
        ),
      );
      setHasChanges(true);
    },
    [],
  );

  const startEditActivity = useCallback(
    (teamId: string, activityId: string) => {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId
            ? {
                ...t,
                activities: t.activities.map((a) =>
                  a.id === activityId ? { ...a, isEditing: true } : a,
                ),
              }
            : t,
        ),
      );
    },
    [],
  );

  const saveEditActivity = useCallback((teamId: string, activityId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? {
              ...t,
              activities: t.activities.map((a) =>
                a.id === activityId
                  ? { ...a, isEditing: false, isNew: false }
                  : a,
              ),
            }
          : t,
      ),
    );
    setHasChanges(true);
  }, []);

  const deleteActivity = useCallback((teamId: string, activityId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? {
              ...t,
              activities: t.activities.map((a) =>
                a.id === activityId ? { ...a, isDeleted: true } : a,
              ),
            }
          : t,
      ),
    );
    setHasChanges(true);
  }, []);

  const restoreActivity = useCallback((teamId: string, activityId: string) => {
    setTeams((prev) =>
      prev.map((t) =>
        t.id === teamId
          ? {
              ...t,
              activities: t.activities.map((a) =>
                a.id === activityId ? { ...a, isDeleted: false } : a,
              ),
            }
          : t,
      ),
    );
    setHasChanges(true);
  }, []);

  const getChangedData = useCallback(() => {
    return teams.map((team) => ({
      teamId: team.id,
      teamName: team.name,
      activities: team.activities
        .filter((a) => !a.isNew || (a.isNew && a.name.trim() !== ''))
        .map((a) => ({
          id: a.isNew ? undefined : a.id,
          name: a.name,
          date: a.date,
          isDeleted: a.isDeleted,
        })),
    }));
  }, [teams]);

  return {
    teams,
    setTeams,
    expandedTeams,
    hasChanges,
    toggleTeam,
    addNewActivity,
    updateActivityName,
    updateActivityDate,
    updateActivityLink,
    startEditActivity,
    saveEditActivity,
    deleteActivity,
    restoreActivity,
    getChangedData,
  };
};
