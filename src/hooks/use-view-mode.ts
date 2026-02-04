import { useState } from 'react';

export function useViewMode(view: 'list' | 'grid' = 'list') {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>(view);
  return { viewMode, setViewMode };
}
