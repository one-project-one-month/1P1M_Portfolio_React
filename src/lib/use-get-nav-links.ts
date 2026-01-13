import type { NavLink, UserRole } from '@/types/nav-props';

export const getNavLinks = (role?: UserRole): NavLink[] => {
  const isAdmin = role === 'USER';

  const links: NavLink[] = [
    { id: 1, name: 'Portfolio', path: '/portfolio' },
    { id: 2, name: 'Dev Profiles', path: '/developers' },
    {
      id: 3,
      name: 'Ideas',
      path:  '/ideas',
    },
    {
      id: 4,
      name: 'About Us',
      path: '/about us',
    },
  ];

  return links;
};
