import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import type { ProjectData } from '../constants/data';
import { usePortfolioForm } from '../hooks/use-portfolio-form';
import AddMemberModal from './add-member-modal';
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
    projectType,
    setProjectType,
    languages,
    setLanguages,
    teams,
    projectLink,
    setProjectLink,
    projectLinkName,
    setProjectLinkName,
    isModalOpen,
    setIsModalOpen,
    setActiveTeamId,
    handleSaveForm,
    handleAddTeam,
    handleSaveTeamMembers,
    handleRemoveTeam,
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
            projectType={projectType}
            setProjectType={setProjectType}
            languages={languages}
            setLanguages={setLanguages}
            isReadOnly={isReadOnly}
          />

          <div className="h-px bg-[#FFFFFF]/15" />

          <PortfolioTeamSection
            teams={teams}
            handleAddTeam={handleAddTeam}
            handleRemoveTeam={handleRemoveTeam}
            isReadOnly={isReadOnly}
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

      {!isReadOnly && (
        <AddMemberModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setActiveTeamId(null);
          }}
          teamName={getModalTeamName()}
          initialMembers={getModalInitialMembers()}
          onSave={handleSaveTeamMembers}
        />
      )}
    </div>
  );
};

export default PortfolioForm;
