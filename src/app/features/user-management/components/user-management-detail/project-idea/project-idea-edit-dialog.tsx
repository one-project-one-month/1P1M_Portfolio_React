import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Button } from '@/components/ui/button';
import FormField from '@/components/ui/form-field';
import { zodResolver } from '@hookform/resolvers/zod';
import { Checkbox, Dialog } from '@radix-ui/themes';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';

type ProjectIdeaEditDialogProps = {
  trigger?: React.ReactNode;
  editDialogOpen: boolean;
  setEditDialogOpen: (open: boolean) => void;
};

const projectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  projectType: z.array(z.string()).min(1, 'Select at least one project type'),
  teamLeader: z.array(z.string()).min(1, 'Team Leader name'),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

const projectTypeOptions = ['Mobile', 'Website', 'Desktop', 'Game'];
const teamLeadrOptions = ['Backend', 'Frontend', 'Ui|Ux'];

export default function ProjectIdeaEditDialog({
  trigger,
  editDialogOpen,
  setEditDialogOpen,
}: ProjectIdeaEditDialogProps) {
  const [step, setStep] = useState(1);
  const [projectTypeShow, setProjectTypeShowed] = useState(false);
  const [search, setSearch] = useState('');

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: 'Smart Order & Booking Management System',
      description:
        'A web-based system that allows customers to book tables and place food orders online.',
      projectType: ['Website', 'Mobile'],
      teamLeader: ['Backend'],
    },
  });

  const selectedTypes = useWatch({
    control: form.control,
    name: 'projectType',
  });

  const selectedLeader = useWatch({
    control: form.control,
    name: 'teamLeader',
  });

  const filteredOptions = projectTypeOptions.filter((opt) =>
    opt.toLowerCase().includes(search.toLocaleLowerCase()),
  );

  const filterLeaderOptions = teamLeadrOptions.filter((item) =>
    item.toLocaleUpperCase().includes(search.toLocaleLowerCase()),
  );

  const toggleType = (type: string) => {
    const current = selectedTypes || [];
    if (current.includes(type)) {
      form.setValue(
        'projectType',
        current.filter((t) => t !== type),
        { shouldValidate: true },
      );
    } else {
      form.setValue('projectType', [...current, type], {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data: ProjectFormValues) => {
    console.log('FORM DATA:', data);

    if (step < 3) {
      setStep(step + 1);
    } else {
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
                    name="name"
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
                      {selectedTypes.map((type) => (
                        <div className="flex bg-gray-500 p-2 ">
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
                          <div
                            key={item}
                            className="flex gap-1"
                            // onClick={() => toggleType(item)}
                          >
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
                <p className=" text-gray-400">Current Team Leader</p>
                <div className="h-[128px] flex items-center border border-[#314158] bg-[#020618] rounded-2xl p-3">
                  {selectedLeader.map((item) => (
                    <div className="w-full flex justify-between items-center">
                      <div className="flex gap-3">
                        <img
                          src={sampleUserImgUrl}
                          className="w-15 rounded-full"
                          alt=""
                        />
                        <div>
                          <p>Name</p>
                          <p>Email</p>
                        </div>
                      </div>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <div className="">
                  <input
                    placeholder="Search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="text-xs  w-full focus:outline-none p-4 rounded-lg bg-[#FFFFFF17]"
                  />
                  <div className="flex flex-col gap-3 mt-2 ">
                    {filterLeaderOptions.map((item) => (
                      <div className="w-full border-[#FFFFFF26] mb-5 p-3 bg-[#FFFFFF17] h-14 flex gap-3 justify-between items-center">
                        <div className="flex items-center gap-3">
                          <img
                            src={sampleUserImgUrl}
                            className="w-8 h-8 rounded-full"
                            alt=""
                          />
                          <div>
                            <p className="text-xs">Name</p>
                            <p className="text-xs">Email</p>
                          </div>
                        </div>
                        <p className="text-base">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="text-center text-gray-400">
                Change Status Step (Coming Next)
              </div>
            )}
          </div>

          <div className="flex justify-between">
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
          </div>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
