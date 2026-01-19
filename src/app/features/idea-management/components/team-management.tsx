import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Avatar, Badge, Button, IconButton } from '@radix-ui/themes';
import { Check, List, Plus, SquarePen, Trash2, X } from 'lucide-react';

const TeamManagement = () => {
  return (
    <div className="border-t-2 border-[#FFFFFF17]! flex flex-col gap-y-5 py-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Team Management</h3>
        {/* Buttons */}
        <div className="flex items-center gap-4">
          <Button
            radius="large"
            size="2"
            variant="ghost"
            className="border! border-[gray]! text-[gray]! cursor-pointer!"
          >
            <List size={20} />
            List View
          </Button>
          <Button
            radius="large"
            size="2"
            className="bg-[#6F28B3]! cursor-pointer!"
          >
            <Plus size={20} />
            Add Team
          </Button>
        </div>
      </div>

      {/* Developers */}
      <div className="flex flex-col gap-y-6 rounded-lg py-6 px-4 bg-gray-700">
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2 ">
            Frontend developers
            <Badge className="bg-[gray]! px-2! py-1! text-[#FFF]!">6</Badge>
          </h4>
          <div className="flex items-center gap-4">
            <IconButton
              variant="ghost"
              className="text-[gray]! cursor-pointer"
              asChild
            >
              <SquarePen size={28} />
            </IconButton>

            <IconButton
              variant="ghost"
              className="text-[red]! cursor-pointer"
              asChild
            >
              <Trash2 size={28} />
            </IconButton>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Avatar
            src={sampleUserImgUrl}
            size="4"
            fallback="johndoe"
            radius="full"
            color="gray"
            variant="solid"
          />
          <Avatar
            src={sampleUserImgUrl}
            size="4"
            fallback="johndoe"
            radius="full"
            color="gray"
            variant="solid"
          />
          <Avatar
            size="4"
            color="gray"
            fallback="jd"
            radius="full"
            variant="solid"
          />
          <IconButton
            size="4"
            radius="full"
            asChild
            color="gray"
            className="cursor-pointer text-black! p-2"
          >
            <Plus />
          </IconButton>
        </div>
      </div>

      {/* Edited developers */}
      <div className="flex flex-col gap-y-6 rounded-lg py-6 px-4 bg-gray-700">
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2 ">
            Frontend developers
            <Badge className="bg-[gray]! px-2! py-1! text-[#FFF]!">6</Badge>
          </h4>
          <div className="flex items-center gap-4">
            <IconButton className="bg-[#7CCF00]! p-1 cursor-pointer" asChild>
              <Check size={28} className="text-green-400 cursor-pointer" />
            </IconButton>
            <IconButton
              variant="ghost"
              className="text-[red]! cursor-pointer"
              asChild
            >
              <Trash2 size={28} />
            </IconButton>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar
              src={sampleUserImgUrl}
              size="4"
              fallback="johndoe"
              radius="full"
              color="gray"
              variant="solid"
            />
            <IconButton
              size="1"
              className="absolute -top-1 -right-1 bg-red-500! rounded-full! p-1"
              asChild
            >
              <X />
            </IconButton>
          </div>
          <div className="relative">
            <Avatar
              size="4"
              color="gray"
              fallback="jd"
              radius="full"
              variant="solid"
            />
            <IconButton
              size="1"
              className="absolute -top-1 -right-1 bg-red-500! rounded-full! p-1"
              asChild
            >
              <X />
            </IconButton>
          </div>
          <IconButton
            size="4"
            radius="full"
            asChild
            color="gray"
            className="cursor-pointer text-black! p-2"
          >
            <Plus />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default TeamManagement;
