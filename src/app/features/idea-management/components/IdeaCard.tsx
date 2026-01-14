import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { EllipsisVertical, Eye, Heart } from 'lucide-react';

const IdeaCard = () => {
  return (
    <div className="px-6 py-10 space-y-6 rounded-lg bg-[#6F28B3]">
      {/* Title and status */}
      <div className="flex items-center justify-between">
        <h3 className="capitalize text-2xl font-semibold text-white">
          smart order & booking
        </h3>
        <span className="px-6 py-1 text-sm text-white rounded-md capitalize bg-[#00A63E]">
          approved
        </span>
      </div>

      {/* Desc */}
      <p className="line-clamp-3 text-muted">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus a
        pariatur adipisci vel placeat perspiciatis at soluta velit eius
        architecto.
      </p>

      {/* Tags */}
      <div className="flex items-center justify-start gap-4">
        <span className="border border-black px-4 text-sm text-muted rounded-md capitalize">
          mobile
        </span>
        <span className="border border-black px-4 text-sm text-muted rounded-md capitalize">
          website
        </span>
      </div>

      {/* Submitter and leader */}
      <div className="flex items-center justify-between gap-16">
        <div className="w-1/2 flex items-center justify-between">
          <span className="text-muted">Submitter: </span>
          {/* TODO: change alt with user later */}
          <img
            src={sampleUserImgUrl}
            alt="sample-user"
            className="size-10 rounded-full"
          />
        </div>
        <div className="w-1/2 flex items-center justify-between">
          <span className="text-muted">Leader: </span>
          {/* TODO: change alt with user later */}
          <img
            src={sampleUserImgUrl}
            alt="sample-user"
            className="size-10 rounded-full"
          />
        </div>
      </div>

      <hr />

      {/* Like, view and edit */}
      <div className="flex items-center justify-between px-2">
        <div className="w-1/2 flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted">
            <Heart />
            565
          </span>
          <span className="flex items-center gap-2 text-muted">
            <Eye />
            {/* TODO: change to dynamic count later */}
            <span>1.1K</span>
          </span>
        </div>
        <div className="w-1/2 flex items-center justify-end">
          <button
            type="button"
            className="text-muted"
            onClick={() => console.log('clicked')}
          >
            <EllipsisVertical />
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
