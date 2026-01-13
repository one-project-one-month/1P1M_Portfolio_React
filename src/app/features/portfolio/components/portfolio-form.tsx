import FileUpload from '@/components/ui/file-upload';
import FormBackground from '@/components/ui/form-background';
import TextField from '@/components/ui/text-field';
import SelectMember from './select-member';
import { Button } from '@/components/ui/button';
import { useAppNavigation } from '@/hooks/use-app-navigate';
import { MOCK_AVAILABLE_DEVS, MOCK_SELECTED_MEMBERS } from '@/constants';

const PortfolioForm = () => {

const {goTo}=useAppNavigation()


  return (
    <FormBackground className="w-4xl">
      <form className="flex w-full flex-col md:flex-row  gap-x-8">
        <div className="md:w-2/4 flex justify-center">
          <FileUpload className='md:size-56'/>
        </div>

        <div className="w-full">
          <TextField
            label="Project Name"
            placeholder="Enter Project Name"
            className="w-full font-light"
            value={''}
          />

          <TextField
            label="Project Details"
            placeholder="Provide details about your project"
            className="w-full"
            value={''}
          />

          <TextField
            label="Github Link"
            placeholder="Enter your project Github link"
            className="w-full"
            value={''}
          />

          <TextField
            label="Project Link"
            placeholder="Enter your project hosting link"
            className="w-full"
            value={''}
          />


             <TextField
            label="Tools Used"
            placeholder="eg.,HTML,CSS,JavaScript,React"
            className="w-full"
            value={''}
          />


          <SelectMember selectedMembers={MOCK_SELECTED_MEMBERS} devProfiles={MOCK_AVAILABLE_DEVS}/>
          <div className='justify-self-end flex gap-2'>
            <Button onClick={()=>goTo("/portfolio")} variant={'black_small_button'} className='text-white'>Cancel</Button>
            <Button >Create</Button>
          </div>
        </div>
      </form>
    </FormBackground>
  );
};

export default PortfolioForm;
