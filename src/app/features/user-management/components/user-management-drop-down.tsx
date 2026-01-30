import UserManagementBanDialog from '@/app/features/user-management/components/user-management-ban-dialog';
import UserManagementEdit from '@/app/features/user-management/components/user-management-edit-dialog';
import type { UserManagementTableType } from '@/app/features/user-management/types/user-management.types';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
export const UserManagementDropDown = ({
  type,
  userId,
  handleEdit,
  handleViewDetail,
  handleBanned,
}: UserManagementTableType) => {
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
        <UserManagementEdit
          userId={userId}
          trigger={
            <DropdownMenu.Item
              onSelect={(e) => {
                e.preventDefault();
                handleEdit(userId);
              }}
            >
              {' '}
              Edit User{' '}
            </DropdownMenu.Item>
          }
        />

        <DropdownMenu.Item>
          <Link
            to={`view-detail/${userId}`}
            onClick={() => handleViewDetail(userId)}
          >
            View Details
          </Link>
        </DropdownMenu.Item>

        <UserManagementBanDialog
          trigger={
            <DropdownMenu.Item
              onSelect={(e) => {
                e.preventDefault();
                handleBanned(userId);
              }}
            >
              {' '}
              Ban User{' '}
            </DropdownMenu.Item>
          }
        />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
