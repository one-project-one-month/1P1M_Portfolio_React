import * as Accordion from '@radix-ui/react-accordion';
import { ChevronLeft } from 'lucide-react';
import React from 'react';

type ConfigAccordionProps = {
  fieldId: number;
  trigger: React.ReactNode;
  config: React.ReactNode;
};

const ConfigAccordion = ({
  fieldId,
  trigger,
  config,
}: ConfigAccordionProps) => {
  return (
    <Accordion.Root
      className="AccordionRoot flex flex-col gap-4"
      type="single"
      defaultValue="item-1"
      collapsible
    >
      <Accordion.Item className="AccordionItem" value={`item-${fieldId}`}>
        <Accordion.Header>
          <div className="group flex w-full items-center gap-10">
            {trigger}
            <Accordion.Trigger asChild>
              <button className="group p-1" aria-label="Toggle section">
                <ChevronLeft className="text-white transition-transform duration-200 group-data-[state=open]:-rotate-90" />
              </button>
            </Accordion.Trigger>
          </div>
        </Accordion.Header>

        <Accordion.Content className="w-full">
          <div className="group flex w-full items-center gap-19">
            <div className="flex-1">{config}</div>
            <div className="flex-none w-9"></div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};

export default ConfigAccordion;
