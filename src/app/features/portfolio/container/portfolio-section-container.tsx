import { useDebounce } from '@/hooks/use-debounce';
import type {
  PortfolioProjectType,
  PortfolioSectionContainerProps,
} from '@/types/portfolio.type';
import { useEffect, useState } from 'react';
import ProjectSectionView from '../components/portfolio-section-view';
import { useGetProjectPortfolio } from '../hooks/use-get-portfolio';

const SIZE = 20;
const SORT_FIELD = 'name';

const PortfolioSectionContainer = ({
  query,
  sortDirection = 'asc',
}: PortfolioSectionContainerProps) => {
  const debounceValue = useDebounce(query ?? '', 700);
  const [page, setPage] = useState<number>(0);

  const { data, isLoading } = useGetProjectPortfolio({
    keyword: debounceValue,
    page,
    sortDirection,
    sortField: SORT_FIELD,
    size: SIZE,
  });

  const projects = (data?.data ?? [
    {
      id: 38,
      name: 'E-Commerce Platform - 3',
      projectPicUrl: 'https://example.com/project-image.jpg',
      description: 'A comprehensive e-commerce platform with modern features',
      projectLink: 'https://example.com/ecommerce',
      repoLink: 'https://github.com/username/ecommerce-platform',
      teams: [
        {
          id: 3,
          teamName: 'Frontend Team',
          description: 'Responsible for UI/UX development',
          imageUrl: 'https://example.com/team-image.jpg',
          members: [
            {
              id: 1,
              name: 'minzayarmaung.dev2002',
              profilePictureUrl: null,
              github: 'https://github.com/minzayarmaung.dev2002',
              linkedIn: 'https://linkedin.com/in/minzayarmaung.dev2002',
              telegramUsername: null,
              phone: null,
              aboutDev: 'Administrator account with system privileges.',
            },
            {
              id: 2,
              name: 'minzayarmaung2002',
              profilePictureUrl: null,
              github: 'https://github.com/minzayarmaung2002',
              linkedIn: 'https://linkedin.com/in/minzayarmaung2002',
              telegramUsername: null,
              phone: null,
              aboutDev: 'Administrator account with system privileges.',
            },
            {
              id: 3,
              name: 'hlan1559',
              profilePictureUrl: null,
              github: 'https://github.com/hlan1559',
              linkedIn: 'https://linkedin.com/in/hlan1559',
              telegramUsername: null,
              phone: null,
              aboutDev: 'Administrator account with system privileges.',
            },
          ],
        },
      ],
      languageAndTools: [
        {
          id: 152,
          name: 'React',
          type: 'Framework',
        },
        {
          id: 153,
          name: 'Spring boot',
          type: 'Framework',
        },
        {
          id: 150,
          name: 'PostgreSQL',
          type: 'Database',
        },
        {
          id: 151,
          name: 'Java',
          type: 'Language',
        },
      ],
    },
    {
      id: 37,
      name: 'E-Commerce Platform - 2',
      projectPicUrl: 'https://example.com/project-image.jpg',
      description: 'A comprehensive e-commerce platform with modern features',
      projectLink: 'https://example.com/ecommerce',
      repoLink: 'https://github.com/username/ecommerce-platform',
      teams: [],
      languageAndTools: [
        {
          id: 149,
          name: 'Spring Boot',
          type: 'Framework',
        },
        {
          id: 152,
          name: 'React',
          type: 'Framework',
        },
        {
          id: 151,
          name: 'Java',
          type: 'Language',
        },
        {
          id: 150,
          name: 'PostgreSQL',
          type: 'Database',
        },
      ],
    },
    {
      id: 36,
      name: 'E-Commerce Platform',
      projectPicUrl: 'https://example.com/project-image.jpg',
      description: 'A comprehensive e-commerce platform with modern features',
      projectLink: 'https://example.com/ecommerce',
      repoLink: 'https://github.com/username/ecommerce-platform',
      teams: [],
      languageAndTools: [
        {
          id: 149,
          name: 'Spring Boot',
          type: 'Framework',
        },
        {
          id: 152,
          name: 'React',
          type: 'Framework',
        },
        {
          id: 150,
          name: 'PostgreSQL',
          type: 'Database',
        },
        {
          id: 151,
          name: 'Java',
          type: 'Language',
        },
      ],
    },
    {
      id: 37,
      name: 'E-Commerce Platform',
      projectPicUrl: 'https://example.com/project-image.jpg',
      description: 'A comprehensive e-commerce platform with modern features',
      projectLink: 'https://example.com/ecommerce',
      repoLink: 'https://github.com/username/ecommerce-platform',
      teams: [],
      languageAndTools: [
        {
          id: 149,
          name: 'Spring Boot',
          type: 'Framework',
        },
        {
          id: 152,
          name: 'React',
          type: 'Framework',
        },
        {
          id: 150,
          name: 'PostgreSQL',
          type: 'Database',
        },
        {
          id: 151,
          name: 'Java',
          type: 'Language',
        },
      ],
    },
  ]) as PortfolioProjectType[];
  const totalPages = data?.meta?.totalPages ?? 0;

  useEffect(() => {
    setPage(0);
  }, [debounceValue, sortDirection]);

  return (
    <ProjectSectionView
      isLoading={isLoading}
      projects={projects}
      currentPage={page}
      totalPages={totalPages}
      onPageChange={setPage}
    />
  );
};

export default PortfolioSectionContainer;
