import { IdeaStatus } from '../types/project-idea.types';

export const statusToNumber = (
  status:
    | 'REJECTED'
    | 'APPROVED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'PENDING'
    | 'DELETED',
): 0 | 1 | 2 | 3 | 4 | 5 => {
  const mapping: Record<string, 0 | 1 | 2 | 3 | 4 | 5> = {
    [IdeaStatus.REJECTED]: 0,
    [IdeaStatus.APPROVED]: 1,
    [IdeaStatus.IN_PROGRESS]: 2,
    [IdeaStatus.COMPLETED]: 3,
    [IdeaStatus.DELETED]: 4,
    [IdeaStatus.PENDING]: 5,
  };

  return mapping[status];
};

export const numberToStatus = (
  num: number,
):
  | 'REJECTED'
  | 'APPROVED'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'DELETED'
  | 'PENDING' => {
  const mapping: Record<
    number,
    | 'REJECTED'
    | 'APPROVED'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'DELETED'
    | 'PENDING'
  > = {
    0: IdeaStatus.REJECTED,
    1: IdeaStatus.APPROVED,
    2: IdeaStatus.IN_PROGRESS,
    3: IdeaStatus.COMPLETED,
    4: IdeaStatus.DELETED,
    5: IdeaStatus.PENDING,
  };

  return mapping[num];
};
