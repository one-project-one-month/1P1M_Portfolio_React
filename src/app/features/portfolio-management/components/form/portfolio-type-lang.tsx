import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';
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
  onAddTechnology: () => void;
  onRemoveTechnology: (index: number) => void;

  isReadOnly: boolean;
}

export const PortfolioTypeLang = ({
  form,
  technologyFields,
  onAddTechnology,
  onRemoveTechnology,

  isReadOnly,
}: PortfolioTypeLangProps) => {
  return (
    <div className="space-y-6 text-white">
      <h2 className="text-lg font-medium text-white">Type and Languages</h2>

      <div className="space-y-4">
        {technologyFields.map((field, index) => (
          <div key={field.id} className="flex gap-6 flex-wrap items-start">
            <div className="space-y-1 w-[200px]">
              {isReadOnly ? (
                <p className="px-3 py-2 bg-[#1e293b] rounded-md text-white min-h-[40px]">
                  {form.watch(`technologies.${index}.projectType`) || '-'}
                </p>
              ) : (
                <Controller
                  control={form.control}
                  name={`technologies.${index}.projectType`}
                  render={({ field: controllerField }) => (
                    <input
                      type="text"
                      value={controllerField.value || ''}
                      onChange={(e) => {
                        controllerField.onChange(e.target.value);
                      }}
                      placeholder="Type (e.g., Language)"
                      className="w-full px-3 py-2 bg-[#0F172B] border border-[#FFFFFF]/15 rounded-md text-white placeholder:text-[#6A7282] focus:outline-none focus:border-[#9C39FC]"
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
