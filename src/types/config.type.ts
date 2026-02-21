export type Header = {
  id: number;
  name: string;
  constantValue: string;
};

export type FieldConfig = {
  header: Header;
  details: ConfigOption[];
};

export type ConfigOption = {
  headerConstantVaue?: string;
  id: number;
  name: string;
  orderNo: number;
  active: boolean;
  isNew?: boolean;
};

export type ConfigRequest = {
  name: string;
  active: boolean;
  orderNo: number;
};
