import { Button, DropdownMenu } from '@radix-ui/themes';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
import type { IdeaManagementTableProps } from '../types/idea-management.types';
import ProjectIdeaDetailDialog from './project-idea-detail-dialog';

export const ProjectIdeaDropDown = ({
  type,
  // data,
  handleEdit,
  handleViewDetail,
  handleDelete,
  handleStatusChange,
  handleImportPortfolio,
}: IdeaManagementTableProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="ghost"
          style={{
            color: 'white',
            cursor: 'pointer',
          }}
        >
          {type === 'list' ? (
            <Ellipsis className="w-5 h-5 md:w-6 md:h-6" />
          ) : (
            <EllipsisVertical className="w-5 h-5 md:w-6 md:h-6" />
          )}
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content color="gray" variant="soft">
        <DropdownMenu.Item onClick={() => handleEdit(1)}>
          Edit Idea
        </DropdownMenu.Item>
        <ProjectIdeaDetailDialog
          trigger={
            <DropdownMenu.Item
              onSelect={(e) => {
                e.preventDefault();
                handleViewDetail(1);
              }}
            >
              View Details
            </DropdownMenu.Item>
          }
        />
        <DropdownMenu.Item onClick={() => handleDelete(1)}>
          Delete Idea
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => handleStatusChange('APPROVED')}>
          Change Status
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={() => handleImportPortfolio(1)}>
          Import Portfolio
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
