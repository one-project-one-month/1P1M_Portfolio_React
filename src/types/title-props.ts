import type { ChangeEvent } from 'react';

export interface TitleProps {
  page?: string;
  title?: string;
  onCreate?: (() => void) | false;
  showSearch?: boolean;
  showOrder?: boolean;
  showFilter?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  filterOptions?: Record<string, string>[];
  orderOptions?: string[];
  selectedFilter?: string;
  setSelectedFilter?: (option: string) => void;
  selectedOrder?: string;
  onFilterChange?: (option: string) => void;
  onOrderChange?: (option: string) => void;
}
