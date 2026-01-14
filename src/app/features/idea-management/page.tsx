import { ChevronDown, LayoutGrid, List } from 'lucide-react';
import IdeaCard from './components/IdeaCard';

const IdeaManagement = () => {
  return (
    <div>
      {/* Total and filter by status */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div className="w-1/2">
            <span className="text-[#FFBA00] font-semibold">Total -</span>{' '}
            <span className="text-[#FFBA00]">200</span>
          </div>

          {/* List, grid and filter */}
          <div className="w-1/2 flex items-center justify-end gap-6">
            <button type="button" className="text-muted hover:text-[#6F28B3]">
              <List />
            </button>
            <button type="button" className="text-muted hover:text-[#6F28B3]">
              <LayoutGrid />
            </button>

            <button
              type="button"
              className="text-white hover:text-[#6F28B3] border border-[#6F28B3] px-4 py-2 rounded-md flex items-center justify-center gap-1"
            >
              Filter by Status <ChevronDown className="text-[#6F28B3]" />
            </button>
          </div>
        </div>
      </section>

      {/* Idea cards */}
      <section>
        <div className="grid grid-cols-3 auto-rows-fr gap-y-4 gap-x-6">
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
        </div>
      </section>
    </div>
  );
};

export default IdeaManagement;
