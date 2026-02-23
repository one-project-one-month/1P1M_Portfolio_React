import Copy from '@/assets/icons/copy.png';
import Email from '@/assets/icons/Email.png';
import Phone from '@/assets/icons/Phone.png';
import Telegram from '@/assets/icons/Telegram.png';
import { copyToClipboard } from '@/lib/utils';
import type { UserProfile } from '@/types/dev';
import { Avatar } from '@radix-ui/themes';
import { GitBranch, LinkedinIcon } from 'lucide-react';
import { ProfileActions } from '../../user-profile/components/profile-actions';
import type { DevProfileType } from '../../user-profile/types/user-profile.type';
import { truncate } from '../../user-profile/utils/string.utils';

type DeveloperProfileCardProps = {
  user: UserProfile | null;
  isMyProfile?: boolean;
  withUsername?: boolean;
};

function DeveloperProfileCard({
  user,
  isMyProfile = false,
  withUsername = false,
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

  const shareUrl = `${window.location.origin}/profile/${email.split('@')[0]}`;

  const handleShareProfile = () => {
    copyToClipboard(shareUrl);
  };

  const displayName = name || 'Anonymous Developer';
  const displayEmail = email || 'No email provided';
  const displayAbout =
    aboutDev?.trim() || 'This developer hasn’t added a bio yet.';

  return (
    <div className="w-full relative flex gap-x-6 items-center p-5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/5">
      <div className="flex flex-col gap-2 items-center shrink-0">
        <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-800">
          <Avatar
            src={profilePictureUrl}
            fallback={displayName.slice(0, 1)}
            alt={displayName}
            size="9"
            color="gray"
            className="bg-gray-600!"
          />
        </div>

        <div className="flex items-center gap-3 text-white/70">
          {github ? (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
              title="GitHub"
            >
              <GitBranch className="rounded-full border w-7 h-7 p-1" />
            </a>
          ) : (
            <GitBranch className="border rounded-full w-7 h-7 p-1 opacity-30 cursor-not-allowed" />
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
            <LinkedinIcon className="border rounded-full w-7 h-7 p-1 opacity-30 cursor-not-allowed" />
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-3 max-w-80 justify-between">
        <p className="text-white font-semibold text-base leading-7">
          {displayName}
        </p>

        <p className="text-[#99A1AF] flex gap-2 items-center leading-5 text-sm">
          {techStacks.length > 0 ? (
            techStacks.map((t) => (
              <span className="bg-slate-700/80 border rounded-md border-slate-400 px-3 py-1 capitalize">
                {t}
              </span>
            ))
          ) : (
            <span className="bg-slate-700/80 border rounded-md border-slate-400 px-3 py-1">
              No tech stacks provided
            </span>
          )}
        </p>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <img src={Email} alt="" className="w-5 h-5" />
            <p className="text-[#99A1AF] text-sm leading-5">{displayEmail}</p>
          </div>

          {email && (
            <button onClick={() => copyToClipboard(email)}>
              <img src={Copy} alt="copy" className="w-4 h-4" />
            </button>
          )}
        </div>

        {!withUsername && (
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
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
        )}

        <div className="flex items-center gap-2">
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
        shareUrl={shareUrl}
      />
    </div>
  );
}

export default DeveloperProfileCard;
