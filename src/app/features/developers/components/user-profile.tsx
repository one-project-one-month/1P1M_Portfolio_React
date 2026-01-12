import { useLocation } from 'react-router-dom';

import defaultUserImage from '@/assets/user.png';
import FormBackground from '@/components/ui/form-background';

const UserProfilePage = () => {
  const location = useLocation();
  const devDatas = location.state?.devData;

  return (
    <div className="flex flex-col min-h-[80vh] text-white">
      <div className="grow flex justify-center items-center py-10">
        <FormBackground className="w-full md:max-w-[600px] rounded-2xl bg-[#1F2833]/60 backdrop-blur-md shadow-lg p-10">
          <div className="flex flex-col items-center text-center">
            {/* Profile Picture */}
            <img
              src={devDatas.profilePictureUrl || defaultUserImage}
              alt={devDatas.name}
              className="w-[110px] h-[110px] rounded-full object-cover border-4 border-[#66FCF1] shadow-md"
            />

            {/* Name */}
            <h2 className="text-2xl font-semibold mt-6">{devDatas.name}</h2>
            <p className="text-[#66FCF1] text-sm mt-1">
              {devDatas.tech_stack} Developer
            </p>

            {/* Description */}
            <p className="text-[#ADADADA3] text-sm mt-1">{devDatas.aboutDev}</p>

            {/* Info Section */}
            <div className="mt-8 w-full flex flex-col gap-4 text-left">
              <div className="flex items-center justify-between border-b border-gray-600 pb-2">
                <span className="font-medium text-gray-300">Email</span>
                <p className="text-sm text-gray-200">{devDatas.email}</p>
              </div>

              {devDatas.github && (
                <div className="flex items-center justify-between border-b border-gray-600 pb-2">
                  <span className="font-medium text-gray-300">GitHub</span>
                  <a
                    href={devDatas.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-sm truncate max-w-[300px] text-right"
                  >
                    {devDatas.github}
                  </a>
                </div>
              )}

              {devDatas.linkedIn && (
                <div className="flex items-center justify-between border-b border-gray-600 pb-2">
                  <span className="font-medium text-gray-300">LinkedIn</span>
                  <a
                    href={devDatas.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-sm truncate max-w-[300px] text-right"
                  >
                    {devDatas.linkedIn}
                  </a>
                </div>
              )}
            </div>
          </div>
        </FormBackground>
      </div>
    </div>
  );
};

export default UserProfilePage;
