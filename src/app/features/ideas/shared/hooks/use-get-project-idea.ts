import { useQuery } from '@tanstack/react-query';
import { getProjectIdea } from '../services/project-idea.service';
import type {
  GetIdeaParamsType,
  IdeasResponseType,
} from '../types/project-idea.types';

export const useGetProjectIdea = ({
  keyword,
  page,
  size,
  status,
  sortOrder,
}: GetIdeaParamsType) => {
  return useQuery<IdeasResponseType>({
    queryKey: ['ideas', keyword, page, size, status, sortOrder],
    queryFn: () => getProjectIdea({ keyword, page, size, status, sortOrder }),
    // staleTime: 5 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};
