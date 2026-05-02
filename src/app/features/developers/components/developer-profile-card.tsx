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
  if (!user) return null;

  const {
    name,
    email,
    phone,
    github,
    linkedIn,
    aboutDev,
    profilePictureUrl,
    telegramUsername,
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
    <div className="w-full relative rounded-[2rem] bg-slate-900/60 backdrop-blur-2xl border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-300">
      {/* Frosted Gray Banner */}
      <div className="h-28 md:h-36 w-full bg-slate-800/40 border-b border-slate-700/50 relative">
        {/* Decorative subtle texture/gradient for the banner */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />

        {/* Absolute Actions - Positioned inside the banner */}
        <div className="absolute right-4 top-4 md:right-6 md:top-6 z-20">
          <ProfileActions
            devProfile={user as DevProfileType}
            onCopy={handleShareProfile}
            truncate={truncate}
            className="h-9 [&_button]:bg-slate-800/60 [&_button]:border-slate-600/50 [&_button]:backdrop-blur-md [&_button]:text-slate-200 hover:[&_button]:bg-slate-700/80 hover:[&_button]:text-white transition-all"
            isMyProfile={isMyProfile}
            shareUrl={shareUrl}
          />
        </div>
      </div>

      <div className="px-6 pb-8 md:px-10 md:pb-10 relative">
        {/* Avatar & Socials Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 -mt-12 md:-mt-16 mb-6">
          {/* Overlapping Gray Glass Avatar */}
          <div className="relative inline-block w-max shrink-0 self-start md:self-auto rounded-[1.5rem] p-1.5 bg-slate-800/60 backdrop-blur-xl border border-slate-600/50 shadow-xl z-10">
            <Avatar
              src={profilePictureUrl}
              fallback={displayName.slice(0, 1)}
              alt={displayName}
              size="8"
              color="gray"
              className="rounded-xl overflow-hidden bg-slate-900 w-24 h-24 md:w-32 md:h-32 object-cover"
            />
          </div>

          {/* Glass Social Links */}
          <div className="flex items-center gap-3 md:pb-2">
            {github ? (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2.5 rounded-xl bg-slate-800/40 hover:bg-slate-700/60 border border-slate-700/50 backdrop-blur-sm transition-all text-slate-300 hover:text-white shadow-sm"
                title="GitHub"
              >
                <GitBranch className="w-5 h-5" />
              </a>
            ) : null}

            {linkedIn ? (
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-2.5 rounded-xl bg-slate-800/40 hover:bg-[#0A66C2]/20 border border-slate-700/50 hover:border-[#0A66C2]/30 backdrop-blur-sm transition-all text-slate-300 hover:text-[#0A66C2] shadow-sm"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>
            ) : null}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col gap-y-5 w-full">
          {/* Header Info */}
          <div>
            <h2 className="text-white font-bold text-2xl md:text-3xl tracking-tight drop-shadow-sm">
              {displayName}
            </h2>
            <p className="text-slate-400 text-sm mt-1 font-medium tracking-wide uppercase">
              Software Developer
            </p>
          </div>

          {/* Glass Tech Stacks */}
          <div className="flex flex-wrap gap-2 items-center">
            {techStacks && techStacks.length > 0 ? (
              techStacks.map((t) => (
                <span
                  key={t}
                  className="bg-slate-800/40 text-slate-300 border border-slate-700/50 backdrop-blur-md rounded-lg px-3 py-1 text-sm font-medium capitalize"
                >
                  {t}
                </span>
              ))
            ) : (
              <span className="text-slate-500 text-sm italic">
                No tech stacks provided
              </span>
            )}
          </div>

          {/* Bio */}
          <p className="text-slate-300 text-[15px] leading-relaxed max-w-3xl font-light">
            {displayAbout}
          </p>

          <hr className="border-slate-700/50 my-2" />

          {/* Gray Glass Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
            {/* Email */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm group hover:bg-slate-700/40 transition-colors">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="p-1.5 rounded-lg bg-slate-700/50">
                  <img
                    src={Email}
                    alt="Email"
                    className="w-4 h-4 opacity-70 filter invert"
                  />
                </div>
                <p className="text-slate-300 text-sm truncate">
                  {displayEmail}
                </p>
              </div>
              {email && (
                <button
                  onClick={() => copyToClipboard(email)}
                  className="p-1.5 rounded-lg hover:bg-slate-600/50 transition-colors"
                  title="Copy Email"
                >
                  <img
                    src={Copy}
                    alt="copy"
                    className="w-4 h-4 opacity-50 filter invert hover:opacity-100 transition-opacity"
                  />
                </button>
              )}
            </div>

            {/* Phone */}
            {(withUsername || isMyProfile) && (
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm group hover:bg-slate-700/40 transition-colors">
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="p-1.5 rounded-lg bg-slate-700/50">
                    <img
                      src={Phone}
                      alt="Phone"
                      className="w-4 h-4 opacity-70 filter invert"
                    />
                  </div>
                  <p className="text-slate-300 text-sm truncate">
                    {phone || 'No phone number'}
                  </p>
                </div>
                {phone && (
                  <button
                    onClick={() => copyToClipboard(phone)}
                    className="p-1.5 rounded-lg hover:bg-slate-600/50 transition-colors"
                    title="Copy Phone"
                  >
                    <img
                      src={Copy}
                      alt="copy"
                      className="w-4 h-4 opacity-50 filter invert hover:opacity-100 transition-opacity"
                    />
                  </button>
                )}
              </div>
            )}

            {/* Telegram */}
            {(withUsername || isMyProfile) && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/40 transition-colors">
                <div className="p-1.5 rounded-lg bg-slate-700/50">
                  <img
                    src={Telegram}
                    alt="Telegram"
                    className="w-4 h-4 opacity-70 filter invert"
                  />
                </div>
                <p className="text-slate-300 text-sm truncate">
                  {telegramUsername || 'No Telegram username'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperProfileCard;
