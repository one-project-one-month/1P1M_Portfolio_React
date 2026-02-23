import { Button } from '@/components/ui/button';
import InputField from '@/components/ui/input-field';
import type { DropdownItem } from '@/types/portfolio-management';
import { Plus, Trash2 } from 'lucide-react';
import {
  Controller,
  type FieldArrayWithId,
  type UseFormReturn,
} from 'react-hook-form';
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
  onSaveTechnologies: () => void;
  onRemoveTechnology: (index: number) => void;
  onAddNewRow: () => void;
  isReadOnly: boolean;
  isEdit: boolean;
}

export const UserPortfolioTypeLang = ({
  form,
  technologyFields,
  onRemoveTechnology,
  onAddNewRow,
  isReadOnly,
  isEdit,
}: PortfolioTypeLangProps) => {
  return (
    <div className="space-y-6 text-white flex-1">
      <span className="text-[15px]">Type and Languages</span>

      <div className="space-y-2 mt-2">
        {technologyFields.map((field, index) => (
          <div key={field.id} className="flex gap-6 flex-wrap items-start">
            {isReadOnly ? (
              <>
                <span className="px-8 py-3 w-30 bg-[#9C39FC] rounded-md text-white text-xs font-medium">
                  {form.watch(`technologies.${index}.projectType`) || 'Type'}
                </span>
                <div className="flex-1 h-10 px-3 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal flex items-center">
                  {form.watch(`technologies.${index}.languages`) || '-'}
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1 w-full md:w-55">
                  <Controller
                    control={form.control}
                    name={`technologies.${index}.projectType`}
                    render={({ field: controllerField }) => (
                      <InputField
                        value={controllerField.value ?? ''}
                        onChange={(e) =>
                          controllerField.onChange(e.target.value)
                        }
                        placeholder="Type (e.g., Fullstack)"
                        className="px-4 py-2 h-10! bg-[#9C39FC]! rounded-md text-white font-medium w-full focus:outline-none focus:ring-2 focus:ring-[#9C39FC] placeholder:text-white/70"
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
                          onChange={(e) =>
                            controllerField.onChange(e.target.value)
                          }
                          className="w-full sm:placeholder:text-sm h-10!"
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
              </>
            )}
          </div>
        ))}
      </div>
      {!isReadOnly && (
        <div className="flex gap-3 mt-3 text-sm">
          <Button
            variant="primary"
            onClick={onAddNewRow}
            className={`gap-2 h-10 ${isEdit ? 'w-fit' : 'w-full'}`}
          >
            {isEdit ? 'Add Row' : 'Add'}
            <Plus size={15} />
          </Button>
        </div>
      )}
    </div>
  );
};
