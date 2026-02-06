export interface StatusOption {
  id: string;
  name: string;
}

export interface Timeline {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  timelineStatus: string;
}

export interface TimelineProps {
  data: Timeline[];
  refreshData: () => void;
}

export interface TimelineFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  data?: Timeline | null;
  onSuccess?: () => void;
}
