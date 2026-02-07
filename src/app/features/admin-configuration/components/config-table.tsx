import { Button, Flex } from '@radix-ui/themes';
import { PlusCircle } from 'lucide-react';
import { useState } from 'react';
import { fieldConfig } from '../data';
import ConfigAccordion from './config-accordion';
import { EditableCell } from './editable-cell';
import OptionRow from './option-row';
import ConfigStatusDropdown from './status-dropdown';

const titles = ['Type', 'Field Label', 'Order No.', 'Status', 'Action'];

export type ConfigOption = {
  id: string;
  label: string;
  order: number;
  status: boolean;
  isNew?: boolean;
};

export type FieldConfig = {
  id: string;
  title: string;
  order: number;
  status: boolean;
  options: ConfigOption[];
};

const ConfigurationTable = () => {
  const [data, setData] = useState(fieldConfig);
  const [showOptionRow, setShowOptionRow] = useState(false);
  const [currentOption, setCurrentOption] = useState<ConfigOption | null>(null);

  const onLabelChange = (fieldId: string, value: string) => {
    setData((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, label: value } : field,
      ),
    );
  };

  console.log(data);

  const onStatusChange = (fieldId: string, value: boolean) => {
    setData((prev) =>
      prev.map((field) =>
        field.id === fieldId ? { ...field, status: value } : field,
      ),
    );
  };

  const onConfigSave = (updatedData: ConfigOption) => {
    setData((prev) =>
      prev.map((field) =>
        field.id === updatedData.id
          ? {
              ...field,
              options: field.options.some((opt) => opt.id === updatedData.id)
                ? field.options.map((opt) =>
                    opt.id === updatedData.id ? updatedData : opt,
                  )
                : [...field.options, updatedData],
            }
          : field,
      ),
    );
    setShowOptionRow(false);
  };

  const onConfigDelete = (fieldId: string, optionId: string) => {
    setData((prev) =>
      prev.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options.filter((opt) => opt.id !== optionId),
            }
          : field,
      ),
    );
  };

  return (
    <Flex direction="column" gap="4" className="mt-10">
      <div className="border bg-[#0F172B] border-[#FFFFFF1A] p-3 rounded-md">
        <div className="grid grid-cols-[2fr_3.8fr_1.4fr_2.2fr_1fr_0.7fr] gap-5 items-center text-sm text-white">
          {titles.map((title) => (
            <span>{title}</span>
          ))}
        </div>
      </div>
      {data.map((field) => (
        <ConfigAccordion
          key={field.id}
          trigger={
            <div className="grid grid-cols-[1.86fr_2.79fr_1.84fr_1.9fr_1fr] gap-5 items-center text-sm text-white p-3">
              <span>Dropdown Title</span>
              <EditableCell
                value={field.label}
                onChange={(value) => onLabelChange(field.id, value)}
              />
              <div className="flex justify-center">-</div>
              <ConfigStatusDropdown
                value={field.status}
                onStatusChange={(value) => onStatusChange(field.id, value)}
              />
              <Button
                variant="ghost"
                onClick={() => {
                  setShowOptionRow(true);
                  setCurrentOption(field);
                }}
              >
                <PlusCircle color="#9C39FC" size="20" />{' '}
                <span className="text-[#9C39FC] font-semibold">New Option</span>
              </Button>
            </div>
          }
          config={
            <>
              {field.options
                .sort((a, b) => a.order - b.order)
                .map((opt) => (
                  <OptionRow
                    key={opt.id}
                    optionData={opt}
                    onSave={onConfigSave}
                    onDelete={(optionId) => onConfigDelete(field.id, optionId)}
                  />
                ))}
              {showOptionRow && currentOption?.id === field.id && (
                <OptionRow
                  optionData={{ ...currentOption, isNew: true }}
                  onSave={onConfigSave}
                  onDelete={(optionId) => onConfigDelete(field.id, optionId)}
                />
              )}
            </>
          }
        ></ConfigAccordion>
      ))}
    </Flex>
  );
};

export default ConfigurationTable;
