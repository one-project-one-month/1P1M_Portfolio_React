import UserManagementBanDialog from '@/app/features/user-management/components/user-management-ban-dialog';
import { default as UserManagementEditDialog } from '@/app/features/user-management/components/user-management-edit-dialog';
import { useToast } from '@/components/ui/toast-provider';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { banUserService } from '../services/user-management.service';
import type {
  UserBanResponseType,
  UserManagementType,
} from '../types/user-management.types';

export const UserManagementDropDown = ({
  data,
}: {
  data: UserManagementType;
}) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();
  const [banOpen, setBanOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // Ban
  const { mutate: banMutate } = useMutation<
    UserBanResponseType,
    AxiosError<{ message: string }>,
    { id: number }
  >({
    mutationFn: ({ id }: { id: number }) => banUserService(id),
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ['user-management'] });
      addToast(success.message, 'success');
      setBanOpen(false);
    },
    onError: (error) => {
      setBanOpen(true);
      addToast(error.message, 'error');
    },
  });

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
            <Ellipsis className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content color="gray" variant="soft">
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              setEditDialogOpen(true);
            }}
          >
            Edit User
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Link to="/admin/register-user/view-detail">View Details</Link>
          </DropdownMenu.Item>

          <UserManagementBanDialog
            trigger={
              <DropdownMenu.Item
                onSelect={(e) => {
                  e.preventDefault();
                }}
              >
                Ban User
              </DropdownMenu.Item>
            }
            banOpen={banOpen}
            setBanOpen={(value) => setBanOpen(value)}
            banMutate={banMutate}
            userId={data.id}
          />
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <UserManagementEditDialog
        data={data}
        editDialogOpen={editDialogOpen}
        setEditDialogOpen={setEditDialogOpen}
      />
    </>
  );
};
