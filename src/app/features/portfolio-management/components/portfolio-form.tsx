import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { ProjectData } from '../constants/data';
import { usePortfolioForm } from '../hooks/use-portfolio-form';
import { PortfolioBasicInfo } from './form/portfolio-basic-info';
import { PortfolioLinkSection } from './form/portfolio-link-section';
import { PortfolioTeamSection } from './form/portfolio-team-section';
import { PortfolioTypeLang } from './form/portfolio-type-lang';

export type PortfolioFormMode = 'create' | 'edit' | 'view';

interface PortfolioFormProps {
  mode: PortfolioFormMode;
  initialData?: ProjectData | null;
  onSave?: (data: Partial<ProjectData>) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

const PortfolioForm = ({
  mode,
  initialData,
  onSave,
  onCancel,
  onClose,
}: PortfolioFormProps) => {
  const {
    isReadOnly,
    isEdit,
    projectName,
    setProjectName,
    description,
    setDescription,
    startDate,
    setStartDate,
    completedDate,
    setCompletedDate,
    status,
    setStatus,
    technologies,
    handleAddTechnology,
    handleRemoveTechnology,
    handleUpdateTechnology,
    teams,
    projectLink,
    setProjectLink,
    projectLinkName,
    setProjectLinkName,
    isModalOpen,
    setIsModalOpen,
    // activeTeamId,
    setActiveTeamId,
    handleSaveForm,
    handleAddTeam,
    handleSaveTeamMembers,
    handleRemoveTeam,
    handleUpdateTeam,
    getTitle,
    getModalTeamName,
    getModalInitialMembers,
  } = usePortfolioForm({ mode, initialData, onSave });

  return (
    <div className="mx-auto w-full">
      <div className=" rounded-lg border border-[#FFFFFF]/15 p-6 flex flex-col max-h-[87vh] bg-[rgba(255,255,255,0.09)]">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold text-[#F9FAFB]">{getTitle()}</h1>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"
            >
              <X size={20} />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-6 pl-1 custom-scrollbar space-y-6">
          <div className="h-px bg-[#FFFFFF]/15" />

          <PortfolioBasicInfo
            initialData={initialData}
            projectName={projectName}
            setProjectName={setProjectName}
            status={status}
            setStatus={setStatus}
            description={description}
            setDescription={setDescription}
            startDate={startDate}
            setStartDate={setStartDate}
            completedDate={completedDate}
            setCompletedDate={setCompletedDate}
            isReadOnly={isReadOnly}
          />

          <div className="h-px bg-[#FFFFFF]/15" />

          <PortfolioTypeLang
            technologies={technologies}
            onAddTechnology={handleAddTechnology}
            onRemoveTechnology={handleRemoveTechnology}
            onUpdateTechnology={handleUpdateTechnology}
            isReadOnly={isReadOnly}
          />

          <div className="h-px bg-[#FFFFFF]/15" />

          <PortfolioTeamSection
            teams={teams}
            handleAddTeam={handleAddTeam}
            handleRemoveTeam={handleRemoveTeam}
            onUpdateTeam={handleUpdateTeam}
            handleSaveTeamMembers={handleSaveTeamMembers}
            // activeTeamId={activeTeamId}
            setActiveTeamId={setActiveTeamId}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isReadOnly={isReadOnly}
            getModalTeamName={getModalTeamName}
            getModalInitialMembers={getModalInitialMembers}
          />

          <div className="h-px bg-[#FFFFFF]/15" />

          <PortfolioLinkSection
            projectLink={projectLink}
            setProjectLink={setProjectLink}
            projectLinkName={projectLinkName}
            setProjectLinkName={setProjectLinkName}
            isReadOnly={isReadOnly}
          />

          <div className="h-px bg-[#FFFFFF]/15" />

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pb-4">
            {isReadOnly ? (
              <Button
                className="bg-[#9C39FC] hover:bg-[#9333ea] text-lg font-medium rounded-lg px-8 text-[#F9FAFB]"
                onClick={onClose || onCancel}
              >
                Close
              </Button>
            ) : (
              <>
                <Button
                  className="text-white border border-[#FFFFFF]/15 hover:bg-white/10 px-8 bg-transparent"
                  onClick={onCancel || onClose}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveForm}
                  className="bg-[#9C39FC] hover:bg-[#9333ea] text-lg font-medium rounded-lg px-8 text-[#F9FAFB]"
                >
                  {isEdit ? 'Update' : 'Save'}
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      {/* Modal is now inside PortfolioTeamSection */}
    </div>
  );
};

export default PortfolioForm;
