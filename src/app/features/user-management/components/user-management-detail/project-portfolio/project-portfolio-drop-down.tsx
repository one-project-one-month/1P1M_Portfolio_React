import { Button, DropdownMenu } from '@radix-ui/themes';
import { EllipsisVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectPortfolioDropDown = () => {
  return (
    <>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button
            variant="ghost"
            style={{
              color: 'white',
              cursor: 'pointer',
            }}
          >
            <EllipsisVertical
              className="w-5 h-5 md:w-6 md:h-6 "
              color="#D1D5DC"
            />
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content color="gray" variant="soft">
          <DropdownMenu.Item asChild>
            <Link to="">View Details</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            Edit Idea
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            Delete Idea
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            Change Status
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </>
  );
};
