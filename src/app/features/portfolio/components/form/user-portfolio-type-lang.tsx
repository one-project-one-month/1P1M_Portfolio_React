import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input-field';
import type { DropdownItem } from '@/types/portfolio-management';
import { Plus, Trash2 } from 'lucide-react';
import {
  Controller,
  type FieldArrayWithId,
  type UseFormReturn,
} from 'react-hook-form';
import TypeDropdown from '../../../portfolio-management/components/type-dropdown';
import type { PortfolioFormValues } from '../../../portfolio-management/portfolio-schema';

export interface TechnologyEntry {
  projectType: DropdownItem | null;
  languages: string;
}

interface PortfolioTypeLangProps {
  form: UseFormReturn<PortfolioFormValues>;
  technologyFields: FieldArrayWithId<
    PortfolioFormValues,
    'technologies',
    'id'
  >[];
  onAddTechnology: () => void;
  onRemoveTechnology: (index: number) => void;
  onUpdateTechnology: (
    index: number,
    field: keyof TechnologyEntry,
    value: unknown,
  ) => void;
}

export const UserPortfolioTypeLang = ({
  form,
  technologyFields,
  onAddTechnology,
  onRemoveTechnology,
}: PortfolioTypeLangProps) => {
  return (
    <div className="space-y-6 text-white mt-4 flex-1">
      <span className="font-medium text-white">Type and Languages</span>

      <div className="space-y-2 mt-2">
        {technologyFields.map((field, index) => (
          <div key={field.id} className="flex gap-6 flex-wrap items-start">
            <div className="space-y-1 w-55">
              <Controller
                control={form.control}
                name={`technologies.${index}.projectType`}
                render={({ field: controllerField }) => (
                  <TypeDropdown
                    placeholder="Choose Dev Type"
                    menuList={[
                      { id: 1, name: 'Frontend Developers' },
                      { id: 2, name: 'Backend Developers' },
                      { id: 3, name: 'Fullstack Developers' },
                      { id: 4, name: 'UI/UX Designers' },
                      { id: 5, name: 'Mobile Developers' },
                      { id: 6, name: 'Machine Learning' },
                      { id: 7, name: 'DevOps' },
                      { id: 8, name: 'Game Developer' },
                      { id: 9, name: 'Others' },
                    ]}
                    selectedValue={controllerField.value}
                    onChange={(value: DropdownItem | null) => {
                      controllerField.onChange(value ?? '');
                    }}
                  />
                )}
              />
            </div>
            <div className="flex-1 space-y-1 min-w-50 flex gap-2">
              <div className="flex-1 flex gap-2">
                <Controller
                  control={form.control}
                  name={`technologies.${index}.languages`}
                  render={({ field: controllerField }) => (
                    <InputField
                      value={controllerField.value ?? ''}
                      onChange={(e) => {
                        const value = e.target.value;
                        controllerField.onChange(value);
                      }}
                      className="w-full sm:placeholder:text-base"
                      placeholder="Enter your languages or tools"
                    />
                  )}
                />
                {technologyFields.length > 1 && (
                  <button
                    onClick={() => onRemoveTechnology(index)}
                    className="p-2 text-[#EF4444] hover:bg-[#EF4444]/10 rounded-md transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <Button variant={'primary'} onClick={onAddTechnology} className="gap-2">
        <Plus size={18} />
        Add
      </Button>
    </div>
  );
};
