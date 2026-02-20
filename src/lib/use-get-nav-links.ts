import type { NavLink } from '@/types/nav-props';

export const getNavLinks = (): NavLink[] => {
  const links: NavLink[] = [
    { id: 1, name: 'Portfolios', path: '/portfolios' },
    { id: 2, name: 'Profiles', path: '/developers' },
    {
      id: 3,
      name: 'Ideas',
      path: '/ideas',
    },
    {
      id: 4,
      name: 'About Us',
      path: '/about-us',
    },
  ];

  return links;
};
