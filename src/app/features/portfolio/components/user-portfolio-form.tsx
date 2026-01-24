import { Button } from '@/components/ui/button';
import FormBackground from '@/components/ui/form-background';
import { Flex } from '@radix-ui/themes';
import type { ProjectData } from '../../portfolio-management/constants/data';
import { usePortfolioForm } from '../../portfolio-management/hooks/use-portfolio-form';
import { UserPortfolioTeamSection } from './form/user-portfolio-team-section';
import { UserPortfolioTypeLang } from './form/user-portfolio-type-lang';
import UserPortfolioInfo from './user-portfolio-info';

export type PortfolioFormMode = 'create' | 'edit' | 'view';

interface PortfolioFormProps {
  mode: PortfolioFormMode;
  initialData?: ProjectData | null;
  onSave?: (data: Partial<ProjectData>) => void;
  onCancel?: () => void;
  onClose?: () => void;
}

const UserPortfolioForm = ({
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

  // useEffect(() => {
  //   if (devEmails.length === 0) {
  //     resetMembers?.();
  //   }
  // }, [devEmails, resetMembers]);

  return (
    <FormBackground className="w-6xl">
      {/* <form
        className="flex w-full flex-col md:flex-row gap-x-8"
        onSubmit={form.handleSubmit(submit)}
      > */}
      <UserPortfolioInfo form={form} />
      <Flex>
        <Flex className="w-[290px] text-center mt-3"></Flex>
        <Flex direction="column" gap="4" className="flex-1">
          <UserPortfolioTypeLang
            form={form}
            technologyFields={technologyFields}
            onAddTechnology={handleAddTechnology}
            onRemoveTechnology={handleRemoveTechnology}
            onUpdateTechnology={handleUpdateTechnology}
            isReadOnly={isReadOnly}
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
            isReadOnly={isReadOnly}
            getModalTeamName={getModalTeamName}
            getModalInitialMembers={getModalInitialMembers}
          />
        </Flex>
      </Flex>

      <div className="flex justify-end gap-4 pb-4 mt-5">
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
      {/* </form> */}
      {/* <Controller
            control={form.control}
            name="developerEmails"
            render={({ field }) => (
              <SelectMember
                allMembers={MOCK_AVAILABLE_DEVS}
                handleSaveMembers={(emailList: string[]) => {
                  field.onChange(emailList);
                  form.trigger('developerEmails');
                }}
                handleResetMembers={setResetMembers}
              />
            )}
          />
          {form.formState.errors.developerEmails && (
            <p className="text-red-500 text-sm font-bold">
              {form.formState.errors.developerEmails.message}
            </p>
          )} */}
    </FormBackground>
  );
};

export default UserPortfolioForm;
