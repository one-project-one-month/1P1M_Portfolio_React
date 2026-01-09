export interface DropdownProps {
  placeholder: string;
  menuList: MenuItem[];
  className?: string;
  onChange?: (item: MenuItem) => void;
  selectedValue?: MenuItem | null;
}




export interface MenuItem {
  id: string | number;
  name: string;
}
