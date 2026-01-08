import type { ChangeEvent } from "react";


export interface TitleProps {
  title?: string;
  onCreate?: (() => void) | false; 
  showSearch?: boolean;
  showFilter?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  filterOptions?: string[];
  initSelectedFilter?: string;
  onFilterChange?: (option: string) => void;
}