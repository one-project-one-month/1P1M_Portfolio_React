import projectPlaceHolderImage from '@/assets/ProjectImage.png';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import FormBackground from '@/components/ui/form-background';
import { Flex } from '@radix-ui/themes';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { useRef } from 'react';
import { PortfolioBasicInfo } from '../../portfolio-management/components/form/portfolio-basic-info';
import { PortfolioLinkSection } from '../../portfolio-management/components/form/portfolio-link-section';
import { PortfolioTeamSection } from '../../portfolio-management/components/form/portfolio-team-section';
import type { ProjectData } from '../../portfolio-management/constants/data';
import { usePortfolioForm } from '../../portfolio-management/hooks/use-portfolio-form';
import { useUploadImage } from '../../portfolio-management/hooks/use-upload-image';
import { UserPortfolioTypeLang } from './form/user-portfolio-type-lang';

export type PortfolioFormMode = 'create' | 'edit' | 'view';

interface PortfolioFormProps {
  mode: PortfolioFormMode;
  initialData?: ProjectData | null;
  onSave?: (data: Partial<ProjectData>) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

const ProjectPortfolioForm = ({
  mode,
  initialData,
  onSave,
  onCancel,
  onClose,
}: PortfolioFormProps) => {
  const {
    form,
    isReadOnly,
    isEdit,
    technologyFields,
    handleAddTechnology,
    handleRemoveTechnology,
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectImage = form.watch('projectImage');

  const { mutate: uploadImage, isPending: isUploading = true } =
    useUploadImage();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
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
    <FormBackground className="w-4xl flex">
      {/* Back Button */}
      <Button
        variant="black_button"
        onClick={handleBack}
        className="flex items-center gap-1 mb-6 w-fit hover:opacity-80 transition-opacity h-10"
      >
        <ChevronLeft className="w-4 h-4 text-[#F3F4F6]" strokeWidth={3} />
        <span className="text-white">Back</span>
      </Button>
      <div className="grid lg:grid-cols-4 md:grid-cols-1">
        <div className="shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {isUploading ? (
            <div
              className={`w-[153px] h-[153px] bg-[#D9D9D9] rounded-lg overflow-hidden flex items-center justify-center ${!isUploading ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
            >
              <Loader2 className="w-8 h-8 text-[#9C39FC] animate-spin" />
              <span className="text-sm text-gray-600">Uploading...</span>
            </div>
          ) : projectImage || initialData?.image ? (
            <div
              className={`w-[153px] h-[153px] rounded-lg overflow-hidden border border-[#FFFFFF]/15 ${mode === 'create' ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
              onClick={triggerFileUpload}
            >
              <img
                src={
                  projectImage || initialData?.image || projectPlaceHolderImage
                }
                alt="Project"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="shrink-0" onClick={triggerFileUpload}>
              <div
                className={`w-[155px] h-[153px] rounded-lg flex items-center justify-center ${!isReadOnly ? 'cursor-pointer' : ''}`}
              >
                <FileUpload className="pointer-events-none" />
              </div>
              <Flex
                direction="column"
                gap="1"
                className="w-[165px] text-center mb-3 mt-2"
              >
                <span className="text-xl text-white">Upload Image</span>
                <span className="text-xs text-[#6A7282]">
                  maximum image size is 1 MB.
                </span>
              </Flex>
            </div>
          )}
        </div>
        <span className="col-span-3 flex-1 flex flex-col gap-5 mt-4">
          <PortfolioBasicInfo
            initialData={initialData}
            accessFrom="user-portfolio"
            form={form}
            isReadOnly={isReadOnly}
          />
          <PortfolioLinkSection form={form} isReadOnly={false} />
          <UserPortfolioTypeLang
            form={form}
            technologyFields={technologyFields}
            onAddTechnology={handleAddTechnology}
            onRemoveTechnology={handleRemoveTechnology}
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

          <div className="flex justify-end gap-4 pb-4 mt-5">
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
          </div>
        </span>
      </div>
    </FormBackground>
  );
};

export default ProjectPortfolioForm;
