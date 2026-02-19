import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import type { DevProfileCardProps } from '@/types/dev';
import { GitBranch, LinkedinIcon } from 'lucide-react';

const DevCard = ({ devProfile, viewProfile }: DevProfileCardProps) => {
  const { name, profilePictureUrl, github, linkedIn, aboutDev, tech_stack } =
    devProfile;

  const hasGithub = github?.trim();
  const hasLinkedIn = linkedIn?.trim();

  return (
    <div className="w-full mt-12">
      <div className="h-full bg-white/10 rounded-lg p-6 relative flex flex-col backdrop-blur-xs overflow-visible border border-white/5">
        <div className="flex gap-6">
          <div className="flex flex-col items-center shrink-0 w-30">
            <div className="size-[120px] -mt-16 relative rounded-xl overflow-hidden shadow-2xl bg-gray-800">
              <img
                src={profilePictureUrl || sampleUserImgUrl}
                alt={name || 'Developer'}
                className="size-full object-cover"
              />
            </div>

            {(hasGithub || hasLinkedIn) && (
              <div className="flex gap-3 mt-6 text-white/70">
                {hasGithub && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    <GitBranch size={20} />
                  </a>
                )}

                {hasLinkedIn && (
                  <a
                    href={linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    <LinkedinIcon size={20} />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col pt-1 w-full text-start overflow-hidden">
            <h3 className="text-2xl font-bold text-white truncate leading-tight">
              {name}
            </h3>

            <div className="mt-2 flex gap-2 mb-3 min-h-7">
              {tech_stack?.length ? (
                tech_stack
                  .slice(0, 2)
                  .map((t) => (
                    <span className="bg-slate-700/80 border text-xs text-slate-400 rounded-md border-slate-400 px-3 p-1">
                      {t}
                    </span>
                  ))
              ) : (
                <span className="bg-slate-700/80 border text-xs text-slate-400 rounded-md border-slate-400 px-3 p-1">
                  No techstack
                </span>
              )}
            </div>

            <p className="text-[#99A1AF] text-sm leading-relaxed line-clamp-2 h-12">
              {aboutDev?.trim() ? aboutDev : 'No bio available yet.'}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={viewProfile}
            className="w-full py-3 rounded-md border border-[#7C3AED] text-white font-semibold text-sm hover:bg-[#7C3AED]/10 transition-all active:scale-[0.98]"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default DevCard;
