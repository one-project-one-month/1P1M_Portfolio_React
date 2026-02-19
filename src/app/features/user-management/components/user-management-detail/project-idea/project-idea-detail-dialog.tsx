import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import { Dialog } from '@radix-ui/themes';
import type { ReactNode } from 'react';
type projectDetailDialogProps = {
  trigger?: ReactNode;
  viewDetailOpen: boolean;
  setViewDetailOpend: (open: boolean) => void;
};

const PorjectIdeaViewDetailDialog = ({
  trigger,
  viewDetailOpen,
  setViewDetailOpend,
}: projectDetailDialogProps) => {
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
            <Dialog.Title className="text-[#F9FAFB] font-medium text-2xl leading-8">
              Project Details
            </Dialog.Title>
            <div className="flex flex-col gap-2">
              <div className="flex gap-5">
                <h2 className="text-[#F9FAFB] font-sans font-medium text-lg">
                  Project idea Name
                </h2>
                <div className="border p-1 rounded-2xl border-[#7CCF00] flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#7CCF00]"></div>
                  <p className="text-[#7CCF00] font-semibold text-xs">
                    Approved
                  </p>
                </div>
              </div>
              <p className="text-[#6A7282] text-base font-sans">
                Smart Order & Booking Management System
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-[#FFFFFF] text-lg font-semibold">
                Project Type
              </h2>
              <div className="flex  gap-3">
                <button className="h-6 px-2 text-center rounded-xl border border-[#6F28B3] text-xs text-[#99A1AF] font-light">
                  Website
                </button>
                <button className="h-6 px-2 text-center rounded-xl border border-[#6F28B3] text-xs text-[#99A1AF] font-light">
                  Mobile
                </button>
              </div>
            </div>

            <div className="flex gap-6">
              <div>
                <h2 className="text-[#FFFFFF] text-lg font-semibold font-sans">
                  React Count
                </h2>
                <p className="text-[#6A7282] text-base font-sans">1.2k</p>
              </div>
              <div>
                <h2 className="text-[#FFFFFF] text-lg font-semibold font-sans">
                  View Count
                </h2>
                <p className="text-[#6A7282] text-base font-sans">2.3k</p>
              </div>
            </div>

            <div>
              <h2 className="text-[#FFFFFF] text-lg font-medium">
                Description
              </h2>
              <Dialog.Description className="text-[#6A7282] font-normal font-sans text-base leading-7">
                A web-based system that allows customers to book tables and
                place food orders online. Restaurant staff can manage orders,
                reservations, and table availability through an admin dashboard.
                The system improves efficiency, reduces manual work, and
                enhances the customer experience.
              </Dialog.Description>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col gap-5">
                <h2 className="text-[#FFFFFF] text-lg font-medium">
                  Submitter
                </h2>
                <div className="flex gap-3 items-center">
                  <img
                    src={sampleUserImgUrl}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-[#D9D9D9] text-base font-semibold">
                      Kathryn Murphy
                    </h4>
                    <p className="text-[#6A7282] text-sm">user@example.com</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <h2 className="text-[#FFFFFF] text-lg font-medium">
                  Project Leader
                </h2>
                <div className="flex gap-3 items-center">
                  <img
                    src={sampleUserImgUrl}
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-[#D9D9D9] text-base font-semibold">
                      Kathryn Murphy
                    </h4>
                    <p className="text-[#6A7282] text-sm">user@example.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <Button className="w-[45%] bg-[#000000] hover:bg-[#000000] focus:bg-[#000000] border border-[#6F28B3]">
              Cancel
            </Button>
            <Button className="w-[45%] bg-[#6F28B3] hover:bg-[#6F28B3] focus:bg-[#6F28B3]">
              Confirm
            </Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default PorjectIdeaViewDetailDialog;
