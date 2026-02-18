import UserProjectIdeaDeleteDialog from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea-delete-dialog';
import PorjectIdeaViewDetailDialog from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea-detail-dialog';
import ProjectIdeaEditDialog from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea-edit-dialog';
import UserProjectIdeaStatusChangeDialog from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea-status-change-dialog';
import { useDeleteProjectIdea } from '@/app/features/user-management/hook/use-project-idea';
import type { IdeaType } from '@/app/features/user-management/types/project-idea-type';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
export const ProjectIdeaDropDown = ({
  projectIdeas,
}: {
  projectIdeas: IdeaType;
}) => {
  const [viewDetailOpen, setViewDetailOpend] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [statusChangeOpen, setStatusChangeOpen] = useState(false);

  const { mutate: deleteMutate } = useDeleteProjectIdea();

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
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              setViewDetailOpend(true);
            }}
          >
            View Detail
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              setEditDialogOpen(true);
            }}
          >
            Edit Idea
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              setDeleteOpen(true);
            }}
          >
            Delete Idea
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              setStatusChangeOpen(true);
            }}
          >
            Change Status
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            Import Portfolio
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <PorjectIdeaViewDetailDialog
        viewDetailOpen={viewDetailOpen}
        setViewDetailOpend={setViewDetailOpend}
      />

      <ProjectIdeaEditDialog
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
      />

      <UserProjectIdeaDeleteDialog
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        deleteMutate={deleteMutate}
        projectIdeaId={projectIdeas.projectIdeaId}
      />

      <UserProjectIdeaStatusChangeDialog
        statusChangeOpen={statusChangeOpen}
        setStatusChangeOpen={setStatusChangeOpen}
      />
    </>
  );
};
