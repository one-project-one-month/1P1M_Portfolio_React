import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { COLORS } from '@/constants/colors';
import { Badge, Button, Dialog } from '@radix-ui/themes';
import { PenLine } from 'lucide-react';
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
        style={{ background: 'black', color: 'white', padding: '60px' }}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <Dialog.Title size="7" style={{ marginBottom: 0 }}>
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
          <Button
            size="3"
            variant="solid"
            style={{ background: COLORS.primary }}
          >
            <PenLine size={18} />
            Edit
          </Button>
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
                style={{ border: '1px solid #7CCF00', color: '#7CCF00' }}
              >
                Approved
              </Badge>
              <Badge variant="outline" color="amber" size="3" radius="full">
                Pending
              </Badge>
              <Badge
                variant="outline"
                size="3"
                highContrast
                radius="full"
                className="border"
                style={{ color: 'white' }}
              >
                Archived
              </Badge>
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
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ProjectIdeaDetailDialog;
