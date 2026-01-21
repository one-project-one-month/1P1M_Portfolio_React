import DeleteDialog from '@/components/ui/delete-dialog';
import Tooltip from '@/components/ui/tooltip';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type ProjectData, type ProjectStatus } from '../constants/data';
import { usePortfolioActions } from '../hooks/use-portfolio-actions';
import ChangeStatusDialog from './change-status-dialog';
import { ProjectActionMenu } from './project-action-menu';
import { SuccessToast } from './success-toast';

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case 'Completed':
      return 'text-[#10B981]';
    case 'In Progress':
      return 'text-[#F59E0B]';
    case 'Unqualified':
      return 'text-[#6A7282]';
    default:
      return 'text-white';
  }
};

const TableHeader = ({
  width,
  children,
}: {
  width: string;
  children: React.ReactNode;
}) => (
  <th
    className={`px-3 text-center text-white text-xl font-semibold leading-7 ${width}`}
  >
    {children}
  </th>
);

const TableCell = ({
  centered = false,
  children,
}: {
  centered?: boolean;
  children: React.ReactNode;
}) => <td className={`px-3 ${centered ? 'text-center' : ''}`}>{children}</td>;

const CellText = ({
  size = 'base',
  color = 'white',
  bold = false,
  children,
}: {
  size?: 'sm' | 'base';
  color?: string;
  bold?: boolean;
  children: React.ReactNode;
}) => (
  <span className={`text-${color} text-${size} ${bold ? 'font-medium' : ''}`}>
    {children}
  </span>
);

interface PortfolioListViewProps {
  data: ProjectData[];
  onDelete: (id: number) => void;
  onStatusChange?: (id: number, status: ProjectStatus) => void;
}

const PortfolioListView = ({
  data,
  onDelete,
  onStatusChange,
}: PortfolioListViewProps) => {
  const navigate = useNavigate();
  const [statusDialogProjectId, setStatusDialogProjectId] = useState<
    number | null
  >(null);

  const {
    openMenuId,
    deleteProjectId,
    setDeleteProjectId,
    menuRef,
    handleMenuClick,
    handleDeleteClick,
    showSuccessToast,
    setShowSuccessToast,
  } = usePortfolioActions();

  const handleView = (projectId: number | string) => {
    navigate(`/admin/portfolio-management/view-project-portfolio/${projectId}`);
  };

  const handleEdit = (projectId: number | string) => {
    navigate(`/admin/portfolio-management/edit-portfolio/${projectId}`);
  };

  const handleConfirmDelete = () => {
    if (deleteProjectId !== null) {
      onDelete(deleteProjectId);
      setDeleteProjectId(null);
      setShowSuccessToast(true);
    }
  };

  const handleStatusClick = (projectId: number) => {
    setStatusDialogProjectId(projectId);
  };

  const handleStatusConfirm = (newStatus: ProjectStatus) => {
    if (statusDialogProjectId !== null) {
      onStatusChange?.(statusDialogProjectId, newStatus);
      setStatusDialogProjectId(null);
    }
  };

  const currentProject = data.find((p) => p.id === statusDialogProjectId);

  return (
    <>
      <div className="w-full overflow-x-auto rounded-xl border border-[#99A1AF] overflow-hidden bg-[rgba(255,255,255,0.09)] ">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#99A1AF] h-20">
              <TableHeader width="w-[180px]">Project Leader</TableHeader>
              <TableHeader width="w-[223px]">Title</TableHeader>
              <TableHeader width="w-[82px]">Member</TableHeader>
              <TableHeader width="w-[122px]">Status</TableHeader>
              <TableHeader width="w-[116px]">Start Date</TableHeader>
              <TableHeader width="w-[203px]">Completed Date</TableHeader>
              <TableHeader width="w-[81px]">Action</TableHeader>
            </tr>
          </thead>
          <tbody className="bg-transparent">
            {data.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-12">
                  <p className="text-white/50 text-lg">No projects found</p>
                </td>
              </tr>
            ) : (
              data.map((project) => (
                <tr
                  key={project.id}
                  className="border-b border-[#99A1AF] h-[76px] hover:bg-[rgba(255,255,255,0.02)] transition-colors"
                >
                  <TableCell>
                    <div className="group flex items-center gap-3 cursor-pointer">
                      <img
                        src={project.image}
                        alt={project.leader}
                        className="w-11 h-11 rounded-full object-cover border-2 border-transparent group-hover:border-[#9C39FC] transition-colors"
                      />
                      <span className="text-white text-base font-medium group-hover:text-[#9C39FC] transition-colors line-clamp-1">
                        {project.leader}
                      </span>
                    </div>
                  </TableCell>

                  <TableCell centered>
                    <Tooltip
                      content={project.title}
                      className="bg-[#6A7282] text-sm leading-5"
                    >
                      <CellText size="base" bold>
                        <span className="line-clamp-1">{project.title}</span>
                      </CellText>
                    </Tooltip>
                  </TableCell>

                  <TableCell centered>
                    <CellText size="base" color="[#99A1AF]">
                      {project.members.length}
                    </CellText>
                  </TableCell>

                  <TableCell centered>
                    <button
                      onClick={() => handleStatusClick(project.id)}
                      className={`font-medium text-sm cursor-pointer hover:underline transition-colors ${getStatusColor(project.status)}`}
                    >
                      {project.status}
                    </button>
                  </TableCell>

                  <TableCell centered>
                    <CellText size="sm" bold>
                      {project.startDate}
                    </CellText>
                  </TableCell>

                  <TableCell centered>
                    <CellText size="sm" bold>
                      {project.completedDate || '-'}
                    </CellText>
                  </TableCell>

                  <TableCell>
                    <ProjectActionMenu
                      ref={menuRef}
                      projectId={project.id}
                      isOpen={openMenuId === project.id}
                      onToggle={() => handleMenuClick(project.id)}
                      onView={(id) => handleView(id as number)}
                      onEdit={(id) => handleEdit(id as number)}
                      onDelete={(id) => handleDeleteClick(id as number)}
                    />
                  </TableCell>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <DeleteDialog
        isOpen={!!deleteProjectId}
        onClose={() => setDeleteProjectId(null)}
        onConfirm={handleConfirmDelete}
        overlayClassName="bg-black/30 backdrop-blur-[1px] p-10"
        title="Delete Project Portfolio?"
        description={
          <>
            Are you sure you want to delete this{' '}
            <span className="font-semibold">(Project Portfolio)</span>? This
            action cannot be undone.
          </>
        }
      />

      <ChangeStatusDialog
        isOpen={statusDialogProjectId !== null}
        onClose={() => setStatusDialogProjectId(null)}
        onConfirm={handleStatusConfirm}
        currentStatus={currentProject?.status}
      />

      {showSuccessToast && (
        <SuccessToast
          message="Project Portfolio deleted successfully!"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </>
  );
};

export default PortfolioListView;
