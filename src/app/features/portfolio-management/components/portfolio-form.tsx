import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import { ChevronLeft, Loader2 } from 'lucide-react';
import React, { useRef } from 'react';
import type { ProjectData } from '../constants/data';
import { usePortfolioForm } from '../hooks/use-portfolio-form';
import { useUploadImage } from '../hooks/use-upload-image';
import { ActivityRecordsSection } from './form/activity-records-section';
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    form,
    isReadOnly,
    isEdit,
    technologyFields,
    handleAddTechnology,
    handleRemoveTechnology,
    handleUpdateTechnology,
    isModalOpen,
    setIsModalOpen,
    setActiveTeamId,
    handleSaveForm,
    handleAddTeam,
    handleSaveTeamMembers,
    handleRemoveTeam,
    handleUpdateTeam,

    getModalTeamName,
    getModalInitialMembers,
  } = usePortfolioForm({ mode, initialData, onSave });

  const projectImage = form.watch('projectImage');

  const { mutate: uploadImage, isPending: isUploading } = useUploadImage();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file, {
        onSuccess: (imageUrl) => {
          form.setValue('projectImage', imageUrl);
        },
        onError: (error) => {
          console.error('Image upload failed', error);
        },
      });
    }
  };

  const triggerFileUpload = () => {
    if (!isReadOnly) {
      fileInputRef.current?.click();
    }
  };

  const handleBack = () => {
    if (onCancel) {
      onCancel();
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <div className="py-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-1 mb-6 w-fit hover:opacity-80 transition-opacity"
      >
        <ChevronLeft className="w-8 h-8 text-[#F3F4F6]" strokeWidth={3} />
        <span className="text-white text-2xl font-semibold">Back</span>
      </button>

      {/* Main Content */}
      <div className="flex gap-12 items-start">
        {/* Project Image */}
        <div className="flex flex-col items-center gap-5 w-[253px] shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          <div
            className={`w-full h-[253px] bg-[#D9D9D9] rounded-3xl overflow-hidden flex items-center justify-center ${!isReadOnly && !isUploading ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            onClick={triggerFileUpload}
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-2">
                <Loader2 className="w-8 h-8 text-[#9C39FC] animate-spin" />
                <span className="text-sm text-gray-600">Uploading...</span>
              </div>
            ) : projectImage || initialData?.image ? (
              <img
                src={projectImage || initialData?.image || ''}
                alt="Project preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <FileUpload className="pointer-events-none" />
            )}
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex flex-col gap-10 max-w-[836px]">
          <PortfolioBasicInfo
            initialData={initialData}
            form={form}
            isReadOnly={isReadOnly}
          />

          <PortfolioLinkSection form={form} isReadOnly={isReadOnly} />

          <PortfolioTypeLang
            form={form}
            technologyFields={technologyFields}
            onAddTechnology={handleAddTechnology}
            onRemoveTechnology={handleRemoveTechnology}
            isReadOnly={isReadOnly}
          />

          <PortfolioTeamSection
            form={form}
            handleAddTeam={handleAddTeam}
            handleRemoveTeam={handleRemoveTeam}
            onUpdateTeam={handleUpdateTeam}
            handleSaveTeamMembers={handleSaveTeamMembers}
            setActiveTeamId={setActiveTeamId}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            isReadOnly={isReadOnly}
            getModalTeamName={getModalTeamName}
            getModalInitialMembers={getModalInitialMembers}
          />
          {/* <ActivityRecordsEmptyState projectId={""} /> */}

          {isReadOnly && <ActivityRecordsSection projectId={initialData?.id} />}

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
                  className="text-white border border-white/15 hover:bg-white/10 px-8 bg-transparent"
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
    </div>
  );
};

export default PortfolioForm;
