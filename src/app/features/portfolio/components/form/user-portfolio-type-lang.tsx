import { Button } from '@/components/ui/button';
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
  isReadOnly: boolean;
}

export const UserPortfolioTypeLang = ({
  form,
  technologyFields,
  onAddTechnology,
  onRemoveTechnology,
  onUpdateTechnology,
  isReadOnly,
}: PortfolioTypeLangProps) => {
  return (
    <div className="space-y-6 text-white mt-4 flex-1">
      <span className="font-medium text-white">Type and Languages</span>

      <div className="space-y-2 mt-2">
        {technologyFields.map((field, index) => (
          <div key={field.id} className="flex gap-6 flex-wrap items-start">
            <div className="space-y-1 w-[200px]">
              {isReadOnly ? (
                <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
                  {form.watch(`technologies.${index}.projectType`)?.name || '-'}
                </p>
              ) : (
                <Controller
                  control={form.control}
                  name={`technologies.${index}.projectType`}
                  render={({ field: controllerField }) => (
                    <TypeDropdown
                      placeholder="Type"
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
                        controllerField.onChange(value);
                        onUpdateTechnology(index, 'projectType', value);
                      }}
                    />
                  )}
                />
              )}
            </div>
            <div className="flex-1 space-y-1 min-w-[200px] flex gap-2">
              {isReadOnly ? (
                <p className="flex-1 px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
                  {form.watch(`technologies.${index}.languages`) || '-'}
                </p>
              ) : (
                <div className="flex-1 flex gap-2">
                  <Controller
                    control={form.control}
                    name={`technologies.${index}.languages`}
                    render={({ field: controllerField }) => (
                      <input
                        type="text"
                        value={controllerField.value}
                        onChange={(e) => {
                          controllerField.onChange(e.target.value);
                          onUpdateTechnology(
                            index,
                            'languages',
                            e.target.value,
                          );
                        }}
                        placeholder="Enter your languages or tools"
                        className="w-full px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white placeholder:text-[#6A7282] focus:outline-none focus:border-[#9C39FC]"
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
              )}
            </div>
          </div>
        ))}
      </div>

      {!isReadOnly && (
        <Button variant={'primary'} onClick={onAddTechnology} className="gap-2">
          <Plus size={18} />
          Add
        </Button>
      )}
    </div>
  );
};
