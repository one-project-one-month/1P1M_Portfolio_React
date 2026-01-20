import type {
  GetProjectIdeaParams,
  GetProjectIdeas,
} from '@/app/features/idea-management/types/idea-management.types';
import { useQuery } from '@tanstack/react-query';
import { getProjectIdeas } from '../services/project-idea.service';

export const useProjectIdeaQuery = ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetProjectIdeaParams) => {
  return useQuery<GetProjectIdeas>({
    queryKey: ['projectIdeas', keyword, page, sortDirection, sortField, size],
    queryFn: () =>
      getProjectIdeas({ keyword, page, size, sortDirection, sortField }),
  });
};
