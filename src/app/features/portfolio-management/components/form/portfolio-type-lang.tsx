import { Button } from '@/components/ui/button';
import { Plus, Save, Trash2 } from 'lucide-react';
import {
  Controller,
  type FieldArrayWithId,
  type UseFormReturn,
} from 'react-hook-form';
import type { PortfolioFormValues } from '../../portfolio-schema';

export interface TechnologyEntry {
  projectType: string;
  languages: string;
}

interface PortfolioTypeLangProps {
  form: UseFormReturn<PortfolioFormValues>;
  technologyFields: FieldArrayWithId<
    PortfolioFormValues,
    'technologies',
    'id'
  >[];
  onAddNewRow: () => void;
  onSaveTechnologies: () => void;
  onRemoveTechnology: (index: number) => void;
  isReadOnly: boolean;
  isEdit: boolean;
}

export const PortfolioTypeLang = ({
  form,
  technologyFields,
  onAddNewRow,
  onSaveTechnologies,
  onRemoveTechnology,
  isReadOnly,
  isEdit,
}: PortfolioTypeLangProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#F9FAFB] text-sm font-medium">
        Type and Languages
      </label>

      <div className="flex flex-col gap-3">
        {technologyFields.map((field, index) => (
          <div key={field.id} className="flex gap-3 flex-wrap items-center">
            {isReadOnly ? (
              <>
                <span className="px-4 py-2 bg-[#9C39FC] rounded-md text-white text-xs font-medium">
                  {form.watch(`technologies.${index}.projectType`) || 'Type'}
                </span>
                <div className="flex-1 min-w-[200px] h-10 px-3 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal flex items-center">
                  {form.watch(`technologies.${index}.languages`) || '-'}
                </div>
              </>
            ) : (
              <>
                <Controller
                  control={form.control}
                  name={`technologies.${index}.projectType`}
                  render={({ field: controllerField }) => (
                    <input
                      type="text"
                      value={controllerField.value || ''}
                      onChange={(e) => controllerField.onChange(e.target.value)}
                      placeholder="Type (e.g., Fullstack)"
                      className="px-4 py-2 bg-[#9C39FC] rounded-md text-white text-xs font-medium w-[180px] focus:outline-none focus:ring-2 focus:ring-[#9C39FC] placeholder:text-white/70"
                    />
                  )}
                />
                <Controller
                  control={form.control}
                  name={`technologies.${index}.languages`}
                  render={({ field: controllerField }) => (
                    <input
                      type="text"
                      value={controllerField.value}
                      onChange={(e) => controllerField.onChange(e.target.value)}
                      placeholder="Enter your languages or tools"
                      className="flex-1 min-w-[200px] h-10 px-3 bg-white/[0.09] border border-white/15 rounded-md text-[#F3F4F6] text-sm font-normal focus:outline-none focus:ring-2 focus:ring-[#9C39FC]"
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
              </>
            )}
          </div>
        ))}
      </div>

      {!isReadOnly && (
        <div className="flex gap-3 mt-3">
          <Button
            variant="primary"
            onClick={onAddNewRow}
            className="gap-2 w-fit"
          >
            <Plus size={18} />
            {isEdit ? 'Add Row' : 'Add'}
          </Button>

          {isEdit && (
            <Button
              variant="primary"
              onClick={onSaveTechnologies}
              className="gap-2 w-fit bg-[#9C39FC] hover:bg-[#9C39FC]"
            >
              <Save size={18} />
              Save
            </Button>
          )}
        </div>
      )}
    </div>
  );
};
