import UserManagementBanDialog from '@/app/features/user-management/components/user-management-ban-dialog';
import { default as UserManagementEditDialog } from '@/app/features/user-management/components/user-management-edit-dialog';
import UserManagementRestoreDialog from '@/app/features/user-management/components/user-management-restore-dialog';
import {
  useBanUser,
  useRestoreUser,
} from '@/app/features/user-management/hook/use-user-management';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { Ellipsis } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { UserManagementType } from '../types/user-management.types';

export const UserManagementDropDown = ({
  data,
}: {
  data: UserManagementType;
}) => {
  const [banOpen, setBanOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [restoreOpen, setRestoreOpen] = useState(false);

  // Ban
  // const { mutate: banMutate } = useMutation<
  //   UserBanResponseType,
  //   AxiosError<{ message: string }>,
  //   { userId: number; desc: string }
  // >({
  //   mutationFn: ({ userId, desc }) => banUserService(userId, desc),
  //   // onSuccess: (success) => {
  //   //   queryClient.invalidateQueries({ queryKey: ['user-management'] });
  //   //   addToast(success.message, 'success');
  //   //   setBanOpen(false);
  //   // },
  //   // onError: (error) => {
  //   //   setBanOpen(true);
  //   //   addToast(error.message, 'error');
  //   // },
  // });

  const { mutate: banMutate } = useBanUser();
  const { mutate: restoreMutate } = useRestoreUser();

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
            <Link to={`view-details/${data.userId}`}>View Details</Link>
          </DropdownMenu.Item>

          {data.status === 'Banned' ? (
            <UserManagementRestoreDialog
              trigger={
                <DropdownMenu.Item
                  onSelect={(e) => {
                    e.preventDefault();
                  }}
                >
                  Restore User
                </DropdownMenu.Item>
              }
              restoreOpen={restoreOpen}
              setRestoreOpen={(value) => setRestoreOpen(value)}
              restoreMutate={restoreMutate}
              userId={data.userId}
            />
          ) : (
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
              userId={data.userId}
            />
          )}
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
