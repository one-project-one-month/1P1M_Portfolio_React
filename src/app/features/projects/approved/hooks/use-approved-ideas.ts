import { useQuery } from '@tanstack/react-query';
import { getApprovedIdeas } from '../services/approved-ideas';

export function useApproveIdeasQuery() {
  return useQuery({
    queryKey: ['projects', 'approve-ideas'],
    queryFn: getApprovedIdeas,
  });
}
