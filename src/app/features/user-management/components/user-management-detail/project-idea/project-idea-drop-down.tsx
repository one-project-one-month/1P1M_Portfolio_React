import UserProjectIdeaDeleteDialog from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea-delete-dialog';
import PorjectIdeaViewDetailDialog from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea-detail-dialog';
import ProjectIdeaEditDialog from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea-edit-dialog';
import UserProjectIdeaStatusChangeDialog from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea-status-change-dialog';
import {
  useDeleteProjectIdea,
  useEditProjectIdea,
  useProjectIdeaStatusChage,
} from '@/app/features/user-management/hook/use-project-idea';
import type { IdeaType } from '@/app/features/user-management/types/project-idea-type';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
export const ProjectIdeaDropDown = ({
  projectIdea,
}: {
  projectIdea: IdeaType;
}) => {
  const [viewDetailOpen, setViewDetailOpend] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [statusChangeOpen, setStatusChangeOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { mutate: editMutate } = useEditProjectIdea();
  const { mutate: deleteMutate } = useDeleteProjectIdea();
  const { mutate: statusChageMutate } = useProjectIdeaStatusChage();

  const handleItemClick = (callback: () => void) => {
    setDropdownOpen(false);
    callback();
  };

  return (
    <>
      <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
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
              handleItemClick(() => setViewDetailOpend(true));
            }}
          >
            View Detail
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              handleItemClick(() => setEditDialogOpen(true));
            }}
          >
            Edit Idea
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              handleItemClick(() => setDeleteOpen(true));
              setDeleteOpen(true);
            }}
          >
            Delete Idea
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              handleItemClick(() => setStatusChangeOpen(true));
            }}
          >
            Change Status
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            <Link to="/admin/portfolio-management/create-portfolio">
              Import Portfolio
            </Link>
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
        editMutate={editMutate}
        projectIdea={projectIdea}
      />

      <UserProjectIdeaDeleteDialog
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        deleteMutate={deleteMutate}
        projectIdeaId={projectIdea.projectIdeaId}
      />

      <UserProjectIdeaStatusChangeDialog
        statusChangeOpen={statusChangeOpen}
        setStatusChangeOpen={setStatusChangeOpen}
        statusChageMutate={statusChageMutate}
        projectIdeaId={projectIdea.projectIdeaId}
      />
    </>
  );
};
