import { useQuery } from '@tanstack/react-query';
import { getOpomRegisteredPeopleList } from '../services/opom-registered-list.service';
import type {
  GetAllOpomRegisterParams,
  GetAllOpomRegisterResponseType,
} from '../types/opom-registered-list-type';

export const useGetOpomRegisteredPeopleList = ({
  keyword,
  page,
  size,
  sortField,
  sortDirection,
}: GetAllOpomRegisterParams) => {
  return useQuery<GetAllOpomRegisterResponseType>({
    queryKey: [
      'opom-register-list',
      keyword,
      page,
      size,
      sortField,
      sortDirection,
    ],
    queryFn: () =>
      getOpomRegisteredPeopleList({
        keyword,
        page,
        size,
        sortField,
        sortDirection,
      }),
  });
};
