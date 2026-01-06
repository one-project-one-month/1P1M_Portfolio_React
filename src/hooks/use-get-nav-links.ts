import type { NavLink, UserRole } from '@/type/nav-props';

export const getNavLinks = (role?: UserRole): NavLink[] => {
  const isAdmin = role === 'USER';

  const links: NavLink[] = [
    { id: 1, name: 'Portfolio', path: '/project-portfolio' },
    { id: 2, name: 'Dev Profiles', path: '/dev-list' },
    {
      id: 3,
      name: 'Ideas',
      path: isAdmin ? '/admin/ideas' : '/ideas',
    },
    {
      id: 4,
      name: 'Approved Ideas',
      path: isAdmin ? '/admin/approved-ideas' : '/approved-ideas',
    },
  ];

  return links;
};
