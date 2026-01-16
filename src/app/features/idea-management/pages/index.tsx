import { COLORS } from '@/constants/colors';
import { Select } from '@radix-ui/themes';
import { LayoutGrid, List } from 'lucide-react';
import IdeaCard from '../components/idea-card';
import Pagination from '../components/pagination';

const IdeaManagement = () => {
  const CURRENT_PAGE = 1;
  const TOTAL_PAGES = 10;
  const onPageChange = (number: number) =>
    console.log(`${number} page changed`);

  return (
    <div className="my-10">
      {/* Total and filter by status */}
      <section>
        <div className="flex items-center justify-between mb-6 py-2">
          <div className="w-1/2">
            <span className={`text-[${COLORS.secondary}] font-semibold`}>
              Total -
            </span>{' '}
            <span className={`text-[${COLORS.secondary}]`}>200</span>
          </div>

          <div className="w-1/2 flex items-center justify-end gap-8">
            <div className="flex items-center justify-start gap-6">
              <button
                type="button"
                className={`text-muted hover:text-[${COLORS.primary}]`}
              >
                <List />
              </button>
              <button
                type="button"
                className={`text-muted hover:text-[${COLORS.primary}]`}
              >
                <LayoutGrid />
              </button>
            </div>

            <Select.Root size="3" defaultValue="default">
              <Select.Trigger
                // placeholder="Filter by Status"
                variant="ghost"
                radius="large"
                style={{
                  border: `1px solid ${COLORS.primary}`,
                  color: 'white',
                }}
                onSelect={(e) => console.log(e.currentTarget)}
              />
              <Select.Content position="popper">
                {/* <Select.Item value="all">All</Select.Item> */}
                <Select.Item value="default" disabled>
                  Filter by Status
                </Select.Item>
                <Select.Item value="all">All</Select.Item>
                <Select.Item value="pending">Pending</Select.Item>
                <Select.Item value="approved">Approved</Select.Item>
                <Select.Item value="archived">Archived</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </div>
      </section>

      {/* Idea cards */}
      <section>
        <div className="grid grid-cols-3 auto-rows-fr gap-y-8 gap-x-12">
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
          <IdeaCard />
        </div>
      </section>

      <Pagination
        currentPage={CURRENT_PAGE}
        totalPages={TOTAL_PAGES}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default IdeaManagement;
