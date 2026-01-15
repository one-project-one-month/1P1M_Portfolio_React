import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { COLORS } from '@/constants/colors';
import { Button, DropdownMenu } from '@radix-ui/themes';
import { EllipsisVertical, Eye, Heart } from 'lucide-react';

const IdeaCard = () => {
  return (
    <div
      className={`px-4 py-6 md:px-8 md:py-10 space-y-4 md:space-y-6 rounded-lg bg-[${COLORS.primary}]`}
    >
      {/* Title and status */}
      <div className="flex items-start md:items-center justify-between gap-2 md:gap-4">
        <h3 className="capitalize text-lg sm:text-xl md:text-2xl font-bold text-white line-clamp-2 flex-1">
          smart order & booking
        </h3>
        <span className="px-3 md:px-6 py-1 text-xs md:text-sm text-white rounded-md capitalize bg-[#00A63E] whitespace-nowrap">
          approved
        </span>
      </div>

      {/* Desc */}
      <p className="line-clamp-3 text-sm md:text-base text-muted">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus a
        pariatur adipisci vel placeat perspiciatis at soluta velit eius
        architecto.
      </p>

      {/* Tags */}
      <div className="flex items-center justify-start gap-2 md:gap-x-4 flex-wrap">
        <span className="border border-black px-3 md:px-5 py-0.5 text-xs md:text-sm text-muted rounded-md capitalize">
          mobile
        </span>
        <span className="border border-black px-3 md:px-5 py-0.5 text-xs md:text-sm text-muted rounded-md capitalize">
          website
        </span>
      </div>

      {/* Submitter and leader */}
      <div className="flex items-center justify-between gap-x-4 md:gap-x-8 lg:gap-x-16">
        <div className="w-1/2 flex items-center justify-between gap-2">
          <span className="text-xs md:text-sm text-muted whitespace-nowrap">
            Submitter:
          </span>
          {/* TODO: change alt with username later */}
          <img
            src={sampleUserImgUrl}
            alt="sample-user"
            className="size-8 md:size-10 rounded-full shrink-0"
          />
        </div>
        <div className="w-1/2 flex items-center justify-between gap-2">
          <span className="text-xs md:text-sm text-muted whitespace-nowrap">
            Leader:
          </span>
          {/* TODO: change alt with user later */}
          <img
            src={sampleUserImgUrl}
            alt="sample-user"
            className="size-8 md:size-10 rounded-full shrink-0"
          />
        </div>
      </div>

      <hr />

      {/* Like, view and edit */}
      <div className="flex items-center justify-between p-1 md:p-2">
        <div className="w-1/2 flex items-center justify-start gap-4 md:gap-8">
          <span className="flex items-center gap-1 md:gap-2 text-muted text-sm md:text-base">
            <Heart className="w-4 h-4 md:w-5 md:h-5" />
            565
          </span>
          <span className="flex items-center gap-1 md:gap-2 text-muted text-sm md:text-base">
            <Eye className="w-4 h-4 md:w-5 md:h-5" />
            {/* TODO: change to dynamic count later */}
            <span>1.1K</span>
          </span>
        </div>
        <div className="w-1/2 flex items-center justify-end">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button
                variant="soft"
                style={{
                  color: 'white',
                  background: COLORS.primary,
                  cursor: 'pointer',
                }}
              >
                <EllipsisVertical className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Item>Edit Idea</DropdownMenu.Item>
              <DropdownMenu.Item>View Detail</DropdownMenu.Item>
              <DropdownMenu.Item>Delete Idea</DropdownMenu.Item>
              <DropdownMenu.Item>Change Status</DropdownMenu.Item>
              <DropdownMenu.Item>Import Portfolio</DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
};

export default IdeaCard;
