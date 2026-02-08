import projectPlaceHolderImage from '@/assets/place_holder_image.png';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/ui/file-upload';
import FormBackground from '@/components/ui/form-background';
import { MAX_FILE_SIZE } from '@/constants';
import { Flex } from '@radix-ui/themes';
import { useRef } from 'react';
import type { ProjectData } from '../../portfolio-management/constants/data';
import { usePortfolioForm } from '../../portfolio-management/hooks/use-portfolio-form';
import { uploadProjectImage } from '../services/portfolio-service';
import UserPortfolioInfo from './form/user-portfolio-info';
import { UserPortfolioTeamSection } from './form/user-portfolio-team-section';
import { UserPortfolioTypeLang } from './form/user-portfolio-type-lang';

export type PortfolioFormMode = 'create' | 'edit' | 'view';

interface PortfolioFormProps {
  mode: PortfolioFormMode;
  initialData?: ProjectData | null;
  onSave?: (data: Partial<ProjectData>) => void;
  onCancel?: () => void;
  onClose?: () => void;
  repoLink: string;
  setRepoLink: (v: string) => void;
}

const ProjectPortfolioForm = ({
  mode,
  initialData,
  onSave,
  onCancel,
  onClose,
  repoLink,
  setRepoLink,
}: PortfolioFormProps) => {
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

  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectImage = form.watch('projectImage');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE) {
      console.error('File is too large');
      // optional: show toast / form error
      form.setError('projectImage', { message: 'Image must be under 2MB' });
      return;
    }

    try {
      const imageUrl = await uploadProjectImage(file);
      form.setValue('projectImage', imageUrl);
    } catch (error) {
      console.error('Image upload failed', error);
    }
  };

  const triggerFileUpload = () => {
    if (!isReadOnly) {
      fileInputRef.current?.click();
    }
  };

  return (
    <FormBackground className="w-4xl flex bg-transparent!">
      <div className="grid lg:grid-cols-4 md:grid-cols-1">
        <div className="shrink-0">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
          {projectImage || initialData?.image || mode === 'create' ? (
            <div
              className={`w-[153px] h-[153px] rounded-lg overflow-hidden border border-[#FFFFFF]/15 ${!isReadOnly ? 'cursor-pointer hover:opacity-80 transition-opacity' : ''}`}
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
        <span className="col-span-3">
          <UserPortfolioInfo
            initialData={initialData}
            form={form}
            repoLink={repoLink}
            setRepoLink={setRepoLink}
          />
          <UserPortfolioTypeLang
            form={form}
            technologyFields={technologyFields}
            onAddTechnology={handleAddTechnology}
            onRemoveTechnology={handleRemoveTechnology}
            onUpdateTechnology={handleUpdateTechnology}
          />
          <UserPortfolioTeamSection
            form={form}
            handleAddTeam={handleAddTeam}
            handleRemoveTeam={handleRemoveTeam}
            onUpdateTeam={handleUpdateTeam}
            handleSaveTeamMembers={handleSaveTeamMembers}
            setActiveTeamId={setActiveTeamId}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
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
