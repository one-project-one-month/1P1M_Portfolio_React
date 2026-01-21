import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import { COLORS } from '@/constants/colors';
import { buttonVariants } from '@/styles/button-variants';
import { Badge, Dialog } from '@radix-ui/themes';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';

type ProjectIdeaDetailDialogProps = {
  trigger?: ReactNode;
};

const ProjectIdeaDetailDialog = ({ trigger }: ProjectIdeaDetailDialogProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{trigger || <>View Detail</>}</Dialog.Trigger>

      <Dialog.Content
        size="4"
        maxWidth="758px"
        className="bg-black! text-white px-16! py-12! rounded-3xl!"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <Dialog.Title size="7" className="mb-0!">
              Project Details
            </Dialog.Title>
            <div
              style={{
                borderBottom: `7px solid ${COLORS.secondary}`,
                borderRadius: '15px',
                maxWidth: '50px',
              }}
            />
          </div>
          <Dialog.Close>
            <X className="cursor-pointer" size={30} />
          </Dialog.Close>
        </div>

        <div className="flex flex-col gap-y-10">
          {/* Idea name */}
          <div>
            <div className="flex items-center gap-4 font-semibold mb-2">
              <h3 className="text-xl">Project idea Name</h3>
              <Badge
                variant="outline"
                size="3"
                radius="full"
                className="px-4! py-2! border border-[#7CCF00]! text-[#7CCF00]!"
              >
                Approved
              </Badge>
              {/* <Badge
                variant="outline"
                className="px-4! py-2! text-[#FD9A00]! border border-[#FD9A00]!"
                size="3"
                radius="full"
              >
                Pending
              </Badge>
              <Badge
                size="3"
                highContrast
                radius="full"
                className="px-4! py-2! border bg-black border-[#A6A09B]! text-[#A6A09B]!"
              >
                Archived
              </Badge> */}
            </div>
            <p className="text-gray-400">Smart ordering and banking system</p>
          </div>

          {/* Project type */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Project Type</h3>
            <div className="flex items-center gap-4">
              <Badge
                variant="soft"
                size="3"
                radius="large"
                style={{
                  border: `1px solid ${COLORS.primary}`,
                  color: 'white',
                }}
              >
                Website
              </Badge>
              <Badge
                variant="soft"
                size="3"
                radius="large"
                style={{
                  border: `1px solid ${COLORS.primary}`,
                  color: 'white',
                }}
              >
                Mobile
              </Badge>
            </div>
          </div>

          {/* Count */}
          <div className="flex items-center gap-10">
            <div>
              <h3 className="text-xl font-semibold mb-2">React count</h3>
              <p className="text-gray-400">
                1.2<span>K</span>
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">View count</h3>
              <p className="text-gray-400">
                1.2<span>K</span>
              </p>
            </div>
          </div>

          {/* Desc */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-400">
              A web-based system that allows customers to book tables and place
              food orders online. Restaurant staff can manage orders,
              reservations, and table availability through an admin dashboard.
              The system improves, reduces manual work, and enhances the
              customer experience.
            </p>
          </div>

          {/* Submitter */}
          <div className="flex items-center gap-20">
            <div>
              <h3 className="text-xl font-semibold mb-2">Submitter</h3>
              <div className="flex items-center gap-4">
                <img src={sampleUserImgUrl} className="size-10 rounded-full" />
                <div>
                  <h4 className="text-lg font-semibold">Cilian Murphy</h4>
                  <Dialog.Description>
                    username123123@gmail.com
                  </Dialog.Description>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Leader</h3>
              <div className="flex items-center gap-4">
                <img src={sampleUserImgUrl} className="size-10 rounded-full" />
                <div>
                  <h4 className="text-lg font-semibold">Cilian Murphy</h4>
                  <Dialog.Description>
                    username123123@gmail.com
                  </Dialog.Description>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between gap-6">
            <Dialog.Close>
              <Button
                className={`lg:w-1/2 bg-black! border! border-[#9C39FC]! ${buttonVariants({ variant: 'secondary' })}`}
              >
                Cancel
              </Button>
            </Dialog.Close>
            <Button className="lg:w-1/2 text-lg">Edit Idea</Button>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProjectIdeaDetailDialog;
