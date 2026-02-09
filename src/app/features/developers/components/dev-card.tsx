import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import type { DevProfileCardProps } from '@/types/dev';
import { GitBranch, LinkedinIcon, TwitterIcon } from 'lucide-react'; // Added Twitter as placeholder for middle icon

const DevCard = ({ devProfile, viewProfile }: DevProfileCardProps) => {
  return (
    <div className="w-full max-w-[420px] h-[243px]  mt-12">
      <div className="bg-white/10 rounded-lg p-6 relative flex flex-col  backdrop-blur-xs overflow-visible border border-white/5">
        <div className="flex gap-6">
          <div className="flex flex-col items-center shrink-0 w-[120px]">
            <div className="size-[120px] -mt-16 relative rounded-xl overflow-hidden shadow-2xl bg-gray-800">
              <img
                src={devProfile.profilePictureUrl ?? sampleUserImgUrl}
                alt={devProfile.name}
                className="size-full object-cover"
              />
            </div>

            {/* 2. Social Icons (Centered under image) */}
            <div className="flex gap-3 mt-6 text-white/70">
              <a href="#" className="hover:text-white transition-colors">
                <GitBranch size={20} />
              </a>

              <a href="#" className="hover:text-white transition-colors">
                <TwitterIcon size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Text Info */}
          <div className="flex flex-col pt-1 w-full text-start overflow-hidden">
            <h3 className="text-2xl font-bold text-white truncate leading-tight">
              {devProfile.name}
            </h3>

            {/* Tech Stack Badge */}
            <div className="mt-2 mb-3">
              <span className="inline-block bg-[#2E3140] border border-white/10 text-[#7F8EA3] text-xs px-3 py-1 rounded-lg">
                {devProfile.tech_stack || 'Front-end'}
              </span>
            </div>

            <p className="text-[#99A1AF] text-sm leading-relaxed line-clamp-1">
              {devProfile.aboutDev ||
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'}
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
