import { Button, Select } from '@radix-ui/themes';
import { useState } from 'react';

const optionList = [
  'ProjectPortfolioCreateScreenForm',
  'ProjectIdeaListScreenForm',
  'CreateProjectIdeaScreenForm',
  'UpdateProjectIdeaScreenForm',
  'ProjectPortfolioListScreenForm',
  'ChangeProjectPortfolioStatusScreenForm',
  'TimelineListScreenForm',
  'OpomRegisterPeopleListScreenForm',
  'SetUpProfileCreateScreenForm',
  'UpdateUserInfoScreenForm',
  'OpomRegisterScreenForm',
  'DevProfileListScreenForm',
];

interface ConfigFilterProps {
  searching: boolean;
  onSearch: (value: string) => void;
}

const ConfigFilter = ({ searching, onSearch }: ConfigFilterProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);

  const handleSearch = () => {
    if (!value) return;
    onSearch(value);
  };

  return (
    <div className="mt-8 flex gap-3 custom-select-container">
      <Select.Root value={value} onValueChange={setValue}>
        <Select.Trigger
          id="status"
          radius="large"
          className="text-white! h-10! w-100! bg-[#FFFFFF17]!"
          placeholder="Select Page Screen Name"
        />
        <Select.Content position="popper">
          {optionList.map((option, index) => (
            <Select.Item key={index} value={option}>
              {option}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
      <Button size="3" onClick={handleSearch}>
        {searching ? 'Searching...' : 'Search'}
      </Button>
    </div>
  );
};

export default ConfigFilter;
