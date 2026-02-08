import ConfirmationModal from '@/components/ui/confirm-modal';
import { useToast } from '@/components/ui/toast-provider';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { deleteProjectIdea } from '../services/project-idea.service';
import type {
  ProjectIdeaDeleteResponseType,
  ProjectIdeaDropDownPropsType,
} from '../types/project-idea.types';
import ProjectIdeaDetailDialog from './project-idea-detail-dialog';
import ProjectIdeaEditDialog from './project-idea-edit-dialog';
import ProjectIdeaStatusDialog from './project-idea-status-dialog';

export const ProjectIdeaDropDown = ({
  type,
  data,
}: ProjectIdeaDropDownPropsType) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // DELETE
  const { mutate: deleteMutate } = useMutation<
    ProjectIdeaDeleteResponseType,
    AxiosError<{ message: string }>,
    { id: number }
  >({
    mutationFn: ({ id }: { id: number }) => deleteProjectIdea(id),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['project-idea'] });
      addToast(success.message, 'success');
      setDeleteOpen(false);
    },
    onError: (error) => {
      setDeleteOpen(true);
      addToast(error.message, 'error');
    },
  });

  const handleDelete = (id: number) => deleteMutate({ id });

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
              <Ellipsis size={25} />
            ) : (
              <EllipsisVertical size={25} />
            )}
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content color="gray" variant="soft">
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              setEditDialogOpen(true);
            }}
          >
            Edit Idea
          </DropdownMenu.Item>

          <ProjectIdeaDetailDialog
            trigger={
              <DropdownMenu.Item
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                View Details
              </DropdownMenu.Item>
            }
            data={data}
          />

          <DropdownMenu.Item onClick={() => setDeleteOpen(true)}>
            Delete Idea
          </DropdownMenu.Item>

          <ProjectIdeaStatusDialog
            trigger={
              <DropdownMenu.Item
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                Change Status
              </DropdownMenu.Item>
            }
            data={data}
          />

          <DropdownMenu.Item asChild>
            <NavLink to="/admin/idea-management/portfolio/import">
              Import Portfolio
            </NavLink>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <ConfirmationModal
        isOpen={deleteOpen}
        title="Delete Project Idea?"
        subtitle="Are you sure you want to delete this (project idea)? This action cannot be undone."
        rejectText="Cancel"
        confirmText="Delete"
        onCancel={() => setDeleteOpen(false)}
        onConfirm={() => handleDelete(data.projectIdeaId)}
      />

      <ProjectIdeaEditDialog
        data={data}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
};
