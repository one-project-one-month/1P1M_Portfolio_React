import type { ChangeEvent } from 'react';

export type FilterConfig = {
  key: string;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
};

export interface TitleProps {
  title?: string;
  onCreate?: (() => void) | false;
  showSearch?: boolean;
  showFilter?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  filterConfig?: FilterConfig[];
  initSelectedFilter?: string;
  onFilterChange?: (key: string, value: string) => void;
}
