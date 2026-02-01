import UserManagementBanDialog from '@/app/features/user-management/components/user-management-ban-dialog';
import UserManagementEdit from '@/app/features/user-management/components/user-management-edit-dialog';
import UserManagementRestoreDialog from '@/app/features/user-management/components/user-management-restore-dialog';
import type { UserManagementTableType } from '@/app/features/user-management/types/user-management.types';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
export const UserManagementDropDown = ({
  type,
  userId,
  status,
  handleEdit,
  handleViewDetail,
  handleBanned,
  handleRestore,
}: UserManagementTableType) => {
  console.log(status);
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button
          variant="ghost"
          style={{
            color: '#444444',
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
      <DropdownMenu.Content
        style={{
          background: '#101828',
          border: '1px solid #52525C',
          color: '#F9FAFB',
        }}
        variant="soft"
      >
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

        {status?.toUpperCase() === 'ACTIVE' ? (
          <UserManagementBanDialog
            userId={userId}
            trigger={
              <DropdownMenu.Item
                onSelect={(e) => {
                  e.preventDefault();
                  handleBanned(userId);
                }}
              >
                Ban User
              </DropdownMenu.Item>
            }
          />
        ) : status === 'Banned' ? (
          <UserManagementRestoreDialog
            userId={userId}
            trigger={
              <DropdownMenu.Item
                onSelect={(e) => {
                  e.preventDefault();
                  handleRestore(userId);
                }}
              >
                Restore User
              </DropdownMenu.Item>
            }
          />
        ) : null}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
