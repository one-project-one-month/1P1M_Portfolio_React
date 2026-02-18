import ProjectIdea from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea';
import ProjectPortfolio from '@/app/features/user-management/components/user-management-detail/project-portfolio/project-portfolio';
import UserShareProfile from '@/app/features/user-management/components/user-share-profile-dialog';
import { useGetUserProfileDetail } from '@/app/features/user-management/hook/use-user-management';
import Behance from '@/assets/icons/behance.png';
import Copy from '@/assets/icons/copy.png';
import Email from '@/assets/icons/Email.png';
import Github from '@/assets/icons/GitHub.png';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import LinkedIn from '@/assets/icons/Linkedin.png';
import Phone from '@/assets/icons/Phone.png';
import Telegram from '@/assets/icons/Telegram.png';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Link, useParams } from 'react-router-dom';

const UserManagementViewDetail = () => {
  const { userId } = useParams();

  const id = Number(userId);

  const { data, isLoading, isError } = useGetUserProfileDetail(id);
  const [shareOpen, setShareOpen] = useState(false);

  if (isLoading) return <div className="text-white">Loading....</div>;
  if (isError) return <div className="text-white">Error....</div>;

  if (!data?.data) return null;

  const user = data.data;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-[38px] font-sans">
        <div className="flex flex-col">
          <Link
            to="/admin/user-management"
            className="flex flex-row items-center justify-start "
          >
            <ChevronLeft color="#F3F4F6" size="30" />

            <h2 className="text-[#FFFFFF]  font-semibold text-2xl leading-7">
              Back
            </h2>
          </Link>
          <h2 className="font-semibold  text-3xl font-sans text-[#FFFFFF]">
            User Profile
          </h2>
        </div>

        <div className="flex bg-slate-900 justify-between border border-[#99A1AF] rounded-xl pt-[17px] pr-[20px] pb-[18px] pl-[20px]">
          <div className="flex  gap-3">
            <img
              src={sampleUserImgUrl}
              alt=""
              className="w-[163px] h-[185px] rounded-md "
            />
            <div className="flex flex-col gap-3">
              <div>
                <p className="text-[#FFFFFF] font-semibold text-base leading-7">
                  {user?.devProfile.name}
                </p>
                <p className="text-[#99A1AF] leading-5 text-sm ">
                  {user?.devProfile.techStacks}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex  items-center  gap-3">
                  <div className="flex justify-center items-center gap-1">
                    <img
                      src={Email}
                      alt=""
                      className="w-5 h-5  text-[#99A1AF]"
                    />
                    <p className="text-[#99A1AF] text-sm leading-5">
                      {user?.devProfile.email}
                    </p>
                  </div>
                  <img src={Copy} alt="" className="w-4 h-4 text-[#364153]" />
                </div>

                <div className="flex  items-center  gap-3">
                  <div className="flex justify-center gap-1">
                    <img
                      src={Phone}
                      alt=""
                      className="w-5 h-5  text-[#99A1AF]"
                    />
                    <p className="text-[#99A1AF] text-sm leading-5">
                      {user?.devProfile.phone}
                    </p>
                  </div>
                  <img src={Copy} alt="" className="w-4 h-4 text-[#364153]" />
                </div>

                <div className="flex  items-center  gap-3">
                  <div className="flex justify-center gap-1">
                    <img
                      src={Telegram}
                      alt=""
                      className="w-5 h-5  text-[#99A1AF]"
                    />
                    <p className="text-[#99A1AF] text-sm leading-5">@nayGa4u</p>
                  </div>
                  <img src={Copy} alt="" className="w-4 h-4 text-[#364153]" />
                </div>
              </div>

              <div className="flex  gap-3">
                {user?.devProfile?.github && (
                  <a
                    href={
                      user.devProfile.github.startsWith('http')
                        ? user.devProfile.github
                        : `https://${user.devProfile.github}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[32px] h-[32px] flex items-center justify-center border border-[#F3F4F6] rounded-full"
                  >
                    <img src={Github} className="w-4 h-4" alt="github" />
                  </a>
                )}

                <a
                  href={user?.devProfile?.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-[32px] h-[32px] flex items-center justify-center border border-[#F3F4F6] rounded-full"
                >
                  <img src={LinkedIn} className="w-4 h-4" alt="LinkedIn" />
                </a>
                <div className="w-[32px] h-[32px] flex items-center justify-center border border-[#F3F4F6] text-[#F3F4F6] rounded-full">
                  <img src={Behance} className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={() => setShareOpen(true)}
              className="w-[108px] h-10 bg-[#9C39FC] p-2 rounded-lg font-medium text-[#F9FAFB] text-sm"
            >
              Share Profile
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <ProjectIdea user={user} />
          <ProjectPortfolio user={user} />
        </div>
      </div>

      <UserShareProfile shareOpen={shareOpen} setShareOpen={setShareOpen} />
    </div>
  );
};

export default UserManagementViewDetail;
