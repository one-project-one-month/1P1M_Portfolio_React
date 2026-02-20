import Copy from '@/assets/icons/copy.png';
import Email from '@/assets/icons/Email.png';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import Phone from '@/assets/icons/Phone.png';
import Telegram from '@/assets/icons/Telegram.png';
import { copyToClipboard } from '@/lib/utils';
import type { UserProfile } from '@/types/dev';
import { GitBranch, LinkedinIcon } from 'lucide-react';
import { ProfileActions } from '../../user-profile/components/profile-actions';
import type { DevProfileType } from '../../user-profile/types/user-profile.type';
import { truncate } from '../../user-profile/utils/string.utils';

type DeveloperProfileCardProps = {
  user: UserProfile | null;
  isMyProfile?: boolean;
};

function DeveloperProfileCard({
  user,
  isMyProfile = false,
}: DeveloperProfileCardProps) {
  if (!user) return;

  const {
    name,
    email,
    phone,
    github,
    linkedIn,
    aboutDev,
    profilePictureUrl,
    techStacks,
  } = user;

  const handleShareProfile = () => {
    copyToClipboard(window.location.href);
  };

  const displayName = name || 'Anonymous Developer';
  const displayEmail = email || 'No email provided';
  const displayAbout =
    aboutDev?.trim() || 'This developer hasn’t added a bio yet.';

  return (
    <div className="w-full relative flex gap-x-6 items-center p-5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/5">
      <div className="flex flex-col gap-2 items-center shrink-0">
        <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800">
          <img
            src={profilePictureUrl || sampleUserImgUrl}
            alt={displayName}
            className="w-40 aspect-square object-cover"
          />
        </div>

        <div className="flex gap-3 text-white/70">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="GitHub"
            >
              <GitBranch className="border rounded-full w-7 h-7 p-1" />
            </a>
          ) : (
            <span
              className="border rounded-full w-7 h-7 p-1 opacity-30 cursor-not-allowed"
              title="No GitHub linked"
            >
              <GitBranch className="border rounded-full w-7 h-7 p-1" />
            </span>
          )}

          {linkedIn ? (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="border rounded-full w-7 h-7 p-1" />
            </a>
          ) : (
            <span
              className="border rounded-full w-7 h-7 p-1 opacity-30 cursor-not-allowed"
              title="No LinkedIn linked"
            >
              <LinkedinIcon className="border rounded-full w-7 h-7 p-1" />
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-3 max-w-80 justify-between">
        <p className="text-white font-semibold text-base leading-7">
          {displayName}
        </p>

        <p className="text-[#99A1AF] flex gap-2 items-center leading-5 text-sm">
          {techStacks.map((t) => (
            <span className="bg-slate-700/80 border rounded-md border-slate-400 px-3 p-1">
              {t}
            </span>
          ))}
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <img src={Email} alt="" className="w-5 h-5" />
            <p className="text-[#99A1AF] text-sm leading-5">{displayEmail}</p>
          </div>

          {email && (
            <button onClick={() => copyToClipboard(email)}>
              <img src={Copy} alt="copy" className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <img src={Phone} alt="" className="w-5 h-5" />
            <p className="text-[#99A1AF] text-sm leading-5">
              {phone || 'No phone number'}
            </p>
          </div>

          {phone && (
            <button onClick={() => copyToClipboard(phone)}>
              <img src={Copy} alt="copy" className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <img src={Telegram} alt="" className="w-5 h-5" />
            <p className="text-[#99A1AF] text-sm leading-5">Not provided</p>
          </div>
        </div>

        <p className="text-white text-sm h-10 line-clamp-2 mt-2">
          {displayAbout}
        </p>
      </div>

      <ProfileActions
        devProfile={user as DevProfileType}
        onCopy={handleShareProfile}
        truncate={truncate}
        className="absolute right-3 top-3 h-10"
        isMyProfile={isMyProfile}
      />
    </div>
  );
}

export default DeveloperProfileCard;
