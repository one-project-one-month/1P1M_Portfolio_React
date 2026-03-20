import githubIcon from '@/assets/icons/github-social.svg';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import linkedinIcon from '@/assets/icons/linkedin-social.svg';
import type { DevProfileCardProps } from '@/types/dev';

const DevCard = ({ devProfile, viewProfile }: DevProfileCardProps) => {
  const { name, profilePictureUrl, github, linkedIn, aboutDev, tech_stack } =
    devProfile;

  const hasGithub = github?.trim();
  const hasLinkedIn = linkedIn?.trim();
  const hasBio = aboutDev?.trim();
  const hasTechStack = tech_stack?.length > 0;

  const techColors = [
    'bg-indigo-500/10 text-indigo-400',
    'bg-emerald-500/10 text-emerald-400',
    'bg-orange-500/10 text-orange-400',
    'bg-pink-500/10 text-pink-400',
    'bg-sky-500/10 text-sky-400',
  ];

  return (
    <div
      className="group relative flex h-full cursor-pointer flex-col rounded-3xl border border-white/5 bg-[#1a1a2e]/70 backdrop-blur-[0.5px] p-7 transition-all duration-350 hover:-translate-y-0.5 hover:border-white/10 hover:bg-[#1f1f35]/85 hover:shadow-[0_24px_48px_rgba(0,0,0,0.2)]"
      onClick={viewProfile}
    >
      {/* Gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-transparent via-transparent to-indigo-500/[0.04] opacity-0 transition-opacity duration-350 group-hover:opacity-100" />

      {/* Avatar row */}
      <div className="relative z-[1] mb-5 flex items-center gap-4">
        <div className="relative shrink-0">
          <img
            src={profilePictureUrl || sampleUserImgUrl}
            alt={name || 'Developer'}
            className="size-14 rounded-full border-2 border-white/15 object-cover transition-all duration-350 group-hover:border-indigo-500/40 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            onError={(e) => {
              e.currentTarget.src = sampleUserImgUrl;
            }}
          />
          {/* Spinning ring on hover */}
          <div className="pointer-events-none absolute -inset-[3px] rounded-full border-2 border-transparent border-t-indigo-500 border-r-indigo-500 opacity-0 transition-opacity duration-350 group-hover:opacity-100 group-hover:animate-spin" />
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="truncate font-outfit text-lg font-bold leading-tight tracking-tight text-white">
            {name}
          </h3>
        </div>

        {/* Social icons — text labels like the mock */}
        {(hasGithub || hasLinkedIn) && (
          <div className="ml-auto flex shrink-0 gap-1.5">
            {hasGithub && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex size-9 items-center justify-center rounded-lg bg-white/10 transition-all hover:bg-indigo-500/20"
              >
                <img
                  src={githubIcon}
                  alt="GitHub"
                  className="size-4 opacity-70"
                />
              </a>
            )}
            {hasLinkedIn && (
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex size-9 items-center justify-center rounded-lg bg-white/10 transition-all hover:bg-indigo-500/20"
              >
                <img
                  src={linkedinIcon}
                  alt="LinkedIn"
                  className="size-4 opacity-70"
                />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Tech pills */}
      {hasTechStack && (
        <div className="relative z-[1] mb-4 flex flex-wrap gap-1.5">
          {tech_stack.slice(0, 3).map((t, i) => (
            <span
              key={t}
              className={`rounded-lg px-3 py-1 text-[0.7rem] font-semibold tracking-wide ${techColors[i % techColors.length]}`}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Bio */}
      <p className="relative z-[1] mb-5 flex-1 line-clamp-2 text-sm leading-relaxed text-white/55">
        {hasBio ? aboutDev : ''}
      </p>

      {/* Footer */}
      <div className="relative z-[1] flex items-center justify-between border-t border-white/10 pt-5">
        <span className="flex items-center gap-3 text-[0.82rem] font-medium text-white/60 transition-colors group-hover:text-indigo-400">
          View profile
          <span className="flex size-9 items-center justify-center rounded-full bg-white/10 text-sm transition-all group-hover:translate-x-1 group-hover:bg-indigo-500/15 group-hover:text-indigo-400">
            &rarr;
          </span>
        </span>
      </div>
    </div>
  );
};

export default DevCard;
