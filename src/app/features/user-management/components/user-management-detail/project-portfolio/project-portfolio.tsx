import { ProjectPortfolioDropDown } from '@/app/features/user-management/components/user-management-detail/project-portfolio/project-portfolio-drop-down';
import Eye from '@/assets/icons/eye.png';
import ProjectImage from '@/assets/icons/Group 86.png';
import Heart from '@/assets/icons/Heart.png';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';

import { type ProjectPortfolioType } from '@/app/features/user-management/types/user-management.types';
interface ProjectPortfolioProps {
  user: {
    projectPortfolios: ProjectPortfolioType[];
  };
}
const ProjectPortfolio = ({ user }: ProjectPortfolioProps) => {
  const portfolios = user?.projectPortfolios ?? [];

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-[#FFFFFF] font-semibold text-2xl leading-9">
          Projects Portfolios
        </h1>
        <div className=" gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {portfolios.map((item) => {
            const leader = item.assignedDevs.developers.find(
              (dev) => dev.roleInTeam === 'Team Leader',
            );

            const members = item.assignedDevs.developers.filter(
              (dev) => dev.roleInTeam !== 'Team Leader',
            );
            return (
              <div className="bg-white/10 border border-white/20 rounded-[10px] backdrop-blur-[64px] shadow-2xl p-5 gap-4 flex flex-col">
                <img
                  src={item.projectPicUrl}
                  alt=""
                  className="w-full h-[170px] mx-auto"
                />
                <div className="flex flex-col gap-2">
                  <p className="font-bold font-sans text-sm text-xl leading-7 text-[#FFFFFF]">
                    {item.name}
                  </p>

                  {leader && (
                    <div className="flex justify-between">
                      <p className="text-[#D1D5DC] text-[12px] font-sans font-normal">
                        Team Leader
                      </p>
                      <p className="text-[#D1D5DC] text-[12px] font-sans font-normal">
                        {leader.name}
                      </p>
                    </div>
                  )}
                  {members.length > 0 && (
                    <div className="flex justify-between items-center text-[#D1D5DC] text-[12px]">
                      <p>Team Members</p>

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
                    </div>
                  )}

                  <div className="flex justify-between">
                    <button className="text-[#F9FAFB] text-sm font-medium">
                      Completed
                    </button>
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
                            {item.reaction_count}
                          </span>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                          {' '}
                          <img src={Eye} alt="" className="w-[18px]" />
                          <span className="text-[#D1D5DC] font-sans text-sm font-medium ">
                            {/* {item.viewCount} */}
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
