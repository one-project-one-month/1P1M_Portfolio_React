import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/form-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Checkbox, Dialog } from '@radix-ui/themes';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';

import {
  editIdeaSchema,
  type EditIdeaType,
  type IdeaType,
} from '@/app/features/user-management/types/project-idea-type';

type ProjectIdeaEditDialogProps = {
  trigger?: React.ReactNode;
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;

  projectIdea: IdeaType;
  editMutate: (data: EditIdeaType) => void;
};

type Status = 'Pending' | 'Approved' | 'Archived';
type statusChangeDataProps = { name: Status; description: string };

const projectTypeOptions = ['Mobile', 'Website', 'Desktop', 'Game'];

export default function ProjectIdeaEditDialog({
  trigger,
  editDialogOpen,
  setEditDialogOpen,
  projectIdea,
  editMutate,
}: ProjectIdeaEditDialogProps) {
  const [step, setStep] = useState(1);
  const [projectTypeShow, setProjectTypeShowed] = useState(false);
  const [search, setSearch] = useState('');

  const statusChageData: statusChangeDataProps[] = [
    {
      name: 'Pending',
      description: 'This idea remains under consideration.',
    },
    {
      name: 'Approved',
      description: 'This idea is confirmed to proceed.',
    },
    {
      name: 'Archived',
      description: 'This idea is no longer active .',
    },
  ];

  const developers = [
    {
      dev_id: 1,
      name: 'Tina',
      email: 'tina@gmail.com',
      role: 'UI | UX Designer',
      profilePictureUrl: sampleUserImgUrl,
    },
    {
      dev_id: 2,
      name: 'Bora',
      email: 'bora@gmail.com',
      role: 'Backend',
      profilePictureUrl: sampleUserImgUrl,
    },
  ];

  const [selectReason, setSelectedReason] = useState<string | null>(null);

  const toggleReason = (reason: string) => {
    setSelectedReason((pre) => (pre === reason ? null : reason));
  };

  const statusColorList: Record<Status, string> = {
    Pending: 'text-[#FD9A00]',
    Approved: 'text-[#7CCF00]',
    Archived: 'text-[#00B8DB]',
  };

  const statusColor = (name: Status) => statusColorList[name];

  const form = useForm<EditIdeaType>({
    resolver: zodResolver(editIdeaSchema),
    defaultValues: {
      projectIdeaId: projectIdea.projectIdeaId,
      projectIdeaName: projectIdea.projectIdeaName,
      description: projectIdea.description,
      projectTypes: projectIdea.projectTypes,
      status: projectIdea.status,
      dev_id: projectIdea.dev_id,
      devUsername: projectIdea.devUsername,
      ownerProfilePicUrl: projectIdea.ownerProfilePicUrl,
      leader_id: projectIdea.leader_id ?? 0,
      leaderProfilePicUrl: projectIdea.leaderProfilePicUrl,
    },
  });

  const selectedTypes = useWatch({
    control: form.control,
    name: 'projectTypes',
  });

  const selectedLeader = useWatch({
    control: form.control,
    name: 'leader_id',
  });

  const filteredOptions = projectTypeOptions.filter((opt) =>
    opt.toLowerCase().includes(search.toLocaleLowerCase()),
  );
  const toggleType = (type: string) => {
    const current = selectedTypes || [];
    if (current.includes(type)) {
      form.setValue(
        'projectTypes',
        current.filter((t) => t !== type),
        { shouldValidate: true },
      );
    } else {
      form.setValue('projectTypes', [...current, type], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data: EditIdeaType) => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      editMutate({
        ...data,
        projectIdeaId: projectIdea.projectIdeaId,
      });
      setEditDialogOpen(false);
    }
  };

  const handleProjectTypeShow = () => {
    setProjectTypeShowed(!projectTypeShow);
  };

  return (
    <Dialog.Root open={editDialogOpen} onOpenChange={setEditDialogOpen}>
      <Dialog.Trigger>
        <button className="text-white">{trigger}</button>
      </Dialog.Trigger>
      <DialogTitle></DialogTitle>

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
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full h-full flex flex-col justify-between"
        >
          <div className="flex flex-col gap-5">
            <div className="relative flex items-center justify-between w-full">
              <div className="absolute top-4 left-7 right-7 flex justify-between w-[400px] mx-auto z-0">
                <div
                  className={`h-[2px] flex-1 ${
                    step >= 2 ? 'bg-[#6F28B3]' : 'bg-[#364153]'
                  }`}
                ></div>
                <div
                  className={`h-[2px] flex-1 ${
                    step >= 3 ? 'bg-[#6F28B3]' : 'bg-[#364153]'
                  }`}
                ></div>
              </div>

              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className="relative flex flex-col items-center flex-1 z-10 cursor-pointer"
                  onClick={() => setStep(s)}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center rounded-full border
          ${
            step >= s
              ? 'bg-[#6F28B3] border-[#6F28B3] text-white'
              : 'border-[#364153] bg-white'
          }`}
                  >
                    {s}
                  </div>

                  <p className="text-sm mt-2">
                    {s === 1 && 'Information'}
                    {s === 2 && 'Team Leader'}
                    {s === 3 && 'Change Status'}
                  </p>
                </div>
              ))}
            </div>

            {step === 1 && (
              <>
                <div>
                  <h2>Update the idea information</h2>
                  <p>
                    Modify existing idea information and save the latest
                    updates.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-medium">
                    Project idea Name
                  </label>

                  <Controller
                    name="projectIdeaName"
                    control={form.control}
                    render={({ field }) => (
                      <FormField placeholder="" {...field} />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-lg font-medium">Description</label>

                  <Controller
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <textarea
                        {...field}
                        rows={4}
                        placeholder="Enter description"
                        className="w-full border border-[#FFFFFF26] bg-[#FFFFFF17] rounded-lg px-4 py-3 text-white focus:outline-none resize-y"
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <label className="text-lg font-semibold">Project Type</label>

                  <div
                    onClick={handleProjectTypeShow}
                    className="flex gap-3 justify-between items-center border border-[#FFFFFF26] bg-[#FFFFFF17] p-2"
                  >
                    <div className="flex gap-3">
                      {' '}
                      {selectedTypes?.map((type) => (
                        <div key={type} className="flex bg-gray-500 p-2 ">
                          <p className="text-xs">{type}</p>
                          <X
                            size="15"
                            className="cursor-pointer"
                            onClick={() => toggleType(type)}
                          />
                        </div>
                      ))}
                    </div>
                    {projectTypeShow ? (
                      <ChevronDown className="cursor-pointer" />
                    ) : (
                      <ChevronUp className="cursor-pointer" />
                    )}
                  </div>

                  {projectTypeShow && (
                    <div className="border-[#FFFFFF26] mb-5 p-3 bg-[#FFFFFF17]">
                      <input
                        placeholder="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="text-xs w-full focus:outline-none p-2 bg-[#FFFFFF17]"
                      />
                      <div className="flex flex-col h-20 gap-3 mt-2 overflow-auto">
                        {filteredOptions.map((item) => (
                          <div key={item} className="flex gap-1">
                            <Checkbox
                              onCheckedChange={() => toggleType(item)}
                              checked={selectedTypes?.includes(item)}
                            />
                            <p className="text-sm font-sans">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {step === 2 && (
              <div className="flex flex-col gap-5">
                <p className="text-gray-400">Current Team Leader</p>

                {developers
                  .filter((dev) => dev.dev_id === selectedLeader)
                  .map((dev) => (
                    <div
                      key={dev.dev_id}
                      className="h-[100px] flex items-center border border-[#314158] bg-[#020618] rounded-2xl p-4"
                    >
                      <div className="flex gap-3 items-center w-full justify-between">
                        <div className="flex gap-3 items-center">
                          <img
                            src={dev.profilePictureUrl ?? sampleUserImgUrl}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-white">{dev.name}</p>
                            <p className="text-xs text-gray-400">{dev.email}</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-400">{dev.role}</p>
                      </div>
                    </div>
                  ))}

                <input
                  placeholder="Search developer"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-xs w-full focus:outline-none p-4 rounded-lg bg-[#FFFFFF17]"
                />

                <div className="flex flex-col gap-3 mt-2">
                  {developers
                    .filter((dev) =>
                      dev.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((dev) => (
                      <div
                        key={dev.dev_id}
                        onClick={() => {
                          form.setValue('leader_id', dev.dev_id);
                          form.setValue(
                            'leaderProfilePicUrl',
                            dev.profilePictureUrl,
                          );
                        }}
                        className={`cursor-pointer border p-3 rounded-xl flex justify-between items-center
              ${
                selectedLeader === dev.dev_id
                  ? 'border-[#6F28B3] bg-[#1a0d2b]'
                  : 'border-[#FFFFFF26] bg-[#FFFFFF10]'
              }
            `}
                      >
                        <div className="flex gap-3 items-center">
                          <img
                            src={dev.profilePictureUrl ?? sampleUserImgUrl}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div>
                            <p className="text-xs text-white">{dev.name}</p>
                            <p className="text-xs text-gray-400">{dev.email}</p>
                          </div>
                        </div>

                        <p className="text-sm text-gray-400">{dev.role}</p>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="w-full flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                  <h2 className="text-[#F9FAFB] font-medium text-xl leading-8">
                    Change the idea status!
                  </h2>
                  <p className="text-[#99A1AF] text-lg leading-7">
                    Choose a status to reflect the current progress and next
                    step of this idea.
                  </p>
                </div>

                <div className="flex flex-col gap-10">
                  {statusChageData.map((item) => (
                    <div
                      className="flex items-center   gap-5 "
                      onClick={() => toggleReason(item.name)}
                    >
                      <div className="w-5  cursor-pointer flex  rounded-full border border-white  h-5 ">
                        {selectReason === item.name && (
                          <div className="bg-[#F3F4F6] w-full h-full rounded-full cursor-pointer"></div>
                        )}
                      </div>
                      <div className="h-full flex flex-col">
                        <p
                          className={` text-lg font-medium leading-5 ${statusColor(item.name)}`}
                        >
                          {item.name}
                        </p>
                        <p className="text-[#6A7282] text-xs leading-7">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogDescription className="flex justify-between">
            <Button
              type="button"
              onClick={() => {
                if (step === 1) {
                  setEditDialogOpen(false);
                } else {
                  setStep(step - 1);
                }
              }}
              className="w-[45%] bg-black border border-[#6F28B3]"
            >
              Cancel
            </Button>

            <Button type="submit" className="w-[45%] bg-[#6F28B3]">
              {step === 3 ? 'Confirm' : 'Next'}
            </Button>
          </DialogDescription>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
