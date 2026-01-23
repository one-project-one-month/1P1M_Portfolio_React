import ConfirmationModal from '@/components/ui/confirm-modal';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type {
  IdeaEditFormValues,
  ProjectIdeaTableType,
} from '../types/project-idea.types';
import ProjectIdeaDetailDialog from './project-idea-detail-dialog';
import ProjectIdeaEditDialog from './project-idea-edit-dialog';
import ProjectIdeaStatusDialog from './project-idea-status-dialog';

const MOCK_EDIT_VALUES: IdeaEditFormValues = {
  id: 1,
  projectName: 'Smart Order & Booking Management System',
  description:
    'A web-based system that allows customers to book tables and place food orders online...',
  projectTypes: ['website', 'mobile'],
  dev_id: 1,
  status: 'APPROVED',
};

export const ProjectIdeaDropDown = ({
  type,
  // data,
  handleViewDetail,
  handleStatusChange,
}: ProjectIdeaTableType) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleEdit = (id: number) => {
    console.log(id);
    setEditOpen(false);
  };

  // const handleDelete = (id: number) => {
  //   console.log(id);
  // setDeleteOpen(false)
  // };

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
            {type === 'list' ? (
              <Ellipsis className="w-5 h-5 md:w-6 md:h-6" />
            ) : (
              <EllipsisVertical className="w-5 h-5 md:w-6 md:h-6" />
            )}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content color="gray" variant="soft">
          <DropdownMenu.Item onClick={() => setEditOpen(true)}>
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

          <DropdownMenu.Item onClick={() => setDeleteOpen(true)}>
            Delete Idea
          </DropdownMenu.Item>

          <ProjectIdeaStatusDialog
            devId={1}
            trigger={
              <DropdownMenu.Item
                onSelect={(e) => {
                  e.preventDefault();
                  handleStatusChange('APPROVED');
                }}
              >
                Change Status
              </DropdownMenu.Item>
            }
          />

          <DropdownMenu.Item asChild>
            <NavLink to="/admin/idea-management/portfolio/import">
              Import Portfolio
            </NavLink>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <ProjectIdeaEditDialog
        isOpen={editOpen}
        onClose={() => setEditOpen(false)}
        initialValues={MOCK_EDIT_VALUES}
        onSubmit={() => handleEdit(1)}
      />

      <ConfirmationModal
        isOpen={deleteOpen}
        title="Delete Project Idea?"
        subtitle="Are you sure you want to delete this (project idea)? This action cannot be undone"
        rejectText="Cancel"
        confirmText="Delete"
        onCancel={() => {
          setDeleteOpen(false);
        }}
        onConfirm={() => {
          console.log('Deleting idea:');
          setDeleteOpen(false);
        }}
      />
    </>
  );
};
