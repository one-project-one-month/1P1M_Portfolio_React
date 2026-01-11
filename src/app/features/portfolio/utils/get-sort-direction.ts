export function getSortDirection(filter: string): 'asc' | 'desc' | null {
  switch (filter) {
    case 'Newest':
      return 'desc';

    case 'Oldest':
      return 'asc';

    default:
      return 'desc';
  }
}
