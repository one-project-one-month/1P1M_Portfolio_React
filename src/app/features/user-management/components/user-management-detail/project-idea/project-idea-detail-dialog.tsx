import { useGetProjectIdeaDetail } from '@/app/features/user-management/hook/use-project-idea';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
type projectDetailDialogProps = {
  trigger?: ReactNode;
  viewDetailOpen: boolean;
  setViewDetailOpend: (open: boolean) => void;

  projectIdeaId: number;
};

const PorjectIdeaViewDetailDialog = ({
  trigger,
  viewDetailOpen,
  setViewDetailOpend,
  projectIdeaId,
}: projectDetailDialogProps) => {
  const { data } = useGetProjectIdeaDetail(projectIdeaId);

  const projectIdeaDetail = data?.data;

  return (
    <Dialog.Root open={viewDetailOpen} onOpenChange={setViewDetailOpend}>
      <Dialog.Trigger>
        <button type="button" className="text-white">
          {trigger}
        </button>
      </Dialog.Trigger>

      <Dialog.Content
        size="4"
        maxWidth="758px"
        style={{
          background: 'black',
          color: 'white',
          padding: '60px',
          height: '773px',
          border: '1px solid #364153',
        }}
      >
        <div className="w-full h-full flex flex-col gap-10 ">
          <div className="flex flex-col gap-5">
            <div className="flex justify-between">
              <Dialog.Title className="text-[#F9FAFB] font-sans font-medium text-2xl leading-8">
                Project Details
                <div className="w-15  border-2 border-[#FFBA00]"></div>
              </Dialog.Title>
              <X
                color="#99A1AF"
                size={20}
                className="cursor-pointer"
                onClick={() => setViewDetailOpend(false)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex gap-5">
                <h2 className="text-[#F9FAFB] font-sans font-semibold leading-7 text-lg">
                  Project Idea Name
                </h2>
                <div className="border-2 px-1 rounded-2xl border-[#7CCF00] flex items-center gap-1">
                  <div className="h-2 w-2 rounded-full bg-[#7CCF00]"></div>
                  <p className="text-[#7CCF00] leading-4 font-semibold text-xs">
                    {projectIdeaDetail?.status}
                  </p>
                </div>
              </div>
              <p className="text-[#6A7282] text-base font-sans leading-6">
                {projectIdeaDetail?.projectIdeaName}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#FFFFFF] text-lg leading-7 font-semibold">
                Project Type
              </h2>

              <div className="flex  gap-3">
                {projectIdeaDetail?.projectTypes.map((item) => (
                  <button className="h-6 px-3 text-center rounded-lg border border-[#6F28B3] text-xs text-[#99A1AF] bg-[#1D293D] font-light">
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col gap-2">
                <h2 className="text-[#FFFFFF] text-lg font-semibold leading-7 font-sans">
                  React Count
                </h2>
                <p className="text-[#6A7282] text-base leading-6 font-sans">
                  {projectIdeaDetail?.reactionCount}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h2 className="text-[#FFFFFF] text-lg font-semibold font-sans">
                  View Count
                </h2>
                <p className="text-[#6A7282] text-base font-sans">
                  {projectIdeaDetail?.viewCount}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-[#F9FAFB] text-lg font-medium leading-7 font-sans">
                Description
              </h2>
              <Dialog.Description className="text-[#6A7282] font-normal font-sans text-base leading-6">
                {/* A web-based system that allows customers to book tables and
                place food orders online. Restaurant staff can manage orders,
                reservations, and table availability through an admin dashboard.
                The system improves efficiency, reduces manual work, and
                enhances the customer experience. */}
                {projectIdeaDetail?.description}
              </Dialog.Description>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col gap-5">
                <h2 className="text-[#F9FAFB] text-lg font-sans font-medium">
                  Submitter
                </h2>
                <div className="flex gap-3 items-center">
                  <img
                    src={sampleUserImgUrl}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-[#D9D9D9] text-base font-sans leading-6 font-semibold">
                      Kathryn Murphy
                    </h4>
                    <p className="text-[#6A7282] leading-5 font-sans text-sm">
                      user@example.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                onClick={() => setViewDetailOpend(false)}
                className="w-[45%] bg-[#000000] hover:bg-[#000000] focus:bg-[#000000] border border-[#6F28B3]"
              >
                Cancel
              </Button>
              <Button className="w-[45%] bg-[#6F28B3] hover:bg-[#6F28B3] focus:bg-[#6F28B3]">
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PorjectIdeaViewDetailDialog;
