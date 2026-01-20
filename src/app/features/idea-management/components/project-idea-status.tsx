import { COLORS } from '@/constants/colors';
import { Button, Radio } from '@radix-ui/themes';

const ProjectIdeaStatus = () => {
  return (
    <div className="border">
      <h2 className="text-xl">Change the idea status!</h2>
      <p className="text-muted line-clamp-2">
        Choose a status to reflect the current progress and next step of this
        idea.
      </p>

      {/* Radios */}
      <div className="flex flex-col my-10 gap-y-4">
        <div className="flex items-center gap-x-4">
          <Radio name="idea-status" size="3" value="pending" defaultChecked />
          <div className="">
            <h3 className={`text-lg font-semibold text-[${COLORS.secondary}]`}>
              Pending
            </h3>
            <p className="text-xs text-muted">
              This idea remains under considerations.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <Radio name="idea-status" size="3" value="approved" />
          <div className="">
            <h3 className="text-lg font-semibold text-[#7CCF00]">Approved</h3>
            <p className="text-xs text-muted">
              This idea is confirmed to proceed.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-x-4">
          <Radio name="idea-status" size="3" value="archived" />
          <div className="">
            <h3 className="text-lg font-semibold text-[#00B8DB]">Archived</h3>
            <p className="text-xs text-muted">This idea is no longer active.</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-x-6">
        <Button
          type="button"
          radius="large"
          variant="outline"
          size="3"
          style={{
            border: `1px solid ${COLORS.primary}`,
            padding: '25px 40px',
            color: 'white',
          }}
        >
          Cancel
        </Button>
        <Button
          type="button"
          radius="large"
          variant="solid"
          size="3"
          style={{
            background: COLORS.primary,
            padding: '25px 40px',
            color: 'white',
          }}
        >
          Change Status
        </Button>
      </div>
    </div>
  );
};

export default ProjectIdeaStatus;
