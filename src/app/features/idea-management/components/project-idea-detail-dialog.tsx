import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import { COLORS } from '@/constants/colors';
import { Badge, Dialog } from '@radix-ui/themes';
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import type { ProjectIdeaType } from '../types/project-idea.types';
import ProjectIdeaEditDialog from './project-idea-edit-dialog';

const ProjectIdeaDetailDialog = ({
  trigger,
  data,
}: {
  trigger?: ReactNode;
  data: ProjectIdeaType;
}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [detailDialogOpen, setDetailDialogOpen] = useState(false);

  const handleEditClick = () => {
    setDetailDialogOpen(false);
    // Small delay to allow detail dialog to close before opening edit dialog
    setTimeout(() => {
      setEditDialogOpen(true);
    }, 100);
  };

  return (
    <>
      <Dialog.Root open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <Dialog.Trigger>{trigger || <>View Detail</>}</Dialog.Trigger>

        <Dialog.Content
          size="4"
          maxWidth="758px"
          className="bg-black! text-white py-10! px-16! rounded-3xl! max-h-[90vh] overflow-y-auto"
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
                <h3 className="text-xl">Project Idea Name</h3>
                {data.status === 'APPROVED' && (
                  <Badge
                    variant="outline"
                    size="3"
                    radius="full"
                    className="px-4! py-2! border border-[#7CCF00]! text-[#7CCF00]!"
                  >
                    {data.status}
                  </Badge>
                )}
                {data.status === 'PENDING' && (
                  <Badge
                    variant="outline"
                    className="px-4! py-2! text-[#FD9A00]! border border-[#FD9A00]!"
                    size="3"
                    radius="full"
                  >
                    Pending
                  </Badge>
                )}
                {data.status === 'ARCHIVED' && (
                  <Badge
                    size="3"
                    highContrast
                    radius="full"
                    className="px-4! py-2! border bg-black border-[#A6A09B]! text-[#A6A09B]!"
                  >
                    Archived
                  </Badge>
                )}
              </div>
              <p className="text-gray-400">{data.projectName}</p>
            </div>

            {/* Project type */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Project Type</h3>
              <div className="flex items-center gap-4">
                {data.projectTypes.map((projectType) => (
                  <Badge
                    key={projectType}
                    variant="soft"
                    size="3"
                    radius="large"
                    className="border! text-white! capitalize"
                    style={{ border: '1px solid #6F28B3' }}
                  >
                    {projectType}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Count */}
            <div className="flex items-center gap-10">
              <div>
                <h3 className="text-xl font-semibold mb-2">React count</h3>
                <p className="text-gray-400">
                  {data.reaction_count > 999
                    ? `${(data.reaction_count / 1000).toFixed(1)}K`
                    : data.reaction_count}
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
              <p className="text-gray-400">{data.description}</p>
            </div>

            {/* Submitter */}
            <div className="flex items-center gap-20">
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold mb-2">Submitter</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={sampleUserImgUrl}
                    className="size-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-xl font-semibold capitalize">
                      {data.devName}
                    </h4>
                    <Dialog.Description className="font-thin">
                      username123123@gmail.com
                    </Dialog.Description>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-semibold mb-2">Project Leader</h3>
                <div className="flex items-center gap-4">
                  <img
                    src={sampleUserImgUrl}
                    className="size-10 rounded-full"
                  />
                  <div>
                    <h4 className="text-xl font-semibold capitalize">
                      {data.devName}
                    </h4>
                    <Dialog.Description className="font-thin">
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
                  type="button"
                  variant="primary"
                  size="primary"
                  className="flex-1 border border-[#6B7280] bg-transparent text-white hover:border-[#A855F7]"
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                type="button"
                className="lg:w-1/2 text-lg"
                onClick={handleEditClick}
              >
                Edit Idea
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Root>

      <ProjectIdeaEditDialog
        data={data}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </>
  );
};

export default ProjectIdeaDetailDialog;
