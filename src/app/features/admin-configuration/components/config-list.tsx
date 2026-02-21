import type {
  ConfigOption,
  ConfigRequest,
  FieldConfig,
} from '@/types/config.type';
import { Button, Flex } from '@radix-ui/themes';
import { PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import ConfigAccordion from './config-accordion';
import OptionRow from './option-row';

const titles = ['Type', 'Field Label', 'Order No.', 'Status', 'Action'];

interface ConfigListProps {
  configData: FieldConfig[];
  createOption: (constantValue: string, data: ConfigRequest) => void;
  updateOption: (id: number, data: ConfigRequest) => void;
  deleteOption: (id: number) => void;
}

const ConfigurationList = ({
  configData,
  createOption,
  updateOption,
  deleteOption,
}: ConfigListProps) => {
  const [data, setData] = useState<FieldConfig[]>(configData);
  const [showOptionRow, setShowOptionRow] = useState(false);
  const [currentDropdown, setCurrentDropdown] = useState<{
    headerConstantVaue: string;
    id: number;
    name: string;
    active?: boolean;
    orderNo?: number;
  }>();

  useEffect(() => {
    setData(configData);
  }, [configData]);

  const addNewOption = (item: FieldConfig) => {
    setShowOptionRow(true);
    const newId =
      item.details.length > 0
        ? Math.max(...item.details.map((d) => d.id)) + 1
        : 1;
    setCurrentDropdown({
      headerConstantVaue: item.header.constantValue,
      id: newId,
      name: '',
      orderNo: item.details.length + 1,
      active: false,
    });
  };

  const onConfigSave = (updatedData: ConfigOption) => {
    const payload = {
      name: updatedData.name,
      active: updatedData.active,
      orderNo: updatedData.orderNo,
    };
    if (updatedData.isNew) {
      createOption(updatedData?.headerConstantVaue || '', payload);
    } else {
      updateOption(updatedData.id, payload);
    }
    setShowOptionRow(false);
  };

  const onConfigDelete = (optionId: number) => {
    deleteOption(optionId);
  };

  return (
    <Flex direction="column" gap="4" className="mt-8">
      <div className="border bg-[#0F172B] border-[#FFFFFF1A] p-3 rounded-md">
        <div className="grid grid-cols-[2fr_3.8fr_1.4fr_2.2fr_1fr_0.7fr] gap-5 items-center text-sm text-white">
          {titles.map((title) => (
            <span>{title}</span>
          ))}
        </div>
      </div>
      {data.map((item) => (
        <ConfigAccordion
          key={item.header.id}
          fieldId={item.header.id}
          trigger={
            <div className="grid grid-cols-[1.8fr_2.7fr_1.84fr_1.9fr_1fr] gap-5 items-center text-sm text-white p-3">
              <span>Dropdown Title</span>
              <p className="font-bold">{item.header.name}</p>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <Button variant="ghost" onClick={() => addNewOption(item)}>
                <PlusCircle color="#9C39FC" size="20" />{' '}
                <span className="text-[#9C39FC] font-semibold">New Option</span>
              </Button>
            </div>
          }
          config={
            <>
              {[...item.details]
                .sort((a, b) => a.orderNo - b.orderNo)
                .map((opt, index) => (
                  <OptionRow
                    key={opt.id}
                    optionIndex={index + 1}
                    optionData={{
                      headerConstantVaue: item.header.constantValue,
                      ...opt,
                    }}
                    onSave={onConfigSave}
                    onDelete={(optionId) => onConfigDelete(optionId)}
                  />
                ))}
              {showOptionRow &&
                currentDropdown?.headerConstantVaue ===
                  item.header.constantValue && (
                  <OptionRow
                    optionIndex={item.details.length + 1}
                    optionData={{
                      headerConstantVaue: currentDropdown.headerConstantVaue,
                      orderNo: currentDropdown.orderNo,
                      isNew: true,
                    }}
                    onSave={onConfigSave}
                    onDelete={(optionId) => onConfigDelete(optionId)}
                  />
                )}
            </>
          }
        ></ConfigAccordion>
      ))}
    </Flex>
  );
};

export default ConfigurationList;
