import ProjectIdea from '@/app/features/user-management/components/user-management-detail/project-idea/project-idea';
import ProjectPortfolio from '@/app/features/user-management/components/user-management-detail/project-portfolio/project-portfolio';
import UserShareProfile from '@/app/features/user-management/components/user-share-profile-dialog';
import { useGetUserProfileDetail } from '@/app/features/user-management/hook/use-user-management';
import Copy from '@/assets/icons/copy.png';
import Email from '@/assets/icons/Email.png';
import Github from '@/assets/icons/GitHub.png';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import LinkedIn from '@/assets/icons/Linkedin.png';
import Phone from '@/assets/icons/Phone.png';
import Telegram from '@/assets/icons/Telegram.png';
import { useToast } from '@/components/ui/toast-provider';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';

import { Link, useParams } from 'react-router-dom';

const UserManagementViewDetail = () => {
  const { userId } = useParams();
  const { addToast } = useToast();

  const id = Number(userId);

  const { data, isLoading, isError } = useGetUserProfileDetail(id);
  const [shareOpen, setShareOpen] = useState(false);

  if (isLoading) return <div className="text-white">Loading....</div>;
  if (isError) return <div className="text-white">Error....</div>;

  if (!data?.data) return null;

  const user = data.data;

  const handleCopy = (text: string) => {
    if (!text) return;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        addToast('Copied to clipboard!', 'success', 3000);
      })
      .catch((err) => {
        console.error('Failed to copy!', err);
        addToast('Failed to copy!', 'error', 3000);
      });
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 font-sans">
        <div className="flex flex-col">
          <Link
            to="/admin/user-management"
            className="flex flex-row items-center justify-start mt-4 mb-6"
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

        <div className="flex bg-slate-900 justify-between rounded-xl pt-[17px] pr-[20px] pb-[18px] pl-[20px]">
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
                <div className="text-[#99A1AF]  flex gap-3 leading-5 text-sm">
                  {user?.devProfile.techStacks?.map((stack, index) => (
                    <p key={index} className="bg-[#1E2132] px-2 p-1 rounded-sm">
                      {stack}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex  items-center  gap-3">
                  <div className="flex justify-center items-center gap-2">
                    <img
                      src={Email}
                      alt=""
                      className="w-5 h-5  text-[#99A1AF]"
                    />
                    <p className="text-[#99A1AF] text-sm leading-5">
                      {user?.devProfile.email}
                    </p>
                  </div>
                  <img
                    src={Copy}
                    alt=""
                    className="w-4 h-4 text-[#364153]"
                    onClick={() => handleCopy(user?.devProfile.email || '')}
                  />
                </div>

                <div className="flex  items-center  gap-3">
                  <div className="flex justify-center gap-2">
                    <img
                      src={Phone}
                      alt=""
                      className="w-5 h-5  text-[#99A1AF]"
                    />
                    {user?.devProfile.phone ? (
                      <p className="text-[#99A1AF] text-sm leading-5">
                        {user?.devProfile.phone}
                      </p>
                    ) : (
                      <p className="text-[#99A1AF] text-sm leading-5">
                        No phone provided
                      </p>
                    )}
                  </div>
                  {user?.devProfile.phone && (
                    <img
                      src={Copy}
                      alt=""
                      className="w-4 h-4 text-[#364153]"
                      onClick={() => handleCopy(user?.devProfile.phone || '')}
                    />
                  )}
                </div>

                <div className="flex  items-center  gap-3">
                  <div className="flex justify-center gap-2">
                    <img
                      src={Telegram}
                      alt=""
                      className="w-5 h-5  text-[#99A1AF]"
                    />
                    {user.devProfile.telegramUsername ? (
                      <p className="text-[#99A1AF] text-sm leading-5">
                        {user.devProfile.telegramUsername}
                      </p>
                    ) : (
                      <p className="text-[#99A1AF] text-sm leading-5">
                        No telegram provided
                      </p>
                    )}
                  </div>
                  {user.devProfile.telegramUsername && (
                    <img
                      src={Copy}
                      alt=""
                      className="w-4 h-4 text-[#364153]"
                      onClick={() =>
                        handleCopy(user.devProfile.telegramUsername || '')
                      }
                    />
                  )}
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
