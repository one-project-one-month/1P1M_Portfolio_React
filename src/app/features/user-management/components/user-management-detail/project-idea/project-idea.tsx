import { ProjectIdeaDropDown } from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea-drop-down';
import { type ProjectIdeaType } from '@/app/features/user-management/types/user-management.types';
import Eye from '@/assets/icons/eye.png';
import Heart from '@/assets/icons/Heart.png';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';

interface ProjectIdeaProps {
  user: {
    projectIdeas: ProjectIdeaType[];
  };
}

const statusColorList: Record<ProjectIdeaType['status'], string> = {
  REJECTED: 'bg-[#9F0712]',
  APPROVED: 'bg-[#008236]',
  IN_PROGRESS: 'bg-[#00B8DB]',
  COMPLETED: 'bg-[#03fcdb]',
  PENDING: 'bg-[#FD9A00]',
  DELETED: 'bg-[#6A7282]',
};

const statusLabels: Record<ProjectIdeaType['status'], string> = {
  REJECTED: 'REJECTED',
  APPROVED: 'APPROVED',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  PENDING: 'PENDING',
  DELETED: 'DELETED',
};

const ProjectIdea = ({ user }: ProjectIdeaProps) => {
  const projectIdeas = user?.projectIdeas ?? [];
  const truncate = (text: string, max = 250) =>
    (text ?? '').length > max ? text.slice(0, max) + '...' : text;
  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-[#FFFFFF] font-semibold text-2xl leading-9">
          Projects Ideas
        </h1>
        <div className="w-full h-full gap-10 grid grid-cols-2 lg:grid-cols-3">
          {projectIdeas.map((item, index) => (
            <div
              key={index}
              className="w-[100%]  mx-auto  bg-white/10 border border-white/20 rounded-lg backdrop-blur-[64px] p-7 flex flex-col gap-5"
            >
              <div className="flex text-white justify-between items-center">
                <h2 className="text-[#F5EBFF] font-semibold text-base font-sans">
                  {item.projectIdeaName}
                </h2>
                <button
                  className={`w-[110px] cursor-pointer py-2 pr-3 pl-4 rounded-xl text-xs text-[#F9FAFB] font-light 
                  ${statusColorList[item.status]}
                  `}
                >
                  {statusLabels[item.status]}
                </button>
              </div>
              <div className="h-[30%]">
                <p className="text-xs text-[#99A1AF] font-sans">
                  {truncate(item.description)}
                </p>
              </div>
              <div className="flex  gap-3">
                {item.projectTypes.map((list, index) => (
                  <button
                    key={index}
                    className="h-6 px-2 text-center rounded-xl border border-[#6F28B3] text-xs text-[#99A1AF] font-light"
                  >
                    {list}
                  </button>
                ))}
              </div>

              <div className="flex justify-between text-white">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#99A1AF] font-normal">
                    Submitter:
                  </span>
                  {
                    <img
                      src={item.ownerProfilePicUrl || sampleUserImgUrl}
                      alt=""
                      className="w-[30px] h-[30px] rounded-2xl"
                    />
                  }
                </div>
              </div>

              <div className="border border-[#D1D5DC33]"></div>
              <div className="flex  justify-between">
                <div className="flex justify-center items-center gap-5">
                  <div className="flex justify-center items-center gap-2">
                    {' '}
                    <img
                      src={Heart}
                      alt=""
                      className="w-[18px] text-[#D1D5DC]"
                    />
                    <span className="text-[#D1D5DC] font-sans text-sm font-medium ">
                      {item.reactionCount}
                    </span>
                  </div>
                  <div className="flex justify-center items-center gap-2">
                    {' '}
                    <img src={Eye} alt="" className="w-[18px]" />
                    <span className="text-[#D1D5DC] font-sans text-sm font-medium ">
                      {item.viewCount}
                    </span>
                  </div>
                </div>
                <div className="flex ">
                  <ProjectIdeaDropDown projectIdea={item} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className=" w-full ">
          {projectIdeas.length === 0 && (
            <div className="felx text-center text-white text-2xl">
              <p>No Project Idea</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectIdea;
