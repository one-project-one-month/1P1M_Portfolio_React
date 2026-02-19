export interface StatusOption {
  id: string;
  name: string;
  slug: string;
}

export interface Timeline {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  timeLineStatus: string;
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
