import { UserProjectPortfolioStatusChangeDialog } from '@/app/features/user-management/components/user-management-detail/project-portfolio/project-portfolio-change-status';
import { useProjectPortfolioStatusChage } from '@/app/features/user-management/hook/use-portfolio';
import type { ProjectPortfolioStatus } from '@/app/features/user-management/types/project-portfolio-type';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { EllipsisVertical } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const ProjectPortfolioDropDown = ({
  id,
  projectPortfolioStatus,
}: {
  id: number;
  projectPortfolioStatus: ProjectPortfolioStatus;
}) => {
  const [statusChangeOpen, setStatusChangeOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { mutate: portfolioStatusChange } = useProjectPortfolioStatusChage();
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
          <DropdownMenu.Item asChild>
            <Link
              to={`/admin/portfolio-management/view-project-portfolio/${id}`}
            >
              View Details
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
            }}
          >
            <Link to={`/admin/portfolio-management/edit-portfolio/${id}`}>
              {' '}
              Edit Portfolio
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();

              handleItemClick(() => setStatusChangeOpen(true));
            }}
          >
            Change Status
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <UserProjectPortfolioStatusChangeDialog
        statusChangeOpen={statusChangeOpen}
        setStatusChangeOpen={setStatusChangeOpen}
        projectPortfolioId={id}
        portfolioStatusChange={portfolioStatusChange}
        currentStatus={projectPortfolioStatus}
      />
    </>
  );
};
