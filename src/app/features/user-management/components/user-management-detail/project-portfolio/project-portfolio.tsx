import { ProjectPortfolioDropDown } from '@/app/features/user-management/components/user-management-detail/project-portfolio/project-portfolio-drop-down';
import { statusBgList } from '@/app/features/user-management/constant/portfolio-statu-color';
import HeartFill from '@/assets/icons/ActiveHeart.png';
import Eye from '@/assets/icons/eye.png';
import ProjectImage from '@/assets/icons/Group 86.png';
import Heart from '@/assets/icons/Heart.png';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';

import {
  useProjectPortfolioReact,
  useProjectPortfolioUnReact,
} from '@/app/features/user-management/hook/use-portfolio';
import { type ProjectPortfolioType } from '@/app/features/user-management/types/user-management.types';
interface ProjectPortfolioProps {
  user: {
    projectPortfolios: ProjectPortfolioType[];
  };
}
const ProjectPortfolio = ({ user }: ProjectPortfolioProps) => {
  const portfolios = user?.projectPortfolios ?? [];
  const { mutate: reactPortfolio } = useProjectPortfolioReact();
  const { mutate: unReactPortfolio } = useProjectPortfolioUnReact();

  return (
    <div className="w-full h-full">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-[#FFFFFF] font-semibold text-2xl leading-9">
          Projects Portfolios
        </h1>
        <div className=" gap-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3">
          {portfolios.map((item) => {
            const leader = item.assignedDevs.developers.find(
              (dev) => dev.roleInTeam === 'Team Leader',
            );

            const members = item.assignedDevs.developers.filter(
              (dev) => dev.roleInTeam !== 'Team Leader',
            );
            return (
              <div className="bg-white/10 border border-white/20 rounded-[10px] backdrop-blur-[64px] shadow-5xl p-5 gap-4 flex flex-col">
                <img
                  src={item.projectPicUrl}
                  alt=""
                  className="w-full h-[180px] mx-auto rounded-2xl"
                />
                <div className=" flex flex-col gap-3">
                  <p className="font-bold font-sans text-sm  leading-5 text-[#FFFFFF]">
                    {item.name}
                  </p>

                  <div className="flex justify-between">
                    <p className="text-[#D1D5DC] text-[12px] leadgin-5 font-sans font-normal">
                      Team Leader
                    </p>
                    <p className="text-[#D1D5DC] text-[12px] font-sans font-normal">
                      {leader?.name}
                    </p>
                  </div>
                  <div className="flex justify-between items-center text-[#D1D5DC] text-[12px]">
                    <p className="text-[#D1D5DC] text-[12px] leadgin-5 font-sans font-normal">
                      Team Members
                    </p>
                    {members.length > 0 && (
                      <div className="flex -space-x-2">
                        {members.slice(0, 3).map((member) => (
                          <img
                            key={member.id}
                            src={member.profilePictureUrl ?? sampleUserImgUrl}
                            alt={member.name}
                            className="w-6 h-6 rounded-full border border-white object-cover"
                          />
                        ))}

                        {members.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-gray-600 text-white text-[10px] flex items-center justify-center border border-white">
                            +{members.length - 3}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button
                      className={`w-[110px] cursor-pointer py-2 pr-3 pl-4 rounded-xl text-xs text-[#F9FAFB] font-light  ${statusBgList[item.status]}`}
                    >
                      {item.status}
                    </button>
                    <div className="flex  justify-between gap-4">
                      <div className="flex justify-center items-center gap-5">
                        <div className="flex justify-center items-center gap-2">
                          {' '}
                          <img
                            src={item.alreadyReacted ? HeartFill : Heart}
                            alt=""
                            className="w-[18px] text-[#D1D5DC] cursor-pointer"
                            onClick={() => {
                              if (item.alreadyReacted) {
                                unReactPortfolio({
                                  projectPortfolioId: item.id,
                                });
                              } else {
                                reactPortfolio({
                                  projectPortfolioId: item.id,
                                });
                              }
                            }}
                          />
                          <span className="text-[#D1D5DC] font-sans text-sm font-medium ">
                            {item.reaction_count}
                          </span>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                          {' '}
                          <img src={Eye} alt="" className="w-[18px]" />
                          <span className="text-[#D1D5DC] font-sans text-sm font-medium ">
                            {/* {item.} */}0
                          </span>
                        </div>
                      </div>
                      <div>
                        <ProjectPortfolioDropDown id={item.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full flex justify-center">
          {portfolios.length === 0 && (
            <div>
              <img src={ProjectImage} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPortfolio;
